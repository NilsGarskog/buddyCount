<template>
  <body>
    <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
    <h1>Write questions here:</h1>

    <input maxlength="60" type="text" v-model="question" placeholder="Write a question..." id="questionInputField">
       <img src="../Icons/addButton.png" class="signButton" id="addButton" v-on:click="addQuestion" v-bind:style= "[(this.questions.length < 3) ? {opacity: 1} : {opacity: 0.3}]">
    <div class="showQuestions">
      <div v-for="question in questions" v-bind:key="question" class="writtenQuestions">
         <span class="Qtext"> {{question.q}}  </span>
        <img src="../Icons/DeleteButton.png" class="signButton" id="delButton" v-on:click="delQuestion(question.i)">
      </div>
    </div>



    <router-link v-bind:to= " '/answerq/' + lang + '/' + pollId + '/' + playerId ">
    <button class="continueButton" v-if="this.playerId === '1'" v-on:click = continueEmit()>Start game</button>
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
    socket.on("goToNextPage", () => {
      this.$router.push('/answerq/' + this.lang+'/'+this.pollId +'/'+ this.playerId);
    })



    },

    methods: {

    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
      continueEmit: function(){
      socket.emit('goToNextPage', this.pollId)
    },
    addQuestion: function () {           //Lagt till fråge-id mm.
      if (this.questions.length < 3){
      this.Qid = Math.floor(100000 + Math.random() * 900000)
      if(this.question != ""){
      this.questions.push( {q: this.question, i: this.Qid });
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, i: this.Qid } ) 
      this.question=""
      }
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
  color: black;
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
bottom: 3em;
left:20px;
right:20px;
width: calc(100% - 40px);

}

.button:hover {
  background-color: #67b3a5b7;
}

.signButton{

  width: 2em;

}
#delButton{
  right: 1em;
  margin-top: -0.1em;
  position: absolute;
}

#addButton{
  top: 4.5em;
  right: 0.2em;
  height: 3em;
  width: 3em;
  position: absolute;
  border-radius: 1.5em;
}

.showQuestions{
  font-family: Righteous;
  font-size: 1.2em;
  text-align:left;
  margin-left: 1em;
  margin-top: 2em;
  color:white;
  width: 100%;


}

.Qtext{
position: absolute;
margin-top: 0.3em;
max-width:77vw;
word-wrap:break-word;

}
.writtenQuestions{
 margin-bottom: 1em;
  border-style: outset;
  background-color: #16534188;
 border-color: black, red;
  min-height: 2.8em !important;
 margin-right: 1.5em;
  padding: 0.4em;
  margin-top: -0.5em;
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