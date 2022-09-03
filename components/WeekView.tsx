import { useMantineTheme } from "@mantine/core"
import { CalendarEvent } from "../types/Calendar"


interface WeekViewProps {
    date: Date
    events: CalendarEvent[]
}

export default function WeekView({ date, events = [] }: WeekViewProps) {
    const thisWeek = [0, 1, 2, 3, 4, 5, 6].map(day => {
        const d = new Date(date) // create new date object
        d.setDate(d.getDate() + day)
        return d
    })

    // todo: If event starts and ends on different days, show the days as well
    return (
        <>
            <ul className="flex flex-col divide-y-2">
                {thisWeek.map(day => {
                    const eventsOnThisDay = events.filter(calendarEvent => calendarEvent.start.toLocaleDateString() === day.toLocaleDateString())

                    if (eventsOnThisDay.length > 0) {
                        return (
                            <li key={day.toLocaleDateString()} className="p-2">
                                <div>
                                    {day.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                </div>
                                <div>
                                    {eventsOnThisDay.map(calendarEvent => (
                                        <p key={calendarEvent.id} className="font-semibold">{calendarEvent.name}: {calendarEvent.start.toLocaleTimeString()} - {calendarEvent.end.toLocaleTimeString()}</p>
                                    ))}
                                </div>
                            </li>
                        )
                    }
                    return (
                        <li key={day.toLocaleDateString()} className="h-24 p-2">
                            <div>
                                {day.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}