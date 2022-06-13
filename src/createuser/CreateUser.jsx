// import './App.css';
import { Button,TextField  } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import React,{useState,useEffect} from 'react';

function CreateUser(props) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [desc, setDesc] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sed quam nostrum in doloribus nisi earum incidunt voluptatibus doloremque minima.')

    const createUserFetch = async () => {
        if(desc.length > 20 && name.length > 1 && surname.length > 1){
            const createuserjson = await fetch("http://23.88.43.148/users", {
                method:"POST",
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({name:name, surname:surname, desc:desc}) 
            })
            const createuser = await createuserjson.json()
            if(createuser.user_id.length !== 0 ){
                
            }else{
                alert("error")
            }
            props.getUsers(props.nextpage)
        }else{
            alert("not correct name or surname or more sumbol in desc")
        }

    }

    return (
    <div className='form_add_user_box'>
    <h2>Create user</h2>
    <TextField onChange={(e) => setName(e.target.value)} className='input_form' type="text" placeholder='name'/>
    <TextField onChange={(e) => setSurname(e.target.value)} className='input_form' type="text" placeholder='surname'/>
    <TextareaAutosize onChange={(e) => setDesc(e.target.value)} value={desc} className='textArea_form' placeholder='description'/>
    <ul>
        <li><Button onClick={createUserFetch} variant="contained" color="error">Create</Button></li>
    </ul>
</div>
  );
}

export default CreateUser;
