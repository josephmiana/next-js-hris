import { connect } from '@/dbConfig/dbConfig';
import update from '@/models/updateduserSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { name, password } = reqBody;
		//Check if user exist or not
		const users = await update.findOne({ email: name });	
		
		if (!users) {
			return NextResponse.json(
				{ error: 'User does not exist' },
				{ status: 400 }
			);
			
		}	
		//Check if the password is correct
		const validPassword = await bcryptjs.compare(password, users.password);
		console.log(validPassword);
		
		if (!validPassword) {
			return NextResponse.json({ error: 'Invalid Password' }, { status: 400 });
		}
		if(users.isVerified === true)
		{
			const tokenData = {
				id: users._id,
				custom_id: users.employee_id,
				username: users.name,
				email: users.name,
				isAdmin: users.isAdmin,
			};	
			//create token
			const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
				expiresIn: '1d',
			});
	
			//set the cookie
			const response = NextResponse.json({
				message: 'Login Successful',
				success: true,
				isAdmin: users.isAdmin,
				isVerified: users.isVerified,
			});
			response.cookies.set('token', token, { httpOnly: true });
			return response;
		}	
		else{
			const env = process.env.DOMAIN
			return NextResponse.json({ error: 'You need to verify your account', isVerified: false, user: users.email, token: users.verifyToken, env: env,isAdmin: users.isAdmin }, { status: 200 });
		}
		//create jsonwebtoken data
		
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
