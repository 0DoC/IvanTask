import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

class DataHolder extends React.Component{
    constructor(props){

      super(props);
      window.addEventListener('storage', this.updateTasks);
      this.state = {
        dataArray:[],
        query:'',
        seconds:0,
        controller:'',
        isPaused:true,
        text:'Play',
        allTasks:[''],

      }
    }

    componentWillMount(){
      if(JSON.parse(localStorage.getItem('tasks'))){
      var newTasks = JSON.parse(localStorage.getItem('tasks'));}
      else{
        var newTasks = ['0'];
      }
      this.setState((allTasks)=>{return {allTasks:newTasks};});
    }
    isPausedState = () =>{
      this.setState((prevState) => {
        return{ isPaused: !prevState.isPaused};
      });
    }
    handleInputChange = (event) => {

      this.state.query= event.target.value;
      this.setState({query: this.state.query});
    }
    handleProjectName = (event) =>{
      this.state.projectName = event.target.value;
      this.setState({projectName: this.state.projectName});
        }
    dataToLocal(){
      let titleName = this.state.query;
      let projectName = this.state.projectName;
      let currentSeconds = this.state.seconds;
      this.state.dataArray.push({TaskTitle:titleName,ProjectName:projectName, Time:currentSeconds});
      localStorage.setItem('tasks',JSON.stringify(this.state.dataArray));

    }
    tick=()=>{

        this.setState((prevState) => {
          return{ seconds: prevState.seconds + 1};
        });
    }
    play=()=>{
     if(this.state.isPaused){
       this.timer = setInterval(this.tick, 1000);
     }
     this.isPausedState();
   }
  controlFunc = () =>{
    if(this.state.isPaused){
      this.play();
      this.setState({text:'Stop'});
    }
    else{
      this.stop();
      this.setState({text:'Play'});
    }
  }
  updateTasks(){
    var newTasks = JSON.parse(localStorage.getItem('tasks'));

            this.setState((allTasks)=>{return{allTasks:newTasks};});

  }
  mountedWhen(){
    this.updateTasks;
        console.log(this.state.newTasks);
  }

   stop=()=>{
     clearInterval(this.timer);
     this.dataToLocal();
     this.isPausedState();
     this.updateTasks();
     this.setState((seconds)=>{
       return{seconds : 0};});
   }

  render(){

    return(
      <div>
      <AllTasks
      updateTasks = {this.updateTasks}
      allTasks = {this.state.allTasks}
      />
        <label>Task Title</label><input type="text" id="taskTitle" onChange={this.handleInputChange}></input>
        <label>Project Name</label><input type="text" id="projectName "onChange={this.handleProjectName} ></input>
        <button onClick={this.controlFunc} value="start">{this.state.text}</button>
            <h4>Уже прошло {this.state.seconds} секунд</h4>
                     <button onClick={this.stop}>Stop</button>
      </div>
  )
  }
}
function Task(props) {
  return <div><h1>{props.titleName}{props.projectName} time:{props.currentSeconds}</h1><button onClick>click</button></div>;
}
class AllTasks extends React.Component{

  resume(){
    var taskIndex = Task.key;
    
  }
    render(){

      return this.props.allTasks.map((task,index) =>
      <Task
       key={index}
         titleName={task.TaskTitle}
         projectName={task.ProjectName}
         currentSeconds={task.Time}

      />
    )}
}

class Timer extends React.Component{

  constructor(props) {
          super(props);
          this.state = {
              seconds: 0,
              start: 'Start',

              isPaused: true,
              dataArray:[],
              query: '',
          };
      }



 componentWillUnmount(){
     clearInterval(this.timer);
 }


 render(){
     return(
       <div>
         <DataHolder


                      />

         </div>
     );
 }
};

export default Timer;
