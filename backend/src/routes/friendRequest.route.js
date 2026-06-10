import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import {
  searchUsers,
  sendFriendRequest,
  getIncomingRequests,
  respondToRequest,
  getMyFriends,
} from "../controllers/friendRequest.controller.js";

const router = express.Router();
router.use(arcjetProtection, protectRoute);

router.get("/search", searchUsers);
router.get("/incoming", getIncomingRequests);
router.get("/friends", getMyFriends);
router.post("/send/:receiverId", sendFriendRequest);
router.put("/respond/:requestId", respondToRequest);

export default router;