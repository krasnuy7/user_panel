import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button,TextField  } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CreateUser from '../createuser/CreateUser';
import './cardsusers.css';
import {allUsers, PAGINATION_ARR} from '../redux/payload'
let nextpage = 1
function CardsUsers() {
    const usersState = useSelector((state) => state.users);
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [desc, setDesc] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sed quam nostrum in doloribus nisi earum incidunt voluptatibus doloremque minima.')
    const dispatch = useDispatch()
    const getUsers = async (page = 1) => {
        try {
            const users = await (await fetch("http://23.88.43.148/users")).json()
            dispatch(PAGINATION_ARR({
                page: page,  
                users
            }))
            nextpage++
        } catch (error) {
            console.log(error)
        }

    }
    
    useEffect(() => {
        getUsers();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const actionsUsers = (idx) => {
      document.querySelectorAll(".front_card")[idx].style.transform = "rotateY(180deg)";
      document.querySelectorAll(".front_card")[idx].style.opacity = "0.0";
      document.querySelectorAll(".back_card")[idx].style.transform = "rotateY(0deg)";
        setTimeout(() => {
            document.querySelectorAll(".back_card")[idx].style.zIndex = 1;
        },1000)
  }

  const closeCard = (idx) => {
    document.querySelectorAll(".front_card")[idx].style.transform = "rotateY(360deg)";
    document.querySelectorAll(".front_card")[idx].style.opacity = "1.0";
    document.querySelectorAll(".back_card")[idx].style.transform = "rotateY(180deg)";
    document.querySelectorAll(".back_card")[idx].style.zIndex = 0;
    
  }
  const requestEdit = async(userId) => {
    console.log('userId', userId)
    const answerEdit = await (await fetch("http://23.88.43.148/user/"+userId,{
        method:"PUT",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({name:name, surname:surname, desc:desc}) 
    })).json()
    if(answerEdit){
        alert('User edit')
    }
    getUsers(nextpage)
  }

  const deleteUser = async(userId, idx) => {
    closeCard(idx)
    setTimeout(async () => {
        const answerDelete = await (await fetch("http://23.88.43.148/user/"+userId,{
            method:"DELETE",
        })).json()
        console.log('answerDelete', answerDelete)
        if (typeof answerDelete['user_id'] !== "undefined") {
            getUsers(nextpage)
            }
       
    }, 1000)

  }

  return (
    <div className="container">
        <CreateUser getUsers={getUsers} nextpage={nextpage}/>
        <ul className='box'>
        {usersState.map((item,idx) => {
                return (
            <li key={idx}>
                <ul className="card_box">
                <li className='back_card'>
                    <span onClick={() => closeCard(idx)} style={{position:"relative",cursor:"pointer", left: "195px", top: "10px"}}>close</span>
                    <div className='form_add_user_box'>
                        <TextField onChange={(e) => setName(e.target.value)} className='input_form' type="text" placeholder='name'/>
                        <TextField onChange={(e) => setSurname(e.target.value)} className='input_form' type="text" placeholder='surname'/>
                        <TextareaAutosize onChange={(e) => setDesc(e.target.value)} className='textArea_form' placeholder='description'/>
                        <ul>
                            <li className='button_edit'><Button onClick={() => requestEdit(item.user_id)}  variant="contained" >Edit</Button></li>
                            <li><Button onClick={() => deleteUser(item.user_id,idx)} variant="contained" color="error">Delete</Button></li>
                        </ul>
                    </div>
                </li>
                    <li className='front_card'>
                    <div className="card_box_header">
                        <p className='card_box_header_p'>ID {item.user_id}</p>
                        <span className='hr'></span>
                    </div>
                    <img className="img_user_card" src="./user.png" alt="user" />
                    <div className="card_box_desc">
                        <ul className='desc_box_nameUser'>
                            <li>name: {item.name}</li>
                            <li>surname: {item.surname}</li>
                        </ul>
                        <h4 className='card_box_h4_title'>Description</h4>    
                         <div className='desc_user_card'>
                           {item.desc}
                         </div>
                    </div>
                    <div className="card_box_button">
                        <button onClick={() => actionsUsers(idx)} className='button_actions'>action</button>
                    </div>
                    </li>

                </ul>
            </li>
                )
        })}
        </ul>
        <button style={{display:"block", margin:"0 auto", marginBottom:20, padding:10}} onClick={() => getUsers(nextpage)}>MORE</button>
    </div>
  );
}

export default CardsUsers;
