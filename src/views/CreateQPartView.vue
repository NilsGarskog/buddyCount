<template>
  <body>
    
    <h1>Write questions here</h1>
    <input type="text" v-model="question">
        <button v-on:click="addQuestion">
      Add question
    </button>
    <div class="showQuestions">
      <div v-for="question in questions" v-bind:key="question">
        {{question.q}}
        <button 
        v-on:click="delQuestion(question.i)"> - </button>
      </div>
    </div>

  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
name: 'CreateQPartView',
  data: function () {
    return {
      lang: "",
      pollId: "",
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
      this.questions.push( {q: this.question, i: this.Qid });
      console.log(this.question)
      console.log(this.questions)
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, i: this.Qid } ) 
      
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
}
</style>