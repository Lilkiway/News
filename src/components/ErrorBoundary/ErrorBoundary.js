import { Component } from "react";
import img from '../errorMessage/error.gif';

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInf) {
        console.log(error, errorInf);
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return (
                <div style={{textAlign:'center', marginTop:'70px'}}>
                    <img src={img} alt='error'/>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;