# convert-currency
Beside to convert USD to any currency (API subscription only allowed USD as the source :D), this repo also be my medium to understand async/await syntax

# Getting-started
use ```npm install``` first inside the project.

# How to run
type ```node app.js``` on your terminal

# Code
To get the exchange rate I use api from ``https://apilayer.net/api/live`` and you can see how it works by the following code: 
``` 
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
```
I used **https://restcountries.eu** as my API to get the country name:
```
const getCountries = async (crcyCode) => {
    try {
        const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${crcyCode}`)
        return res.data.map(country => country.name)
    } catch (err) {
        throw new Error(`Unable to get currency ${crcyCode}`)
    }
}
```

Edit ```amount``` and ```toCurrency``` to retrieve the result
```
convert('USD', 'toCurrency', amount)
    .then((message)=> {
        console.log(message)
    }).catch((err) => {
        console.log(err.message)
    })
```

I would greatly appreciate it if you kindly give me some feedback, CHEERS :beers:
