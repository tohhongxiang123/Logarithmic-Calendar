/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			gridTemplateRows: {
				'24': 'repeat(8, minmax(0, 1fr))', // 24 hours a day
				'28': 'repeat(28, minmax(0, 1fr))', // 28 days in feb
				'29': 'repeat(29, minmax(0, 1fr))', // 29 days in feb leap year
				'30': 'repeat(30, minmax(0, 1fr))', // 30 days in some months
				'31': 'repeat(31, minmax(0, 1fr))', // 31 days in some months
			}
		},
	},
	plugins: [],
}
