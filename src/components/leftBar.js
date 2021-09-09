import LeftOption from "./LeftOption";
import { FaPlus } from 'react-icons/fa'
import { IoMdPlanet } from "react-icons/io";
import { GiSolarSystem } from 'react-icons/gi'
import { ImRocket } from 'react-icons/im'


export default function LeftBar() {
    return (
        <div className="left-bar">
            <LeftOption title={"Post"}>
                <FaPlus size={20} />
            </LeftOption>

            <LeftOption title={"Friends"}>
                <IoMdPlanet size={25} />
            </LeftOption>


            <LeftOption title={"Groups"}>
                <GiSolarSystem size={25} />
            </LeftOption>

            <LeftOption title={"Explore"}>
                <ImRocket size={25} />
            </LeftOption>

        </div>
    )
}