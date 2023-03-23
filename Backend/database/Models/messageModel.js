const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    messege: { type: String, required: true },

    sender: { type: Schema.Types.ObjectId, required: true, ref: "user" },

    chat: { type: Schema.Types.ObjectId, ref: "chat" },
    readBy: [{ type: Schema.Types.ObjectId, ref: "user" }],


},
    { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);