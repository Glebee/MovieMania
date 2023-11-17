import '../../styles/MainPage/Search.scss';
// import search from "../../imgs/search.svg";

export const Filter : React.FC<{onChange: any}> = ({onChange}) => {
    return (<div className='search'>
        <input type="text" onChange={(e) => onChange(e.target.value)}></input>
        {/* <img src={search} alt="search" /> */}
    </div>)
}