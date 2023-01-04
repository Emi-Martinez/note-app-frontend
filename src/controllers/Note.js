import { noteModel } from "../models/Note";

export const getAllNotes = async ()=>{
    try {
        const {data} = await noteModel.getnotes()

        return data.data
    } catch (error) {
        console.log(error)
    }
}

export const postNote = async (note) => {
    try {
        const newNote = new noteModel(note)
        const {data} = await newNote.postNote()

        return data.data
    } catch (error) {
        console.log(error)
    }
}

export const putNote = async (note)=>{
    try {
        const newNote = new noteModel(note)

        const {data} = await newNote.putNote()

        return data.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteNote = async (id)=>{
    try {
        const {data} = await noteModel.dltNote(id)

        return data.data
    } catch (error) {
        console.log(error)
    }
}