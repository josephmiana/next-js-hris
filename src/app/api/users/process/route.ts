import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import employeePayslip from "@/models/payslipSchema"
connect();

export async function POST(request: NextRequest) {
  try {
    const now = new Date();
    const offset = 8; // Philippines timezone offset in hours
    const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
    const date = philippinesTime.toISOString().split('T')[0];
    const reqBody = await request.json();
    const { name, employee_id, role, salary, overtime, grossearnings, tax, pagibig, philhealth, sss, totalcontribution, netpay } = reqBody;
    const user = await employeePayslip.findOne({'employeeinformation.employee_id': employee_id, date: date})
    if(user){
      return NextResponse.json({error: "Payslip already submitted"}, {status: 400})
    }
    const information = new employeePayslip({
      employeeinformation: {
          name: name,
          employee_id: employee_id,
          role: role,
      },
      taxableincome: {
          salary: salary,
          overtime: overtime,
          grossearnings: grossearnings, // assuming you want to calculate it based on salary and overtime
      },
      deduction: {
          tax: tax, // example value
          pagibig: pagibig,
          philhealth: philhealth,
          sss: sss,
          totalcontribution: totalcontribution, // example value
      },
      netpay: netpay, // example value
      date: date, // current date
  });
  
  // Save the instance to the database
  const savePayslip = await information.save();
      return NextResponse.json({
        message: "Payslip created successfully!",
        success: true,
        savePayslip,
        }, {status:201})
          } catch (error: any) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
