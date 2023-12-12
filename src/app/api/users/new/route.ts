import { connect } from '@/dbConfig/dbConfig';
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
import { NextRequest, NextResponse } from 'next/server';
import requestedfiles from '@/models/requestSchema';

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);

    
    // Use findOne instead of find if you expect a single document
    const user = await requestedfiles.findOne({ employee_id: userId });

 
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: any) {
  
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
