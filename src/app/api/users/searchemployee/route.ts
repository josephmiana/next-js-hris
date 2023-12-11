import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import updated from "@/models/updateduserSchema"
connect();
export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
  const limit = 10;
  const skip = (page - 1) * limit;
	try {
        const userData = await updated.find({}, 'name email employee_id isVerified').skip(skip).lean();
        return NextResponse.json({
            message: "Successfully retrieve user data",
            success: true,
            user: userData,
          });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
        
	}
}