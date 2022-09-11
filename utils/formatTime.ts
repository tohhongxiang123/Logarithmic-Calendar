export default function formatTime(datetime: Date) {
    const hours = datetime.getHours()
    const minutes = datetime.getMinutes()

    const amOrPm = hours >= 12 ? 'PM' : 'AM'
    let shownHours = hours % 12
    if (shownHours === 0) {
        shownHours = 12
    }

    if (minutes === 0) {
        return `${shownHours} ${amOrPm}`
    }

    return `${shownHours}:${minutes} ${amOrPm}`
}