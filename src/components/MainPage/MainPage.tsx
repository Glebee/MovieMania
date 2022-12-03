import React from 'react';
import User from '../../interfaces/User';
import { Header } from './Header'
import { Modal } from './Modal';
import { SerialsList } from './SerialsList';
import Serial from '../../interfaces/Serial';
import { SerialCard } from '../Card/SerialCard';
import { Authorization } from '../Authorization/Authorization';
import '../../styles/MainPage/mainPage.scss';

export const MainPage: React.FC<{ user: User | null, setCurrentUser: any }> = ({ user, setCurrentUser }) => {
    const [activeLoginModal, setActiveLoginModal] = React.useState(false)
    const [activeSerialCardModal, setActiveSerialCardModal] = React.useState(false)

    const [serials, setSerials] = React.useState<Serial[]>([]);
    const [serialsCopy, setSerialsCopy] = React.useState<Serial[]>([]);

    const [activeSerial, setActiveSerial] = React.useState<Serial | null>(null)
    const [searchTerm, setSearchTerm] = React.useState("");

    const [isActiveMainButton, setActiveMainButton] = React.useState(true)
    const [isActiveBookMarksButton, setActiveBookMarksButton] = React.useState(false);

    React.useEffect(() => {
        if (isActiveMainButton) {
            setSerialsCopy(serials.filter((serial) => serial.name.toLowerCase().includes(searchTerm.toLowerCase())))
        }
        if (isActiveBookMarksButton) {
            if (user !== null)
                setSerialsCopy(user.serials.filter((serial) => serial.name.toLowerCase().includes(searchTerm.toLowerCase())))
        }
    }, [isActiveMainButton, isActiveBookMarksButton, searchTerm])
    
    return (<div className='mainPage'>
        <Header user={user}
            setSerialsCopy={setSerialsCopy}
            serials={serials}
            setActiveLoginModal={setActiveLoginModal}
            setCurrentUser={setCurrentUser}
            setActiveMainButton={setActiveMainButton}
            setActiveBookMarksButton={setActiveBookMarksButton} />

        <SerialsList user={user}
            setSerials={setSerials}
            setSerialsCopy={setSerialsCopy}
            serials={serials}
            serialsCopy={serialsCopy}
            setActiveCard={setActiveSerialCardModal}
            setSelectedSerial={setActiveSerial}
            setCurrentUser={setCurrentUser}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm} />

        <Modal active={activeLoginModal} setActive={setActiveLoginModal}>
            <Authorization
                setActiveLoginModal={setActiveLoginModal}
                setCurrentUser={setCurrentUser} />
        </Modal>

        <Modal active={activeSerialCardModal} setActive={setActiveSerialCardModal}>
            <SerialCard activeSerial={activeSerial} />
        </Modal>
    </div>)
}