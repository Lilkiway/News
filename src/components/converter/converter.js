import './converter.scss';
import { Component } from "react";
import ConverterService from "../../services/ConverterService";

class Converter extends Component {

    state = {
        currency: [],
        rub: '',
        eur: '',
        usd: '',
        uan: '',
    }

    converterService = new ConverterService();

    componentDidMount() {
        this.onDataLoading();
    }

    onDataLoading = () => {
        this.converterService.getCurrency()
            .then(this.onDataLoaded)
    }

    onDataLoaded = (currency) => {
        currency = currency.filter(item => {
            return (item.cc === 'RUB' 
                 || item.cc === 'EUR' 
                 || item.cc === 'USD')
            }).map(item => {return {[(item.cc).toLowerCase()]: item.rate}});
        
        this.setState({currency});
    }

    onValueChange = (e) => {
        const {currency} = this.state,
              rubRate = currency[0].rub,
              usdRate = currency[1].usd,
              eurRate = currency[2].eur,
              value = e.target.value,
              convert = (oneRate, twoRate) => {
                return ((value* oneRate) / twoRate).toFixed(2);
            }

        let uan, eur, usd, rub;

        switch(e.target.name) {
            case 'uan' :
                rub = convert(1, rubRate);
                eur = convert(1, eurRate);
                usd = convert(1, usdRate);
                uan = value;
                    break;
            case 'rub' :
                uan = convert(rubRate, 1);
                eur = convert(rubRate, eurRate);
                usd = convert(rubRate, usdRate);
                rub = value;
                    break;
            case 'eur' :
                uan = convert(eurRate, 1);
                rub = convert(eurRate, rubRate);
                usd = convert(eurRate, usdRate);
                eur = value;
                    break;
            case 'usd' :
                uan = convert(usdRate, 1);
                rub = convert(usdRate, rubRate);
                eur = convert(usdRate, eurRate);
                usd = value;
                    break;
            default :
                rub = '';
                eur = '';
                usd = '';
                uan = '';
                    break;
        }

        if(value === '') {
            rub = '';
            eur = '';
            usd = '';
            uan = '';
        }

        this.setState({rub, eur, usd, uan});
    }

    renderItems = (data) => {
        const items = data.map((item, i) => {
            return(
                <li key={i}
                className='converter__item'>
                    <span>{(item.cc).toUpperCase()}</span>
                    <input 
                        name={item.cc} 
                        type='number'
                        value={this.state[item.cc]}
                        onChange={this.onValueChange}/>
                </li>
            )
        });

        return items;
    }

    render() {
        const data = [{cc: 'uan'}, {cc: 'rub'}, {cc: 'eur'}, {cc: 'usd'}],
              items = this.renderItems(data);

        return(
            <>
                <h3 className='converter__title'>Конвертер валют</h3>
                <ul className='converter__list'>
                    {items}
                </ul>
            </>
        )
    }
}

export default Converter;