import nodemailer from "nodemailer";
// import Handlebars from 'handlebars'
import * as Handlebars from "handlebars";
import { activaionThemeplate } from "@/components/mail/mailThemplate/activaion";
import { forgetPasswordThemeplate } from "@/components/mail/mailThemplate/forgetPassword";
export async function sendMail({ to, subject, body }) {
    const { SMTP_GMAIL_PASS, SMTP_GMAIL } = process.env;
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_GMAIL,
            pass: SMTP_GMAIL_PASS
        }
    });
    try {
        const testResult = await transport.verify();
        // console.log('testResult', testResult);
    }
    catch (error) {
        console.log(error);
    }
    try {
        const sendResult = await transport.sendMail({
            from: SMTP_GMAIL,
            to,
            subject,
            html: body
        });
        // console.log(sendResult);
    }
    catch (error) {
        console.log(error);
    }
}
export function compileActivaionThemplate(name, siteUrl, registerUrl) {
    const themplate = Handlebars.compile(activaionThemeplate);
    const htmlBody = themplate({
        name,
        siteUrl,
        registerUrl
    });
    return htmlBody;
}
export function compileResetPasswordThemplate(name, siteUrl, registerUrl) {
    const themplate = Handlebars.compile(forgetPasswordThemeplate);
    const htmlBody = themplate({
        name,
        siteUrl,
        registerUrl
    });
    return htmlBody;
}
//# sourceMappingURL=mail.js.map