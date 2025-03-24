import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",  // You can use other services like Outlook, Yahoo, etc.
    auth: {
        user: "egenerator8@gmail.com",  // Your email
        pass: "novpmfavigbtwyzl"   // App password (not your real email password)
    }
});

export const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
