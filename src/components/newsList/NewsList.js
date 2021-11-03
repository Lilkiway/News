import { Component } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import NewsService from "../../services/NewsService";

import imgDefault from '../../img/defaultImage.jpg';
import './newsList.scss';

class NewsList extends Component {

    state = {
        allNewsList: [],
        newsList: [],
        offset: 10,
        loading: true,
        error: false
    }

    newsService = new NewsService();

    componentDidMount() {
        this.onNewsListLoading();
    }

    componentDidUpdate(prevProps) {
        if(this.props.category !== prevProps.category) {
            this.onNewsListLoading();
        }

        if(this.props.country !== prevProps.country) {
            this.onNewsListLoading();
        }
    }

    onNewsListLoading = () => {
        const {category, country} = this.props;

        this.newsService.getNews(category, country)
        .then(this.onNewsListLoaded)
        .catch(this.onError);

        this.setState({
            loading: true,
            offset: 10         
        });
    }

    onNewsListLoaded = (allNewsList) => {
        const visibleList = allNewsList.slice(0, 10);
        this.setState({
            allNewsList,
            newsList: [...visibleList],
            loading: false
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

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
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
                        <img className='list__img' src={item.img ? item.img : imgDefault} alt={item.title}/>
                        <h2 className='list__title'>{item.title}</h2>
                        <p className='list__description'>{item.description}</p>
                        <p className='list__data'>{data}</p>
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
        const {allNewsList, newsList, loading, error} = this.state;
        const list = this.renderLi(newsList);

        if(loading) {
            return <Spinner />
        }

        if(error) {
            return <ErrorMessage />
        }

        return (
            <>
                {list}
                <button 
                    className={`list__button ${(allNewsList.length === newsList.length) ? 'list__button_none' : null}`}
                    onClick={this.onRestListLoaded}>
                    Завантажити ще
                </button>
            </>
        )
    }
}

export default NewsList;