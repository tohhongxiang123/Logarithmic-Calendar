import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret })

    if (!token) return res.status(500).json({ status: "No access token" })
    const accessToken = token.accessToken as string

    const response = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    }).then(res => res.json())

    return res.json(response)
}