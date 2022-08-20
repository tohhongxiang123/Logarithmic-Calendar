import { Indicator, useMantineTheme } from '@mantine/core'
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
		<div>
			<h1>Calendar</h1>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<DatePicker value={value} onChange={val => val && setValue(val)}
					dayStyle={(date) =>
						((date.toDateString() === new Date().toDateString()) && value.toDateString() !== new Date().toDateString()
							? { backgroundColor: theme.colors.gray[2], fontWeight: 'bold', borderRadius: '100%' }
							: null) as CSSProperties
					}
				/>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-around' }}>
				<div>
					<DayView date={value} />
				</div>
				<div>
					<h2>This week</h2>
					<WeekView date={value} />
				</div>
				<div>
					<h2>This month</h2>
					<MonthView date={value} />
				</div>
			</div>
		</div>
	)
}

export default Home
