import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import files from "@/models/filesSchema"
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
connect();

export async function GET(request: NextRequest){
    const userToken = await getUserFromToken(request);
    try {
        const information = await files.find({ employee_id: userToken });
        console.log(information);
        
        return NextResponse.json({ success: true, userData: information }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}