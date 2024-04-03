import { useAuthentication } from "../../hooks/useAuthentication";
import style from "./Register.module.css"
import { useEffect, useState } from "react";

const Register = () => {

    const [userName,setUserName] = useState(String);
    const [email,setEmail] = useState(String);
    const [password,setPassword] = useState(String);
    const [confirmPassword,setConfirmPassword] = useState(String);
    const [error,setError] = useState(String);

    const {createUser, error: authError, loading} = useAuthentication();

    useEffect(() => {
        if(authError){
            setError(authError);
        }
    },[authError]);

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        setError("");

        if(password !== confirmPassword){
            setError("As senhas não estãio iguais!");
            return;
        }
        if(password.length < 6){
            setError("A senha deve conter pelo menos 6 digitos!");
            return;
        }

        const user = {
            userName,
            email,
            password
        }

        const res = await createUser(user);
        console.log(res);
    }

    return(
        <>
        <div className={style.register}>
            <h1>Registro de usuario</h1>
            <p>Crie o seu usuario</p>
        </div>

        <form onSubmit={handleSubmit}>

        <label>
            Nome:
            <input type="text" name="name" value={userName} onChange={(e:any) => setUserName(e.target.value)} placeholder="Nome de Usuário" required/>
        </label>
        <label>
            Email:
            <input type="email" name="email" value={email} onChange={(e:any) => setEmail(e.target.value)} placeholder="Email de Acesso" required/>
        </label>
        <label>
            Senha:
            <input type="password" name="password" value={password} onChange={(e:any) => setPassword(e.target.value)} placeholder="Insira a sua senha" required/>
        </label>
        <label>
            Confirmar Senha:
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e:any) => setConfirmPassword(e.target.value)} placeholder="Confirme a sua senha" required/>
        </label>    

        {!loading && <button className="btn">Registrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}

        {error && <p className="error">{error}</p>}
        </form>

        </>

    )
}

export default Register;