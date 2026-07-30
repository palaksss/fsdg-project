const nodemailer = require("nodemailer");

const createTransporter = () => {
    if (
        !process.env.EMAIL_USER ||
        !process.env.EMAIL_APP_PASSWORD
    ) {
        throw new Error(
            "Email credentials are missing from environment variables."
        );
    }

    return nodemailer.createTransport({
        service: "gmail",

        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
};

module.exports = createTransporter;