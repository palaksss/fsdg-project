const { Resend } = require("resend");

function createEmailClient() {
    if (!process.env.RESEND_API_KEY) {
        throw new Error(
            "RESEND_API_KEY is missing from environment variables."
        );
    }

    return new Resend(process.env.RESEND_API_KEY);
}

module.exports = createEmailClient;