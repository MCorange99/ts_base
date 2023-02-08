import get_user from "./get_user";
import get_users from "./get_users";
import post_user from "./post_user";
import post_user_config from "./post_user_config";
import express from "express";
const router = express.Router();

router.use("/uses", get_user);
router.use("/users", get_users);
router.use("/user", post_user);
router.use("/user_config", post_user_config);


export default router;