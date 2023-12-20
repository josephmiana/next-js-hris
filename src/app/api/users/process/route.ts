import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import employeePayslip from "@/models/payslipSchema"
import userinformation from "@/models/userinformation";
import bundy from "@/models/bundyclockSchema";

connect();

export async function POST(request: NextRequest) {
  try {
    const now = new Date();
    const offset = 8; // Philippines timezone offset in hours
    const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
    const date = philippinesTime.toISOString().split('T')[0];
    const reqBody = await request.json();
   
    
    const { name, employee_id, role, salary, overtime, grossearnings, tax, pagibig, philhealth, totalhours, totalovertime, totalnormal, rateperhour, sss, totalcontribution, netpay, periodcovered, datecreated} = reqBody;
    const user = await employeePayslip.findOne({'employeeinformation.employee_id': employee_id, periodcovered: periodcovered, date: datecreated})
    if(user){
      return NextResponse.json({
        message: "Payslip has already been given!",
        success: false,}, {
        status: 201})
    }
    const information = new employeePayslip({
      employeeinformation: {
          name: name,
          employee_id: employee_id,
          role: role,
      },
      taxableincome: {
          
          salary: salary,
          totalhoursworked: totalhours,
          overtime: overtime,
          normalhours: totalnormal,
          rate: rateperhour,
          totalovertime: totalovertime,
          grossearnings: grossearnings, // assuming you want to calculate it based on salary and overtime
      },
      deduction: {
          tax: tax, // example value
          pagibig: pagibig,
          philhealth: philhealth,
          sss: sss,
          totalcontribution: totalcontribution, // example value
      },
      periodcovered: periodcovered,
      netpay: netpay, // example value
      date: datecreated, // current date
  });
  
  // Save the instance to the database
  const savePayslip = await information.save();
 
  
      return NextResponse.json({
        message: "Payslip created successfully!",
        success: true,
        savePayslip,
        }, {status:201})
          } catch (error: any) {
  
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET(request: NextRequest) {
	const now = new Date();
        const offset = 8; // Philippines timezone offset in hours
        const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
        const fifteenDaysAgo = new Date(philippinesTime);
        fifteenDaysAgo.setDate(philippinesTime.getDate() - 15);
        
	try {
		const userDataArray = await userinformation
        .find()
        .select('PayInformation.rate EmployeeInformation');

	      

		return NextResponse.json({ message: "Successfully retrieve user data", success: true, user: userDataArray,});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });

	}
}

