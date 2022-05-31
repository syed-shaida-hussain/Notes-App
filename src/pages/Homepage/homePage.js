import "./homePage.css"
import axios from "axios"
import { useEffect } from "react";
import { useAuth , useNote  } from "../../contexts";
import { Header , ColorModal , Sidebar , InputCard } from "../../components"

const HomePage = () => {
   
    const { auth : {token} } = useAuth()
    const {noteState , notesData , setNotesData , dispatchNote , isColorModalActive , setIsColorModalActive , isEditModalActive , setIsEditModalActive} = useNote()
    const initialNotesData = {title : "" , noteText : "" , pin : false , color : "" }

    useEffect(() => {
      try {
        axios.get("/api/notes" , {headers  : {authorization : token}}).then((res) => {
          dispatchNote({type : "GET_NOTES" , payload : res.data.notes})
      })
      } catch(e) {
        console.log(e)
      }
     
    },[noteState])


      const editNoteService = async () => {
        try {
          await axios.post(
            `/api/notes/${noteState.currNote._id}`,
             { note : notesData },
            {
              headers: { authorization: token }
            }
          );
        } catch (e) {
          console.log(e);
        }
      };
      
      const editNote = async (note) => {
        await editNoteService(note);
        setIsEditModalActive(!isEditModalActive)
        setNotesData(initialNotesData)
        setIsColorModalActive(false)
      };

      const deleteNoteService = async (note) => {
        try {
          await axios.delete(
            `/api/notes/${note._id}`,
            {
              headers: { authorization: token }
            }
          );
        } catch (e) {
          console.log(e);
        }
      };
      
      const deleteNote = async (note) => {
        await deleteNoteService(note);
        dispatchNote({type : "DELETE_NOTE" , payload : note})
      };

      const archiveNoteService = async (note) => {
        try {
          await axios.post(`/api/notes/archives/${note._id}` , { note : note}  , { headers : { authorization : token }})
        } catch(e){
          console.log(e)
        }
      }

      const archiveNote = (note) => {
        archiveNoteService(note);
        dispatchNote({type : "ARCHIVE_NOTE" , payload : note})
      }

      const getCurrNote = (note) => {
        const currNote = noteState.notes.find(item => item._id === note._id)
        dispatchNote({type : "GET_CURR_NOTE" , payload : currNote})
      }

      const pinnedNotes = noteState.notes.filter(note => note.pin)
      const unpinnedNotes = noteState.notes.filter(note => !note.pin)

    return (
      <div>
       <Header />
        <hr />
        <div className = "main-wrapper">
        <Sidebar />
        <InputCard />
        </div>
      
        <section className = " mt1 mb1">
         {pinnedNotes.length > 0 && <div>
            <h3 className = "primary-color ml1 center-text"> Pinned Notes </h3>
           <div className = "notes-container"> {pinnedNotes.map(note => note.pin && <div key = {note._id} onClick = {() => getCurrNote(note)} className = "note-card ml1 mt1 mr2 mb1" style = {{backgroundColor : note.color}} >
                <h3>{note.title}</h3>
                <div className = "note-text">{note.noteText}</div>
                <div className = "service-icons">
                <span className ="material-icons" onClick = {() => setIsEditModalActive(true)}>edit</span>
                <span className ="material-icons ml1" onClick = {() => archiveNote(note)}>archive</span>
                <span className ="material-icons ml1" onClick = {() => deleteNote(note)}>delete</span>
                </div>
            </div>) }</div></div>}

        {unpinnedNotes.length > 0 && <div className = "mt1 mb1">
            <h3 className = "primary-color ml1 center-text"> Other Notes </h3>
           <div className = "notes-container"> {unpinnedNotes.map(note => !note.pin && <div key = {note._id} onClick = {() => getCurrNote(note)} className = "note-card ml1 mt1 mr2 mb1" style = {{backgroundColor : note.color}} >
                <h3>{note.title}</h3>
                <div className = "note-text">{note.noteText}</div>
                <div className = "service-icons">
                <span className="material-icons" onClick = {() => setIsEditModalActive(true)}>edit</span>
                <span className="material-icons ml1" onClick = {() => archiveNote(note)}>archive</span>
                <span className="material-icons ml1" onClick = {() => deleteNote(note)}>delete</span>
                </div>
        </div>) } </div>  </div>}

        {isEditModalActive &&  <section className="input-note-card mt1 aligned yellow" style = {{backgroundColor : notesData.color}}>
          <div className="flex">
            <input className="ml1 mt1 font-medium input" placeholder="Title" onChange = {(e) => setNotesData({...notesData , title : (noteState.currNote.title , e.target.value)})} defaultValue = {noteState.currNote.title}/>
            <button className = "pin-button mt1">{notesData.pin ? <span className="material-symbols-outlined" onClick = {() => setNotesData({...notesData , pin : false})}>unpin</span> :  <span className="material-icons" onClick = {() => setNotesData({...notesData , pin : true})}>push_pin</span> }</button>
          </div>
          <textarea
            className="ml1 mt1 font-medium textarea"
            placeholder="Add a note..."  onChange = {(e) => setNotesData({...notesData , noteText : (noteState.currNote.noteText , e.target.value)})} defaultValue = {noteState.currNote.noteText}
          />
              {  isColorModalActive && <ColorModal />}
          <div>
          <span className="material-icons ml1" onClick = {() => setIsColorModalActive(!isColorModalActive)}>palette</span>
            <button className="add-note-btn font-medium mt1 mb1" onClick = {() => editNote()}>Edit Note</button>
          </div>
        </section>}
        </section>
      </div>
    );
  };
  
  export { HomePage };