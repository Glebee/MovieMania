import Serial from "../../interfaces/Serial";
import '../../styles/SerialCard/serialCard.scss'

export const SerialCard: React.FC<{ activeSerial: Serial | null }> = ({ activeSerial }) => {

    return (
        <div className="serialCard">
            <img src={activeSerial?.bigImg}></img>
            <div className="content">
                <h3>{activeSerial?.name}</h3>
                {activeSerial?.summary}
                <table>
                    <tbody>
                    <tr>
                        <td className="name">Premiered:</td>
                        <td>{activeSerial?.premiered}</td>
                    </tr>
                    <tr>
                        <td className="name">Status:</td>
                        <td>{activeSerial?.status}</td>
                    </tr>
                    <tr>
                        <td className="name">Genres:</td>
                        <td>{activeSerial?.genres}</td>
                    </tr>
                    <tr>
                        <td className="name">Rating:</td>
                        <td>{activeSerial?.rating}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="outDate">
                    {(activeSerial?.airdate === undefined)?<></> : <div><p>Next episode</p>{activeSerial?.airdate}</div> }
                </div>
                {/* <span>Premiered: <p> {activeSerial?.premiered}</p></span>
                <span>Status: <p> {activeSerial?.status}</p></span>
                <span>Genres: <p> {activeSerial?.genres}</p></span>
                <span>Rating: <p> {activeSerial?.rating}</p></span> */}
            </div>
        </div>
    );
}