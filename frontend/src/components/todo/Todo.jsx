import React,{useState} from 'react'
import "./todo.css";
import TodoCards from './TodoCards';
const Todo = () => {
  const [Inputs,setInputs]=useState({title:"",body:""})
  const [Array,setArray]=useState([]);
  const show= ()=>{
      document.getElementById('textarea').style.display="block";
  }
  const change = (e) =>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value});
  }
  const submit = ()=>{
    setArray([...Array,Inputs])
    setInputs({title:"",body:""})
  }
  return (
    <div className='todo'>
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
                 <div className="col-lg-3 col-10 mx-5 my-2">
                    <TodoCards title={item.title} body={item.body} />
                 </div>
              ))}
              </div>
            </div>
        </div>
    </div>
  )
}

export default Todo