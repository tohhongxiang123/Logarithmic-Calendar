import { CalendarEvent } from "../types/Calendar";
import { formatTime } from "../utils";

interface MonthViewProps {
    date: Date
    events: CalendarEvent[]
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function MonthView({ date, events = [] }: MonthViewProps) {
    const dates = [...Array(30).keys()].map(day => {
        const d = new Date(date) // create new date object
        d.setDate(d.getDate() + day)
        return d
    })

    const months = Array.from(new Set(dates.map(date => date.getMonth())))

    return (
        <>
            {months.map(month => (
                <div key={month} className="mb-4 flex flex-col">
                    <p className="sticky top-0 bg-white shadow-sm px-4 py-2"><strong>{monthNames[month]}</strong></p>
                    <ul>
                        {dates
                            .filter(date => date.getMonth() === month)
                            .map(day => {
                                const eventsOnThisDay = events.filter(calendarEvent => calendarEvent.start.toLocaleDateString() === day.toLocaleDateString())

                                if (eventsOnThisDay.length > 0) {
                                    return (
                                        <li key={day.toLocaleDateString()} className="p-2 mb-2">
                                            <span>{day.toLocaleDateString()}</span><br />
                                            {eventsOnThisDay.map(calendarEvent => <p key={calendarEvent.id} className="font-semibold">{calendarEvent.name}: {formatTime(calendarEvent.start)} - {formatTime(calendarEvent.end)}</p>)}
                                        </li>
                                    )
                                }

                                return (
                                    <li key={day.toLocaleDateString()} className="p-2">
                                        <span>{day.toLocaleDateString()}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            ))}
        </>
    )
}