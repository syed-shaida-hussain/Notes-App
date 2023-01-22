import "./homePage.css"
import axios from "axios"
import { useEffect } from "react";
import { useAuth , useNote  } from "../../contexts";
import { Header , ColorModal , Sidebar , InputCard } from "../../components"
import { useFilters } from "../../contexts/filterContext";

const HomePage = () => {
   
    const { auth : {token} } = useAuth()
    const {sortBy} = useFilters()
    const {noteState , notesData , setNotesData , dispatchNote , isColorModalActive , setIsColorModalActive , isEditModalActive , setIsEditModalActive} = useNote()
    const initialNotesData = {title : "" , noteText : "" , pin : false , color : "" , createdAt : ""}

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

      const trashNoteService = async (note) => {
        try {
          await axios.post(
            `/api/notes/trash/${note._id}` , {} ,
            {
              headers: { authorization: token }
            }
          );
        } catch (e) {
          console.log(e);
        }
      };
      
      const addNoteToTrash = async (note) => {
        await trashNoteService(note);
        dispatchNote({type : "TRASH_NOTE" , payload : note})
        setNotesData(initialNotesData)
      };

      const archiveNoteService = async (note) => {
        try {
          await axios.post(`/api/notes/archives/${note._id}` , {note : note}  , { headers : { authorization : token }})
        } catch(e){
          console.log(e)
        }
      }

      const archiveNote = (note) => {
        archiveNoteService(note);
        dispatchNote({type : "ARCHIVE_NOTE" , payload : note})
        setNotesData(initialNotesData)
      }
      
      const getCurrNote = (note) => {
        const currNote = noteState.notes.find(item => item._id === note._id)
        dispatchNote({type : "GET_CURR_NOTE" , payload : currNote})
        setNotesData(currNote)
      }

      function getSortedData(sortedList, sortBy ) {
        if (sortBy && sortBy === "NEWEST_FIRST") {
            return sortedList.sort((a, b) => b ["order"] - a["order"] );
        }
        if (sortBy && sortBy === "OLDEST_FIRST") {
            return sortedList.sort((a, b) => a["order"]  - b["order"] );
        }
            return sortedList;
    }

      const pinnedNotes = noteState.notes.filter(note => note.pin)
      const unpinnedNotes = noteState.notes.filter(note => !note.pin)
      const sortedData = getSortedData(noteState.notes , sortBy)

    return (
      <div>
       <Header />
        <hr />
        <div className = "main-wrapper">
        <Sidebar />
        { !isEditModalActive && <InputCard />}
        </div>
      
        <section className = " mt1 mb1">
         {pinnedNotes.length > 0 && <div>
            <h3 className = "primary-color ml1 center-text"> Pinned Notes </h3>
           <div className = "notes-container"> {sortedData.map(note => note.pin && <div key = {note._id} onClick = {() => getCurrNote(note)} className = "note-card ml1 mt1 mr2 mb1" style = {{backgroundColor : note.color}} >
                <h2>{note.title}</h2>
                <div className = "note-text">{note.noteText}</div>

                  <div className = "flex">
                  <div className = "mt1">
                      <small>{new Date(note.createdAt).toLocaleDateString("in-IN")}</small>
                        <small> {new Date(note.createdAt).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                      </small>
                  </div>
                  <div className = "service-icons ">
                    <span className="material-icons" onClick = {() => setIsEditModalActive(true)}>edit</span>
                    <span className="material-icons ml1" onClick = {() => archiveNote(note)}>archive</span>
                    <span className ="material-icons ml1" onClick = {() => addNoteToTrash(note)}>delete</span>
                  </div>
                 
                </div>
            </div>) }</div></div>}

        {unpinnedNotes.length > 0 && <div className = "mt1">
            <h3 className = "primary-color ml1 center-text"> Notes </h3>
           <div className = "notes-container"> {sortedData.map(note => !note.pin && <div key = {note._id} onClick = {() => getCurrNote(note)} className = "note-card ml1 mt1 mr2 mb1" style = {{backgroundColor : note.color}} >
                <h2>{note.title}</h2>
                <div className = "note-text">{note.noteText}</div>
                <div className = "flex">
                <div className = "mt1">
                      <small>{new Date(note.createdAt).toLocaleDateString("in-IN")}</small>
                        <small> {new Date(note.createdAt).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                      </small>
                  </div>
                  <div className = "service-icons ">
                    <span className="material-icons" onClick = {() => setIsEditModalActive(true)}>edit</span>
                    <span className="material-icons ml1" onClick = {() => archiveNote(note)}>archive</span>
                    <span className ="material-icons ml1" onClick = {() => addNoteToTrash(note)}>delete</span>
                  </div>
                 
                </div>
        </div>) } </div>  </div>}

        {isEditModalActive &&  <section className="input-note-card mt1 aligned" >
          <div className="flex">
            <input className="ml1 mt1 font-medium input" placeholder="Title" onChange = {(e) => setNotesData({...notesData , title : (notesData.title, e.target.value)})} defaultValue = {notesData.title}/>
            {notesData.pin ? <span className="material-icons" onClick = {() => setNotesData({...notesData , pin : false})}>push_pin</span> :  <span className="material-symbols-outlined" onClick = {() => setNotesData({...notesData , pin : true})}>push_pin</span> }
          </div>
          <textarea
            className="ml1 mt1 font-medium textarea"
            placeholder="Add a note..."  onChange = {(e) => setNotesData({...notesData , noteText : e.target.value , createdAt : new Date()
              .toLocaleString()
              })} defaultValue = {noteState.currNote.noteText}
          />
            
          <div>
            <button className="add-note-btn edit-note-btn font-medium mt1 mb1" onClick = {() => editNote()}>Edit Note</button>
          </div>
        </section>}
        </section>
      </div>
    );
  };
  
  export { HomePage };