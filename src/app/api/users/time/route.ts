import { connect } from '@/dbConfig/dbConfig';
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
import { NextRequest, NextResponse } from 'next/server';
import bundy from '@/models/bundyclockSchema';

connect();

export async function GET(request: NextRequest) {
  try {
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;
    const now = new Date();
    const offset = 8; // Philippines timezone offset in hours
    const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
    const date = philippinesTime.toISOString().split('T')[0];
    const userId = await getUserFromToken(request);
    const userBundy = await bundy.find({ employee_id: userId }).skip(skip).limit(limit);

    // Sort the userBundy array based on the date in descending order
    userBundy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());




    return NextResponse.json({
      message: 'Successfully retrieve user data',
      success: true,
      user: userBundy,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
