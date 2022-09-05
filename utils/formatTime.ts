export default function formatTime(datetime: Date) {
    const minutes = datetime.getMinutes()

    let options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: minutes === 0 ? undefined : '2-digit' }
    return datetime.toLocaleTimeString([], options)
}