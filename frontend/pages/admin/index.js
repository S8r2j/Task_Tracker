import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import AdminNavbar from '@/components/AdminNavbar';

function Index() {
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState([]);
  const { data: session } = useSession();
  const token = session?.user.access_token;
  const url = "http://127.0.0.1:8000/get/tasks/";

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    };
    axios
      .get(url, config)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refetch, token]);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData('text/plain'));
    const updatedData = data.map((task) => {
      if (task.task_id === droppedTask.task_id) {
        return { ...task, status: status };
      }
      return task;
    });
    setData(updatedData);
  };

  const getTasksByStatus = (status) => {
    return data.filter((task) => task.status === status);
  };

  return (
    <>
      <div className='bg-gray-200 h-screen'>
        <div>
          <AdminNavbar />
        </div>
        <div className='md:flex lg:flex p-4 bg-gray-200'>
          <div className='bg-gray-50 mb-2 w-full md:w-1/3 lg:w-1/3 h-[500px] p-2 rounded-lg shadow-md'>
            <h1 className='font-bold'>TO DO</h1>
            <div
              className='todo-section'
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'todo')}
            >
              <div className='todo-list'>
                {getTasksByStatus('todo')
                  .reverse()
                  .map((task) => (
                    <div
                      key={task.task_id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      className='todo-item bg-orange-500 rounded-lg shadow-sm px-2 py-3 mb-2'
                    >
                      {task.task}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='bg-gray-50 mx-2 mb-2 w-full md:w-1/3 lg:w-1/3 h-[500px] p-2 rounded-lg shadow-md'>
            <h1 className='font-bold'>In Progress</h1>
            <div
              className='todo-section'
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'inProgress')}
            >
              <div className='todo-list'>
                {getTasksByStatus('inProgress')
                  .reverse()
                  .map((task) => (
                    <div
                      key={task.task_id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      className='todo-item bg-yellow-300 rounded-lg shadow-sm px-2 py-3 mb-2'
                    >
                      {task.task}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='bg-gray-50 mb-2 w-full md:w-1/3 lg:w-1/3 h-[500px] p-2 rounded-lg shadow-md'>
            <h1 className='font-bold'>Done</h1>
            <div
              className='todo-section'
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'done')}
            >
              <div className='todo-list'>
                {getTasksByStatus('done')
                  .reverse()
                  .map((task) => (
                    <div
                      key={task.task_id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      className='todo-item bg-green-500 rounded-lg shadow-sm px-2 py-3 mb-2'
                    >
                      {task.task}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
