import React,{useEffect, useState} from 'react'
import "./todo.css";
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios';
const Todo = () => {
  let id =sessionStorage.getItem("id");
  const [Inputs,setInputs]=useState({title:"",body:""});
  const [Array,setArray]=useState([]);
  
  const show= ()=>{
      document.getElementById('textarea').style.display="block";
  }
  const change = (e) =>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value});
  }
  const submit = async()=>{
    if(Inputs.title ==="" || Inputs.body===""){
      toast.error("Title or Body Should not be empty!");
    }
    else{
      if(id){
        await axios.post("http://localhost:1000/api/v2/addTask",{title:Inputs.title,body:Inputs.body,id:id}).then((response)=>{
          console.log(response);
        })
        setInputs({title:"",body:""});
        toast.success("Your Task is Added");
      }
      else{
        setArray([...Array,Inputs]);
        setInputs({title:"",body:""});
        toast.success("Your Task is Added");
        toast.error("Your Task is not Saved! Please Signup");
      }
    }
  };
  const del = async(Cardid) =>{
    await axios.delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`,{data:{id:id}}).then((response)=>{
      toast.success("Your Task is Deleted");
    })
  }
  const dis =(value) =>{
    document.getElementById('todo-update').style.display= value;
  }
  useEffect(() => {
    const fetch =async()=>{
      await axios.get(`http://localhost:1000/api/v2/getTasks/${id}`).then((response)=>{
          setArray(response.data.list);
      })
    }
    fetch(); 
  }, [submit])
  return (
    <>
      <div className='todo'>
      <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
            <div className="d-flex flex-column todo-inputs-div w-50 p-1">
              <input type="text" placeholder='TITLE' className='my-2 p-2 todo-inputs' name='title'
               onClick={show} onChange={change} value={Inputs.title}/>
              <textarea id="textarea" type="text" placeholder='BODY' className='p-2 todo-inputs' name='body'
               onChange={change} value={Inputs.body}/>
            </div>
            <div className='w-50 d-flex justify-content-end my-3'>
                <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
            </div>
        </div>
        <div className="todo-body">
            <div className="container-fluid">
              <div className="row">
              {Array && Array.map((item,index)=>(
                 <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                    <TodoCards title={item.title} body={item.body} id={item._id} delid={del} display={dis} />
                 </div>
              ))}
              </div>
            </div>
        </div>
    </div>
    <div className="todo-update" id="todo-update">
      <div className="container update">
        <Update display={dis}/>
      </div>
    </div>
    </>
  )
}

export default Todo