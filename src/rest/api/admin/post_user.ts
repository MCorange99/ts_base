import crypto from "crypto";
import express from "express";
import user_schema from "../../../schema/user_schema";
import { checkApiAuth, newSalt } from "../../../util";
import {newToken, newUserID} from "../../../util/index";

const router = express.Router();

router.post("/", async (req, res) => {
    if (!await checkApiAuth(req, res)) return;
    const {
        username,
        passwd
    } = req.body;
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

    const hash = crypto.createHash("sha256").update(user.salt + passwd).digest("base64");
    const token = newToken();
    const id = newUserID();
    const salt = newSalt();

    await new user_schema({
        _id: id,
        username: username,
        salt: salt,
        password_hash: hash,
        api: {
            key: token
        }
    }).save();

    const new_user = await user_schema.findOne({ _id: id });

    res.status(200).json(new_user);
});

export default router;