import { useEffect, useRef, useState } from "react"
import { CalendarEvent } from "../types/Calendar"

interface DayViewProps {
    date: Date
    events: CalendarEvent[]
}

export default function DayView({ date, events }: DayViewProps) {
    const hourlyTimes = [...Array(24).keys()]

    const [percentageOfDayPassed, setPercentageOfDayPassed] = useState(getPercentageOfDayPassed(date))
    useEffect(() => {
        setPercentageOfDayPassed(getPercentageOfDayPassed(new Date(), date))
        const t = setInterval(() => {
            setPercentageOfDayPassed(getPercentageOfDayPassed(new Date(), date))
        }, 1000 * 60) // update every minute

        return () => clearTimeout(t)
    }, [date])

    const currentTimingIndicatorRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        setTimeout(() => {
            currentTimingIndicatorRef.current && currentTimingIndicatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 0)
    }, [])

    const todaysEvents = events.filter(e => e.start.toDateString() === date.toDateString())
    return (
        <div className="flex flex-col relative h-full">
            {date.toLocaleDateString() === (new Date()).toLocaleDateString() && <div ref={currentTimingIndicatorRef} className="border-b border-t border-red-500 bg-red-500 h-0 w-full absolute flex" style={{ top: `${percentageOfDayPassed}%` }}>
                <div className="h-2 w-2 bg-red-500 -mt-1 -ml-1 rotate-45 rounded-sm" />
            </div>}
            <ul className="flex flex-col relative">
                {hourlyTimes.map(time => time === 0 ? (
                    <li key={time} className="h-12 p-2 pb-4 border-b border-gray-100">
                        <span className="block -translate-y-5">{`0${time}00`} - {date.toLocaleDateString()}</span>
                    </li>
                ) : (
                    <li key={time} className="h-12 p-2 pb-4 border-b border-gray-100">
                        <span className="block -translate-y-5">{time < 10 ? `0${time}00` : `${time}00`}</span>
                    </li>
                )
                )}
                {
                    todaysEvents.map((calendarEvent, index) => (
                        <li key={calendarEvent.id} className="absolute bg-gray-300 right-0 bg-opacity-75 p-2 rounded-md"
                            style={{
                                top: `${getPercentageOfDayPassed(calendarEvent.start, date)}%`,
                                height: `${getPercentageOfDurationInDay(calendarEvent.start, calendarEvent.end)}%`,
                                zIndex: index + 1,
                                width: `${Math.max(index * 20 / todaysEvents.length + 60)}%`
                            }}>
                            <p><strong>{calendarEvent.name}</strong></p>
                        </li>
                    ))
                }
            </ul>
        </div >
    )
}

/**
 * 
 * @param date date of the event
 * @param currentDate current date being shown
 * @returns percentage of day passed, a number between [0, 100] if `date` is today's, if not returns -1
 * For example, if it is currently 21 aug 2022 1200hrs, and `date` is 21 aug 2022, returns 50 (%) of the day passed
 * If it is currently 21 aug 2022 1200hrs, and `date` is 15 aug 2022, returns -1
 */
function getPercentageOfDayPassed(eventStartDate: Date, currentDate = new Date()) {
    if (currentDate.toDateString() === eventStartDate.toDateString()) {
        const startOfDay = new Date(currentDate)
        startOfDay.setHours(0, 0, 0, 0)

        const percentage = (eventStartDate.getTime() - startOfDay.getTime()) / (1000 * 60 * 60 * 24) * 100
        return Math.round(percentage * 100) / 100
    }

    return -1
}

function getPercentageOfDurationInDay(eventStartDate: Date, eventEndDate: Date) {
    const percentage = (eventEndDate.getTime() - eventStartDate.getTime()) / (1000 * 60 * 60 * 24) * 100
    return Math.round(percentage * 100) / 100
}