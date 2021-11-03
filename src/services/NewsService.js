class NewsService {

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getNews = async (category, country) => {
        const res = await this.getResource(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=100&category=${category}&apiKey=1c90c9fe7c1a42c3831ca04db9d9c4cf`);
        return res.articles.map(this._transformNews);
    }

    _transformNews = (news) => {
        return {
            author: news.author,
            title: news.title,
            description: news.description,
            url: news.url,
            img: news.urlToImage,
            data: news.publishedAt,
        }
    }

}

export default NewsService;