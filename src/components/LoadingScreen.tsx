import logo from '../assets/logo.png'

export default function LoadingScreen() {
    return (
        <div className="base-flex loading-screen">
            <img src={logo} alt="" />
            <h3>Loading Content</h3>
        </div>
    )
}