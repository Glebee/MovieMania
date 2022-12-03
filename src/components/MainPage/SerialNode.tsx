import Serial from "../../interfaces/Serial"
import User from "../../interfaces/User"
import '../../styles/MainPage/SerialItem.scss'
import { axiosInstance } from '../../Instances/Axios'

function createNewUserInfo(user: User, serial: Serial, func: any) {
    return {
        mail: user.mail,
        password: user.password,
        serials: func(user, serial)
    }
}

function deleteSerialFromUser(user: User, serial: Serial) {
    return user.serials.filter(s => s.name != serial.name)
}

function addSerialToUser(user: User, serial: Serial) {
    return [...user.serials, serial]
}

function handleUnfollowButton(user: User, serial: Serial, setCurrentUser: any) {

    axiosInstance.put(`/${user.id}`, createNewUserInfo(user, serial, deleteSerialFromUser))
    .then((response) => setCurrentUser(response.data))
}

function handleFollowButton(user: User, serial: Serial, setCurrentUser: any) {
    axiosInstance.put(`/${user.id}`, createNewUserInfo(user, serial, addSerialToUser))
    .then((response) => setCurrentUser(response.data))
}

export const SerialItem: React.FC<{ user: User | null, serial: Serial, setSelectedSerial: any, setActiveCard: any, setCurrentUser: any }>
    = ({ user, serial, setSelectedSerial, setActiveCard, setCurrentUser }) => {
        return (<div className="card">
            <img src={serial.image} className="image" onClick={() => {
                setActiveCard(true)

                setSelectedSerial(serial)
            }}></img>
            <div className="product-list">
                <h3>{serial.name}</h3>
                <span className="price">{serial.premiered}</span>
                {(user === null)
                    ? (<></>) : (user.serials.map(s => s.name).includes(serial.name)
                        ? <button className="unfollow" onClick={() => handleUnfollowButton(user, serial, setCurrentUser)}>unfollow</button>
                        : <button className="follow" onClick={() => handleFollowButton(user, serial, setCurrentUser)}>follow</button>)}
            </div>
        </div>)
    }