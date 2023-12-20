import { connect } from "@/dbConfig/dbConfig";
import updated from "@/models/updateduserSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import userinformation from "@/models/userinformation"
import employeeinformation from "@/models/personalinfo";
import { sendEmail } from "@/helpers/mailer";
import files from "@/models/filesSchema"

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, employee_id, password, phone, address, position, rateperDay, startshiftperweek, endshiftperweek, startshift, endshift } = reqBody;
    const [firstName, ...middleNameArray] = name.split(" ");
    const middleName = middleNameArray.join(" ");
    const [lastName] = middleNameArray.reverse();
    
    console.log("First Name:", firstName);
    console.log("Middle Name:", middleName);
    console.log("Last Name:", lastName);
    
    const now = new Date();
    const offset = 8; // Philippines timezone offset in hours
    const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
    const date = philippinesTime.toISOString().split('T')[0];
    const user = await updated.findOne({employee_id});
        if(user){
            return NextResponse.json({error: "Email already exists"}, {status: 400})
        }   
  //hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  const newUser = new updated({
    name: name,
    email: email,
    employee_id: employee_id,
    password: hashedPassword,
  });
  const personalinformation = new employeeinformation({
    employee_id: employee_id,
    basic:{
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
    },
  })
  const userinfo = new userinformation({
    EmployeeInformation: {
        name: name,
        employee_id: employee_id,
        phone: phone,
        address: address,
        role: position,
    },
    PayInformation: {
        rate: rateperDay,
    },
    Schedule: {
      startshiftperweek:startshiftperweek, 
      endshiftperweek:endshiftperweek, 
      startshift:startshift, 
      endshift:endshift,
    },
    datecreated: date,
});
const newInformation = new files({
  employee_id: employee_id,
  name: name, //
  hireddate: "",
  pagibig: "",  
  philhealth: "",
  tin: "",  
  sss: "",  
});
  const workfiles = await newInformation.save();
  const savedPersonalInfo = await personalinformation.save();
  const savedUser = await newUser.save();
  const savedInfo = await userinfo.save();
  await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
      return NextResponse.json({
        message: "User created successfully!",
        success: true,
        savedUser,
        savedInfo,
        workfiles,
        savedPersonalInfo,
        }, {status:201})
          } catch (error: any) {
            console.log(error.message);
            
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
