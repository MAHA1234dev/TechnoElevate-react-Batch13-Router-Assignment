import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

export default function Login() {
    const context = useContext(LoginContext);
    const history = useHistory();

    const login =()=>{
        console.log(context);
        context.changeLogin(true);
        console.log(context.login);
        localStorage.setItem("session" , true)
        history.push("/")
    }

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={login} >
                Login

            </button>
        </div>
    )

}
