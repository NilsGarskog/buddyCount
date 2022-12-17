<template>
  <body>
    <component :is="interact" />
    <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
      <h1 class="heading">{{Qobj.question}} </h1>
{{randomAnswers}}
      {{GuessArray}}
  <section class="playerListContainer">
    <div class="playerList">
    <div v-for="(player) in GuessArray"
         v-bind:players="players" v-bind:key="player.image">
            <span class="playerNameInList">
          <img  class="avatarImage" :src="require('../Icons/'+player.avatarImg + '.png')" :key="player.image"/>
          
            <span id="name">{{player.name}}</span>
            
           
              <div class= "dropzone outer-dropzone" v-bind:id="player.playerId">
             
            </div>
            </span>
    </div>
    </div> 
  </section>
    
      <div class ="start-numbers numbers-div">
        <div class = 'drag-drop-cont'  v-for="answer in randomAnswers"
      v-bind:randomAnswers="randomAnswers" v-bind:key="answer">
        <div id="yes-drop" class="drag-drop">   
            {{answer}}
        </div>
      </div>
      </div>
  
    
    <button class='sendbutton' v-on:click="sendFunc()">SEND</button>
  
 

 
    </body>
</template>

<script>
/*import vSelect from 'vue-select'*/

import interact from "interactjs";
import io from 'socket.io-client';
const socket = io();

  const interval = setInterval(function() {
   this.showButton();
 }, 5000);

clearInterval(interval);

//! ============== DRAG HANDLING ================= //
// target elements with the "draggable" class
interact('.drag-drop')
  .draggable({
    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
      /*  modifiers: [
      interact.modifiers.restrictRect({
        restriction: '.dropzone',
        endOnly: true
      })
    ],    */
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
    /*   end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      } */
    }
  })

/* function endedDrag (event){
  console.log(event.target)
} */
interact('.drag-drop').draggable({
    
    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
       modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'body',
        endOnly: true
      })
    ],   
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
    /*   end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      } */
    }
  })

function dragMoveListener (event) {
  console.log(event)
  var target = event.target

  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy 
  
  //console.log('event')
  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
  //console.log(event)
  //console.log(event.currentTarget.innerHTML)
}

// this function is used later in the resizing and gesture demos
//window.dragMoveListener = dragMoveListener

// enable draggables to be dropped into this

interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.drag-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {

    // add active dropzone feedback
    event.target.classList.add('drop-active')
    console.log(event)


  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target
    console.log(event)
    
    /* if(event.currentTarget.id != "numberCont"){
      event.currentTarget.innerHTML = "";
    } */
    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    //draggableElement.textContent = 'In'
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    /* event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop') */
    if(event.currentTarget.innerHTML === ""){
   /*  event.currentTarget.classList.remove('correct-bg');
    event.currentTarget.classList.add('standard-bg'); */

    }
    //event.relatedTarget.textContent = 'Dragged out'
/*      if(event.currentTarget.id != "numberCont"){
      event.currentTarget.innerHTML = "";
    }  */
   console.log(event)
  },

  ondrop: function (event) {
    //event.relatedTarget.textContent = 'Dropped'
    //alert(event.relatedTarget.id + ' was dropped into ' + event.target.classList[1])
    console.log(event.currentTarget.innerHTML)
    console.log(event)
     if(event.currentTarget.innerHTML != event.relatedTarget.innerHTML
     && event.currentTarget.innerHTML == ""){
      event.currentTarget.appendChild(event.relatedTarget)
    /*   event.target.classList.remove('standard-bg')
      event.target.classList.remove('incorrect-bg')
      event.target.classList.add('correct-bg') */
    }
/*     else if(event.currentTarget.innerHTML == event.relatedTarget.innerHTML){
      event.target.classList.add('correct-bg')
      
    } 
    else{
      event.target.classList.remove('correct-bg')
      event.target.classList.remove('standard-bg')
      event.target.classList.add('incorrect-bg')} */
      //event.currentTarget.style.color="transparent"
    
   console.log(event.currentTarget.innerHTML)
 
  
    
    event.relatedTarget.style.transform = 'translate(0px,0px)' 
   event.relatedTarget.setAttribute('data-x',event.currentTarget.clientX)
   event.relatedTarget.setAttribute('data-y',event.currentTarget.clientY)

/*    event.currentTarget.setAttribute('data-x',0)
   event.currentTarget.setAttribute('data-y',0) */
   
    

    
  },
   ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  },
  
})

