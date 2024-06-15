import { DEFAULT_PROFILE_IMAGE } from "@/shared/consts";
import {
  getAccessToken,
  getSession,
  updateSession,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession();
    if (!session) return res.status(401).end();

    const accessToken = await getAccessToken(req, res, { refresh: true });
    session.accessToken = accessToken.accessToken;

    session.user.user_metadata = {
      picture:
        session.user?.user_metadata?.picture ??
        session.user?.picture ??
        DEFAULT_PROFILE_IMAGE,
      units: session.user.user_metadata?.units ?? "metric",
    };

    await updateSession(session);

    res.status(200).json({ message: "Session refreshed" });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});
