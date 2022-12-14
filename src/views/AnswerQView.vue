<template>
    <body>
      <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
      <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
      <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
      <PopUp
        v-bind:PopUp="PopUp"
        v-bind:key="PopUpFonster"
        v-if="popupTriggers.buttonTrigger"
      >
      <h1> All questions are answered!</h1>
      </PopUp>
    <div class="questions">
      <div v-if="loaded===true">
        {{questions[currentQ].q}}
      </div>
    </div>


      <div class="fieldPos">
      <div class="answerField">
        <img src="../Icons/minusButton.png" class="signButton" id="subButton"  v-on:click = "subtractNumber()" >
      <input v-model="answer" type="number" id="answerInputField" >
        <img src="../Icons/addButton.png" class="signButton" id="addButton" v-on:click = "addNumber()" >
        
      </div>
      </div>

    <button class="sendButton" v-on:click="sendBTNfunc(questions[currentQ].i)"> Send </button>

 <!-- <button v-on:click="addAnswer"> Svara</button> -->


  </body>
    
</template>
    
    
    <script>
    import PopUp from "../components/PopUp.vue";
    import io from 'socket.io-client';
    import { ref } from "vue";

    const socket = io();
    export default {
      name: 'AnswerQView',
      components: {
        PopUp,
      },
        setup() {
        const popupTriggers = ref({
          buttonTrigger: false,
        });
    return {
      popupTriggers,
    };
  },
      data: function () {
        return {
          lang: "",
          pollId: "",
          questionObject: "",
          question:"",
          questions: "", /* la till en tom array*/
          data: {},
          answer: 0,
          answers: [],
          uiLabels: {},
          currentQ: 0,
          playerId: "",
          loaded: false,
          answerTest: [],
        }
      },
        created: function () {
                    this.pollId = this.$route.params.id
          socket.on("allQuestions", (update) => {       //Funktion för att hämta fråge-array /Nils
          this.questions = update;
          this.loaded = true;
        });
        socket.on("allAnswers", (update) => { //Denna ska checkAnswerView ha, inte AnswerQView
          this.answerTest = update;
        });
        socket.emit('getQuestions', this.pollId)
        socket.emit('getAnswers', this.pollId) //Denna ska checkAnswerView ha, inte AnswerQView
          this.lang = this.$route.params.lang;
          this.playerId = this.$route.params.playid;
          socket.emit('joinPoll', this.pollId); //Ska jag ha denna?? funkar ej utan
          socket.emit("pageLoaded", this.lang);
          socket.on("init", (labels) => {
          this.uiLabels = labels
          });

      },
        methods: {
        /*createPoll: function () {
          socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
        },*/
        togglePopup: function () {
        this.popupTriggers.buttonTrigger = true;
    },
       
        addAnswer: function(){
            this.answers.push({a: this.answer, i: this.questions[this.currentQ].i}) /* Lägger svaret plus tillhörande fråge-id i en array, man bör nog lägga till ett spelar id */
            console.log("frågorna:",this.answers)
            socket.emit("submitAnswer", {pollId:this.pollId, i:this.questions[this.currentQ].i, p:this.playerId, a:this.answer } ) 
            this.answer = ""
            this.currentQ ++
            console.log("speklarid", this.playerId)
            
        },
        addNumber: function() {this.answer +=1 },
        subtractNumber: function() { 
          if (this.answer > 0) {
          this.answer -=1}
          },
        sendBTNfunc: function(Qid) {
          if (this.questions.length === this.currentQ +1){
            this.answers.push({q:Qid,a:this.answer})
            socket.emit('playerAnswer', {pollId: this.pollId ,player: this.playerId, answers: this.answers } )
            this.togglePopup()
            console.log("Skriv ut answerTest: ", this.answerTest[0].answerObject) //Denna kan tas bort sen
          }
          else{
            this.answers.push({q:Qid,a:this.answer})
            this.currentQ +=1;
            this.answer = 0;
          }
          socket.emit('playerGuess',this.pollId)

        }
       
    }
    }
    
    </script>
    
    
 <style scoped>
    

.questions{
  font-size: 2em;
  font-family: Righteous;
  padding: 1em;
  margin-top: 0;
}
    
body{
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
}
input {

width: 400px;
padding: 0 20px;
}

.fieldPos{
  display: flex;
  justify-content: center;
}
.answerField{
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: hidden;
  border-color: black, red;
  width: 90%;
  border-radius: 3em;
  background-color: #16534188;
  
  
}


#answerInputField{
  font-family: "Monoton";
  font-size: 5em;
  background-color: #16534100;
  border:none;
  width:30%;
  text-align: center;

}

.signButton{
  width: 4em;
  height: 4em;
}


button {
  height: 3em;
  width: 6em;
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
  font-size: 1.7em;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
}
.sendButton{
  margin-top: 1em;
}

.button:hover {
  background-color: #67b3a5b7;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
    
   
    </style>