import { connect } from '@/dbConfig/dbConfig';
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
import { NextRequest, NextResponse } from 'next/server';
import bundy from '@/models/bundyclockSchema';
import userinformation from '@/models/userinformation';
connect();

export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;
    const now = new Date();
    const offset = 8; // Philippines timezone offset in hours
    const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
    const date = philippinesTime.toISOString().split('T')[0];
  
  try {
    // Sort the data in ascending order based on a timestamp (assuming a "timestamp" field)
    const userBundy = await bundy
    .find({date: date})
    .skip(skip)
    .lean()
    console.log(userBundy);
    
    return NextResponse.json({
      message: 'Successfully retrieve user data',
      success: true,
      admin: userBundy,

    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
