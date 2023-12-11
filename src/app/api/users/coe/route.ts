import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import requestedfiles from '@/models/requestSchema';
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';

connect();

export async function GET(request: NextRequest) {
  const userId = await getUserFromToken(request);
    try {
      

      const allrequestfiles = await requestedfiles.findOne({employee_id: userId, isVerified: true, requestfile: "coe"});
      if(!allrequestfiles)
      {
        return NextResponse.json({success: false}, {status: 200});
      }
      else{
        return NextResponse.json({success: true, }, {status: 200});
      }
    } catch (error:any) {
      console.error('Internal Server Error:', error);
      return NextResponse.json({ error: error.message, success: false }, { status: 500 });
        
    }
  
  }