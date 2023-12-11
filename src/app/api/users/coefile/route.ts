import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import requestedfiles from '@/models/requestSchema';
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
connect();
export async function GET(request: NextRequest) {
        try {
            const userId = await getUserFromToken(request);

            if (!userId) {
            // Handle the case when the token is not available
            return NextResponse.json({ success: false }, { status: 401 });
            }

            const user = await requestedfiles
            .findOne({employee_id: userId, isVerified: true, requestfile: "coe"})
            .select('employment');
            if(user)
            {
                return NextResponse.json({ success: true, data: user }, {status: 200});

            }
            else{
                return NextResponse.json({success: false,}, {status: 500});
            }
            
        } catch (error:any) {
            console.log(error.message);
            return NextResponse.json({ error: error.message, success: false }, { status: 500 });
            
            
        }
}