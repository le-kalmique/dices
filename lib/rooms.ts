import axios from "axios";

const addRoom = async (room: string, creator: string) => {
  const res = await axios.post(`/api/rooms`, {
    id: room,
    users: [{ name: creator }],
  });
  return res;
};

const addUserToRoom = async (room: string, user: string) => {
  const res = await axios.post(`/api/rooms?join=true`, {
    id: room,
    user: { name: user },
  });
  return res;
};

export { addRoom, addUserToRoom };
