import React from 'react';
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import './Modal.css';

// Definindo a interface para as props da Modal
interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
  id:string
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, title, children, id }) => {

    const { deleteDocument } = useDeleteDocument("posts");

    if (!isOpen || !id) return null;


  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <div className="modal-content">
          {children} {/* Aqui você passa o conteúdo da modal */}
        </div>
        <div className='containerBtnModal'>

        <button onClick={closeModal} className="btn btn-outline" >Cancelar</button>
        <button onClick={() => {deleteDocument(id); closeModal()}} className="btn btn-outline btn-danger"> Deleta </button>
      </div> 
      </div>

    </div>
  );
};

export default Modal;
