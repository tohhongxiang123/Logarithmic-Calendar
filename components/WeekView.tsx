interface WeekViewProps {
    date: Date
}

export default function WeekView({ date }: WeekViewProps) {
    const thisWeek = [1, 2, 3, 4, 5, 6, 7].map(day => {
        const d = new Date(date) // create new date object
        d.setDate(d.getDate() + day)
        return d
    })

    return (
        <>
            <ul>
                {thisWeek.map(day => (
                    <li key={day.toLocaleDateString()}>{day.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
                ))}
            </ul>
        </>
    )
}