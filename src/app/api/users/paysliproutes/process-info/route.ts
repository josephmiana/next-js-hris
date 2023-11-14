import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import userinformation from '@/models/userinformation';
import bundy from "@/models/bundyclockSchema";
connect();
export async function GET(request: NextRequest) {
	try {

		const userDataArray = await userinformation.find();
		return NextResponse.json({ message: "Successfully retrieve user data", success: true, user: userDataArray, days: 12 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });

	}
}