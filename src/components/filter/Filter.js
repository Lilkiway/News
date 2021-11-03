import './filter.scss';
import usa from '../../img/usa.png';
import ua from '../../img/ukr.png';

const Filter = ({onCategory, category, onCountry, country}) => {

    const filterCategory = [
        {label: 'бізнес', category: 'business'},
        {label: 'розваги', category: 'entertainment'},
        {label: 'загальні', category: 'general'},
        {label: "здоров'я", category: 'health'},
        {label: 'наука', category: 'science'},
        {label: 'спорт', category: 'sports'},
        {label: 'технології', category: 'technology'}
    ];
    
        return(
            <div className='filter'>
                <ul className='filter__category'>
                    {filterCategory.map((item, i) => {
                        return <li
                            className={`filter__item ${(category === item.category) ? 'filter__item_active' : null}`}
                            onClick={() => onCategory(item.category)}
                            key={i}>{item.label}</li>
                    })}
                </ul>

                <ul className='filter__country'>
                    <li className='filter__icon' onClick={() => onCountry('us')}>
                        <img src={usa} alt='USA' width='35px'/>
                    </li>
                    <li className='filter__icon' onClick={() => onCountry('ua')}>
                        <img src={ua} alt='Україна' width='35px'/>
                    </li>
                </ul>
            </div>
        )
    }

export default Filter;