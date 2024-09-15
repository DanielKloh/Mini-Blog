import styles from "./CreatePost.module.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthValue } from "../../context/AuthContet";
import { useInsertDocuments } from "../../hooks/useInsertDocuments";

const CreatePost = () => {

    const [title, setTitle] = useState(String);
    const [image, setImage] = useState(String);
    const [body, setBody] = useState(String);
    const [tags, setTags] = useState(String);
    const [formError, setFromError] = useState(String);


  const user = useAuthValue();
  const navigate = useNavigate(); 
  const {insertDocument, response} = useInsertDocuments("posts"); 

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

        insertDocument({
          title,
          image,
          body,
          tagsArray,
          uid: user.uid,
          createdBy: user.email,
        });

        navigate("/");
}
    return (
        <div className={styles.create_post}>
          <h2>Criar post</h2>
          <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
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
            {!response.loading && <button className="btn">Criar post!</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde.. .
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </div>
      );
}

export default CreatePost;