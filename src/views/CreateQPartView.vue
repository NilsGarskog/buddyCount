<template>
  <body>
    <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
    <h1>Write questions here:</h1>

    <input type="text" v-model="question" placeholder="Write a question..." id="questionInputField">
       <img src="../Icons/addButton.png" class="signButton" id="addButton" v-on:click="addQuestion">
    <div class="showQuestions">
      <div v-for="question in questions" v-bind:key="question" class="writtenQuestions">
         {{question.q}} 
        <img src="../Icons/DeleteButton.png" class="signButton" id="delButton" v-on:click="delQuestion(question.i)">
      </div>
    </div>



    <router-link v-bind:to= " '/guessQuestion/' + lang + '/' + pollId + '/' + playerId ">
    <button class="continueButton" v-if="this.playerId === '1'">Questions are done</button>
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

    this.pollId = this.$route.params.id;
    this.lang = this.$route.params.lang;
    this.playerId = this.$route.params.playid;
    socket.emit('joinPoll', this.pollId)
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>           //Oklart om denna behövs?
      this.data = data
    )



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

<style scoped>
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
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 12px;
  position: relative;
  text-align:center;

}

.continueButton {
position: absolute;
bottom: 0.5em;
left:20px;
right:20px;
width: calc(100% - 40px);
}

.button:hover {
  background-color: #67b3a5b7;
}

.signButton{

  border:none;
  color: greenyellow;
  width: 2em;
  height: 2em;
  margin-left: 2em;
  font-size: 1em;
  font-weight: bold;
  position: relative;
}
#delButton{
  margin-right: 0px;
  right: 1em;
  position: absolute;
}
#addButton{
  top: 4.5em;
  right: 0.2em;
  height: 3em;
  width: 3em;
  position: absolute;
}
.showQuestions{
  font-family: Righteous;
  font-weight: 600;
  font-size: 1.2em;
  text-align:left;
  margin-left: 1em;
  margin-top: 2em;
  color:white;
  width: 100%;

  
}
.writtenQuestions{
 margin-bottom: 1em;
  border-style: outset;
  background-color: #16534188;
 border-color: black, red;

}

#questionInputField{
  font-family: Righteous;
  font-size: 1.5em;
  font-weight: 600;
  background-color: #67b3a5b7;
  border:none;
  border-bottom: 2px solid black;
  width: 60%;
  
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

/* @media screen and (max-width:50em) {
.showQuestions{
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 1em;
  font-weight: 600;
  align-items: center;
  text-align:left;
  margin-top: 2em;
  margin-right: 1em;
  margin-left: 1em;
  color:white;
  
}
} */
</style>