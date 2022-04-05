import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "../../lib/session";
import type { User } from "./user";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username } = req.body;

    const user = { isLoggedIn: true, login: username } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    console.log("ERROR", error);

    res.status(500).json({ message: (error as Error).message });
  }
}
