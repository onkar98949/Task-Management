import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Config/firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message , setMessage] = useState(null);
  const naviagte = useNavigate();

  const users = collection(db,"users");

  const handleSubmit = async(e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then(async() => {
      await addDoc(users,{email});
      naviagte('/login');
    })
    .catch((error) => {
        setMessage("Email Already in use");

    });
  }

  setTimeout(()=>{
      setMessage(null);
  },3000)

  return (
    <div className='h-screen'>
      {message?(
        <div className='item-center h-6 w-full'>
          <div class="alert alert-warning w-48 items-center mx-auto bottom-10" role="alert">
            {message}
          </div>
          {/* <div className='w-32 bg-red-300 mx-auto'>Hello</div> */}
        </div>
      ):(<div className='h-6'></div>)}
      <div className='w-4/5 mx-auto border-black border-1 rounded-lg h-3/4 bg-white'>
        <h1 className=' text-center text-3xl font-sans my-10 '>Register</h1>
        <form className='w-4/5 mx-auto ' onSubmit={handleSubmit}>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { setEmail(e.target.value) }} />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" name='password' class="form-control" id="exampleInputPassword1" onChange={(e) => { setPassword(e.target.value) }} />
          </div>

          <button type='submit' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6">
            Submit
          </button>

        </form>
      </div>
    </div>
  )
}

export default Register