import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
import { NextRequest, NextResponse, userAgent } from 'next/server';
import employeePayslip from '@/models/payslipSchema';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(request: NextRequest) {
        const dateQuery = request.nextUrl.searchParams.get('date') || "";
        const periodQuery = request.nextUrl.searchParams.get('periodcovered') || "";
        
	try {
    const userId = await getUserFromToken(request);
       console.log(userId);
       
        const searchFilter = {
                $and: [
                  { 'employeeinformation.employee_id': userId },
                  { date: dateQuery }, // Add the date filter
                  { periodcovered: periodQuery } // Add the period filter
                ]
              };
		const userDataArray = await employeePayslip.findOne(searchFilter);
               
		return NextResponse.json({ message: "Successfully retrieve user data", success: true, payslip: userDataArray,});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });

	}
}