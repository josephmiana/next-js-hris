import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import requestedfiles from "@/models/requestSchema"
connect();

export async function GET(request: NextRequest) {
    try {
      const count = await requestedfiles.countDocuments({ isVerified: false });
  
      return NextResponse.json({
        success: true,
        count: count,
      }, { status: 200 });
  
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  