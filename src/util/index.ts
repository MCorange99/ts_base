import express from "express";
import user_schema from "../schema/user_schema";

export async function checkApiAuth(req: express.Request, res: express.Response): Promise<boolean> {
    const AuthHead = req.headers["authorization"];
    if (!AuthHead) {
        res.status(400).json({
            code: "MissingHeader",
            status: 400,
            header: ["Authorization"],
            message: "The Authorization header is missing"
        });

        return false;
    }

    const reqUser = await user_schema.findOne({
        api: {
            key: AuthHead
        }
    });

    if (!reqUser) {
        res.status(401).json({
            code: "Unauthorized",
            status: 401,
            message: "Invalid authorization token"
        });
        return false;
    }

    return true;
}

export function newToken(){
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    const getChar = () => chars[randomInt(0, chars.length - 1)];
    let token = "";

    while (token.length < 32 ) {
        token += getChar();
    }

    return token;
}

export function newUserID(){
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    const getChar = () => chars[randomInt(0, chars.length - 1)];
    let token = "";

    while (token.length < 12 ) {
        token += getChar();
    }

    return token;
}

export function newSalt(){
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    const getChar = () => chars[randomInt(0, chars.length - 1)];
    let token = "";

    while (token.length < 5 ) {
        token += getChar();
    }

    return token;
}

export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}