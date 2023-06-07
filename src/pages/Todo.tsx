import { FormEventHandler, useState, useEffect } from "react"

import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, setTodos, updateTodo } from "../features/todo/todoSlice";
import { Edit2, Trash } from "react-feather";
import axios from "axios";


type Props = {}

function Todo({ }: Props) {
  const [text, setText] = useState('');
  const [updateIndex, setUpdateIndex] = useState<number | null>(null)

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
    }
    else {
      const todo = { ...todos[updateIndex], text }
      dispatch(updateTodo({ updateIndex, todo }))
      updateTodoDB(todo.todoId, todo.text)
    }

    setText('')
    setUpdateIndex(null)
  }

  const handleDelete = (index: number) => {
    dispatch(deleteTodo({ todoIndex: index }))
    setUpdateIndex(null)
    setText('')
    deleteNoteDB(todos[index].todoId as string)
  }

  const handleEdit = (index: number) => {
    setUpdateIndex(index)
    setText(todos[index].text)
  }

  // get from database
  const fetchAllTodoDB = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/todo/', {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      console.log("fetch all todos")
      console.log(res)
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        dispatch(setTodos({ todos: res.data.data.todos }))
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // update in database
  const updateTodoDB = async (todoId: string, text: string) => {
    try {
      console.log("update new todo")
      const res = await axios.put(`http://localhost:8000/api/todo/${todoId}`, { text }, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        console.log(res.data.message)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // add into database
  const createTodoDB = async (data: any) => {
    try {
      console.log("post new todo")
      const res = await axios.post("http://localhost:8000/api/todo/", data, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        console.log(res.data.message)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // delete from database 
  const deleteNoteDB = async (id: string) => {
    try {
      console.log("delete todo")
      const res = await axios.delete(`http://localhost:8000/api/todo/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      console.log(res)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col mx-auto mt-8  max-w-[600px] w-full">
      <div className="p-4">
        <div className="bg-white p-2 border-2 mb-5 rounded-lg transition-all focus-within:shadow-lg focus-within:shadow-slate-100">
          <form className="flex gap-4" onSubmit={handleSubmit}>
            <input className="min-w-[150px] grow py-3 px-4 bg-transparent rounded-md outline-none transition-all" type="text" placeholder="Write something..." value={text} onChange={(e) => setText(e.target.value)} />
            <button className="px-4 py-2 bg-black text-white rounded-lg"> {updateIndex === null ? 'Submit' : 'Update'} </button>
          </form>
        </div>
        <div className="">
          <ul className="flex flex-col gap-3">
            {todos.map(({ text }, index) => (
              <li className={`group relative flex items-start py-3.5 px-4 bg-slate-100 rounded-lg overflow-hidden outline ${updateIndex === index ? "outline-3 outline-green-200 bg-green-50" : "outline-1 outline-slate-300"}`} key={index}>
                <div> {text} </div>
                <div className="absolute top-0 right-0 p-1 rounded-b-lg bg-white/80 border border-white flex items-center opacity-0 group-hover:opacity-100">
                  <button className="p-2 rounded-lg text-slate-500 border border-transparent hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200" onClick={() => handleEdit(index)} > <Edit2 size={16} strokeWidth={1.5} /> </button>
                  <button className="p-2 rounded-lg text-slate-500 border border-transparent hover:bg-red-50 hover:text-red-600 hover:border-red-200" onClick={() => handleDelete(index)}  > <Trash size={16} strokeWidth={1.5} /> </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Todo