import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import requestedfiles from '@/models/requestSchema';
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';

connect();

export async function GET(request: NextRequest) {
    const employee_id = getUserFromToken(request);
    try {
      const allrequestfiles = await requestedfiles.findOne({employee_id: employee_id,isVerified: true, requestfile: "coe"});
      if(!allrequestfiles)
      {
        return NextResponse.json({success: false}, {status: 201});
      }
      else{
        return NextResponse.json({success: true, coefile: allrequestfiles.employment}, {status: 200});
      }
      return NextResponse.json({data: allrequestfiles}, { status: 201 });
    } catch (error:any) {
      console.error('Internal Server Error:', error);
      return NextResponse.json({ error: error.message, success: false }, { status: 500 });
        
    }
  
  }