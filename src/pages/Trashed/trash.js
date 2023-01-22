import { useNote } from "../../contexts/noteContext"
import {Header , Sidebar } from "../../components"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../Homepage/homePage.css"
import { useAuth } from "../../contexts"

const TrashPage = () => {
    const {noteState , dispatchNote} = useNote()
    const { auth : {token} } = useAuth();
    const navigate = useNavigate();

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


      const deleteTrashNoteService = async (note) => {
        try {
          await axios.delete(
            `/api/trash/delete/${note._id}`,
            {
              headers: { authorization: token }
            }
          );
        } catch (e) {
          console.log(e);
        }
      };
      
      const deleteTrashNote = (note) => {
        deleteTrashNoteService(note);
        dispatchNote({type : "DELETE_NOTE" , payload : note})
      };

    return (
        <div>
        <Header />
        <hr />
        <div className = "main-wrapper">
          <Sidebar />
        <section className = " mt1 mb1">
         {noteState.trashedNotes.length > 0 ? <div>
            <h3 className = "primary-color ml1 center-text"> Trash Notes </h3>
           <div className = "notes-container"> {noteState.trashedNotes.map(note => <div key = {note._id} className = "note-card ml1 mt1 mr2 mb1" style = {{backgroundColor : note.color}} >
                <h3>{note.title}</h3>
                <div className = "note-text">{note.noteText}</div>
                <div className = "flex">
                <div className = "mt1">
                      <small>{new Date(note.createdAt).toLocaleDateString("in-IN")}</small>
                        <small> {new Date(note.createdAt).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                      </small>
                  </div>
                  <div className = "service-icons ">
                  <span className ="material-icons ml3" onClick = {() => restoreNote(note)}>restore_from_trash</span>
                  <span className ="material-icons ml1" onClick = {() => deleteTrashNote(note)}>delete_forever</span>
                  </div>
                 
                </div>
            </div>) }</div></div> 
            : <div className="center-text">
            <h3 className=" primary-color ">No Trash notes here</h3>
            <button className="home-btn btn" onClick={() => navigate("/home")}>Back Home</button>
          </div>}
        </section>
        </div>
       </div>
    )
}

export {TrashPage}