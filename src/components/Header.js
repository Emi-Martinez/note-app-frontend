import { useState } from "react"
import { getAllNotes } from "../controllers/Note"

export default function Header(props){
    const [search, setSearch] = useState({search: ""})
    const noteList = props.noteList
    const setNotes = props.setNotes

    const findInNote = (note,string) => {        
        return (note.title.includes(string) || note.content.includes(string))
        
    }

    const generateNewNotes = (value) => {
            const newNotes = noteList.filter((note) => findInNote(note, value))
            setNotes(newNotes)
        
    }
    
    const handleChange = (event) =>{
        const {name,value} = event.target       
        
        setSearch(prevSearch => (
            {
                ...prevSearch,
                [name]: value
            }
        ))

        if(value === ""){
            const newNotes = async ()=> {
                const allNotes = await getAllNotes()
                setNotes(allNotes)
            }
    
            newNotes()  
        }else{
            generateNewNotes(value.trim())
        }

    }
  
    return(
        props.listMode === undefined ?
            <div className="header">
                <input 
                    name="search"
                    id="search"
                    className="header-search"
                    placeholder="Search your notes"
                    value={search.search}
                    onChange={handleChange}
                />
                <label htmlFor="search">
                    <img alt="" src="/img/Search-icon.png" className="search-icon"/>
                </label>
            </div>
        :
            <div className="header-note-edit">
                <button className="back-arrow" title="Back to list note" onClick={props.backToList}>
                    <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg">
                        <path d="M14 26L4 16M4 16L14 6M4 16H28" stroke="#FFB775" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="path"/>
                    </svg>
                </button>
                <label>Last update: {props.date}</label>
            </div>
    )
}