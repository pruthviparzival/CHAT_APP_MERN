import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // possible via cookie-parser.
    // console.log(req.user);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    // console.log(conversation);
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // upadates all promises in parallel.
    await Promise.all([newMessage.save(), conversation.save()]); // keep promises in a array.

    //alternate approach.
    /* await Conversation.findOneAndUpdate(
      conversation._id,
      conversation.messages.push(newMessage._id)
    );
    console.log(conversation);
    await conversation.save();
    res.status(200).json(newMessage);*/
  } catch (error) {
    console.log("error in sendMessage controller - ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // replaces id with whole referece docs
    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;
    res.status(200).json({ messages });
  } catch (error) {
    console.log("error in getMessages controller", error.message);
    res.status(500).json({ error: "Internanl Server Error" });
  }
};
