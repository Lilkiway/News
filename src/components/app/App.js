import { Component } from "react";
import Header from "../header/Header";
import Filter from "../filter/Filter";
import NewsList from "../newsList/NewsList";
import Converter from "../converter/converter";

class App extends Component {

    state = {
        category: 'general',
        country: 'ua'
    }

    onCategory = (category) => {
        this.setState({
            category
        })
    }

    onCountry = (country) => {
        this.setState({
            country
        })
    }

    render() {
        return (
            <div className='wrapper'>
                <Header />

                <div className='filter_wrapper'>
                    <div className='container'>
                        <Filter 
                            onCategory={this.onCategory}
                            onCountry={this.onCountry}
                            category={this.state.category}
                            country={this.state.country}/>
                    </div>
                </div>

                <div className='container'>
                    <main className='content'>
                        <div>
                            <NewsList 
                                category={this.state.category}
                                country={this.state.country}/>
                        </div>

                        <div>
                            <Converter />
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default App;