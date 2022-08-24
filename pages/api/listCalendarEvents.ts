import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { CalendarEvent } from "../../types/Calendar";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret })

    if (!token) return res.status(401).json({ status: "No access token" })
    const accessToken = token.accessToken as string

    const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/tohhongxiang@gmail.com/events", {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    }).then(res => res.json())

    const items = response.items.map((item: any) => {
        const id = item.id
        const name = item.summary
        const start = new Date(item.start.dateTime ?? item.start.date)
        const end = new Date(item.start.dateTime ?? item.start.date)

        return { id, name, start, end }
    }) as CalendarEvent[]

    return res.json(items)
}