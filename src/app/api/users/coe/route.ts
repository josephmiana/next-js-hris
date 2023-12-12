import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import requestedfiles from '@/models/requestSchema';
import { getToken } from '@/helpers/getToken';

connect();

export async function GET(request: NextRequest) {
    try {
        const userId= await getToken(request);
        
        
      const file = await requestedfiles.findOne({employee_id: userId, isVerified: true, requestfile: "coe"});
      if(!file)
      {
        return NextResponse.json({success: false}, {status: 500});
      }
      else
        return NextResponse.json({success: true,}, {status: 200});
      
    } catch (error:any) {
     
      return NextResponse.json({ error: error.message, success: false }, { status: 400 });

    }
  }