// import { Link } from "react-router-dom";
// import { useAuthValue } from "../../context/AuthContet";
// import style from "./Dashboard.module.css"
// import { useFetchDocuments } from "../../hooks/useFetchDocuments";
// import { useDeleteDocument } from "../../hooks/useDeleteDocument";
// import Modal from "../Modal/Modal";
// import { useState } from 'react'


// const Dashboard = () => {

//     const {uid} = useAuthValue();

//     const { document: posts } = useFetchDocuments("posts", null, uid);

//     const { deleteDocument } = useDeleteDocument("posts");

//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Função para abrir a modal
//     const openModal = () => {
//       setIsModalOpen(true);
//     };
  
//     // Função para fechar a modal
//     const closeModal = () => {
//       setIsModalOpen(false);
//     };

//     return(
//         <div className={style.dashboard}>
//         <h2>Dashboard</h2>
//         <p>Gerencie seus posts</p>
//         {posts && posts.length === 0 ? (<div className={style.notposts}><div className={style.noposts}><p>Não tem posts</p> <Link to="/post/create" className="btn">Crie um post</Link></div></div>) :
//         (<div className={style.post_header}>
//             <span>Título</span>
//             <span>Ações</span>
//         </div>)}
//         {posts && posts.map((post: any) => (<div className={style.post_row} key={post.id}>
//             <p>{post.title}</p>
//             <div className={style.actions}>
//                 <Link to={`/post/${post.id}`} className="btn btn-outline">Ver</Link>
//                 <Link to={`/post/edit/${post.id}`} className="btn btn-outline">Editar</Link>
//                 <button onClick={() => {
                    
//                     if(confirm("Tem certeza de que deseja deletar este post?")){
//                         deleteDocument(post.id)
//                     }

//                 }} className="btn btn-outline btn-danger">Excluir</button>
//             </div>
//         </div>))}

//         {/* Botão para abrir a modal */}
//       <button onClick={openModal}>Abrir Modal</button>
      
//       {/* Componente Modal */}
//       <Modal isOpen={isModalOpen} closeModal={closeModal} title="Minha Modal">
//         <p>Este é o conteúdo da modal passado como children.</p>
//       </Modal>
//         </div>
//     )
// }

// export default Dashboard;



import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContet";
import style from "./Dashboard.module.css"
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import Modal from "../Modal/Modal";
import { useState } from 'react'

import React from 'react';
import { toast } from 'react-toastify';


const Dashboard = () => {

    const {uid} = useAuthValue();

    const { document: posts } = useFetchDocuments("posts", null, uid);

    const { deleteDocument } = useDeleteDocument("posts");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string >(String);
  
    // Função para abrir a modal com um id
    const openModal = (id: string) => {
      setSelectedId(id); // Armazena o id passado como parâmetro
      setIsModalOpen(true);
    };
  
    // Função para fechar a modal
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedId(""); // Limpa o id quando a modal é fechada
    };
  
    return(
        <div className={style.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie seus posts</p>
        {posts && posts.length === 0 ? (<div className={style.notposts}><div className={style.noposts}><p>Não tem posts</p> <Link to="/post/create" className="btn">Crie um post</Link></div></div>) :
        (<div className={style.post_header}>
            <span>Título</span>
            <span>Ações</span>
        </div>)}
        {posts && posts.map((post: any) => (<div className={style.post_row} key={post.id}>
            <p>{post.title}</p>
            <div className={style.actions}>
                <Link to={`/post/${post.id}`} className="btn btn-outline">Ver</Link>
                <Link to={`/post/edit/${post.id}`} className="btn btn-outline">Editar</Link>
                <button onClick={ () => openModal(post.id)} className="btn btn-outline btn-danger">Excluir</button>
            </div>
        </div>))}
      
      {/* Componente Modal */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} title="Minha Modal" id={selectedId} typeToast="deletePost">
        <p>Você tem certeza de que desja deletar o post <b>PostName</b> ?.</p>
      </Modal>

        </div>
    )
}

export default Dashboard;