import { Button, ScrollArea, useMantineTheme } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { CSSProperties, useState } from "react";
import DayView from "../components/DayView";
import MonthView from "../components/MonthView";
import WeekView from "../components/WeekView";

const Home: NextPage = () => {
    const { data: session } = useSession();

    const [value, setValue] = useState<Date>(new Date());

    const theme = useMantineTheme();
    return (
        <div className="h-screen flex flex-col">
            <div className="h-full flex overflow-hidden divide-x-2">
                <div className={"border-b border-gray-200 flex flex-col"}>
                    <div className="p-8">
                        <Calendar
                            value={value}
                            onChange={(val) => val && setValue(val)}
                            dayStyle={(date) =>
                                (date.toDateString() === new Date().toDateString() &&
                                    value.toDateString() !== new Date().toDateString()
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
                            <strong>{value.toDateString()}</strong>
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
                <ScrollArea className="h-full flex-grow">
                    <DayView date={value} />
                </ScrollArea>
                <ScrollArea className="h-full flex-grow">
                    <WeekView date={value} />
                </ScrollArea>
                <ScrollArea className="h-full flex-grow">
                    <MonthView date={value} />
                </ScrollArea>
            </div>
        </div>
    );
};

export default Home;