interact('.drag-drop-cont').dropzone({
  // only accept elements matching this CSS selector
  accept: '.drag-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.5,
  maxPerElement: 1,
  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
    console.log(event)
    
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target
    console.log(event)
    
    /* if(event.currentTarget.id != "numberCont"){
      event.currentTarget.innerHTML = "";
    } */
    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    //draggableElement.textContent = 'In'
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    /* event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop') */
    //event.relatedTarget.textContent = 'Dragged out'
/*      if(event.currentTarget.id != "numberCont"){
      event.currentTarget.innerHTML = "";
    }  */
   console.log(event.currentTarget.innerHTML)
  },
  ondrop: function (event) {
    //event.relatedTarget.textContent = 'Dropped'
    //alert(event.relatedTarget.id + ' was dropped into ' + event.target.classList[1])
    console.log(event.currentTarget.innerHTML)
    console.log(event)
     if(event.currentTarget.innerHTML != event.relatedTarget.innerHTML
     && event.currentTarget.innerHTML == ""){
      event.currentTarget.appendChild(event.relatedTarget)
     
    }
   
      //event.currentTarget.style.color="transparent"
    
   console.log(event.currentTarget.innerHTML)
   /*  this.showButton(); */

   event.relatedTarget.style.transform = 'translate(0px,0px)'
   event.relatedTarget.setAttribute('data-x',event.currentTarget.clientX)
   event.relatedTarget.setAttribute('data-y',event.currentTarget.clientY)

    
  },
   ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    //event.target.classList.remove('drop-target')
  },
  
})

/* function dragged (e) {
  e.target.style.transform = 'translate(0px, 0px)';
}
 */
/* interact('.drag-drop')
  .draggable({
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { 
      move: dragMoveListener,
      end: endedDrag }
  }) 

 */
 
export default {
name: "AnswerQuestionView",
        components: {
      interact,
        },



data: function () {
    return {
      drag: false,
        /* players: [
        {
          id: "Avatar_1",
          image: "Paul",
          name: "Nils"
        },
        {
          id: "Avatar_2",
          image: 'Jerome',
          name: "Pedro"
        },
        {
          id: "Avatar_3",
          image: 'NoFace',
          name: "Karin"
        },
        {
          id:"Avatar_4",
          image: 'Mononoke',
          name: "Pelle"
        },
        {
          id: "Avatar_5",
          image: 'ScareCrow',
          name: "Lotta"
        },
              ], */
      items:[
      { id: 1, title: '24'},
      { id: 2, title: '54'},
      { id: 3, title: '11'},
      { id: 4, title: '2'},
      { id: 5, title: '3'},

    ],
    showButtonBoolean: false,
    //timerobj: null,
    pollId:"",
      lang:"",
      playerId:"",
      answerArray:[],
      players:[],
    GuessArray:[],
    randomAnswers:[],
    Qobj:{},
    loadedOnce:false,

    }
},

created(){
  this.pollId = this.$route.params.id;
  this.lang = this.$route.params.lang;
  this.playerId = this.$route.params.playid;
  socket.emit('joinPoll', this.pollId)
  socket.on("currentQuestion", (update) => {       //Funktion för att hämta Spelarobjekt från korrekt rum
    this.Qobj = update
    socket.emit('getPlayers', this.pollId)
    });
  
  socket.on("sendPlayers", (update) => {       //Funktion för att hämta Spelarobjekt från korrekt rum
    this.players = update;
    console.log(this.players)
    if (this.loadedOnce === false){
      this.GuessArray = createGuessArr(this.players, this.playerId)
      this.randomAnswers = randomAns(this.Qobj.answersArray, this.randomAnswers, this.playerId)
      this.loadedOnce = true;
    }
    });
  socket.emit("getCurrentQuestion", this.pollId)
 /*  socket.on("goToResultPage", () => { 
    this.$router.push('/CheckCorrectAnswer/' + this.lang+'/'+this.pollId +'/'+ this.playerId);
    }); */
},
  


methods: {
  print: function(){
    console.log("click")
  },

  cleanDiv(divId) {
      let Id = document.querySelector("#"+divId);
      Id.innerHTML = "";
      console.log("click")


  
},

   timerstart() {
    this.timerobj = setInterval(() => {
      this.showButton()
    },1000)
  },
 
/* !--ANVÄNDS INTE JUST NU--! */

  showButton: function(){
    console.log('hej')
    let noEmpty = true;
    for(let i = 0; i<this.players.length;i++){
      let playId = "."+this.players[i].id;
      console.log(playId)
      let dropDiv = document.querySelector(playId);
      console.log(dropDiv.innerHTML);
       if(dropDiv.innerHTML == ""){
        console.log('empty')
        noEmpty = false;
        dropDiv.style.background = '#046B79'
      }
      else{
        dropDiv.style.background = '#55ed6e'
      }    
    }
    if(noEmpty){
      this.showButtonBoolean = true;
    }
    else{
      this.showButtonBoolean = false;
    }
   return noEmpty
  },
  sendFunc: function (){
  
  console.log("send!")
  for (var i = 0; i < this.GuessArray.length; i++){
   
    let id = this.GuessArray[i].playerId
    let getGuess = document.getElementById(''+id+'')
    console.log(getGuess) 
    var obj = {playerID: this.GuessArray[i].playerId, guess: getGuess.innerText }
    this.answerArray.push(obj);
  }
  socket.emit("PlayerGuessAnswer", {pollId: this.pollId, guessObj: {playerId: this.playerId, guess: this.answerArray}})
  console.log( {pollId: this.pollId, guessObj: {playerId: this.playerId, guess: this.answerArray}})
  },


},
 beforeUnmount(){
  clearInterval(this.timerstart)
}, 
}
function randomAns (ans, randAns, id){
  console.log(ans.length)
  for (var i = 0, l = ans.length; i < l; i++){
      if (ans[i].playerId != id){
    randAns.push(ans[i].answer)
      }
  }
  randAns.sort(() => Math.random() - 0.5);
  return randAns
}

