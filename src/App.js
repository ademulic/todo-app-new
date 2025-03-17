 
import { useEffect, useState } from 'react';
import './App.css';
import { IoMdClose } from "react-icons/io";
import { BsTrash3 } from "react-icons/bs";
function App() {

  const [isDialogOpen,setIsDialogOpen] = useState(false);
  const [todos,setTodos]=useState([]);
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');

  useEffect(()=>{
    fetch('http://localhost:8000/todos')
    .then(res=>{
      if(!res.ok){
        throw Error('Could not fetch the data');
      }else{
       return res.json()
      }      
    })
    .then((data)=>{
      setTodos(data);
      setIsDialogOpen(false);
    })
     
  },[]);

  const createTodo = async (e) => {
    e.preventDefault();
    const todo = { title, description };
  
    try {
      const res = await fetch('http://localhost:8000/todos', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
  
      if (!res.ok) {
        throw new Error("Failed to create the todo");
      }
  
      const newTodo = await res.json(); 
      setTodos((prev) => [...prev, newTodo]); // Correctly updating the state
      setTitle(''); // Clear input fields
      setDescription('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/todos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete the todo");
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main className="App">
      <form 
        className="input-todo" 
        style={isDialogOpen ? {display:'flex'}:{display:'none'}} 
        onSubmit={createTodo}
      >
        <span className='close-btn' onClick={()=>setIsDialogOpen(false)}><IoMdClose /></span>
        <h1>Create todo</h1>
        <p>Please fill out the form below</p>
        <input type="text" placeholder='Enter todo title...' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <textarea placeholder='Enter todo description...' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <button type='submit'>Add Todo</button>
      </form>
      {
        todos.length ? 
        <div className="todos-list-container">
        {todos && todos.map((todo)=>(
          <div className='todo-card' key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <span onClick={()=>deleteTodo(todo.id)}><BsTrash3 /></span>
          </div>
        ))
        } 
      </div>:<p className='no-todos-added'>Please add a todo</p>
      } 
       
       <button className='add-todo-btn' onClick={()=>setIsDialogOpen(true)}>Add a todo</button>
    </main>
  );
}

export default App;
