import { ImRocket } from 'react-icons/im'
import LeftOption from './LeftOption'

export default function LeftBar() {
    return (
        <div className="left-bar">
            <h5><ImRocket /> Suggested</h5>
            <LeftOption title={"General"} link={"/cornic@general"} />
            <LeftOption title={"Studies"} link={"/cornic@studies"} />
            <LeftOption title={"Anime"} link={"/cornic@anime"} />
            <LeftOption title={"Gaming"} link={"/cornic@gaming"} />
            <LeftOption title={"Programming"} link={"/cornic@programming"} />
            <LeftOption title={"Movies"} link={"/cornic@movies"} />
        </div>
    )
}