import './LoadingPaje.css'
import BarLoader from "react-spinners/BarLoader";

export default function LoadingPage({loading}) {

    return (
        <div className='loading-page'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="logo"/>
            <BarLoader color={'#0a66c2'} loading={loading} width={120} height={2}/>
        </div>
    )
}