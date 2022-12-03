import React from 'react';
import Serial from '../../interfaces/Serial';
import User from '../../interfaces/User';

import '../../styles/MainPage/Header.scss'
import logo from '../../imgs/logo.png'
import '../../styles/MainPage/MainButtons.scss'

export const Header: React.FC<{
    user: User | null, setSerialsCopy: any, serials: Serial[], setActiveLoginModal: any,
    setCurrentUser: any, setActiveMainButton: any, setActiveBookMarksButton: any
}>
    = ({ user, setSerialsCopy, serials, setActiveLoginModal, setCurrentUser, setActiveMainButton, setActiveBookMarksButton }) => {
        return (user === null) ? (<div className='MainButtons'>
            <img src={logo} width='120px' height='50px' alt='logo' />
            <div className='buttons'>
            <button className='mainBtn' onClick={(e) => {
                    setActiveBookMarksButton(false);
                    setActiveMainButton(true);
                    const trg = e.target as HTMLElement;
                    console.log(e.target);
                    trg.classList.add("mainBtn");
                    document.querySelector('.bookBtn')?.classList.remove('bookBtn');
                    {setSerialsCopy(serials);}}}>
                    Main
                </button>
                <button className='log' onClick={(e ) => {
                    const trg = e.target as HTMLElement;
                    console.log(e.target);
                    trg.classList.remove("bookBtn");
                    setActiveLoginModal(true);}}>
                    Login
                </button>
            </div>
        </div>) : (<div className='MainButtons'>
            <img src={logo} width='120px' height='50px' alt='logo'/>
            <div className='buttons'>
                <button className='mainBtn' onClick={(e) => {
                    //main button
                    setActiveBookMarksButton(false);
                    setActiveMainButton(true);
                    const trg = e.target as HTMLElement;
                    console.log(e.target);
                    trg.classList.add("mainBtn");
                    document.querySelector('.bookBtn')?.classList.remove('bookBtn');
                    setSerialsCopy(serials);
                }}> Main </button>
                <button onClick={(e) => {
                    setActiveBookMarksButton(true);
                    setActiveMainButton(false);
                    const trg = e.target as HTMLElement;
                    console.log(e.target);
                    trg.classList.add("bookBtn");
                    document.querySelector('.mainBtn')?.classList.remove('mainBtn');
                    setSerialsCopy(user.serials);
                    return (<p>{user.mail}</p>);
                    }}> Bookmarks </button>
                <button onClick={() => {
                    let trg =  document.querySelector('.buttons')?.firstChild as HTMLElement;
                    trg.classList.add('mainBtn');
                    setCurrentUser(null)
                    setSerialsCopy(serials)
                }
                }>
                    Logout
                </button>
            </div>
        </div>)
    }