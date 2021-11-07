import { Router } from "express";
import UserController from "../API/SERVER_API/UserController.js";


const router = new Router();

router.get("/users", UserController.getAll);
// router.get("/users/:id", )

router.post("/users", UserController.create);

router.put("/users", UserController.update);

router.delete("/users", UserController.delete);

export default router;