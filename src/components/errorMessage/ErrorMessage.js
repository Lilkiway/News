import img from './error.gif';

const ErrorMessage = () => {
    return (
        <div style={{textAlign:'center', marginTop:'70px'}}>
            <img src={img} alt='error'/>
        </div>
    )
}

export default ErrorMessage;