import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
import userinformation from '@/models/userinformation';
connect()
export async function GET(request: NextRequest) {
    
    try {
        const employee_id = await getUserFromToken(request);
        const res = await userinformation.findOne({'EmployeeInformation.employee_id': employee_id}).select('Schedule');
        console.log('this is from routes', employee_id);
        
        return NextResponse.json({
            success: true,
            result: res,
        }, { status: 200 });
    } catch (error:any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });    }
    

}