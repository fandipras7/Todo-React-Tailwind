import React from "react";
import Modal from "../../moleculs/Modal/Index"
import mDeleteIcon from "../../../assets/images/modal-delete-icon.svg"
import Button from "../../atoms/Button";

interface DeleteProps {
    show: boolean;
    messagge: string;
    itemName: string;
    toggleModal: VoidFunction;
    deleteItem: VoidFunction;

}

const DeleteModal: React.FC<DeleteProps> = (props) => {
    const handleCancel = () => {
        props.toggleModal();
      };
    
    const handleDelete = () => {
        props.deleteItem();
      };

    return <div>
        <Modal
            onClick={props.toggleModal}
            show={props.show}
            underline={false}
            children={{
                content: <div data-cy="modal-delete" className="w-490 h-355 bg-white shadow-md rounded-lg flex flex-col">
                            <div className="mt-50 flex justify-center"><img data-cy="modal-delete-icon" className="" src={mDeleteIcon} alt="delete warnibg" /></div>
                            <div data-cy="modal-delete-title" className="flex items-center flex-col mt-10">
                                <p className="font-light text-14">{props.messagge}</p>
                                <span className="font-bold">{`"${props.itemName}"`}</span>
                            </div>
                            <div className="mt-11 flex justify-center gap-5">
                                <Button componentName="modal-delete-cancel-button" onClick={handleCancel} className="w-150 h-54 rounded-45 bg-gray-100 text-18 font-bold">Batal</Button>
                                <Button componentName="modal-delete-cancel-button" onClick={handleDelete} className="w-150 h-54 rounded-45 bg-red-500 text-18 text-white font-bold">Hapus</Button>
                            </div>
                        </div>
            }}
        />
    </div>
}

export default DeleteModal