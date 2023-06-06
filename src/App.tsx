import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Todo from "./pages/Todo";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

type Props = {}

function App({ }: Props) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todo />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App