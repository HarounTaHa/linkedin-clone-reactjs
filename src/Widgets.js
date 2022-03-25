import './Widgets.css'
import {Info, FiberManualRecord} from '@mui/icons-material';

export default function Widgets() {

    const newsArticle = (heading, subtitle) => (
        <div className='widgets-article'>
            <div className="widget-article-left">
                <FiberManualRecord/>
            </div>
            <div className="widget-article-right">
                <h4>
                    {heading}
                </h4>
                <p>
                    {subtitle}
                </p>
            </div>
        </div>
    )
    return (
        <div className='widgets'>
            <div className="widget-header">
                <h2>
                    LinkedIn News
                </h2>
                <Info/>
            </div>
            {newsArticle('Haroun react is back','Top news - 9099 readers')}
        </div>

    )
}