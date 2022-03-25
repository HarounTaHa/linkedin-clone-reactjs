import {FiberManualRecord} from "@mui/icons-material";
import {forwardRef} from 'react'

const NewsArticle = forwardRef(({title, body}, ref) => {
    return (

        <div ref={ref} className='widgets-article'>
            <div className="widget-article-left">
                <FiberManualRecord/>
            </div>
            <div className="widget-article-right">
                <h4>
                    {title}
                </h4>
                <p>
                    {body}
                </p>
            </div>
        </div>
    )
})

export default NewsArticle