const mongoose = require("mongoose");
const dns = require("node:dns");

// Force Node to use Cloudflare DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log(
            `MongoDB connected successfully: ${connection.connection.host}`
        );
    } catch (error) {
        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);
    }
};

module.exports = connectDatabase;