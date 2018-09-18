import React from 'react';

export const Task = (props) =>
    <div>
        <h1>{props.titleName}{props.projectName} time:{props.currentSeconds}</h1>
        <button>click</button>
    </div>;
