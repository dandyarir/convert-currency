const axios = require('axios')

const getExchangeRate = async (fromCrcy,toCrcy) => {
    try {
        const response = await 
        axios.get('http://apilayer.net/api/live?access_key=83fb831a8da69575626c5d83a28ed61d&format=1')
        
        const rate = response.data.quotes[fromCrcy+toCrcy]
        return rate
    } catch(err) {
        throw new Error(`Unable to get currency ${fromCrcy} and ${toCrcy}`)
    }
}

const getCountries = async (crcyCode) => {
    try {
        const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${crcyCode}`)
        return res.data.map(country => country.name)
    } catch (err) {
        throw new Error(`Unable to get currency ${crcyCode}`)
    }
}

const convert = async (fromCrcy, toCrcy, amount) => {
    const exchangeRate = await getExchangeRate(fromCrcy,toCrcy)
    const countries = await getCountries(toCrcy)
    const convertedAmount = (amount * exchangeRate).toFixed(2)


    return `${addCommas(amount)} ${fromCrcy} is worth ${addCommas(convertedAmount)} ${toCrcy}. You can spend these in the following countries: ${countries}`
}
const addCommas = (nStr) =>
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

convert('USD', 'IDR', 300000)
    .then((message)=> {
        console.log(message)
    }).catch((err) => {
        console.log(err.message)
    })