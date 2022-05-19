import React, {useState, useEffect} from 'react';
import { TaskRow } from './components/TaskRow';
import { TaskBanner } from './components/TaskBanner';
import { TaskCreator } from './components/TaskCreator';
import { VisibilityControl } from './components/VisibilityControl';

const App = () => {

const [taskItems, setTaskItems] = useState([
  {name: 'Tarea Uno', done: false},
  {name: 'Tarea dos', done: true},
  {name: 'Tarea tres', done: false}

]);

const [showCompleted, setShowCompleted] = useState(true);

//primero comprobamos si en el local storage existe una propiedad llamada task
//y luego lo almacenamos en una variable llamada data
//convertir datos
//si existe datos los voy a añadir a la aplicacion
//si no existen voy a añadir datos de ejemplo
useEffect(() => {
 let data = localStorage.getItem('tasks');
 if (data != null) {
   setTaskItems(JSON.parse(data));
 } else {
   setTaskItems([
    {name: 'Tarea Uno Ejemplo', done: false},
    {name: 'Tarea dos Ejemplo', done: true},
    {name: 'Tarea tres Ejemplo', done: false}
   ])
   setShowCompleted(true);
 }
}, []);

//esto es un arreglo, yo necesito guardar una string
useEffect(() => {
 localStorage.setItem('tasks', JSON.stringify(taskItems));
}, [taskItems]);


//cambiar estado done
const toggleTask = task => 
setTaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t)  ))

const taskTableRows = (donevalue) => 
  taskItems
  .filter(task => task.done === donevalue)
  .map(task => (
    <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
 ))

 //comprobar si la tarea ya existe
 //sino se pushea al array
const createNewTask = taskName => {
  if (!taskItems.find(t => t.name === taskName)) {
    setTaskItems([...taskItems, {name: taskName, done: false}])
  }

}

 

  return (
    <div>
    
    <TaskBanner taskItems={taskItems} />
    <TaskCreator callback={createNewTask} />
    <table className='table table-striped table-bordered'>
    <thead>
       <tr>                               
        <th>Descripcion</th>
        <th>Completada</th>
      </tr>
    </thead>
     <tbody>
       {taskTableRows(false)}
     </tbody>
    </table>

    <div className='bg-secondary text-white text-center p-2'>
    <VisibilityControl 
      description="Tareas Completadas"
      isChecked={showCompleted}
      callback={checked => setShowCompleted(checked)}
    />

    </div>
      {
        showCompleted && (
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <td>Descripcion</td>
              <td>Completada</td>
            </tr>
          </thead>
          <tbody>{taskTableRows(true)}</tbody>
        </table> )
      }


    </div>
  );
}

export default App;

