import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import userinformation from '@/models/userinformation';
connect();
export async function GET(request: NextRequest) {
	try {
        const userData = await userinformation.find();
        return NextResponse.json({message: "Successfully retrieve user data", success: true, user: userData,});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
        
	}
}