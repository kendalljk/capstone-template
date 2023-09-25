import { Router } from "express";
import { healthCheck } from "../controllers/api.controller";
import bookRouter from "./books";
import userRouter from "./users";

const router = Router();

router.route("/").get(healthCheck);
router.use("/books", bookRouter);
router.use("/users", userRouter);

export default router;
