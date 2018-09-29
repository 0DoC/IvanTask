import React from 'react';
import { AllTasks } from './AllTasks';

class DataHolder extends React.Component {
    constructor(props) {
        super(props);
        window.addEventListener('storage', this.updateTasks);
        this.state = {
            dataArray: [],
            query: '',
            seconds: 0,
            controller: '',
            isPaused: true,
            text: 'Play',
            allTasks: [''],

        };
    }
    componentWillMount() {
        if (JSON.parse(localStorage.getItem('tasks'))) {
            var newTasks = JSON.parse(localStorage.getItem('tasks'));
        }
        else {
            var newTasks = ['0'];
        }
        this.setState({
            allTasks: newTasks
        });
    }
    isPausedState = () => {
        this.setState(prevState =>
            ({isPaused: !prevState.isPaused})
        );
    };
    handleInputChange = (event) => {
        this.state.query = event.target.value;
        this.setState({query: this.state.query});
    };
    handleProjectName = (event) => {
        this.state.projectName = event.target.value;
        this.setState({projectName: this.state.projectName});
    };
    handleSearch = (event) => {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      let searchQuery = event.target.value.toLowerCase();
      let displayedTasks = tasks.filter((el)=>{
          let searchName = el.TaskTitle.toLowerCase();
          return searchName.indexOf(searchQuery) !== -1;
      });
      this.setState({allTasks:displayedTasks})
      }
    dataToLocal() {
        let titleName = this.state.query;
        let projectName = this.state.projectName;
        let currentSeconds = this.state.seconds;
        let id = Date.now();
        this.state.dataArray.push({TaskTitle: titleName, ProjectName: projectName, Time: currentSeconds, id:id});
        localStorage.setItem('tasks', JSON.stringify(this.state.dataArray));
    }
    tick = () => {
        this.setState((prevState) => ({seconds: prevState.seconds + 1}));

    };
    play = () => {
        if (this.state.isPaused) {
            this.timer = setInterval(this.tick, 1000);
        }
        this.isPausedState();
    };
    controlFunc = () => {
        if (this.state.isPaused) {
            this.play();
            this.setState({text: 'Stop'});
        }
        else {
            this.stop();
            this.setState({text: 'Play'});
        }
    };
    updateTasks() {
        let newTasks = JSON.parse(localStorage.getItem('tasks'));
        this.setState({
            allTasks: newTasks
        });
    }
    stop = () => {
        clearInterval(this.timer);
        this.dataToLocal();
        this.isPausedState();
        this.updateTasks();
        this.setState({
            seconds: 0
        });
    };
    render() {
        return (
            <div>
              <div className="controlPanel">
                <label>Task Title</label>
                  <input type="text" id="taskTitle" onChange={this.handleInputChange}/>
                <label>Project Name</label>
                  <input type="text" id="projectName" onChange={this.handleProjectName}/>
                <button onClick={this.controlFunc} value="start">{this.state.text}</button>
                <h4>Уже прошло {this.state.seconds} секунд</h4>
              </div>
              <div><input type="text" id="search" onChange={this.handleSearch}/></div>
              <div className="allTasks">
              <h3>Completed Tasks</h3>
                <AllTasks
                    updateTasks={this.updateTasks}
                    allTasks={this.state.allTasks}
                />
              </div>
            </div>
        );
    }
}

export default DataHolder
