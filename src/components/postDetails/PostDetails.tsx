import styles from "./PostDetail.module.css"
import { Link } from "react-router-dom"

export const PostDetail = ({post}:any) => {

    return(
        <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createdby}>por: {post.createdBy}</p>
      <div className={styles.tags}>
        {post.tagsArray.map((tag:string, key:number) => (
            
          <p key={key}>
            <span>#</span>
            {tag}
          </p>
          
        ))}
      </div>
      
      <Link to={`/post/${post.id}`}  className={`${styles.btn_post_detail} ${styles.btn} ${styles.btn_outline}`} >
        Ler
      </Link>
    </div>
    );
};