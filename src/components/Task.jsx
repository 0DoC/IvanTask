import React from 'react';

export const Task = ({titleName, projectName, currentSeconds, id}) =>

    <div>
        <div className="task-description">
            TaskName:<h6>{titleName}</h6>
            ProjectName: <h6>{projectName}</h6>
            Time:<h6>{currentSeconds}</h6>
            <button>click</button>
        </div>
    </div>;
