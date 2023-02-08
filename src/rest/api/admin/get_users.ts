import crypto from "crypto";
import express from "express";
import user_schema from "../../../schema/user_schema";
import { checkApiAuth } from "../../../util";

const router = express.Router();

router.get("/", async (req, res) => {
    if (!await checkApiAuth(req, res)) return;
    const user = await user_schema.findOne({
        api: {
            key: req.headers["authorization"]
        }
    });
    if (!user) {
        return res.status(500).json({
            code: "InternalServerError",
            status: 500,
            message: "User passed auth check but user wasnt found"
        });
    }

    let users = await user_schema.find({}); // get all users
    users = users.map((u) => {
        return {
            username: u.username
        };
    });

    res.status(200).json({
        users: users
    });
});

export default router;