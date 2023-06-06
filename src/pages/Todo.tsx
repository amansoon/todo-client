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
  const { token } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    fetchAllNotes();
  }, [])

  const fetchAllNotes = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/todo/', {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      console.log("fetch all notes")
      console.log(res)
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        dispatch(setTodos({ todos: res.data.data.todos }))
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    const todo = {
      id: new Date(Date.now()).getTime(),
      text: text.trim(),
      timestamp: new Date(Date.now()),
    }

    if (updateIndex === null) {
      dispatch(addTodo({ todo }));
      postNewTodo(todo);
    }
    else {
      dispatch(updateTodo({ updateIndex, todo }))
    }

    setText('')
    setUpdateIndex(null)
  }

  const postNewTodo = async (data: any) => {
    // create new todo
    try {
      console.log("post new todo")
      const res = await axios.post("http://localhost:8000/api/todo/", data, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      console.log(res)
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        console.log(res.data.data.todo)
        dispatch(addTodo({ todo: res.data.data.todo }));
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const deleteNote = async (id: string) => {
    // delete note
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

  const handleDelete = (index: number) => {
    dispatch(deleteTodo({ todoIndex: index }))
    setUpdateIndex(null)
    setText('')
    // delete from database
    deleteNote(todos[index]._id as string)
  }

  const handleEdit = (index: number) => {
    setUpdateIndex(index)
    setText(todos[index].text)
  }

  return (
    <div className="flex flex-col mx-auto mt-8  max-w-[600px] w-full  p-4 border rounded-4">
      <div>
        <form className="flex gap-5 mb-4" onSubmit={handleSubmit} >
          <input className="min-w-[150px] grow py-3 px-4 bg-slate-100 rounded-md transition-all focus:bg-white" type="text" placeholder="Write something..." value={text} onChange={(e) => setText(e.target.value)} />
          <button className="px-4 py-2 bg-black text-white rounded-md"> Submit </button>
        </form>
        <div className="">
          <ul className="flex flex-col gap-2">
            {todos.map(({ text }, index) => (
              <li className="group relative flex items-start py-3 px-4 bg-slate-100 rounded-lg overflow-hidden" key={index}>
                <div> {text} </div>
                <div className="absolute top-0 right-0 p-1.5 rounded-bl-lg bg-slate-50 border border-white flex items-center opacity-0 group-hover:opacity-100">
                  <button className="p-2 rounded text-slate-500 hover:bg-orange-50 hover:text-oran-800" onClick={() => handleEdit(index)} > <Edit2 size={16} strokeWidth={1.5} /> </button>
                  <button className="p-2 rounded text-slate-500 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete(index)}  > <Trash size={16} strokeWidth={1.5} /> </button>
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