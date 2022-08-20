interface DayViewProps {
    date: Date
}

export default function DayView({ date } : DayViewProps) {
    return (
        <>
            <h2>Today</h2>
            <p>{date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <ul>
                <li>0000</li>
                <li>0100</li>
                <li>0200</li>
                <li>0300</li>
                <li>0400</li>
                <li>0500</li>
                <li>0600</li>
                <li>0700</li>
                <li>0800</li>
                <li>0900</li>
                <li>1000</li>
                <li>1100</li>
                <li>1200</li>
                <li>1300</li>
                <li>1400</li>
                <li>1500</li>
                <li>1600</li>
                <li>1700</li>
                <li>1800</li>
                <li>1900</li>
                <li>2000</li>
                <li>2100</li>
                <li>2200</li>
                <li>2300</li>
            </ul>
        </>
    )
}