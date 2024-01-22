import React, { useEffect, useState } from 'react'
import { db } from '../Config/firebase';
import { doc, getDoc , collection , addDoc} from 'firebase/firestore';
import { Link, useNavigate, useParams } from 'react-router-dom';


const TaskPage = () => {

  const [title ,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [assignedUser,SetAssignedUser] = useState('');
  const [status,setStatus] = useState('');
  const [date,SetDate] = useState(new Date());
  const navigate = useNavigate();

  const { id } = useParams();
  
  useEffect(() => {
    const getTasks = async () => {
        const docRef = doc(db, 'tasks', id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
       
        if(data){
            setDescription(data.description)
            setTitle(data.title)
            setStatus(data.status)
            SetDate(data.deadline)
            SetAssignedUser(data.assignedUser)
        }

    }
    getTasks();
}, [])


  return (
    <div>
     
      <h1 className='heading my-4 text-center'>Task Details</h1>

      <form className=' flex flex-col w-4/5 bg-slate-50 gap-3 mx-auto p-6 border-black border-1 rounded-md'>
      <Link className='mx-auto' to={'/updateTask/'+ id}>
        <button class="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-1">
          Edit Task
        </button>
        </Link>

        <label className='text-xl' for="floatingTextarea">Title</label>
        <div >
          <textarea class="form-control h-10" id="floatingTextarea" value={title} disabled></textarea>

        </div>
        <label className='text-xl' for="floatingTextarea2">Description</label>
        <div >
          <textarea class="form-control h-20" id="floatingTextarea2" value={description} disabled></textarea>

        </div>

        <div className='flex gap-2'>
          <label className='text-xl'>Asigned User: </label>

          <div className="mb-3 col-3 me-3">
           
            <select
              name="assigned_user"
              className="form-select"
              aria-label="Default select example"
              disabled
            >
              <option>{assignedUser}</option>

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
              disabled
            >
              <option >{status}</option>
             
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
              disabled
              min={new Date().toISOString().split("T")[0]}
             value={date}
            />
          </div>
        </div>
       


      </form>

    </div>
  )
}

export default TaskPage