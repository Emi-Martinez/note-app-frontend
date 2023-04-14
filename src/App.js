import { useEffect, useState } from "react"
import Header from "./components/Header"
import Lateralbar from "./components/Lateralbar"
import Note from "./components/Note"
import './style.css'
import { 
    getAllNotes,
    putNote,
    postNote,
    deleteNote
} from "./controllers/Note"

export default function App(){
    const [notes, setNotes] = useState([])
    const [editingNote, setEditingNote] = useState()    
    const [newNote, setNewNote] = useState()

    const handleClickNote = (id)=>{
        const nt = notes.filter(nt => nt.id === id)

        setEditingNote(nt[0])
    }

    const handleClickNewNote = () => {
        setNewNote(
            {
                title: "",
                content: "",
                id:"",
                tp:"",
                update_date:""
            }
        )
    }

    const handleBackNewNote = () =>{
        const postNewNote = async () =>{
            const newNotes = await postNote(newNote)
            setNotes(newNotes)
        }
        if(newNote.title !== "" || newNote.content !== ""){
            postNewNote()
        }
        setNewNote(undefined)
    }

    const handleChangeNewNote = (event)=>{
        const {name,value} = event.target
        setNewNote(prevNote => (
            {
                ...prevNote,
                [name]: value
            }
        ))
    }

    const handleChange = (event)=>{
        const {name,value} = event.target
        setEditingNote(prevNote => (
            {
                ...prevNote,
                [name]: value
            }
        ))
    }

    const backToList = ()=>{
        const newNotes = async ()=> {
            const newNotes = await putNote(editingNote)
            setNotes(newNotes)
        }

        newNotes()        
        setEditingNote(undefined)
    }

    const handleDeleteNote = (id) => {
        const dltNote = async (id) =>{
            const newNotes = await deleteNote(id)
            setNotes(newNotes)
        }

        dltNote(id)
    }

    useEffect(()=>{
        async function setAllNotes(){
            const allNotes = await getAllNotes()
            setNotes(allNotes)
        }

        setAllNotes()

    },[])

    const nts = notes.map( note =>(
        <Note
            Key={note.id}
            listMode={editingNote}
            data={note}
            clickOnNote={()=> handleClickNote(note.id)}
            clickDeleteNote={()=> handleDeleteNote(note.id)}
        />
    ))

    return(
        // Note list
        editingNote === undefined && newNote === undefined ? 
            <div className="app-container">
                <Lateralbar
                    newNote={handleClickNewNote}
                />
                <div className="centro">
                    <Header
                        listMode={editingNote}
                        setNotes={setNotes}
                        noteList={notes}
                    />            
                    <div className="note-container">
                        {nts}
                    </div>
                </div>
            </div>
        : 
            newNote === undefined ?
                // Note editing
                <div className="app-container-note-edit">
                    <Header
                        listMode={editingNote}
                        backToList={backToList}
                        date={editingNote.update_date}
                    />
                    <Note 
                        listMode={editingNote}
                        data={editingNote}
                        handleChange={handleChange}
                    />
                </div>
            :
                // New note
                <div className="app-container-note-edit">
                    <Header
                        listMode={newNote}
                        backToList={handleBackNewNote}
                        date="Now"
                    />
                    <Note 
                        listMode={newNote}
                        data={newNote}
                        handleChange={handleChangeNewNote}
                    />
                </div>
    )
}