import axios from "axios";
import React from "react";
import User from "../../interfaces/User";
import '../../styles/Authorization/authorization.scss'
import { axiosInstance } from "../../Instances/Axios";

function checkValidMail(mail: string): boolean {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    return EMAIL_REGEXP.test(mail)

}
function handleLogInButton(mail: string, login: string, password: string, setActiveLogin: any, setCurrentPassword: any, setCurrentUser: any) {

    if (login === '' || password === '') {
        return;
    }

    if (checkValidMail(login) === false) {
        alert("Put correct mail!")
        return;
    }
    axios({
        method: "get",
        url: "http://localhost:3000/users",
    }).then((users) => {
        let user = users.data.find((user: User) => user.mail === mail && user.password === password);
        if (user === undefined) {
            alert("Wrong name or password!")
        }
        else {
            setActiveLogin(false)
            setCurrentUser(user)
        }

        setCurrentPassword('')
    })

}

function handleRegisterButton(mail: string, password: string, login: string, setActiveLoginModal: any, setCurrentUser: any, setPassword: any, setLogin: any) {
    if (password === "" || login === "") {
        return;
    }

    if (checkValidMail(login) === false) {
        alert("Put correct mail!")
        return;
    }

    axiosInstance.get('').then((users) => {
        let user = users.data.find((user: User) => user.mail === mail);
        if (user === undefined) {
            user = {
                mail: mail,
                password: password,
                serials: []
            }

            axiosInstance.post('', user).then((res) => {
                setCurrentUser(res.data)
                setActiveLoginModal(false)
                setLogin("")
                setPassword("")
            })
        }
    })
}

export const Authorization: React.FC<
    { setActiveLoginModal: any, setCurrentUser: any }>
    = ({setActiveLoginModal, setCurrentUser }) => {
        const [currentLogin, setCurrentLogin] = React.useState('');
        const [currentPassword, setCurrentPassword] = React.useState('');
        
        return (<div className="authorization">
            <form className="loginForm" onSubmit={(e) => { e.preventDefault() }}>
                <h2>Hello Stranger!</h2>
                <div className="inputsAndButtons">
                    <p>Please log in</p>
                    <input
                        className=""
                        type="text"
                        placeholder="login"
                        onChange={(e) => setCurrentLogin(e.target.value)}
                        value={currentLogin}
                        required
                    />
                    <input
                        className="loginFormInput"
                        type="password"
                        placeholder="password"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        value={currentPassword}
                        required
                    />
                    <button className="Btn" type="submit" onClick={() =>
                        handleLogInButton(currentLogin, currentLogin, currentPassword, setActiveLoginModal, setCurrentPassword, setCurrentUser)}>
                        Login
                    </button>

                    <button className="Btn" type="submit" onClick={() => handleRegisterButton(currentLogin, currentPassword, currentLogin, setActiveLoginModal, setCurrentUser, setCurrentPassword, setCurrentLogin)}>
                        Sign up
                    </button>
                </div>
            </form>
        </div>)
    }