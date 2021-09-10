import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function UserPage({ mode }) {
    return (
        <div className="login-page">
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Your Name </Form.Label>
                    <Form.Control type="name" placeholder="John Doe" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Your Email </Form.Label>
                    <Form.Control type="email" placeholder="John Doe" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description [Optional ]</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder={"I think it is jaipur ! but I am not Confirmed "} />
                </Form.Group>
                {/* <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic"> Topic</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setTopic("Movies")} >Movies</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTopic("Programming")} >Programming</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTopic("Studies")} >Studies</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTopic("Anime")} >Anime</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTopic("Gaming")} >Gaming</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTopic("General")} >General</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                {/* <h5 className="ask-topic">{topic}</h5> */}



            </Form>
            <Button className="sub-ans" variant="outline-primary" >Answer</Button>
        </div>
    )
}