import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import overtime from "@/models/overtimeSchema"
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
connect();

export async function POST(request: NextRequest){

    const now = new Date();
        const offset = 8; // Philippines timezone offset in hours
        const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
        const date = philippinesTime.toISOString().split('T')[0];
        const employee_id = await getUserFromToken(request);
        const reqbody  = await request.json();
        const {name, overtime} = reqbody;
    try {
        const information = await overtime.find({employee_id: employee_id, date: date})
        if(!information)
        {
            const newRecord = new overtime({
                name: name,
                employee_id:employee_id,
                overtime: overtime, 
                date: date,
            });
            await newRecord.save();
            return NextResponse.json({ success: true, information: 'Overtime has given to this user!' }, { status: 200 });
        }
        else{
            return NextResponse.json({success: false ,information:'This user has already been given an overtime!' }, { status: 200 });
        }
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}