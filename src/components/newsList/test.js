import { Component } from "react";
import NewsService from "../../services/NewsService";
import './newsList.scss';

class NewsList extends Component {
    state = {
        allNewsList: [],
        newsList: [],
        offset: 10
    }

    newsService = new NewsService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = () => {
        this.newsService.getNews()
        .then(this.onNewsListLoaded)
    }

    onNewsListLoaded = (allNewsList) => {
        const visibleList = allNewsList.slice(0, 10);
        this.setState({
            allNewsList,
            newsList: [...visibleList]
        })
    }

    onRestListLoaded = () => {
        const {allNewsList, newsList, offset} = this.state;
        if(allNewsList.length > 10 && allNewsList.length !== newsList.length) {
            const restList = allNewsList.slice(offset, offset + 10);
            this.setState(({newsList, offset}) => ({
                newsList: [...newsList, ...restList],
                offset: offset + 10,
            }))
        }
    }

    convertData = (data) => {
        const ua = ['січ', 'лют', 'берез', 'квіт', 'трав', 'черв', 'лип', 'серп', 'верес', 'жовт', 'листоп', 'груд'],
              year = data.slice(0, 4),
              month = ua[data.slice(5, 7) - 1],
              day = data.slice(8, 10),
              time = data.slice(11, 16),
              newData = `${time} ${day} ${month} ${year}`;
              
        return newData;
    }

    renderLi = (arr) => {
        const li = arr.map((item, i) => {
            const data = this.convertData(item.data);
            return (
                <li key={i}>
                    <a href={item.url} target='_blank' rel='noreferrer' className='list__item'>
                        <img className='list__img' src={item.img} alt={item.title}/>
                        <h2 className='list__title'>{item.title}</h2>
                        <p className='list__description'>{item.description}</p>
                        <p className='list__data'>{data}</p>
                        <p>{i+1}</p>
                    </a>
                </li>
            )
        })

        return (
            <ul className='list'>
                {li}
            </ul>
        )
    }

    render() {
        const {newsList} = this.state;
        const list = this.renderLi(newsList);

        return (
            <>
                {list}
                <button 
                    className='list__button'
                    onClick={this.onRestListLoaded}>Завантажити ще</button>
            </>
        )
    }
}

export default NewsList;