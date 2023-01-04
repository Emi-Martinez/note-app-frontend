import axios from "axios"

export class noteModel{
    constructor(note){
        this.id = note.id
        this.title = note.title
        this.content = note.content
        this.tp = note.tp
        this.update_date = note.update_date
    }

    static getnotes(){
        return axios.get('/api/notes')
    }

    static dltNote(id){
        return axios.delete(`/api/notes/${id}`)
    }

    postNote(){
        return axios.post('/api/notes',{
            newNote:{
                id: this.id,
                title: this.title,
                content:this.content,
                tp:this.tp
            }
        })
    }

    putNote(){
        return axios.put(`/api/notes/${this.id}`, {
            updatedNote:{
                id: this.id,
                title: this.title,
                content:this.content,
                tp:this.tp
            }
        })
    }
}