<template>
    <body >
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet' type='text/css' >

        <div>
        {{GuessObj}}
        Svar: {{answerTest}}
        <h1 class="title">Bra jobbat!!</h1> 
        </div>
        <div class="amountOfPoints">
            
           <div v-if="(loaded == true)">
             Du har just nu: {{points}} poäng
             Av totatlt: {{TotalPoints}}
            </div>
        </div>
        
    </body>

</template>

<script>

import io from 'socket.io-client';
     const socket = io();

    // let player1A = {pID:1, answers:
    //     [{q:1,a:1},
    //     {q:2, a:2},
    //     {q:3, a:3}]} 

    // let player2A= {pID:2, answers:
    //     [{q:1,a:4},
    //     {q:2, a:5},
    //     {q:3, a:6}]} 

    // let player3A= {pID:3, answers:
    //     [{q:1,a:7},
    //     {q:2, a:8},
    //     {q:3, a:9}]} 

    
 export default {
   name: "CheckCorrectAnswer",
   components: {},
   
   data: function () {
     return {
        
        lang: "",
        pollId: "",
        playerId: "",
        questionObject: "",
        questions: "", /* la till en tom array*/
        data: {},
        uiLabels: {}, 
        points: 0,
        //playersA: [player1A,player2A,player3A],
    //     playersAnswers: [],
    //     player1G:[[
    //     {playerId: 4, q:1, gO: [{p:1,g:1}, {p:2,g:2},{p:3,g:3} ]}, //såhär ska det nog se ut, ändra lite i loopen sen
    //     {q:1, gO: {p:2,g:2}},
    //     {q:1, gO: {p:3,g:3}}
    // ],
    // [
    //     {q:2, gO: {p:1, g:4}},
    //     {q:2, gO: {p:2, g:5}},
    //     {q:2, gO: {p:3, g:6}}
    // ],
    // [
    //     {q:3, gO: {p:1, g:7}},
    //     {q:3, gO: {p:2, g:8}},
    //     {q:3, gO: {p:3, g:9}}
    // ]
    // ],
    GuessObj:[],

    answerTest: []  ,
       timerId: setInterval(this.timer, 1000),
       timeLeft: 10,
       sendTimer: false,
    answerTest: [], 
    loadedGuessObj: false,
    loadedAnsObj: false,
    loaded: false,
    TotalPoints:""

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
      this.loadedGuessObj = true;
      

  })
  socket.emit("getCurrentGuess", this.pollId)
  socket.on("AnswersForResult", (update) => { //Denna ska checkAnswerView ha, inte AnswerQView
            this.answerTest = update;
            this.loadedAnsObj = true;
            console.log("blir loadedAnsObj", this.loadedAnsObj)
            console.log("blir loadedGuessObj", this.loadedGuessObj)
            if(this.loadedGuessObj === true && this.loadedAnsObj === true){
        this.checkAnswer();
        console.log("kör jag checkAnswer")

    }
          });
    socket.emit('getAnswerForResult', this.pollId) //Denna ska checkAnswerView ha, inte AnswerQView

    

    socket.on('getPoints', (update) => { //denna ska scoreboard ha
    this.TotalPoints = update;
    console.log("Totalpoäng",this.TotalPoints)
  });
  socket.emit('getPlayerPoints', this.pollId) //denna ska scoreboard ha

  
   socket.on("init", (labels) => {
      this.uiLabels = labels
  })
   socket.on("dataUpdate", (data) =>           //Oklart om denna behövs?
      this.data = data
    )

  socket.on("goToPlaceDisplay", () => {
    this.$router.push('/roundPlace/' + this.lang+'/'+this.pollId + '/' + this.playerId);
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
                        console.log("mina poäng är:", this.points)
                    }
                }
            }  
        }
    }
    this.loaded=true
    this.sendPoints()

},
      timer: function(timerId){
        if (this.timeLeft == 0) {
          if(!this.sendTimer)
          {
            console.log("slut")
            socket.emit("goToPlaceDisplay",this.pollId)

            clearTimeout(timerId);
            timerId = null;
            this.sendTimer = true;
          }

        } else {
          console.log(this.timeLeft)
          return this.timeLeft--;
        }
      },


sendPoints: function(){
    console.log("kommer jag till sendAnswer?")
    socket.emit("submitPoints", {pollId: this.pollId, pid: this.playerId, points: this.points})
}
   },
   

}


</script>

<style>
body {
    background-color: #24a07b;
    font-family:Righteous ;
  
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

</style>

