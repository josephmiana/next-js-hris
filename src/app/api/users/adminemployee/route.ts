import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import employeeinformation from "@/models/personalinfo"
connect();
export async function GET(request: NextRequest) {
    const searchQuery = request.nextUrl.searchParams.get('employee_id') || "";
	try {

        const userData = await employeeinformation.find({employee_id: searchQuery});
        return NextResponse.json({
            message: "Successfully retrieve user data",
            success: true,
            user: userData,
          });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
        
	}
}
