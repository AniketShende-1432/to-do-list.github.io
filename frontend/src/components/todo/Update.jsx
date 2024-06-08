import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";

const Update = ({display,update}) => {
  useEffect(() => {
    setInputs({title: update.title,body:update.body});
  }, [update])
  
  const [Inputs, setInputs] = useState({title:"",body:""})
  const change =(e)=>{
    const {name,value} = e.target;
    setInputs({...Inputs,[name]:value});
  }
  const submit =async()=>{
    await axios.put(`http://localhost:1000/api/v2/updateTask/${update._id}`,Inputs).then((response)=>{
      toast.success("Your Task is Updated");
    })
    display("none");
  }
  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update '>
        <h3>Update Yout Task</h3>
        <input type="text" className='todo-inputs my-4 w-100 p-3' name="title" value={Inputs.title} 
        onChange={change} />
        <textarea className='todo-inputs w-100 p-2' name="body" value={Inputs.body} onChange={change} />
        <div>
            <button className='btn btn-dark my-4' onClick={submit}>UPDATE</button>
            <button className='btn btn-danger my-4 mx-3'onClick={()=>{display("none");}}>Close</button>
        </div>
    </div>
  )
}

export default Update