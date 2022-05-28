import { useNote } from "../contexts"

const ColorModal = () => {
    const { notesData , setNotesData} = useNote()
    return(
        <div className = "color-btn-container">
             <button className = "btn blue" onClick = {() => setNotesData({...notesData , color : "#67e8f9"})} ></button>
             <button className = "btn dark-green" onClick = {() => setNotesData({...notesData , color : "#14b8a6"})} ></button>
             <button className = "btn pink" onClick = {() => setNotesData({...notesData , color : "#fbcfe8"})} ></button>
             <button className = "btn light-green" onClick = {() => setNotesData({...notesData , color : "#86efac"})} ></button>
             <button className = "btn purple" onClick = {() => setNotesData({...notesData , color : "#c7d2fe"})} ></button>
             <button className = "btn yellow" onClick = {() => setNotesData({...notesData , color : "#fde68a"})} ></button>
             <button className = "btn red" onClick = {() => setNotesData({...notesData , color : "#fb7185"})} ></button>
             <button className = "btn gray" onClick = {() => setNotesData({...notesData , color : "#94a3b8"})} ></button> 
          </div>
    )
}

export { ColorModal }