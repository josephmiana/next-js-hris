import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import updatedUser from '@/models/updateduserSchema';
connect();

export async function GET(request: NextRequest) {
    try {
        const highestValueDoc:any = await updatedUser.findOne().sort({ employee_id: -1 }).limit(1).lean().select('employee_id');
        const incrementedId = parseFloat(highestValueDoc.employee_id) + 1;
        return NextResponse.json({ incrementedId }, { status: 200 });
    } catch (error:any) {
    console.log(error.message);
    
      return NextResponse.json({ error: error.message, success: false }, { status: 400 });

    }
  }