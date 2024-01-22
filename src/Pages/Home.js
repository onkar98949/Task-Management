import React, { useEffect, useState } from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../Config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/LoginContext';

const Home = () => {
    const { isLogged } = useAuth();
    const [status, setStatus] = useState('todo');
    const [tasksList, setTaskList] = useState([]);
    const navigate = useNavigate();
    const [loading ,setLoading] = useState(true);

    const tasks = collection(db, "tasks");
    useEffect(() => {
        const getTasks = async () => {
            const q = query(tasks, where('status', '==', status));
            const data = await getDocs(q);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))

            setTaskList(filteredData);
            setLoading(false);
            console.log(filteredData);
        }
        getTasks();
    }, [status])


    return (
        <div >
            {isLogged?(
                <div className='w-3/4 flex mx-auto justify-between bg-slate-50 gap-3 rounded-md border-black border-1 min-h-96'>
                <div className='w-40 m-6 ml-20'>
                    <h1 className='heading'>Status:</h1>
                    <div className='mt-3' onChange={(e) => { setStatus(e.target.value) }}>

                        <input type="radio" id="Todo" name="fav_language" value="todo" defaultChecked />
                        <label className='text-lg m-1' for="html">Todo</label><br />
                        <input type="radio" id="Ongoing" name="fav_language" value="in_progress" />
                        <label className='text-lg m-1' for="css">In Progress</label><br />
                        <input type="radio" id="Completed" name="fav_language" value="done" />
                        <label className='text-lg m-1' for="javascript">Completed</label>

                    </div>
                </div>
                <div className='w-3/4 ' >
                    <h1 className='heading mt-6 text-center'>Tasks</h1>
                    <div className='m-4 w-100' >
                        {loading?(
                            <p className='font-sans text-2xl text-center mt-28'>Loading...</p>
                        ):
                        tasksList.length?(
                            tasksList.map((item) => (
                                <Link to={'/task/'+ item.id}>
                                    <div class="card border-info mb-3 w-3/4 mx-auto hover:scale-105 ease-in-out duration-150" >
                                        <div class="card-header">{item.title}</div>
                                        <div class="card-body ">
                                            <div className='flex gap-3'>
                                                <h5 class="card-title">Assigned User: {item.assignedUser}</h5>
                                                <h5 class="card-title">Deadline: {item.deadline}</h5>
                                            </div>
                                            <p class="card-text">{item.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ):(<p className='font-sans text-2xl text-center mt-28'>No Results Found...</p>)}

                    </div>
                </div>
            </div>
            ):(
                navigate('/login')
            )}
        </div>
    )
}

export default Home