export type Calendar = {
    id: string,
    name: string,
    description: string,
    creator: string,
    events: CalendarEvent[]
}

export type CalendarEvent = {
    start: Date,
    end: Date,
    id: string,
    name: string
}