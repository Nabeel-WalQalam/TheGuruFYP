const Chat = require('../database/Models/chatModel')




async function getAllChats() {

    try {

        const user_id = req.user._id;

        const chats = await Chat.find({ users: user_id }).populate("latestMessage").populate({
            path: "users",
            match: { _id: { $ne: user_id } }
        }).sort({ createdAt: -1 });

        res.send({ success: true, payload: chats })
    } catch (error) {
        console.log(error);
        res.send({ success: false, payload: error })
    }
}





module.exports = {
    getAllChats,
}