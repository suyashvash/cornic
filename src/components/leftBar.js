
import { ImRocket } from 'react-icons/im'
import LeftOption from './LeftOption'


export default function LeftBar() {
    return (
        <div className="left-bar">
            <h5><ImRocket /> Suggested</h5>
            <LeftOption title={"Space heat"} />
            <LeftOption title={"Anime"} />

            <LeftOption title={"Gaming"} /><LeftOption title={"asd"} />

        </div>
    )
}