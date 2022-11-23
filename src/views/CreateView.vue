<template>
  <body>
 <div>
  <button v-on:click="hideQuestion" id="hideButton">
    Hide questions
  </button>
    <!-- Poll link: 
    <input type="text" v-model="pollId">
    <button v-on:click="createPoll">
      Create poll
    </button>-->
    <div class="questionInput">
      
      <input type="text" v-model="question" placeholder="Input your question" id="questionInputField">
      <!--<div>
        Answers:
        <input v-for="(_, i) in answers" 
               v-model="answers[i]" 
               v-bind:key="'answer'+i">
        <button v-on:click="addAnswer">
          Add answer alternative
        </button>
      </div>-->
   
    <button v-on:click="addQuestion" id="submitButton">
      Submitt
    </button>
  </div>
  
  <div>
<div v-if="!hide">
    <div v-for= "question in questions" v-bind:key="question"> <!--Printar en loop över de angivna svaren-->
    {{question}}
  </div>
  </div>
 <div v-else>
    <div v-for="(question,index) in questions"
    v-bind:key="question">
    Question{{index+1}}
  </div>
  </div>
</div>
<div>
  <router-link v-bind:to="'/'">
   <!--<input type="number" v-model="questionNumber">-->
    <button v-on:click="runQuestion" id="createGameButton">
      Create Game
    </button>
  </router-link>
   <!-- {{data}} -->
    <!--<router-link v-bind:to="'/result/'+pollId">Check result</router-link>-->
    
  </div>
</div>

</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'CreateView',
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      questions: [], /* la till en tom array*/
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      hide: false,
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data)
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },

    hideQuestion: function(){
      if(this.hide){
        this.hide=false
      }
      else{
      this.hide = true
      }
      console.log(this.hide)
      
    },
    addQuestion: function () {
     /* socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } ) !!!!!!!! Denna ska ej vara avkodad senare!!!!!!!*/
     this.questions.push(this.question); /* lägger till nya frågorna i listan med frågor */
     this.question="" /* Nollställer frågefältet*/
     console.log(this.questions)
     
    },
    addAnswer: function () {
      this.answers.push("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
</script>
<style scoped>
body {
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
}


button {
  height: 3em;
  width: 6em;
  background-color: #78df73;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 17px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
}
.button:hover {
  background-color: #67b3a5b7;
}
.questionInput{
  margin-top: 100px;
  
  
}
#questionInputField{
  background-color: #67b3a5b7;
 
  border:none;
  border-bottom: 2px solid black;
}

#createGameButton{
  margin-top:300px
}
#hideButton{
  margin-left: 600px;
  
}
#submitButton{
  margin-left:10px;
  

}
</style>
