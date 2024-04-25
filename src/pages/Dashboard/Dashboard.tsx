import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContet";
import style from "./Dashboard.module.css"
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";


const Dashboard = () => {

    const {uid} = useAuthValue();
  

    const { document: posts } = useFetchDocuments("posts", null, uid);

    const { deleteDocument } = useDeleteDocument("posts");

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
                <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">Excluir</button>
            </div>
        </div>))}
        </div>
    )
}

export default Dashboard;