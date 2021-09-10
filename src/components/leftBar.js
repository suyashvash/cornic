
import { ImRocket } from 'react-icons/im'
import LeftOption from './LeftOption'


export default function LeftBar() {
    return (
        <div className="left-bar">
            <h5><ImRocket /> Suggested</h5>
            <LeftOption title={"Studies"} link={"/cronic@studies"} />
            <LeftOption title={"Anime"} link={"/cronic@anime"} />
            <LeftOption title={"Gaming"} link={"/cronic@gaming"} />
            <LeftOption title={"Programming"} link={"/cronic@programming"} />
            <LeftOption title={"Movies"} link={"/cronic@movies"} />


        </div>
    )
}