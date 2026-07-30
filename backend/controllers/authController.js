const crypto = require("crypto");
const createTransporter = require("../config/email");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required.",
            });
        }

        if (!email?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Could not create account.",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Could not log in.",
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail,
        });

        const successResponse = {
            success: true,
            message:
                "If an account exists with that email, a password reset link has been sent.",
        };

        if (!user) {
            return res.status(200).json(successResponse);
        }

        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        const frontendUrl =
            process.env.FRONTEND_URL ||
            "http://localhost:5173";

        const resetUrl =
            `${frontendUrl}/reset-password/${resetToken}`;

        try {
            const transporter = createTransporter();

            await transporter.sendMail({
                from: `"AlignCV" <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: "Reset your AlignCV password",

                text: `
You requested a password reset for your AlignCV account.

Open this link to set a new password:

${resetUrl}

This link expires in 15 minutes.

If you did not request this reset, you can ignore this email.
                `,

                html: `
<div style="max-width:560px;margin:0 auto;padding:32px;font-family:Arial,sans-serif;color:#1e293b;">
<h1 style="color:#4f46e5;">AlignCV</h1>

<h2>Reset your password</h2>

<p>We received a request to reset the password for your AlignCV account.</p>

<p>Click the button below to choose a new password.</p>

<a href="${resetUrl}" style="display:inline-block;margin:20px 0;padding:12px 22px;background:#4f46e5;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">
Reset Password
</a>

<p>This link expires in 15 minutes.</p>

<p>If you did not request this password reset, you can safely ignore this email.</p>
</div>
                `,
            });
        } catch (emailError) {
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;

            await user.save();

            console.error(
                "Reset email error:",
                emailError
            );

            return res.status(500).json({
                success: false,
                message:
                    "Could not send the password reset email.",
            });
        }

        return res.status(200).json(successResponse);
    } catch (error) {
        console.error("Forgot password error:", error);

        return res.status(500).json({
            success: false,
            message:
                "Could not process the password reset request.",
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Reset token is required.",
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters.",
            });
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message:
                    "This password reset link is invalid or has expired.",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message:
                "Password reset successfully. You can now sign in.",
        });
    } catch (error) {
        console.error("Reset password error:", error);

        return res.status(500).json({
            success: false,
            message: "Could not reset the password.",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
};