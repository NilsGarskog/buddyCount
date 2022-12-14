<template>
    <body >
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet' type='text/css' >

        <div>
        {{GuessObj}}
        <h1 class="title">Bra jobbat!!</h1> 
        </div>
        <div class="amountOfPoints">
            <button v-on:click="checkAnswer">
                Tryck här
            </button>
             Du har just nu: {{points}} poäng
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
    GuessObj:[]    
    }

},

created: function () {
   this.pollId = this.$route.params.id
   this.lang = this.$route.params.lang;
   this.playerId = this.$route.params.playid;
   socket.emit('joinPoll', this.pollId);
   socket.emit("pageLoaded", this.lang);
   socket.on("CurrentGuesses", (guessOBJ) => {
      this.GuessObj = guessOBJ
  })
  socket.emit("getCurrentGuess", this.pollId)
   socket.on("init", (labels) => {
      this.uiLabels = labels
  })
   socket.on("dataUpdate", (data) =>           //Oklart om denna behövs?
      this.data = data
    )
    },

    methods: {
checkAnswer: function() {
    for(let guessedQ of this.player1G){
        for(let player of guessedQ){
            for(let playerA of this.playersA){
                if(playerA.pID == player.gO.p){
                    for(let answerObject of playerA.answers){
                        if(answerObject.q == guessedQ[0].q){
                            if(answerObject.a == player.gO.g){
                                this.points++
                                console.log(this.points)
                            }
                        }
                    }
                }
            }
        }
    }
}
   }
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

