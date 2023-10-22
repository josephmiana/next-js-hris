import { connect } from "@/dbConfig/dbConfig";
import updateduser from "@/models/updateduserSchema";
import pay from "@/models/paySchema";
import employeeinformation from "@/models/personalinfo"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, employee_id, password, phone, address, position, daysofWork, rateperDay } = reqBody;
    

  //hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  const newUser = new updateduser({
    name,
    employee_id,
    password: hashedPassword,
    position,
  });
  const payInfo = new pay({
    employee_id,
    daysofWork,
    rateperDay,
  })
  const basicInfo = new employeeinformation({
    employee_id,
    phone,
    address,
  })


  const savedUser = await newUser.save();
  const savedPay = await payInfo.save();
  const savedInfo = await basicInfo.save();
      return NextResponse.json({
        message: "User created successfully!",
        success: true,
        savedUser,
        savedPay,
        savedInfo,
        }, {status:201})
          } catch (error: any) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
