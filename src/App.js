import React,{useEffect, useState} from 'react';
import './App.css';
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";


function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState([]);
  const [comp, setComp] = useState("");

  const handleAddTodo = ()=>{
    let newTodoItem ={
      title:newTitle,
      description:newDescription

    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };

    const handleDeleteTodo = (index)=>{
      let reducedTodo =[...allTodos];
      reducedTodo.splice(index);
      localStorage.setItem('todolist',JSON.stringify(reducedTodo));
      setTodos(reducedTodo)
    }
 let completedOn;
      const handleCompleteTodo = (index)=>{
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        completedOn = dd + "-" + mm + '-' + yyyy + ' at ' + h + ':'+ m +':'+s;
        console.log(completedOn)
        setComp(completedOn)
        console.log(comp)


        let filteredItem = {
          ...allTodos[index],
          completedOn:completedOn
        }
         let updatedCompletedArr = [...completedTodos];
          updatedCompletedArr.push(filteredItem);
          setCompletedTodos(updatedCompletedArr);
          handleDeleteTodo(index)
      }

     useEffect(()=>{
        let savedTodo = JSON.parse(localStorage.getItem('todolist'))
        if(savedTodo){
           setTodos(savedTodo);
        }
     },[])
   

  return (
    <div className="App">
      <h1> My Todos</h1>

      <div className='todo-wrapper'> 
       <div className='todo-input'>
         <div className='todo-input-item'>
           <label>Title</label>
           <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="what's the task title"/>
         </div>
         <div className='todo-input-item'>
           <label>Description</label>
           <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}placeholder="what's the task description"/>
         </div>
         <div className='todo-input-item'>
           <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
         </div>
       </div>

          <div className='btn-area'>
             <button className={`isCompleteScreen ${isCompleteScreen===false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
             <button className={`isCompleteScreen ${isCompleteScreen===true && 'active'}`} onClick={() =>  {
              setIsCompleteScreen(true);
              

             } }>completed</button>
          </div>

           <div className='todo-list'>

             { isCompleteScreen===false && allTodos.map((item,index)=>{
              return(
                <div className='todo-list-item' key={index}>
                <h3> {item.title}</h3>
                <p> {item.description}</p>
                <div className='icon__box'>
                <MdDeleteOutline 
                className='icon'
                 onClick={()=>handleDeleteTodo(index)}
                 title="delete"/>
                <FaCheck  className='check-icon' onClick={()=>handleCompleteTodo(index)} />
                </div>
              </div>


              );
             
             })}

             { isCompleteScreen===true && completedTodos.map((item,index)=>{
              return(
                <div className='todo-list-item' key={index}>
                 <div className='date' >
                 <h3> {item.title}</h3>
                <p><small> completed on{comp}</small> </p>
                 </div>
                <p> {item.description}</p>
                
                <div className='icon__box'>


                <MdDeleteOutline 
                className='icon'
                 onClick={()=>handleDeleteTodo(index)}
                 title="delete?"
                  
                 />
                <FaCheck  className='check-icon' onClick={()=>handleCompleteTodo(index)} />
                </div>
              </div>


              );
             
             })}

                
               
           </div>




      </div>
    </div>
  );
}

export default App
