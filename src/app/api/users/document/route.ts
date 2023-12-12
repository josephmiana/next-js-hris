import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
import { NextRequest, NextResponse } from 'next/server';
import employeePayslip from '@/models/payslipSchema';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(request: NextRequest) {
        const dateQuery = request.nextUrl.searchParams.get('date') || "";
        const periodQuery = request.nextUrl.searchParams.get('periodcovered') || "";
        const userId = await getUserFromToken(request);
       
        const searchFilter = {
                $and: [
                  { 'employeeinformation.employee_id': userId },
                  { date: dateQuery }, // Add the date filter
                  { periodcovered: periodQuery } // Add the period filter
                ]
              };
	try {
		const userDataArray = await employeePayslip.findOne(searchFilter);
              
                
		return NextResponse.json({ message: "Successfully retrieve user data", success: true, payslip: userDataArray.deduction}, {status: 200});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });

	}
}