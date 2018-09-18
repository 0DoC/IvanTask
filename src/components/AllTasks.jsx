import React from 'react';
import { Task } from './Task';

export const AllTasks = (props) => props.allTasks.map((task, index) =>
    <Task
        key={index}
        titleName={task.TaskTitle}
        projectName={task.ProjectName}
        currentSeconds={task.Time}
    />
)
