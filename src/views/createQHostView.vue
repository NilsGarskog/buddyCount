<template>
<body>
  <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
  <div class ="headerContainer">
      <div class ="gameCode">
    <p>Code: {{pollId}}</p>
  </div>
    <div id="hideQuestions">
  <img class="hideEye" :src="hidePic" v-on:click="hideQuestion" > 
  </div>
  </div>
<h1 class ="questionTitle">Questions:</h1>
<div class="questions">
<div v-if="!hide">
    <div v-for= "question in questions" v-bind:key="question"> <!--En loop över de "fråge objekten""-->
            {{question.q}}
            
  </div>
  </div>
  <div v-else>
    <div v-for="(question,index) in questions"
    v-bind:key="question">
    Question {{index+1}}
  </div>
  </div>
  </div>
  <router-link v-bind:to="'/lobby/' + lang + '/' + pollId">
        <button role="button">
          <p class="buttonText">Start game</p>
        </button>
      </router-link>

</body>

</template>


<script>
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'CreateQHostView',
  data: function () {
    return {
      lang: "",
      pollId: "",
      questionObject: "",
      questions: "", /* la till en tom array*/
      data: {},
      uiLabels: {},
      hide: false,
      hidePic: require('../Icons/eyeOpen.png')
    }
  },
    created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {          //oklart om denna behvövs?
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("questionUpdate", (update) => {       //Funktion för att hämta fråge-array /Nils
      this.questions = update;
    });
    socket.on("newQuestion", update => {          //oklart om denna behövs?
      this.question = update.q;
      this.data = {};
    });
  },
    methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },

    hideQuestion: function(){
      if(this.hide){
        this.hide=false
        this.hidePic=require('../Icons/eyeOpen.png')
      }
      else{
      this.hide = true
      this.hidePic = require('../Icons/eyeClosed.png')
      }
      
      
    }
},
}

</script>


<style scoped>
.headerContainer {
    display:flex;
    justify-content: space-between;
    margin: 1em;
    margin-top: 0em;
}
.questionTitle {
font-family: 'monoton';
font-size: 5em;
margin-top: -1em;
font-weight: 300;
}
.questions{
  font-size: 2em;
  font-family: Righteous;
  padding: 1em;
  margin-top: 0;
}

.gameCode{
      font-size: 3em;
      font-family: righteous;
      font-weight: bold;
      color: white;
      width: 40%;
}

body{
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
}
#hideQuestions{
  display:flex;
  flex-direction: column;
  align-items:flex-end;
  width: 95%;
  margin-right: 7em;
  margin-top: 2em;
  cursor: pointer;
}
.hideEye{
  height:7em;
  width: 7em;
  cursor: pointer;
 
}
</style>