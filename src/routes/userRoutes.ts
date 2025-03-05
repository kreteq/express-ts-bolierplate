import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();
router.get("/", UserController.getIndex);
router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);

export default router;
