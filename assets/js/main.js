const fromCurrency = document.getElementById('fromCurrency')
const toCurrency = document.getElementById('toCurrency')
const fromAmount = document.getElementById('fromAmount')
const toAmount = document.getElementById('toAmount')
const exchangeRateText = document.getElementById('exchangeRate')
const swapButton = document.getElementById('swapButton')

async function fetchAmountInfo() {
	const from = fromCurrency.value
	const to = toCurrency.value
	const amount = fromAmount.value

	try {
		const res = await fetch(
			`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`
		)
		const data = await res.json()
		const rate = data.rates[to]

		const converted = (amount * rate).toFixed(2)

		toAmount.value = converted
		exchangeRateText.textContent = `1 ${from} = ${rate} ${to}`
	} catch (error) {
		console.error('Ошибка получения данных', error)
		exchangeRateText.textContent = 'Ошибка получения данных курса'
	}
}

swapButton.addEventListener('click', () => {
	const temp = fromCurrency.value
	fromCurrency.value = toCurrency.value
	toCurrency.value = temp
	fetchAmountInfo()
})

fromCurrency.addEventListener('change', fetchAmountInfo)
toCurrency.addEventListener('change', fetchAmountInfo)
fromAmount.addEventListener('input', fetchAmountInfo)

fetchAmountInfo()
