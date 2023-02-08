import crypto from "crypto";
import express from "express";
import user_schema from "../../../schema/user_schema";
const router = express.Router();

router.get("/", async (req, res) => {
    const {
        password,
        username
    } = req.body;


    if (!password || !username) return res.status(400).json({
        code: "MissingProps",
        status: 400,
        props: ["password", "username"],
        message: "Missing necessary fields"
    });

    let user = await user_schema.findOne({ username });
    if (!user) {
        return res.status(404).json({
            code: "UserNotFound",
            status: 404,
            message: "A user with that username was not found"
        });
    }

    const hash = crypto.createHash("sha256").update(user.salt + password).digest("base64");

    if (hash !== user.password_hash) {
        return res.status(401).json({
            code: "CredsInvalid",
            status: 401,
            message: "Password or username is invalid"
        });
    }



    user = {
        id: String(user._id),
        username: String(user.username),
        token: String(user.api.key),
    };

    console.log(`Logged in ${user.username}<${user._id}>`);
    res.status(200).json(user);
});

export default router;