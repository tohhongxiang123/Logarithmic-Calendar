interface DayViewProps {
    date: Date
}

export default function DayView({ date }: DayViewProps) {
    const hourlyTimes = [...Array(24).keys()].map(t => t < 10 ? `0${t}00` : `${t}00`)

    return (
        <div className="flex flex-col relative">
            <ul className="flex flex-col">
                {hourlyTimes.map(time => (
                    <li key={time} className="h-12 p-2 border-b border-gray-100">{time}</li>
                ))}
            </ul>
        </div>
    )
}