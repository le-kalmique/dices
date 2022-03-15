import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connect = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: true,
      useCreateIndex: true,
    };

    cached.promise = mongoose
      .connect(
        "mongodb+srv://dicesgame:loelFFGoQi7hqr2N@cluster0.in3at.mongodb.net/game?retryWrites=true&w=majority"
      )
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export { connect };
