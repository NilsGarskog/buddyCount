<template>
  <body>
    <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
    <h1>Write questions here</h1>
    {{players}} {{this.players[0].playerId}}
    <input type="text" v-model="question" placeholder="Write your question" id="questionInputField">
        <button v-on:click="addQuestion" class="signButton" id="addButton">
      +
    </button>
    <div class="showQuestions">
      <div v-for="question in questions" v-bind:key="question">
        {{question.q}}
        <button 
        v-on:click="delQuestion(question.i)" class="signButton" id="delButton"> - </button>
      </div>
    </div>



    <router-link v-bind:to= " '/chooseplayer/' + lang + '/' + pollId + '/' + playerId ">
    <button >Move on bitch!</button>
  </router-link>

  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
name: 'CreateQPartView',
  data: function () {
    return {
      players: [],
      lang: "",
      pollId: "",
      playerId: "",
      question: "",
      questions: [],
      answers: ["", ""],         ////Oklart om denna behövs?
      questionNumber: 0,
      data: {},
      uiLabels: {},
      Qid: 0
    }
  },
    created: function () {

    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang;
    this.playerId = this.$route.params.playid;
    socket.emit('joinPoll', this.pollId)
    socket.emit("pageLoaded", this.lang);
    socket.on("sendPlayers", (playerArray) => {
      this.players = playerArray
    })
    socket.emit("getPlayers", this.pollId);

    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>           //Oklart om denna behövs?
      this.data = data
    )


    },

    mounted: function () {
      this.$nextTick(function () {
      console.log('mounted is called')
      if (this.players[0].playerId != 1){
        socket.emit('removeParticipant', {pollId: this.pollId, playerId: this.playerId})
        socket.emit("addParticipant", {pollId: this.pollId, playerId: 1})
        this.$router.push('/creatqpart/' + this.lang+'/'+this.pollId +'/'+ 1);
      }
      })
    },
    methods: {

    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
    addQuestion: function () {           //Lagt till fråge-id mm.
      this.Qid = Math.floor(100000 + Math.random() * 900000)
      if(this.question != ""){
      this.questions.push( {q: this.question, i: this.Qid });
      console.log(this.question)
      console.log(this.questions)
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, i: this.Qid } ) 
      this.question=""
      }
    },
    delQuestion: function (questionId){
      socket.emit("delQuestion", {pollId: this.pollId, i: questionId} ) 
      for(let index=0; index<this.questions.length; index++){
        if(this.questions[index].i == questionId){
          this.questions.splice(index,1)
          
        }
      }
    },
    runQuestion: function () {           //Oklart om denna behövs?
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
}
}
</script>

<style>
body{
    position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  font-family: Righteous;
  color: white;
}
button {
  height: 5em;
  width: 9em;
  background-color: #78df73;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 20px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 12px;
  position: relative;
  text-align: center;
}

.button:hover {
  background-color: #67b3a5b7;
}

.signButton{
  background-color: green;
  border-radius: 50%;
  border:none;
  color: greenyellow;
  width: 2em;
  height: 2em;
  margin-left: 2em;
  font-size: 1em;
  font-weight: bold;
}
#delButton{
  background-color: red;
  color: rgb(231, 166, 68);
}
.showQuestions{
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 16px;
  font-weight: 600;
  align-items: center;
  text-align:right;
  margin-top: 2em;
  margin-right: 34em;
  color:white;
  
}
#questionInputField{
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 16px;
  font-weight: 600;
  background-color: #67b3a5b7;
  border:none;
  border-bottom: 2px solid black;
}
input {
    
    width: 400px;
    padding: 0 20px;
}
::placeholder{
  color:rgba(255, 255, 255, 0.516);
  
  text-align: center;
  overflow:visible;
 
}


#createGameButton{

   position:absolute; 
   margin-left:-50px;
   left:50%;
   width:100px;
   bottom:2em;
  
}
</style>