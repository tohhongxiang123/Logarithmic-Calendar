interface DayViewProps {
    date: Date
}

export default function DayView({ date }: DayViewProps) {
    const hourlyTimes = [...Array(24).keys()].map(t => t < 10 ? `0${t}00` : `${t}00`)

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <p>{date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, height: '100%' }}>
                {hourlyTimes.map(time => (
                    <li key={time} style={{ height: '100px' }}>{time}</li>
                ))}
            </ul>
        </div>
    )
}