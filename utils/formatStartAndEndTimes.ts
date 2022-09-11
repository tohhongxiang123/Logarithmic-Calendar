import formatTime from "./formatTime"

export default function formatStartAndEndTimes(start: Date, end: Date) {
    const startsAndEndsOnTheSameDay = start.toDateString() === end.toDateString()

    const formatDateOptions : Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
    const formattedStartDate = startsAndEndsOnTheSameDay ? `${formatTime(start)}` : `${formatTime(start)} ${start.toLocaleDateString([], formatDateOptions)}`
    const formattedEndDate = startsAndEndsOnTheSameDay ? `${formatTime(end)}` : `${formatTime(end)} ${end.toLocaleDateString([], formatDateOptions)}`

    return { formattedStartDate, formattedEndDate }

}