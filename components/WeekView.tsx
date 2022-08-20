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
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {thisWeek.map(day => (
                    <li key={day.toLocaleDateString()}>
                        <div style={{ width: '100%', minHeight: '100px', padding: theme.spacing.lg, paddingLeft: 0 }}>
                            {day.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}