import React from 'react';
import '../../styles/MainPage/Modal.scss'

export const Modal : React.FC<{active : boolean , setActive : any, children: any}> = ({active, setActive, children}) => {
    return (<div>
        <div className = {active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className = {active ? "modal__content active" : "modal__content"} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    </div>)
}