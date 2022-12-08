<template>
    <body>
      <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
            <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
            <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
      <div class ="headerContainer">
          <div class ="gameCode">
        <p>Code: {{pollId}} Player: {{playerId}}</p>
      </div>
       
      </div>
    <h1 class ="questionTitle">Your Answer</h1>
    <div class="questions">
      
        {{questions[nextQ].q}}
        
    
      </div>
      <input type="text" v-model="answer" placeholder="Write your answer" id="answerInputField">
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
          answer: "",
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
        socket.on("dataUpdate", (data) =>   {       //Oklart om denna behövs?
          this.data = data
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
    input {
    
    width: 400px;
    padding: 0 20px;
}
::placeholder{
  color:rgba(255, 255, 255, 0.516);
  
  text-align: center;
  overflow:visible;
 
}
#answerInputField{
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 16px;
  font-weight: 600;
  background-color: #67b3a5b7;
  border:none;
  border-bottom: 2px solid black;
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