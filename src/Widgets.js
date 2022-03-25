import './Widgets.css'
import {Info} from '@mui/icons-material';
import {useEffect, useState} from "react";
import axios from "axios";
import NewsArticle from "./NewsListItem";
import FlipMove from "react-flip-move";

export default function Widgets() {
    const [news, setNews] = useState([])

    useEffect(() => {
            axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
                setNews(res.data.slice(0, 8))
            }).catch(err => {
                alert(err)
            })
        }
        , [])

    return (
        <div className='widgets'>
            <div className="widget-header">
                <h2>
                    LinkedIn News
                </h2>
                <Info/>
            </div>
            <FlipMove>
                {news && news.map(item =>

                    <NewsArticle key={item.id} title={item.title.slice(0, 40)} body={item.body.slice(0, 90)}/>
                )}
            </FlipMove>
        </div>

    )
}