import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () =>{
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
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input className="authInput" onChange={onChange} name="email" type="email" placeholder="Email" value={email} required />
                <input className="authInput" onChange={onChange} name="password" type="password" placeholder="Password" value={password} required />
                <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    )
}

export default AuthForm;