const ChatMessage = require("../models/ChatMessage");
const Match = require("../models/user"); // <-- Fixed: Match, not ChatMessage

//Load chat history between two matched users
exports.getChatHistory = async (req, res) => {
  const { senderId, receiverId } = req.body;

  const senderUserInfo = await Match.findById(senderId);
  const receiverUserInfo = await Match.findById(receiverId);

  if (!senderUserInfo || !receiverUserInfo) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const hasMatch =
      senderUserInfo.matches.includes(receiverId) ||
      receiverUserInfo.matches.includes(senderId);
    if (!hasMatch) {
      return res
        .status(403)
        .json({ message: "Users must match before chatting" });
    }

    const history = await ChatMessage.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    })
      .sort({ timestamp: 1 })
      .populate("senderId", "name")
      .populate("receiverId", "name");

    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Error loading chat history" });
  }
};

//Send a chat message
exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, text } = req.body;
  const senderUserInfo = await Match.findById(senderId);
  const receiverUserInfo = await Match.findById(receiverId);

  if (!senderUserInfo || !receiverUserInfo) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const hasMatch =
      senderUserInfo.matches.includes(receiverId) ||
      receiverUserInfo.matches.includes(senderId);

    if (!hasMatch) {
      return res
        .status(403)
        .json({ message: "Users must match before chatting" });
    }

    const saved = await ChatMessage.create({ senderId, receiverId, text });

    const populated = await ChatMessage.findById(saved._id)
      .populate("senderId", "name")
      .populate("receiverId", "name");

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Error sending message" });
  }
};