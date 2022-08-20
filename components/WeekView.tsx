import { useMantineTheme } from "@mantine/core"


interface WeekViewProps {
    date: Date
}

export default function WeekView({ date }: WeekViewProps) {
    const thisWeek = [1, 2, 3, 4, 5, 6, 7].map(day => {
        const d = new Date(date) // create new date object
        d.setDate(d.getDate() + day)
        return d
    })

    const theme = useMantineTheme()

    return (
        <>
            <ul className="flex flex-col divide-y-2">
                {thisWeek.map(day => (
                    <li key={day.toLocaleDateString()} className="h-32 p-2">
                        <div>
                            {day.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}