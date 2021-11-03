class ConverterService {
    
    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getCurrency = async () => {
        const res = await this.getResource('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        return res.map(this._transformData);
    }

    _transformData = (data) => {
        return {
            rate: data.rate,
            cc: data.cc,
            exchangedate: data.exchangedate
        }
    }
 }

 export default ConverterService;