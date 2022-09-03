import { Button, ScrollArea, useMantineTheme } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import DayView from "../components/DayView";
import MonthView from "../components/MonthView";
import WeekView from "../components/WeekView";
import { CalendarEvent } from "../types/Calendar";

const Home: NextPage = () => {
    const { data: session } = useSession();

    const [events, setEvents] = useState<CalendarEvent[]>([])
    useEffect(() => {
        (async function () {
            if (!session) return
            const calendarId = session.user!.email!
            const calendarEvents = (await fetch(`/api/calendars/${calendarId}`).then(res => res.json()))
                .map((e: any) => ({ ...e, start: new Date(e.start), end: new Date(e.end) })) as CalendarEvent[]
            setEvents(calendarEvents)
        })()
    }, [session])

    const [currentDate, setCurrentDate] = useState<Date>(new Date())

    const theme = useMantineTheme()

    const relativeDaysToShow = [-1, 0, 1]
    const viewport = useRef<HTMLDivElement>(null)
    const scrollToCurrentDayInDayView = () => {
        const currentDayIndex = relativeDaysToShow.indexOf(0)
        viewport?.current && viewport.current.scrollTo({ top: viewport.current.scrollHeight * currentDayIndex / relativeDaysToShow.length, behavior: 'smooth' })
    }
    useEffect(() => {
        scrollToCurrentDayInDayView()
    }, [currentDate])
    return (
        <div className="h-screen flex flex-col">
            <div className="h-full flex overflow-hidden divide-x-2 w-full">
                <div className={"border-b border-gray-200 flex flex-col"}>
                    <div className="p-8">
                        <Calendar
                            value={currentDate}
                            onChange={(val) => val && setCurrentDate(val)}
                            dayStyle={(date) =>
                                (date.toDateString() === new Date().toDateString() &&
                                    currentDate.toDateString() !== new Date().toDateString()
                                    ? {
                                        backgroundColor: theme.colors.gray[2],
                                        fontWeight: "bold",
                                        borderRadius: "100%",
                                    }
                                    : null) as CSSProperties
                            }
                        />
                    </div>
                    <div className="mt-12 flex w-full justify-center text-center">
                        <h2 className="text-2xl text-center">
                            <strong>{currentDate.toDateString()}</strong>
                        </h2>
                    </div>
                    <div className="mt-auto flex justify-center m-8">
                        {session?.user ? (
                            <div className="flex flex-col gap-y-4">
                                <div className="flex items-center gap-x-2">
                                    {session.user.image && (
                                        <img
                                            src={session.user.image}
                                            width={32}
                                            height={32}
                                            alt=""
                                            referrerPolicy="no-referrer"
                                        />
                                    )}
                                    <p className="font-medium opacity-80">{session.user.name}</p>
                                </div>
                                <Button onClick={() => signOut()}>Logout</Button>
                            </div>
                        ) : (
                            <Button className="text-black" onClick={() => signIn()}>
                                Login
                            </Button>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-3 divide-x-2 flex-grow">
                    <ScrollArea className="h-full flex-grow" viewportRef={viewport}>
                        {relativeDaysToShow.map(d => <DayView key={d} date={new Date(currentDate.getTime() + (3600 * 24 * 1000 * d))} events={events} />)}
                    </ScrollArea>
                    <ScrollArea className="h-full flex-grow">
                        <WeekView date={currentDate} events={events} />
                    </ScrollArea>
                    <ScrollArea className="h-full flex-grow">
                        <MonthView date={currentDate} events={events} />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default Home;
