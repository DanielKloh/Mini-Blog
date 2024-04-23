import { Link } from "react-router-dom";
import { PostDetail } from "../../components/postDetails/PostDetails";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import style from "./search.module.css"

const Search = () => {

    const query = useQuery();
    const search = query.get("q");

    const {document: posts} = useFetchDocuments("posts",search);

    return(
        <div className={style.search_container}>
            <h2>Search</h2>
            <div>
                {posts && posts.length === 0 && (
                    <>
                        <p>Não foram encontrados post a partir da sua busca...</p>
                        <Link to="/" className="btn btn-dark">Voltar</Link>
                    </>                    
                )}
                {posts && posts.map((post:any) => (
                    <PostDetail key={post.id} post={post}/>
                ))}
            </div>
        </div>
    )
}

export default Search;