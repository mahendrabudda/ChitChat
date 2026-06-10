import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";

// Search users by username
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: "Search query too short" });
    }

    const users = await User.find({
      _id: { $ne: req.user._id },
      fullName: { $regex: query, $options: "i" },
    })
      .select("-password")
      .limit(10);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Send friend request
export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.params;

    if (senderId.toString() === receiverId) {
      return res.status(400).json({ message: "Cannot send request to yourself" });
    }

    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const existing = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existing) {
      return res.status(400).json({ message: "Request already exists" });
    }

    const request = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get my pending incoming requests
export const getIncomingRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      receiver: req.user._id,
      status: "pending",
    }).populate("sender", "-password");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Accept or reject a request
export const respondToRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // "accepted" or "rejected"

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = action;
    await request.save();

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get my accepted friends (for contacts tab)
export const getMyFriends = async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      $or: [
        { sender: req.user._id, status: "accepted" },
        { receiver: req.user._id, status: "accepted" },
      ],
    }).populate("sender receiver", "-password");

    const friends = requests.map((r) =>
      r.sender._id.toString() === req.user._id.toString() ? r.receiver : r.sender
    );

    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};