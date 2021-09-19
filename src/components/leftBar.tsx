import { ImRocket } from 'react-icons/im'

export default function LeftBar() {

    const topicList = [
        { title: "General", link: "/cornic@general" },
        { title: "Studies", link: "/cornic@studies" },
        { title: "Anime", link: "/cornic@anime" },
        { title: "Gaming", link: "/cornic@gaming" },
        { title: "Programming", link: "/cornic@programming" },
        { title: "Movies", link: "/cornic@movies" },
    ]

    return (
        <div className="left-bar">
            <h5><ImRocket /> Suggested</h5>
            {topicList.map((item: any, index: any) => (<a key={index} className="left-option" href={item.link}> <h5>{item.title}</h5></a>))}
        </div>
    )
}