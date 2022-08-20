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
		<div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', height: '100vh', border: '1px solid black' }}>
			<div style={{ border: '1px solid black'}}>
				<DatePicker value={value} onChange={val => val && setValue(val)}
					dayStyle={(date) =>
						((date.toDateString() === new Date().toDateString()) && value.toDateString() !== new Date().toDateString()
							? { backgroundColor: theme.colors.gray[2], fontWeight: 'bold', borderRadius: '100%' }
							: null) as CSSProperties
					}
				/>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-around', height: '100%', border: '1px solid black' }}>
				<div style={{ flexGrow: 1, height: '100%' }}>
					<DayView date={value} />
				</div>
				<div style={{ flexGrow: 1 }}>
					<WeekView date={value} />
				</div>
				<div style={{ flexGrow: 1 }}>
					<MonthView date={value} />
				</div>
			</div>
		</div>
	)
}

export default Home
