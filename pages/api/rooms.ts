import mongoose from "mongoose";
import { connect } from "../../lib/db";
import Room from "../../models/Room";

export default async function handler(req, res) {
  const { method } = req;

  await connect();

  switch (method) {
    case "GET":
      try {
        const rooms = await Room.find({});
        res.status(200).json({ success: true, data: rooms });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        if (req.query.join) {
          const room = await Room.findOne({ id: req.body.id });
          room.users.push(req.body.user);
          await room.save();
          res.status(201).send(room);
        } else {
          console.log("");

          const room = new Room({ id: req.body.id, users: req.body.users });
          room.save();
          res.status(201).send(room);
        }
      } catch (error) {
        console.error(error);

        res.status(500).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
