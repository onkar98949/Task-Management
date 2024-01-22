import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/LoginContext';

const Navbar = () => {
  const { isLogged , setIsLogged } = useAuth();

  return (
    <div className='flex justify-between bg-gray-300 h-20 p-6 mb-10 rounded-sm'>
      <div>
        <p className='text-2xl font-sans ml-6'><i class="ri-book-marked-line"></i>Task Manager</p>
      </div>
      <div className='flex justify-around gap-10 mr-10 '>
        {isLogged ? (<>
          <Link to='/'>
            <p className='text-2xl font-serif hover:bg-white duration-300 rounded-lg p-1 ' >Home</p>
          </Link>
          <Link to='/createTask'>
            <p className='text-2xl font-serif hover:bg-white duration-300 rounded-lg p-1 ' >Create Task<i class="ri-add-circle-fill"></i></p>
          </Link>
          <Link to={'/login'}>
            <button onClick={()=>{setIsLogged(false);}} className='text-2xl font-serif hover:bg-white duration-300 rounded-lg p-1 ' >Logout</button>
          </Link>
        </>
        ) : (<>
          <Link to='/login'>
            <p className='text-2xl font-serif hover:bg-white duration-300 rounded-lg p-1 ' >Login</p>
          </Link>
          <Link to='/register'>
            <p className='text-2xl font-serif hover:bg-white duration-300 rounded-lg p-1 ' >Register</p>
          </Link>
        </>
        )}
      </div>
    </div>
  )
}

export default Navbar