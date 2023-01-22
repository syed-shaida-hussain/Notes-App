import { useNote } from "../../contexts/noteContext"
import {Header , Sidebar } from "../../components"
import { useEffect } from "react"
import axios from "axios"
import "../Homepage/homePage.css"
import { useAuth } from "../../contexts"
import { useNavigate } from "react-router-dom"

const ArchivePage = () => {
    const {noteState , dispatchNote} = useNote()
    const { auth : {token} } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        try {
          axios.get("/api/archives" , {headers  : {authorization : token}}).then((res) => {
            dispatchNote({type : "GET_ARCHIVED_NOTES" , payload : res.data.archives})
        })
        } catch(e) {
          console.log(e)
        }
      },[noteState])

      const restoreNoteService = async (note) => {
        try {
          await axios.post(`/api/archives/restore/${note._id}` , {} , { headers : { authorization : token }})
        } catch(e){
          console.log(e)
        }
      }

      const restoreNote = (note) => {
        restoreNoteService(note);
      }

      const deleteArchivedNoteService = async (note) => {
        try {
          await axios.delete(
            `/api/archives/delete/${note._id}`,
            {
              headers: { authorization: token }
            }
          );
        } catch (e) {
          console.log(e);
        }
      };
      
      const deleteArchivedNote = (note) => {
        deleteArchivedNoteService(note);
        dispatchNote({type : "DELETE_NOTE" , payload : note})
      };


    return (
        <div>
        <Header />
        <hr />
        <div className = "main-wrapper">
          <Sidebar />
          <section className = " mt1 mb1">
         {noteState.archives.length > 0 ? <div>
            <h3 className = "primary-color ml1 center-text"> My Archives </h3>
           <div className = "notes-container"> {noteState.archives.map(note => <div key = {note._id} className = "note-card ml1 mt1 mr2 mb1" style = {{backgroundColor : note.color}} >
                <h3>{note.title}</h3>
                <div className = "note-text">{note.noteText}</div>
                <div className = "flex">
                <div className = "mt1">
                      <small>{new Date(note.createdAt).toLocaleDateString("in-IN")}</small>
                        <small> {new Date(note.createdAt).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                      </small>
                  </div>
                  <div className = "service-icons ">
                    <span className ="material-icons ml3" onClick = {() => restoreNote(note)}>unarchive</span>
                    <span className ="material-icons ml1" onClick = {() => deleteArchivedNote(note)}>delete_forever</span>
                  </div>
                 
                </div>
            </div>) }</div></div>
            : <div className="center-text">
            <h3 className=" primary-color ">No Archived notes here</h3>
            <button className="home-btn btn" onClick={() => navigate("/home")}>Add some Notes</button>
          </div>}
         </section>
        </div>
      
       </div>
    )
}

export {ArchivePage}


{/* 
 */}