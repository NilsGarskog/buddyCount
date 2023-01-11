<template>
  <body>
    <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
    <h1>{{uiLabels.QuestionPrompt}}</h1>
    <div class="writeQ">
    <input maxlength="60" type="text" v-model="question" :placeholder="uiLabels.QuestionPromptPlaceholder" id="questionInputField">
       <img src="../Icons/plusButton.svg" class="signButton" id="addButton" v-on:click="addQuestion" v-bind:style= "[(this.questions.length < 3) ? {opacity: 1} : {opacity: 0.3}]">
    </div>
       <div class="showQuestions">
      <div v-for="question in questions" v-bind:key="question" class="writtenQuestions">
         <span class="Qtext"> {{question.q}}  </span>
        <img src="../Icons/closeNewBlack.svg" class="signButton" id="delButton" v-on:click="delQuestion(question.i)">
      </div>
    </div>

    <div v-if="popupTriggers.buttonTriggerHost && this.playerId === '1'">
  <PopUp class="popup"
        v-bind:PopUp="PopUp"
        v-bind:key="PopUpFonster"
        v-on:closeCurrentPopup="togglePopup()"
      >
      <div class = "popuphost">
      <h1 id="hostTitle">{{uiLabels.remember}}<br>{{uiLabels.hostRemember1}}</h1>
<h2 class="hostTitle2">{{uiLabels.hostRemember2}}<br>{{uiLabels.hostRemember3}}<br>{{uiLabels.hostRemember4}}<br>{{uiLabels.hostRemember5}}</h2>


<button class="gotItButton" v-on:click="togglePopup()">{{uiLabels.okGotIt}}</button> 
</div>
</PopUp>
</div>

    <router-link v-bind:to= " '/answerq/' + lang + '/' + pollId + '/' + playerId ">
      <div class="buttonCont">
    <button class="continueButton" v-if="this.playerId === '1'" v-on:click = continueEmit()>START!</button>
  </div>
  </router-link>

  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();
import PopUp from "../components/PopUp.vue";
import { ref } from "vue";

export default {
name: 'CreateQPartView',

components: {
    PopUp,
  },

  setup() {
    const popupTriggers = ref({
      buttonTriggerHost: true,
    });
    return {
      popupTriggers,
      
    };
  },
  data: function () {
    return {
      players: [],
      lang: "en",
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
      socket.emit('goToNextPage', this.pollId);
      this.$router.push('/answerq/' + this.lang+'/'+this.pollId +'/'+ this.playerId);
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
    },
    togglePopup: function () {
     
     this.popupTriggers.buttonTriggerHost =
       !this.popupTriggers.buttonTriggerHost;
       this.popUpClosed = true;
   
 },
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

h1 {
    margin-top: 200px;
    font-size: 30px;
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

.gotItButton {
font-family: Righteous;
color: white;
background-color: #046B79;
font-size:23px;
width: 200px;
height: 70px;
box-shadow: 0px 7px 10px #063d45;
border: 1px solid white;
margin-bottom:20px;
margin-top:10px;
transition: 0.2s;
}

.signButton{

  width: 2em;

}
#delButton{
  right: 1em;
  margin-top: 0.1em;
  width:50px;
  height:50px;
  position: absolute;
  cursor: pointer;
}

#addButton{
  top: 4.5em;
  right: 0.2em;
  height: 3em;
  width: 3em;
  position: absolute;
  border-radius: 1.5em;
  margin-right:195px;
  margin-top: 177px;
}

#addButton:hover{
  cursor:pointer;
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
max-width:77vw;
word-wrap:break-word;
align-self: center;

}
.writtenQuestions{
 margin-bottom: 1em;
  border-style: solid;
  border-radius:10px;
  background-color: #16534188;
 border-color: black, red;
  min-height: 2.8em !important;
 margin-right: 1.5em;
  padding: 0.4em;
  margin-top: -0.5em;
  display: flex;
  align-content: center;


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

.writeQ{
  display:flex;
  justify-content: center;
}

#hostTitle {
    margin-top:20px;
    font-size:3em;
  }

  .hostTitle2, .hostTitle3 {
    font-size:1.5em;
    color:white;
  }

@media (max-width: 450px){

  .popupinner {
    height:10%;
  }
  
  h1 {
    margin-top: 95px;
    font-size: 30px;
  }

  #hostTitle {
    margin-top:20px;
    font-size:30px;
  }

  .hostTitle2, .hostTitle3 {
    font-size:15px;
  }

  #questionInputField {
    margin-top: 15px;
    margin-right:40px;
  }

  #addButton {
    margin-top:87px;
    margin-right:17px;
  }

  #delButton {
    margin-top: 7px;
    margin-right:0px;
    width:40px;
    height:40px;
  }
}

@media (min-width: 600px) {
  .continueButton:hover {
background-color: #00acae;
transition: 0.2s;
cursor: pointer;
}
}
@media (min-width:600px){


  .gotItButton:hover, .click:hover {
background-color: #00acae;
transition: 0.2s;
cursor: pointer;

  }
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