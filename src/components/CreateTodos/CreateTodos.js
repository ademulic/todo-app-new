const CreateTodos = () => {
    return ( 
        <div className="input-todo">
            <input type="text" placeholder='Enter your todo...' />
            <textarea placeholder='Enter your todo description'></textarea>
            <button>Add Todo</button>
        </div>
    );
}
 
export default CreateTodos;