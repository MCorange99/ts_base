import crypto from "crypto";
import express from "express";
import user_schema from "../../../schema/user_schema";
import { checkApiAuth, newSalt } from "../../../util";
import {newToken, newUserID} from "../../../util/index";

const router = express.Router();

router.post("/", async (req, res) => {

    res.status(400).json({
        state: "todo"
    });
});

export default router;