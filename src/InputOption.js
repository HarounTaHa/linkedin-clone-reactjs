import './InputOption.css'
import {collection, deleteDoc, doc} from "firebase/firestore";
import {db} from "./firebase";



export default function InputOption({postId, Icon, title, color}) {
    const colRef = collection(db, "posts")

    const deletePost = () => {
        deleteDoc(doc(colRef, postId))
    }

    const clickOptions = (title) => {
        console.log(typeof title)
        switch (title) {
            case 'Delete':
                return deletePost()
            default:
                return null
        }
    }

    return (
            <div onClick={()=>clickOptions(title)} className={title === 'Delete' ? 'delete-option' : 'input-option'}>
                <Icon className={title === 'Delete' ? 'delete-icon' : ''}
                      style={title === 'Delete' ? {} : {color: color}}/>
                <h4>{title}</h4>

            </div>

    )
}