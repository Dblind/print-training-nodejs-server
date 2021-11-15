import { Router } from "express";
import { check } from "express-validator";
import UserController from "../API/SERVER_API/UserController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const router = new Router();
// authMiddleware,
router.get("/users", authMiddleware, UserController.getAll);
router.get("/usersF", UserController.getAll);
router.get("/profile", authMiddleware, UserController.getProfile);
router.get("/logout", authMiddleware, UserController.logout);
router.get("/profile/texts", authMiddleware, UserController.getTexts);
// router.get("/users/:id", )

router.post("/users", [
  check("login", "Login can't be empty.").notEmpty(),
  check("password", "The password must be between 3 and 15 characters long.").isLength({ min: 3, max: 15, }),
], UserController.create);
router.post("/login", UserController.login);
router.post("/profile/texts", authMiddleware, UserController.setTexts);

router.put("/users", UserController.update);

//router.delete("/users", roleMiddleware(["USER", 'ADMIN']), UserController.delete);
router.delete("/users/:id", UserController.delete);

export default router;
