// import user from "./user";
import admin from "./admin";
import express from "express";
const router = express.Router();

// router.use("/user", user);


router.use("/admin", admin);

export default router;