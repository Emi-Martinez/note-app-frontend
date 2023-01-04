export default function Note(props){
    function filterContent(content,limit){
        return content.length > limit ? `${content.slice(0,limit)} ...` : content
    }
    
    return (
        // Note
        (props.listMode === undefined) ?            
            <div className="note">                
                <div className="note-title-delete-container">
                    <h1 className="note-title" onClick={props.clickOnNote}>{filterContent(props.data.title, 13)}</h1>
                    <button className="btn-delete-note" onClick={props.clickDeleteNote}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="delete-simbol">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </button>
                </div>

                <p className="note-content" onClick={props.clickOnNote}>
                    {filterContent(props.data.content, 203)}
                </p>
                
            </div>
        :
            // Note editing
            <div className="note-edit-container">
                <input
                    name="title"
                    id="title"
                    value={props.data.title}
                    className="note-title input"
                    placeholder="Title"
                    onChange={props.handleChange}
                />
                <textarea 
                    name="content"
                    id="content"
                    value={props.data.content}
                    className="note-content input text-arear"
                    placeholder="Note"
                    onChange={props.handleChange}
                />
            </div>
    )
}