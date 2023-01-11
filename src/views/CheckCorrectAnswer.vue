<template>
    <body >
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet' type='text/css' >



        <h1 class="title"> {{uiLabels.goodwork}}</h1> 

        <div class="amountOfPoints">
            
           <div v-if="(loaded == true)">
             {{uiLabels.yougot}} {{points}} {{uiLabels.amount}}

            </div>
            </div>

  <router-link v-bind:to= " '/answerq/' + lang + '/' + pollId + '/' + playerId ">
      <div class="buttonCont">
    <button class="continueButton" v-if="this.playerId === '1'" v-on:click = continueEmit()>{{uiLabels.continue}}</button>
  </div>
  </router-link>

        
    </body>

</template>

<script>

import io from 'socket.io-client';
     const socket = io();

   

    
 export default {
   name: "CheckCorrectAnswer",
   components: {},
   
   data: function () {
     return {
        
        lang: "en",
        pollId: "",
        playerId: "",
        questionObject: "",
        questions: "", /* la till en tom array*/
        data: {},
        uiLabels: {}, 
        points: 0,
        
    
    GuessObj:[],

    answerTest: [],
    loaded: false,
    TotalPoints:"",
    pointsSent:false,

    }

},

created: function () {
   this.pollId = this.$route.params.id
   this.lang = this.$route.params.lang;
   this.playerId = this.$route.params.playid;
   socket.emit('joinPoll', this.pollId);
   socket.emit("pageLoaded", this.lang);
   socket.on("CurrentGuesses", (guessOBJ) => {
      this.GuessObj = guessOBJ;
    socket.emit('getAnswerForResult', this.pollId) 
  })
  socket.on("AnswersForResult", (update) => { 
        this.answerTest = update;
        if(this.pointsSent==false){
        this.checkAnswer();
        }
          });
    socket.emit("getCurrentGuess", this.pollId)

    

   /*socket.on('getPoints', (update) => { //denna ska scoreboard ha
    this.TotalPoints = update;
  });
  socket.emit('getPlayerPoints', this.pollId) //denna ska scoreboard ha 
  
*/
  
   socket.on("init", (labels) => {
      this.uiLabels = labels
  })
   socket.on("dataUpdate", (data) =>           //Oklart om denna behövs?
      this.data = data
    )
      socket.on("goToScoreBoard", () => {
      this.$router.push('/roundPlace/' + this.lang+'/'+this.pollId +'/'+ this.playerId);
    });
        socket.on("goToPodium", () => {
      this.$router.push('/roundPlace/' + this.lang+'/'+this.pollId +'/'+ this.playerId);
    });

    },

    methods: {
checkAnswer: function() {
    for(let element of this.GuessObj){
        if(element.playerId== this.playerId){
            for(let GO of element.guessObject){
                let guessP= GO.playerID;
                for(let AO of this.answerTest){
                    if( AO.playerId==guessP){
                        if( AO.answer==GO.guess)
                        this.points++;
                    }
                }
            }  
        }
    }
    this.loaded=true;
    this.sendPoints();
    this.pointsSent =true;

},
 continueEmit: function(){
         socket.emit("goToScoreBoard",this.pollId)
         socket.emit("roundOver", this.pollId)
      this.$router.push('/answerq/' + this.lang+'/'+this.pollId +'/'+ this.playerId);
    },


sendPoints: function(){
    socket.emit("submitPoints", {pollId: this.pollId, pid: this.playerId, points: this.points})
}
   },
   

}


</script>

<style scoped>
body {
    position: fixed;
    background-color: #24a07b;
    font-family:Righteous ;
    width: 100vw;
    min-height: 100vh;
  
}
.title {
font-size: 4em;
margin-top: 2em;
font-weight: 300;
}
.amountOfPoints{
font-size: 2em;
margin-top: 2em;
font-weight: 300;
}
button {
  height: 5em;
  width: 14em;
  background-color: #78df73;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 20px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 2em;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 12px;
  position: relative;
  text-align:center;

}

.continueButton {
position: absolute;
font-family: Righteous;
bottom: 3em;
color: white;
background-color: #046B79;
width: 300px;
height: 100px;
box-shadow: 0px 7px 10px #063d45;
border: 1px solid white;
margin-bottom:50px;

}



.buttonCont {
display: flex;
width: 100%;
justify-content: center;
}

.button:hover {
  background-color: #67b3a5b7;
}

.signButton{

  width: 2em;

}

</style>

