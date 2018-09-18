import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Timer extends Component{

  constructor(props) {
          super(props);
          this.state = {
              seconds: 0,
              start: 'Start',
              buttonStates:[
                {
                  id:1,
                  name:'play'
                },
                {
                  id:2,
                  name:'stop'
                }
              ]
              isPaused: true,
          };
      }


 tick=()=>{

     this.setState((prevState) => {
       return{ seconds: prevState.seconds + 1};
     });
 }

 componentWillUnmount(){
     clearInterval(this.timer);
 }
 play=()=>{
  if(this.state.isPaused){
    this.timer = setInterval(this.tick, 1000);
  }
  this.state.isPaused = false;
}
pause=()=>{
  if(this.state.isPaused === false){
  clearInterval(this.timer);}
  this.state.isPaused = true;
}
stop=()=>{
  if(this.state.isPaused === false){
    let saveTime = this.state.seconds;
    localStorage.setItem('date',saveTime);
  clearInterval(this.timer);}
  this.state.isPaused = true;
  this.setState(()=>{
    return{seconds : 0};});
}
 render(){
     return(
       <div>
         <h4>Уже прошло {this.state.seconds.toFixed(1)} секунд</h4>
         <button onClick={this.play}>{this.state.buttonStates[i].name}</button>
         <button onClick={this.pause}>{this.state.pause}</button>
         <button onClick={this.stop}>Stop</button>
         </div>
     );
 }
};


export default Timer;
