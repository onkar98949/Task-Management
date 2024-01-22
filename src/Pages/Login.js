import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/firebase';
import { useAuth } from '../Context/LoginContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { setIsLogged } = useAuth();
    const navigate =useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setIsLogged(true);
                navigate('/')
            })
            .catch((error) => {
               console.log(error);
            });
    }

    return (
        <div className='h-screen'>
            <div className='w-4/5 mx-auto border-black border-1 rounded-lg mt-20 h-3/4 bg-white'>
                <h1 className=' text-center text-3xl font-sans my-10 '>Login</h1>
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

export default Login