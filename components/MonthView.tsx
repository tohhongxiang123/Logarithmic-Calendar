interface MonthViewProps {
    date: Date
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function MonthView({ date }: MonthViewProps) {
    const dates = [...Array(30).keys()].map(day => {
        const d = new Date(date) // create new date object
        d.setDate(d.getDate() + day)
        return d
    })

    const months = Array.from(new Set(dates.map(date => date.getMonth())))

    return (
        <>
            {months.map(month => (
                <div key={month}>
                    <p>{monthNames[month]}</p>
                    <ul>
                        {dates
                            .filter(date => date.getMonth() === month)
                            .map(day => (
                                <li key={day.toLocaleDateString()}>{day.toLocaleDateString()}</li>
                            ))
                        }
                    </ul>
                </div>
            ))}
        </>
    )
}