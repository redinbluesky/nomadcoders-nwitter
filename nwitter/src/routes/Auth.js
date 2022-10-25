import { authService, fibaseInstance } from "fbase";
import react, { useState } from "react";

const Auth = () => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }
    
    const onSubmit = async(event) => {
        event.preventDefault(); // 기본 행위가 실행되는 것을 거부
        let data;
        try{
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else{
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async(event) =>{
        const {target:{name}} = event;
        let provider;
        if(name === "google"){
            provider = new fibaseInstance.auth.GoogleAuthProvider();
        }else if(name =="github"){
            provider = new fibaseInstance.auth.GithubAuthProvider();
        }
        
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }
    return (
    <div>    
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" type="email" placeholder="Email" value={email} required />
                <input onChange={onChange} name="password" type="password" placeholder="Password" value={password} required />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        </div>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue wiht Github</button>
        </div>
    </div>    
    );
}

export default Auth;