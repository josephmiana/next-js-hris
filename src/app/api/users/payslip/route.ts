import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
import { NextRequest, NextResponse } from 'next/server';
import employeePayslip from '@/models/payslipSchema';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(request: NextRequest) {
        try {
                const userId = await getUserFromToken(request);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                const userData = await employeePayslip.findOne({
                        'employeeinformation.employee_id': 10,
                        'date': {
                                $gte: thirtyDaysAgo,
                                $lt: new Date()
                        }
                }).sort({ date: -1 }); // Sort in descending order to get the latest entry
                console.log(userData);
                
                return NextResponse.json({ message: "Successfully retrieve user data", success: true, user: userData });
        } catch (error: any) {
                return NextResponse.json({ error: error.message }, { status: 400 });
        }
}