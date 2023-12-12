import nodemailer from 'nodemailer';
import update from '@/models/updateduserSchema';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        const hashedEmail = await bcryptjs.hash(email.toString(), 10);
        const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        if (emailType === "VERIFY") {
            await update.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + sevenDaysInMilliseconds })
        } else if (emailType === "RESET") {
            await update.findByIdAndUpdate(userId, { forgotPasswordToken: hashedEmail, forgotPasswordTokenExpiry: Date.now() + sevenDaysInMilliseconds })
            return hashedEmail;
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}