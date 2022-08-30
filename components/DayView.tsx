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
        setPercentageOfDayPassed(getPercentageOfDayPassed(date))
        const t = setInterval(() => {
            setPercentageOfDayPassed(getPercentageOfDayPassed(date))
        }, 1000 * 60) // update every minute

        return () => clearTimeout(t)
    }, [date])

    const currentTimingIndicatorRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        currentTimingIndicatorRef.current && currentTimingIndicatorRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [])

    return (
        <div className="flex flex-col relative">
            <ul className="flex flex-col">
                <div ref={currentTimingIndicatorRef} className="border-b border-t border-red-500 bg-red-500 h-0 w-full absolute flex" style={{ top: `${percentageOfDayPassed}%` }}>
                    <div className="h-2 w-2 bg-red-500 -mt-1 -ml-1 rotate-45 rounded-sm" />
                </div>
                {hourlyTimes.map(time => {
                    const currentHourEvents = events.filter(calendarEvent => calendarEvent.start.toDateString() === date.toDateString() && time === calendarEvent.start.getHours())

                    if (currentHourEvents.length > 0) {
                        return (
                            <li key={time} className="p-2 pb-4 border-b border-gray-100">
                                <p>{time < 10 ? `0${time}00` : `${time}00`}</p>
                                {currentHourEvents.map(e => <p><strong>{e.name}</strong></p>)}
                            </li>
                        )
                    }
                    return (
                        <li key={time} className="h-12 p-2 pb-4 border-b border-gray-100">{time < 10 ? `0${time}00` : `${time}00`}</li>
                    )
                })}
            </ul>
        </div>
    )
}

/**
 * 
 * @param date date being shown on the calendar
 * @returns percentage of day passed, a number between [0, 100] if `date` is today's, if not returns -1
 * For example, if it is currently 21 aug 2022 1200hrs, and `date` is 21 aug 2022, returns 50 (%) of the day passed
 * If it is currently 21 aug 2022 1200hrs, and `date` is 15 aug 2022, returns -1
 */
function getPercentageOfDayPassed(date: Date) {
    const currentDate = new Date()
    if (currentDate.toDateString() === date.toDateString()) {
        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)

        const percentage = (currentDate.getTime() - startOfDay.getTime()) / (1000 * 60 * 60 * 24) * 100
        return Math.round(percentage * 100) / 100
    }

    return -1
}