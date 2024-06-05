import React,{useState} from 'react'
import "./Signup.css";
import HeadingComp from './HeadingComp';
import axios from "axios";
import {useNavigate} from "react-router-dom";
const Signin = () => {
    const history =useNavigate();
    const [Inputs, setInputs] = useState({email:"",password:""});
    const change=(e)=>{
        const {name,value}=e.target;
        setInputs({...Inputs,[name]:value});
    }
    const submit =async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:1000/api/v1/signin",Inputs).then((response)=>{
            console.log(response.data._id);
            history("/todo");
        })
    }
  return (
    <div><div className='signup'>
    <div className="container">
        <div className="row">
        <div className="col-lg-5 column  d-flex justify-content-center align-items-center">
                <HeadingComp first="Sign" second="In"/>
            </div>
            <div className="col-lg-7 column d-flex justify-content-center align-items-center">
                <div className='d-flex flex-column w-100 p-5'>
                    <input className='p-2 my-3 input-signup' type="email" name="email" placeholder='Enter Your Email' 
                    onChange={change} value={Inputs.email} />
                    <input className='p-2 my-3 input-signup' type="password" name="password" placeholder='Enter Your Passwprd'
                    onChange={change} value={Inputs.password}  />
                    <button className='btn-signup p-2' onClick={submit}>SignIn</button>
                </div>
            </div>
        </div>
    </div>
</div></div>
  )
}

export default Signin