function createGuessArr (players, id){
  var GuessArray = []
  
  for (var i = 0, l = players.length; i < l; i++){
       if (players[i].playerId != id){
        var obj = {playerId: players[i].playerId, name: players[i].name, avatarImg: players[i].avatar[0].image, Guess:""}
        GuessArray.push(obj)
        }
}
  return GuessArray
}


</script>

<style scoped>
body{
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  cursor: default;
  font-family: Righteous;
}

h1 {
  font-size:3em;
}

h2 {
  margin-bottom:2em;
}
.gridwrapper {
  height:50%;
}

.playerGrid{
  display: grid;

  grid-template-columns: 0.3fr 1fr 0.3fr 0.3fr 1fr 0.3fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;

    gap: 0px;
   height: 50%;

}

.avatar1 {
  grid-column-start: 1;
  grid-column-end: 2;

  grid-row-start: 1;
  grid-row-end: 6;

}

.name1 {
    grid-column-start: 2;
  grid-column-end: 3;

  grid-row-start: 1;
  grid-row-end: 6;
}

.dropBox1 {
      grid-column-start: 3;
  grid-column-end: 4;

  grid-row-start: 1;
  grid-row-end: 6;
}

.avatar2 {
        grid-column-start: 4;
  grid-column-end: 5;

  grid-row-start: 1;
  grid-row-end: 6;
}

.name2 {
          grid-column-start: 5;
  grid-column-end: 6;

  grid-row-start: 1;
  grid-row-end: 6;
}

.dropBox1 {
            grid-column-start: 6;
  grid-column-end: 7;

  grid-row-start: 1;
  grid-row-end: 6;
}


.playerList {
    text-align: left;
    width: 100%;
    height: auto;
    font-family: Righteous;
    font-weight: 100;
    font-size: 3em;
    padding-top: 0;
    overflow: visible;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-evenly;
}

.playerListContainer {
    display: flex;

    
}
.avatarImage {
    width: 1em;
    height: 1em;
    margin-right:0.5em;

}
.dropzone{
  background-color: #046B79;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0px 5px 4px #046B79;
  width: 3em;
  -ms-touch-action: none;
  touch-action: none;
}



.start-numbers {
  display: flex;
  flex-direction: row;
  justify-content: center;

}




.drag-drop-cont {
  background-color:#046B79;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0px 5px 4px #046B79;
  color: #fff;
  height:2em;
  width: 2em;
  margin: 1em;
  font-size:2em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  -ms-touch-action: none;
  touch-action: none;

}

.playerNameInList {
  display: flex;

  justify-content: space-between;
  margin-bottom: 0.5em;

}

#name {
  width:100%;
}

.correct-bg {
    background-color: #55ed6e;
}

.standard-bg {
  background-color: #046B79;
}

.incorrect-bg {
  background-color: #df4e4e;
}
 .outer-dropzone {
  display:flex;
  justify-content: center;
  position: relative;
 }

 #yes-drop {

z-index: 100;

 }

.sendbutton {
  background-color: #046B79;
  font-family: Righteous;
  font-size: 2em;
  color: white;
  border: 1px white solid;
  border-radius: 5px;
  box-shadow: 0px 5px 4px #046B79;
  

}

.sendbutton:hover {
  cursor: pointer;
}
</style>
