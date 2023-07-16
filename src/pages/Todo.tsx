import React, { useState, useEffect } from "react"
import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, setTodos, updateTodo } from "../features/todo/todoSlice";
import { Edit2, Trash } from "react-feather";
import axios from "axios";
import Modal from 'react-modal';

import toast from 'react-hot-toast';

import emptyImage from '../images/empty.svg'
import { formBtnStyle } from "../utils/groupClasses";

type Props = {}

function Todo({ }: Props) {
  const [text, setText] = useState('');
  const [updateIndex, setUpdateIndex] = useState<number | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todo)
  const { token, user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (user) {
      fetchAllTodoDB();
    }
  }, [user])

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    if (updateIndex === null) {
      const todo = {
        todoId: (user?._id as string) + Date.now(),
        text: text.trim(),
        timestamp: Date.now(),
      }
      dispatch(addTodo({ todo }));
      createTodoDB(todo);
      setText('')
      toast.success("New todo added successfully.")
    }
    else {
      setUpdateModalOpen(true);
    }
  }

  // Deleting todo item.
  const handleDelete = (index: number) => {
    setDeleteModalOpen(true);
    setDeleteIndex(index)
  }

  const onDeleteConfirm = () => {
    console.log("confirm delete")
    if (deleteIndex !== null) {
      dispatch(deleteTodo({ todoIndex: deleteIndex }))
      deleteNoteDB(todos[deleteIndex].todoId)

      setUpdateIndex(null)
      setDeleteIndex(null)
      setText('')
      toast.success("Todo deleted successfully.")
    }
    setDeleteModalOpen(false)
  }

  const onDeleteCancel = () => {
    setUpdateIndex(null)
    setDeleteIndex(null)
    setText('')

    setDeleteModalOpen(false)
  }

  // Updating todo item.
  const handleEdit = (index: number) => {
    setUpdateIndex(index)
    setText(todos[index].text)
  }

  const onUpdateConfirm = () => {
    if (updateIndex !== null && text) {
      const todo = { ...todos[updateIndex], text }
      dispatch(updateTodo({ updateIndex, todo }))
      updateTodoDB(todo.todoId, todo.text);

      setUpdateIndex(null)
      setText('')
      toast.success("Todo updated successfully.")
    }
    setUpdateModalOpen(false)
  }

  const onUpdateCancel = () => {
    setUpdateIndex(null)
    setText('')
    setUpdateModalOpen(false)
  }




  // fetch all todos
  const fetchAllTodoDB = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/todo/', {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        dispatch(setTodos({ todos: res.data.data.todos }))
      }
    }
    catch (err) {
      // console.log(err)
    }
  }



  // update in todo in database
  const updateTodoDB = async (todoId: string, text: string) => {
    try {
      const res = await axios.put(`http://localhost:8000/api/todo/${todoId}`, { text }, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        // console.log(res.data.message)
      }
    }
    catch (err) {
      // console.log(err)
    }
  }


  // Add into database
  const createTodoDB = async (data: any) => {
    try {
      const res = await axios.post("http://localhost:8000/api/todo/", data, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        // console.log(res.data.message)
      }
      else {
        // alert(res.data.message)
      }
    }
    catch (err) {
      // console.log(err)
    }
  }


  // delete from database 
  const deleteNoteDB = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/todo/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        // console.log(res.data.message)
      }
      else {
        alert(res.data.message)
      }
    }
    catch (err) {
      // console.log(err)
    }
  }


  // modal custom style
  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      border: 'none',
      background: 'transparent'
    },
  };


  return (
    <>
      <div className="flex flex-col mx-auto mt-0 sm:mt-4 max-w-[600px] w-full">
        <div className="p-4">
          <div className="bg-white p-2 border-2 mb-5 rounded-full transition-all focus-within:shadow-lg focus-within:shadow-slate-100">
            <form className="flex" onSubmit={handleSubmit}>
              <input className="min-w-[150px] grow py-3 px-4 bg-transparent rounded-md outline-none transition-all" type="text" placeholder="Write something..." value={text} onChange={(e) => setText(e.target.value)} />
              <button className="px-4 py-2.5 bg-black text-white leading-none rounded-full"> {updateIndex === null ? 'Add' : 'Update'} </button>
            </form>
          </div>
          <div className="p-4 border border-slate-300 bg-slate-50 rounded-lg">
            {todos.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {todos.map(({ text }, index) => (
                  <li className={'flex items-center gap-4'} key={index}>
                    <div className={'w-full  bg-slate-200 rounded-lg p-4 border border-slate-400'}> {text} </div>
                    <div className="rounded-lg bg-white border border-white flex items-center gap-2">
                      <button className="flex items-center px-3 py-2 rounded border bg-black text-white" onClick={() => handleEdit(index)} > <Edit2 size={16} /> </button>
                      <button className="flex items-center px-3 py-2 rounded border bg-black text-white" onClick={() => handleDelete(index)}  >  <Trash size={16} /> </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-4 flex flex-col items-center">
                <div className="text-2xl sm:text-3xl text-gray-300 font-bold mb-6"> Todo list is Empty.  </div>
                <img src={emptyImage} alt="dodo list is empty" className="w-[150px] sm:w-[200px]" />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* delete confirmation modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        style={customModalStyles}
        contentLabel="Todo delete confirmation modal"
      >
        <div className="p-4 sm:p-6 border-2 rounded-lg bg-white">
          <div className="mb-4"> Are you sure you want to delete ? </div>
          <div className="flex justify-end gap-2">
            <button className='px-4 py-3 text-sm leading-none bg-black text-white rounded-lg' onClick={onDeleteCancel}> No </button>
            <button className='px-4 py-3 text-sm leading-none bg-black text-white rounded-lg' onClick={onDeleteConfirm}> Yes </button>
          </div>
        </div>
      </Modal>
      {/* update confirmation modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        style={customModalStyles}
        contentLabel="Todo update confirmation modal"
      >
        <div className="p-4 sm:p-6 border-2 rounded-lg bg-white">
          <div className="mb-4"> Are you sure you want to update ? </div>
          <div className="flex justify-end gap-2">
            <button className='px-4 py-3 text-sm leading-none bg-black text-white rounded-lg' onClick={onUpdateCancel}> No </button>
            <button className='px-4 py-3 text-sm leading-none bg-black text-white rounded-lg' onClick={onUpdateConfirm}> Yes </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Todo