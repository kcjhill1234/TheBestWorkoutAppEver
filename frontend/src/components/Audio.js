import React, {useState, useRef, useEffect} from 'react';
import Beep from '../../beep.mp3'


function Timer (props){

    let AudioBeep = new Audio(Beep);

    let intervalId = useRef();


    // Clean Up.  If Timer is unmounted this will stop the interval
    useEffect(()=>{

        return ()=>{
            clearInterval(intervalId)
        }

    }  ,[])


    function playBeep(){

        console.log("playing beep")
        
        intervalId = setInterval(()=> AudioBeep.play(), 30000 )
        
    }

    function stopBeep(){
        clearInterval(intervalId)
    }


    return (
        <div>
            <button onClick={playBeep}>Play</button>  
            <button onClick={stopBeep}>Stop</button>
        </div>
    )

}


export default Timer


// Code for the for app.js

// import React, { Component } from 'react';
// import './App.css';
// import NavBar from "./components/nav";  // when we import the directory, Node looks for the index.js file.
// import Timer from "./components/Audio/audio.js";      


// function App (props){

//   return <div>
//     <NavBar />
  
//     <Timer/>

//   </div>
// }




// export default App;
