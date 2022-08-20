interface DayViewProps {
    date: Date
}

export default function DayView({ date }: DayViewProps) {
    const hourlyTimes = [...Array(24).keys()].map(t => t < 10 ? `0${t}00` : `${t}00`)

    const p = getPercentageOfDayPassed(date) * 100
    console.log(p)

    return (
        <div className="flex flex-col relative">
            <ul className="flex flex-col">
                <div className="border-b border-t border-red-500 bg-red-500 h-0 w-full absolute flex" style={{ top: `${p}%` }}>
                    <div className="h-2 w-2 bg-red-500 -mt-1 -ml-1 rotate-45 rounded-sm" />
                </div>
                {hourlyTimes.map(time => (
                    <li key={time} className="h-12 p-2 pb-4 border-b border-gray-100">{time}</li>
                ))}
            </ul>
        </div>
    )
}

function getPercentageOfDayPassed(date: Date) {
    const currentDate = new Date()
    if (currentDate.toDateString() === date.toDateString()) {
        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)

        return (currentDate.getTime() - startOfDay.getTime()) / (1000 * 60 * 60 * 24)
    }

    return -1
}