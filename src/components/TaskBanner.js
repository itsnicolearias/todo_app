import React from 'react'

export const TaskBanner = (props) => (

    <h4 className='bg-primary text-white text-center p-4'>
        Lista de tareas ({props.taskItems.filter(t => !t.done).length} pendientes)
    </h4>
)
  

