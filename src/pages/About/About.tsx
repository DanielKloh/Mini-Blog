import { Link } from "react-router-dom";
import style from "./About.module.css";

const About = () => {

    return(
        <div className={style.about}>
            <h2>Sobre o Mini <span>Blog</span></h2>
            <p>O Mini Blog é um projeto feito em React usando o Firebase no back-end </p>
            <Link to="/post/create" className="btn">Criar Projeto</Link>
        </div>
    )
}

export default About;