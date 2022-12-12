<template>
    <body>
      <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
            <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
            <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>

    <div class="questions">
      
        {{questions[nextQ].q}}
      </div>
      <div class="fieldPos">
      <div class="answerField">
        <img src="../Icons/minusButton.png" class="signButton" id="subButton" >
      <input v-model="answer" min="0" type="number" id="answerInputField">
        <img src="../Icons/addButton.png" class="signButton" id="addButton" >
      </div>
      </div>

 <button v-on:click="addAnswer"> Svara</button>

  </body>
    
</template>
    
    
    <script>
    import io from 'socket.io-client';
    const socket = io();
    export default {
      name: 'AnswerQView',
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
          nextQ: 0,
          playerId: "",
        }
      },
        created: function () {
          this.pollId = this.$route.params.id
          this.lang = this.$route.params.lang;
          this.playerId = this.$route.params.playid;
          socket.emit('joinPoll', this.pollId) //Ska jag ha denna?? funkar ej utan
          socket.emit("pageLoaded", this.lang);
          socket.on("init", (labels) => {
          this.uiLabels = labels
          });
        socket.on("allQuestions", (update) => {       //Funktion för att hämta fråge-array /Nils
          this.questions = update;
        });
        socket.emit('getQuestions', this.pollId)
      },
        methods: {
        /*createPoll: function () {
          socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
        },*/
       
        addAnswer: function(){
            this.answers.push({a: this.answer, i: this.questions[this.nextQ].i}) /* Lägger svaret plus tillhörande fråge-id i en array, man bör nog lägga till ett spelar id */
            console.log("frågorna:",this.answers)
            socket.emit("submitAnswer", {pollId:this.pollId, i:this.questions[this.nextQ].i, p:this.playerId, a:this.answer } ) 
            this.answer = ""
            this.nextQ ++
            console.log("speklarid", this.playerId)
            
        }


    
       
    }
    }
    
    </script>
    
    
    <style>

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
  justify-content: space-around;
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
  background-color: inherit;
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
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 12px;
  position: relative;
  text-align: center;
  margin-left: 3em;
}

.button:hover {
  background-color: #67b3a5b7;
}
    
   
    </style>