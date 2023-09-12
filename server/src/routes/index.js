import { Router } from "express";
import { healthCheck } from "../controllers/api.controller";
import bookRouter from './books'

const router = Router();

router.route("/").get(healthCheck);
router.use("/books", bookRouter);

export default router;
