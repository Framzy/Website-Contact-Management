import express from "express";
import userController from "../controller/user-controller.js";
import contactController from "../controller/contact-controller.js";
import addressController from "../controller/address-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();

// User API
userRouter.get("/api/users/current", authMiddleware, userController.get);
userRouter.patch("/api/users/current", authMiddleware, userController.update);
userRouter.delete("/api/users/logout", authMiddleware, userController.logout);

// Contact API
userRouter.post("/api/contacts", authMiddleware, contactController.create);
userRouter.get(
  "/api/contacts/:contactId",
  authMiddleware,
  contactController.get,
);
userRouter.put(
  "/api/contacts/:contactId",
  authMiddleware,
  contactController.update,
);
userRouter.delete(
  "/api/contacts/:contactId",
  authMiddleware,
  contactController.remove,
);
userRouter.get("/api/contacts", authMiddleware, contactController.search);

// Address API
userRouter.post(
  "/api/contacts/:contactId/addresses",
  authMiddleware,
  addressController.create,
);
userRouter.get(
  "/api/contacts/:contactId/addresses/:addressId",
  authMiddleware,
  addressController.get,
);
userRouter.put(
  "/api/contacts/:contactId/addresses/:addressId",
  authMiddleware,
  addressController.update,
);
userRouter.delete(
  "/api/contacts/:contactId/addresses/:addressId",
  authMiddleware,
  addressController.remove,
);
userRouter.get(
  "/api/contacts/:contactId/addresses",
  authMiddleware,
  addressController.list,
);

export { userRouter };
