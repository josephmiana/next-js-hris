import { connect } from '@/dbConfig/dbConfig';
import updated from '@/models/updateduserSchema';
import { NextRequest, NextResponse } from 'next/server';
connect();

export async function GET(request: NextRequest) {
    const searchQuery = request.nextUrl.searchParams.get('email') || '';

    if (searchQuery) {
        let searchFilter = { email: searchQuery };
    try {
        if(searchQuery)
        {
            const verify = await updated.findOne(searchFilter)
        
            const tokenforverifying =verify.verifyToken
            const env = process.env.DOMAIN
            return NextResponse.json({message: "Successfully retrieve user data", token: tokenforverifying, env: env});
            
        }
        else
        {
            return NextResponse.json({message: "Email not found!"});
        }
        
        
    } catch (error:any) {
        console.log(error.message);
        
    }
}
}