import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import requestedfiles from '@/models/requestSchema';
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
import { getUsernameFromToken } from '@/helpers/getUsernameTokenFromToken';

connect();

export async function POST(request: NextRequest) {
  const userId = await getUserFromToken(request);
  const userName = await getUsernameFromToken(request);

  try {
    const reqBody = await request.json();
    const { employee_id, hireddate, pagibig, philhealth, tin, sss, requestfile, name, position, requestedDate } = reqBody;
    

    const now = new Date();
    const offset = 8; // Philippines timezone offset in hours
    const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
    const date = philippinesTime.toISOString().split('T')[0];

   
    const file = await requestedfiles.findOne({ employee_id: userId, isVerified: false, requestfile: '201 Files' });
    const coe = await requestedfiles.findOne({ employee_id: userId, isVerified: false, requestfile: 'coe' });
    if (requestfile === '201File') {
      if (file) {
        return NextResponse.json({ error: "201 Files is pending. Please wait for approval before creating new!" }, { status: 400 });
      }

      else {
        const newUser = new requestedfiles({
          name: userName,
          requestfile: "201 Files",
          employee_id: userId,
          date: date,
          information: {
            employee_id: employee_id,
            hireddate: hireddate,
            pagibig: pagibig,
            philhealth: philhealth,
            tin: tin,
            sss: sss,
          }
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
          success: true,
          savedUser,
        }, { status: 201 });
      }
    }
    if (requestfile === 'coe') {
      if (coe) {
       
        return NextResponse.json({ error: "COE Files is pending. Please wait for approval before creating new!" }, { status: 400 });
      }
      else {
        const newUser = new requestedfiles({
          name: userName,
          requestfile: "coe", // Is this correct? Shouldn't it be "COE"?
          employee_id: userId,
          date: date,
          employment: {
            name: name,
            date: requestedDate,
            position: position,
          }
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
          success: true,
          savedUser,
        }, { status: 201 });
      }
    }
  } catch (error: any) {
    
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
};

export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
  const limit = 10;
  const skip = (page - 1) * limit;
  try {
    const allrequestfiles = await requestedfiles.find({ isVerified: false }).skip(skip).limit(limit).lean();
    return NextResponse.json({ data: allrequestfiles }, { status: 201 });
  } catch (error: any) {
    
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });

  }

}
