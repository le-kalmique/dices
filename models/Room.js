const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({ name: String });
const roomSchema = new mongoose.Schema({
  id: String,
  users: [UserSchema],
});

module.exports = mongoose.models.Room || mongoose.model("Room", roomSchema);
