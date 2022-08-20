import { Container, Indicator, ScrollArea, useMantineTheme } from '@mantine/core'
import { Calendar, DatePicker } from '@mantine/dates'
import type { NextPage } from 'next'
import { CSSProperties, useState } from 'react'
import DayView from '../components/DayView'
import MonthView from '../components/MonthView'
import WeekView from '../components/WeekView'

const Home: NextPage = () => {
	const [value, setValue] = useState<Date>(new Date())
	const theme = useMantineTheme();

	return (
		<div className="h-screen flex flex-col">
			<div className="h-full flex overflow-hidden divide-x-2">
				<div className={"p-8 border-b border-gray-200"}>
					<Calendar value={value} onChange={val => val && setValue(val)}
						dayStyle={(date) =>
							((date.toDateString() === new Date().toDateString()) && value.toDateString() !== new Date().toDateString()
								? { backgroundColor: theme.colors.gray[2], fontWeight: 'bold', borderRadius: '100%' }
								: null) as CSSProperties
						}
					/>
					<div className="mt-12 flex h-full w-full justify-center text-center">
						<h2 className="text-2xl text-center"><strong>{value.toDateString()}</strong></h2>
					</div>
				</div>
				<ScrollArea className="h-full flex-grow">
					<DayView date={value} />
				</ScrollArea>
				<ScrollArea className="h-full flex-grow">
					<WeekView date={value} />
				</ScrollArea>
				<ScrollArea className="h-full flex-grow">
					<MonthView date={value} />
				</ScrollArea>
			</div>
		</div>
	)
}

export default Home
