import React, { useEffect, useState } from 'react'
import { db } from '../Config/firebase';
import { getDocs , collection , addDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const CreateTask = () => {

  const [title ,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [assignedUser,SetAssignedUser] = useState('');
  const [status,setStatus] = useState('');
  const [date,SetDate] = useState(new Date());
  const navigate = useNavigate();

  const [allusers,setAllUsers] = useState([]);

  const tasks = collection(db,"tasks");
  const users = collection(db,"users");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await addDoc(tasks,{ title, description, status, assignedUser , deadline:date})
    .then(()=>{
        navigate('/')
    })

  }

  useEffect(()=>{
     const getUsers = async()=>{
       const data = await getDocs(users);
       const filteredData = data.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id
       }))
         setAllUsers(filteredData);
         console.log(filteredData);
     }
     getUsers();
  },[])


  return (
    <div>
      <h1 className='heading my-4 text-center'>Create Task</h1>

      <form onSubmit={handleSubmit} className=' flex flex-col w-4/5 bg-slate-50 gap-3 mx-auto p-6 border-black border-1 rounded-md'>
        <label className='text-xl' for="floatingTextarea">Title</label>
        <div >
          <textarea class="form-control h-10" id="floatingTextarea" onChange={(e)=>{setTitle(e.target.value)}}></textarea>

        </div>
        <label className='text-xl' for="floatingTextarea2">Description</label>
        <div >
          <textarea class="form-control h-20" id="floatingTextarea2" onChange={(e)=>{setDescription(e.target.value)}}></textarea>

        </div>

        <div className='flex gap-2'>
          <label className='text-xl'>Asigned User: </label>

          <div className="mb-3 col-3 me-3">
           
            <select
              name="assigned_user"
              className="form-select"
              aria-label="Default select example"
              onChange={(e)=>{SetAssignedUser(e.target.value)}}
            >
              <option>Select User</option>
              {allusers.map((item) => {
                return (
                  <option key={item.id} value={item.email}>
                    {`${item.email}`}
                  </option>
                );
              })}

            </select>
          </div>

        </div>

        <div className='flex gap-2'>
          <label className='text-xl'>Status: </label>
          <div className="mb-3 col-3 me-3">
           
            <select
              name="status"
              className="form-select"
              aria-label="Default select example"
              onChange={(e)=>{setStatus(e.target.value)}}
            >
              <option>Select Status</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
        <div className='flex gap-2'>
          <label className='text-xl'>Deadline: </label>
          <div className="mb-1 col-3 me-3">
            <input
              type="date"
              className="form-control"
              name="deadline"
              id="deadline"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e)=>{SetDate(e.target.value)}}
            />
          </div>
        </div>
        <button type='submit' class="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6">
          Create Task
        </button>


      </form>

    </div>
  )
}

export default CreateTask