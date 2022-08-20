import { Container, Indicator, useMantineTheme } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
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
			<div className={"p-8 border-b border-gray-200"}>
				<DatePicker value={value} onChange={val => val && setValue(val)}
					dayStyle={(date) =>
						((date.toDateString() === new Date().toDateString()) && value.toDateString() !== new Date().toDateString()
							? { backgroundColor: theme.colors.gray[2], fontWeight: 'bold', borderRadius: '100%' }
							: null) as CSSProperties
					}
				/>
			</div>
			<div className="h-full grid grid-cols-3 overflow-hidden divide-x-2">
				<div className="h-full overflow-scroll">
					<DayView date={value} />
				</div>
				<div className="h-full overflow-scroll">
					<WeekView date={value} />
				</div>
				<div className="h-full overflow-scroll">
					<MonthView date={value} />
				</div>
			</div>
		</div>
	)
}

export default Home
