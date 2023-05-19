import Modal from "../../moleculs/Modal/Index";
import infoIcon from "../../../assets/images/modal-information-icon.svg"

const Alert = (props: {show: boolean, toggle: VoidFunction}) => {
    return <div>
        <Modal
            underline={false} 
            show={props.show}
            onClick={props.toggle}
            children={{
                content: <div data-cy="modal-information" className="w-490 h-58 bg-white shadow-md rounded-lg flex items-center justify-start px-6 gap-3">
                            <div className="w-6 h-6">
                                <img data-cy="modal-information-icon" src={infoIcon} alt="info" />
                            </div>
                            <p data-cy="modal-information-title">Activity berhasil dihapus</p>
                         </div>
            }}
        />
    </div>
}

export default Alert