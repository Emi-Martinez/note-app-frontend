export default function Lateralbar(props){
    return(
        <div className="lateral-bar">
            <div className="btns-container">
                <button className="lateral-btn" title="Add note" onClick={props.newNote}>
                    <img  alt="" src="/img/Add-note.png" className="btn"/>
                </button>
            </div>
        </div>
    )
}