import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bundy from '@/models/bundyclockSchema';
import { getUsernameFromToken } from '@/helpers/getUsernameTokenFromToken';
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
import userinformation from '@/models/userinformation';
export async function GET(request: NextRequest) {
    const employee_id = await getUserFromToken(request);
    try {
        const res = await userinformation.findOne({'EmployeeInformation.employee_id': employee_id}).select('Schedule');
        console.log('this is from routes', res);
        
        return NextResponse.json({
            success: true,
            result: res,
        }, { status: 200 });
    } catch (error:any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });    }
    

}