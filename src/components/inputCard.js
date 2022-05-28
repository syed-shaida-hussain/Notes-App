import { useNote } from "../contexts/noteContext"
import axios from "axios"
import { useAuth } from "../contexts"
import { ColorModal } from "./colorModal"

const InputCard = () => {
    const { notesData , isColorModalActive , setIsColorModalActive ,  setNotesData  } = useNote()
    const { auth : {token} } = useAuth()
    const initialNotesData = {title : "" , noteText : "" , pin : false , color : "" }

    const addNoteService = async (note) => {
        try {
          await axios.post(
            "/api/notes",
             { note : notesData },
            {
              headers: { authorization: token }
            }
          );
        } catch (e) {
          console.log(e);
        }
      };
      
      const addNote = async () => {
        await addNoteService();
        setNotesData(initialNotesData)
        setIsColorModalActive(false)
      };

    return(
        <section className="input-note-card mt1 mb1" style = {{backgroundColor : notesData.color}}>
        <div className="flex"> 
          <input required className="ml1 mt1 font-medium input" placeholder="Title" value = {notesData.title} required onChange = {(e) => setNotesData({...notesData , title : e.target.value})} />
          <button className = "pin-button mt1">{notesData.pin? <span className="material-symbols-outlined" onClick = {() => setNotesData({...notesData , pin : false})}>unpin</span> :  <span className="material-icons" onClick = {() => setNotesData({...notesData , pin : true})}>push_pin</span> }</button>
        </div>
        <textarea
          className="ml1 mt1 font-medium textarea"
          placeholder="Add a note..." value = {notesData.noteText} onChange = {(e) => setNotesData({...notesData , noteText : e.target.value})} required
        />
      { isColorModalActive && <ColorModal />}
       
        <div>
        <span className ="material-icons ml1" onClick = {() => setIsColorModalActive(!isColorModalActive)}>palette</span>
          <button className="add-note-btn font-medium mt1 mb1" onClick = {() => addNote()}>Add Note</button>
        </div>
      </section>
    )
}

export {InputCard}