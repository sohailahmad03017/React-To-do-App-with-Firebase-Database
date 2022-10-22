import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TextField, Container, Button, Divider } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { sendData, getData } from '../config/firebaseMethods';
import { getDatabase, ref, onValue, set } from "firebase/database";

const db = getDatabase();

//Custom Styling
const flexCenter = {
  height: '90vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
}

const inputDiv = {
  borderRadius: '20px',
  display: 'flex',
  margin: '10px 0px',
}

const notesDiv = {
  padding: '20px 0px',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  height: '400px',
  margin: '10px 0px'
}


const noteDiv = {
  margin: '10px 0px',
  display: 'flex'
}

const noteContent = {
  background: 'black',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  width: '90%'
}

export default function Dashboard() {

  let [email, setEmail] = useState('');
  let [uid, setUid] = useState('');
  let [name, setName] = useState('');
  let [note, setNote] = useState('');
  let [notesReceived, setNotesReceived] = useState([]);
  let [notesKeys, setNotesKeys] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.uid) {
      setEmail(location.state.email);
      setUid(location.state.uid);
      setName(location.state.username);
    }
    else {
      navigate('/');
    }
  }, [])

  useEffect(() => {
    if (uid) {
      receiveData(uid);
    }
  }, [uid])

  const addNote = () => {
    sendData({ note }, uid)
      .then((success) => {
        receiveData(uid);
        setNote('');
      })
      .catch((error) => console.log(error))
  }

  const receiveData = (uid) => {
    setNotesReceived([]);
    setNotesKeys([]);

    onValue(ref(db, 'notes/' + uid), (snapshot) => {
      let status = snapshot.exists();
      if (status) {
        const data = snapshot.val();
        setNotesReceived([...Object.values(data)]);
        setNotesKeys([...Object.keys(data)]);
      }
    });
  }

  const deleteAll = () => {
    set(ref(db, `notes/${uid}/`), { value: null });
    receiveData(uid);
  }

  const editNote = (value, index) => {
    let val = prompt("Enter updated text here", value);
    set(ref(db, `notes/${uid}/${notesKeys[index]}`), { note: val });
    receiveData(uid);
  }

  const delNote = (index) => {
    set(ref(db, `notes/${uid}/${notesKeys[index]}`), { note: null });
    receiveData(uid);
  }

  return (
    <div style={flexCenter}>

      <Container maxWidth='md' sx={inputDiv}>

        <TextField value={note} onChange={(e) => setNote(e.target.value)} label="Note" variant="outlined" size='small' sx={{ width: '90%' }} />

        <Button onClick={addNote} variant='contained' style={{ paddig: '40px 0px', marginLeft: '15px', background: 'green' }}><AddIcon /></Button>

        <Button onClick={deleteAll} variant='contained' style={{ paddig: '40px 0px', marginLeft: '15px', background: 'red' }}><DeleteIcon /></Button>

      </Container>

      <Divider />

      <Container maxWidth='md' sx={notesDiv}>

        {
          notesReceived.map((e, i) => {
            return (
              <div style={noteDiv} key={i}>
                <div style={noteContent} >{e.note}</div>

                <Button onClick={() => editNote(e.note, i)} variant='contained' style={{ paddig: '40px 0px', marginLeft: '15px', background: 'blue' }}><EditIcon /></Button>

                <Button onClick={() => delNote(i)} variant='contained' style={{ paddig: '40px 0px', marginLeft: '15px', background: 'red' }}>< DeleteIcon /></Button>
              </div>
            )
          })
        }

      </Container>
    </div>
  )
}
