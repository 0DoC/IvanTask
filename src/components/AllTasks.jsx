import React from 'react';
import { Task } from './Task';

export const AllTasks = (props) => props.allTasks.map((task, index) =>
    <div className="task">
      <Task
          key={index}
          titleName={task.TaskTitle}
          projectName={task.ProjectName}
          currentSeconds={task.Time}
          id={task.id}
      />
    </div>
)
