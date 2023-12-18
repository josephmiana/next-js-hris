import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bundy from '@/models/bundyclockSchema';
import { getUsernameFromToken } from '@/helpers/getUsernameTokenFromToken';
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
import userinformation from '@/models/userinformation';
connect();

export async function POST(request: NextRequest) {
   try {
    const reqBody = await request.json();
    const res = await bundy.findByIdAndUpdate(reqBody._id, reqBody);
    console.log('this is from post request', reqBody);
    
    return NextResponse.json({
        success: true,
        result: res
    }, { status: 200 });
   } catch (error: any) {
    console.log(error.message);
    
    return NextResponse.json({ error: error.message }, { status: 500 }); 
   }
}
export async function GET(request: NextRequest) {
    const employee_id = await getUserFromToken(request);
    const username = await getUsernameFromToken(request);
    const now = new Date();
    const offset = 8; 
    const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
      philippinesTime.setUTCHours(0,0,0,0);
    console.log('this is from get request' , philippinesTime);
    
    try {
        const res = await bundy.findOne({ employee_id: employee_id, date: philippinesTime }).select('date morningTimeIn morningTimeOut breaktimeIn breaktimeOut afternoonTimeIn afternoonTimeOut overTimeIn overTimeOut overtime normalhour tardiness workedHours');

        if (!res) {
            const newRecord = {
                name: username,
                employee_id: employee_id,
                date: philippinesTime,
            };

            await bundy.create(newRecord);
            // Assuming bundy.create() is successful, now try to find the record again
            const updatedRes = await bundy.findOne({ employee_id: employee_id, date: philippinesTime }).select('date morningTimeIn morningTimeOut breaktimeIn breaktimeOut afternoonTimeIn afternoonTimeOut overTimeIn overTimeOut overtime normalhour tardiness workedHours');

            return NextResponse.json({
                success: true,
                result: updatedRes,
            }, { status: 200 });
        }

        console.log('this is from routes', res);
        return NextResponse.json({
            success: true,
            result: res,
        }, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
