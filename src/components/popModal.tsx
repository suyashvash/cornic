
import Modal from 'react-bootstrap/Modal'

export default function PopupModal(props: any) {
    return (
        <Modal show={props.show} onHide={props.onHide} centered={props.centered}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="save-pop">
                    {props.body}
                    {props.children}
                </div>

            </Modal.Body>
        </Modal>
    )
}