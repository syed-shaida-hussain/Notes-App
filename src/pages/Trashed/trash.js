import { useNote } from "../../contexts/noteContext"
import {Header , Sidebar } from "../../components"
import { useEffect } from "react"
import axios from "axios"
import "../Homepage/homePage.css"
import { useAuth } from "../../contexts"

const TrashPage = () => {
    const {noteState , dispatchNote} = useNote()
    const { auth : {token} } = useAuth()

    useEffect(() => {
        try {
          axios.get("/api/trash" , {headers  : {authorization : token}}).then((res) => {
            dispatchNote({type : "GET_TRASH_NOTES" , payload : res.data.trash})
        })
        } catch(e) {
          console.log(e)
        }
      },[noteState])

      const restoreNoteService = async (note) => {
        try {
          await axios.post(`/api/trash/restore/${note._id}` , {} , { headers : { authorization : token }})
        } catch(e){
          console.log(e)
        }
      }

      const restoreNote = (note) => {
        restoreNoteService(note);
      }

    return (
        <div>
        <Header />
        <hr />
        <div className = "main-wrapper">
          <Sidebar />
          <section className = " mt1 mb1">
         {noteState.trashedNotes.length > 0 && <div>
            <h3 className = "primary-color ml1 center-text"> Trashed Notes </h3>
           <div className = "notes-container"> {noteState.trashedNotes.map(note => <div key = {note._id} className = "note-card ml1 mt1 mr2 mb1" style = {{backgroundColor : note.color}} >
                <h3>{note.title}</h3>
                <div className = "note-text">{note.noteText}</div>
                <div className = "service-icons">
                <span className ="material-icons ml5" onClick = {() => restoreNote(note)}>restore_from_trash</span>
                </div>
            </div>) }</div></div>}
         </section>
        </div>
      
       </div>
    )
}

export {TrashPage}