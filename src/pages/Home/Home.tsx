import { useState } from "react";
import styles from "./Home.module.css"
import { Link } from "react-router-dom";

const Home = () => {

    const [query,setQuery] = useState(String);
    const [post,setPost] = useState(Array);
    const [b,setB] = useState(String);

const handleSubmit = (e:any)=>{
    e.proventDefault();

}

    return(
        <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div className="post-list">
        {post && post.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>

    )
}

export default Home;