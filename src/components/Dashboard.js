import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { getDB } from '../utils/Firebase';
import { doc, collection, setDoc, where, query, getDocs, deleteDoc } from 'firebase/firestore';

const Dashboard = () => {
  //now we have to save the task
  const [task, setTask] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();
  const logout = () => {

    signOut(auth) //removing the token from local storage
      .then(() => {
        localStorage.removeItem('token')
        navigate('/');
      })
      .catch((e) => alert(e.message))

  }
  //this method will save the task
  const AddTask = useCallback(() => {
    const db = getDB();
    const newTaskRef = doc(collection(db, "tasks"));

    setDoc(newTaskRef, {
      name: task,
      user: user.uid,
    }).then(() => fetchTasks())
  }, [task, user])

  const deleteTask = async (id) => {
    const db = getDB();
    try {
      //here we r giving the address to delete the note through id
      const result = await deleteDoc(doc(db, "tasks", id))
      //as we were able to see delete notes as well so we used fetchnotes 
      fetchTasks();
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchTasks = useCallback(async () => {
    if (user && user.uid) {
      const db = getDB();
      const q = query(collection(db, "tasks"), where("user", "==", user.uid));

      try {
        const results = await getDocs(q);
        let resultTasks = [];
        results.forEach((doc) => {
          resultTasks.push({
            ...doc.data(),
            uid: doc.id,
          });
        });

        setTasks(resultTasks);
      } catch (e) {
        console.log(e);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);



  //when we r writing dashboard on tab it is redirecting us to dashboard which is not appropriate for that again we'll use useeffect
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);



  //after reloading the page name is not showing so we'll write some more functions to fix it
  return (
    <div className="w-full h-screen  flex justify-center items-center">
      <div className="w-96 bg-white shadow-lg">
        <div className="m-5">
          <p>{user && user.displayName}</p>
        </div>
        <div className="m-5">
          <label className="block text-xl font-bold mb-2">Add a task</label>
          <input
            value={task}
            onChange={e => setTask(e.target.value)}
            name="email"
            type="email"
            className="border-grey-200 border-2 rounded w-full p-2 h-10"
          />
        </div>
        <div className="m-5">
          <button
            onClick={AddTask}
            className="hover:bg-yellow-700 bg-pink-500 text-white px-10 py-2 rounded text-xl font-bold w-full "
          >
            Add task
          </button>
        </div>
        {
          tasks.map(
            task => (
              <div className="m-5 flex justify-between" key={task.uid}>
                <p>{task.name}</p>
                <button onClick={() => deleteTask(task.uid)} className="bg-red-500 to-yellow-200 text-white px-2 py-1 rounded text-xs font-bold">Delete</button>
              </div>
            )
          )
        }
        <div className="m-5">
          <button
            onClick={logout}
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-200 text-white px-10 py-2 rounded text-xl font-bold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
