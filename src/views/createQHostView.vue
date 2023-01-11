<template>
<body>
  <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
  <div class ="headerContainer">
      <div class ="gameCode">
    <p>{{ uiLabels.codeCreateQHost }} {{pollId}}</p>
  </div>
    <div id="hideQuestions">
  <img class="hideEye" :src="hidePic" v-on:click="hideQuestion" > 
  </div>
  </div>
<h1 class ="questionTitle">{{uiLabels.questionCreateQHost}}</h1>
<div class="questions">
<div v-if="!hide">
    <div v-for= "question in questions" v-bind:key="question"> <!--En loop över de "fråge objekten""-->
            {{question.q}}
                <hr style="width:50%;">


            
  </div>
  </div>
  <div v-else>
    <div v-for="(question,index) in questions"
    v-bind:key="question">
    {{uiLabels.questionHide}} {{index+1}}
    <hr style="width:50%;">
  </div>
  </div>
  </div>

</body>

</template>


<script>
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'CreateQHostView',
  data: function () {
    return {
      lang: "en",
      pollId: "",
      questionObject: "",
      questions: "", /* la till en tom array*/
      data: {},
      uiLabels: {},
      hide: true,
      hidePic: require('../Icons/eyeOpen.svg')
    }
  },
    created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang

      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })

    socket.emit('joinPoll', this.pollId)
    socket.on("questionUpdate", (update) => {       //Funktion för att hämta fråge-array /Nils
      this.questions = update;
    });
    socket.on("goToNextPage", () => {
      this.$router.push('/AnswerQHost/' + this.lang+'/'+this.pollId);
    })

  },
    methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },

    hideQuestion: function(){
      if(this.hide){
        this.hide=false
        this.hidePic=require('../Icons/eyeClosed.svg')
      }
      else{
      this.hide = true
      this.hidePic = require('../Icons/eyeOpen.svg')
      }
      
      
    },
    moveOn: function () {
      socket.emit('goToNextPage', this.pollId)
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
    cursor:default;
}
.questionTitle {
font-family: 'monoton';
font-size: 5em;
margin-top: -1em;
font-weight: 300;
cursor:default;
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
  height:8.5em;
  width: 8.5em;
  cursor: pointer;
  margin-right: -100px;
  margin-top:-20px;
  opacity: 0.7;
  transition: 0.3s;
}

.hideEye:hover {
  opacity: 1;
  transition:0.3s;
  height:9em;
  width:9em;
}

#footer {
  
  position: absolute;
  bottom: 10%;
   width: 100%;
}

.startGameButton {
    font-family: Righteous;
    font-size: 2.5em;
    margin-top: 0.5em;
    padding: 0.5em;
    border: 1px solid;
    border-radius: 20px;
    background-color: #046B79;
    color: white;
    transition: 0.2s;
    box-shadow: 0px 5px 4px #046B79;
}
.startGameButton:hover {
    background-color: #00acae;
    transition: 0.2s;
    cursor: pointer;
}
</style>