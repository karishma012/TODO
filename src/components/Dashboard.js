import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getDB } from '../utils/Firebase';
import {
  collection,
  doc,
  setDoc,
  where,
  query,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-100 p-5 rounded shadow-md">
      <p className="font-bold">{task.title}</p>
      <p>{task.description}</p>
      <p>{new Date(task.createdAt).toLocaleString()}</p>
      <div className="flex justify-end mt-3">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 to-yellow-200 text-white px-2 py-1 rounded text-xs font-bold mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.uid)}
          className="bg-red-500 to-yellow-200 text-white px-2 py-1 rounded text-xs font-bold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token');
        navigate('/');
      })
      .catch((e) => alert(e.message));
  };

  const addTask = useCallback(() => {
    const db = getDB();
    const newTaskRef = doc(collection(db, 'tasks'));

    setDoc(newTaskRef, {
      title,
      description,
      createdAt: new Date().getTime(),
      user: user.uid,
    }).then(() => {
      fetchTasks();
      setTitle('');
      setDescription('');
    });
  }, [title, description, user]);

  const deleteTask = async (id) => {
    const db = getDB();
    try {
      await deleteDoc(doc(db, 'tasks', id));
      fetchTasks();
    } catch (e) {
      console.log(e);
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const updateTask = async () => {
    if (!editingTask) return;

    const db = getDB();
    const taskRef = doc(db, 'tasks', editingTask.uid);

    try {
      await updateDoc(taskRef, {
        title,
        description,
      });
      fetchTasks();
      cancelEdit();
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
  };

  const fetchTasks = useCallback(async () => {
    if (user && user.uid) {
      const db = getDB();
      const q = query(collection(db, 'tasks'), where('user', '==', user.uid));

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

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg">
        <div className="m-5 font-bold text-pink-600 underline text-pink-600">
          <p>Welcome, {user && user.displayName}!</p>
        </div>
        <div className="m-5">
          <label className="block text-xl font-bold mb-2">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="border-grey-200 border-2 rounded w-full p-2 h-10"
          />
        </div>
        <div className="m-5">
          <label className="block text-xl font-bold mb-2">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="border-grey-200 border-2 rounded w-full p-2 h-10"
          />
        </div>
        <div className="m-5">
          {editingTask ? (
            <>
              <button
                onClick={updateTask}
                className="bg-blue-600 to-yellow-200 text-white px-5 py-1 rounded text-xs font-bold mr-7"
              >
                Update Task
              </button>
              <button
                onClick={cancelEdit}
                className="bg-blue-600 to-yellow-200 text-white px-7 py-1 rounded text-xs font-bold"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addTask}
              className="hover:bg-yellow-700 bg-pink-500 text-white px-10 py-2 rounded text-xl font-bold w-full"
            >
              Add Task
            </button>
          )}
        </div>
        <div className="max-h-60 overflow-y-auto">
          {tasks.map((task) => (
            <div className="m-5" key={task.uid}>
              <TaskCard task={task} onEdit={editTask} onDelete={deleteTask} />
            </div>
          ))}
        </div>
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
  );
};

export default Dashboard;
