import styles from "./EditPost.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthValue } from "../../context/AuthContet";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {

    const {id} = useParams();

    const {document:post} = useFetchDocument("posts", id);

    const [title, setTitle] = useState(String);
    const [image, setImage] = useState(String);
    const [body, setBody] = useState(String);
    const [tags, setTags] = useState(String);
    const [formError, setFromError] = useState(String);

    console.log(post);

    useEffect(() => {
        if(post){
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tagsArray.join(",");

            setTags(textTags);
        }
    },[post])

  const user = useAuthValue();
  
  const navigate = useNavigate(); 

  const {updateDocument, response} = useUpdateDocument("posts"); 

    const handleSubmit = (e:any) => {

        e.preventDefault();
        setFromError("");

        try {
          new URL(image);
        } catch (error) {
        setFromError("A imagem precisa ser uma url!");
        }

        const tagsArray = tags.split(",").map((tag:any) => tag.trim().toLowerCase());

        if(!title || !image || !body || !tags){
          setFromError("Preencha todos os campos!");
        }

        const data={
            title,
          image,
          body,
          tagsArray,
          uid: user.uid,
          createdBy: user.email,
        }
        updateDocument(id,data);

        navigate("/dashboard");
}
    return (
        <div className={styles.edit_post}>
          {post && (
            <>
            <h2>Editando o post: {post.title}</h2>
          <p>Altere os dados da forma que quiser!</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="text"
                required
                placeholder="Pense num bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que representa seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.proeviwe_title}> Preview da imagem atual:</p>
            <img src={post.image} alt={post.title} className={styles.image_preview} />
            <label>
              <span>Conteúdo:</span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e:any) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde.. .
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
            </>
          )}
        </div>
      );
}

export default EditPost;