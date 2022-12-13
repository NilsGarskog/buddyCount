<template>
  <body>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
      <h1 class="heading">Hur många gånger har du gråtit inatt? </h1>
      {{answerArray}}
      <!-- <div class="classTable">
        <table>
    <tr>
      <th>Player</th>
      <th>Guess</th>
    </tr>
    <tr v-for="player in GuessArray" :key="player.name">
      <td>{{ player.name }}</td>
      <td><img  class="avatarImage" :src="require('../Icons/'+player.avatarImg + '.png')" :key="player.image" /></td>
      <td>
        <v-select
          :options="randomAnswers"
          :modelValue="player.Guess"
          @option:selected="(selectedOption) => onSelect(selectedOption)"
          @update:modelValue="(Guess) => updateGuess(player, Guess)"
        />
      </td>
    </tr>
  </table>
  </div>
  <button v-if="randomAnswers.length===0"> Send </button> -->
  
  <section class="playerListContainer">
    <div class="playerList">
    <div v-for="player in GuessArray" :key="player.name">
      <span class="playerNameInList">
        <img  class="avatarImage" :src="require('../Icons/'+player.avatarImg + '.png')" :key="player.image" />
        {{player.name}}
        <span class="dropDownMenu">
        <v-select
          class="dropDownStyle"
          :options="randomAnswers"
          :modelValue="player.Guess"
          @option:selected="(selectedOption) => onSelect(selectedOption)"
          @update:modelValue="(Guess) => updateGuess(player, Guess)"
        />
        </span>
      </span>
      </div>
    </div>
  </section>
  <button v-if="randomAnswers.length===0" v-on:click="sendFnc()"> Send </button>


    </body>
    
</template>

<script>

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import io from 'socket.io-client';
const socket = io();



export default {
  
name: "GuessQuestionView",
        components: {
            vSelect,
        },
data: function () {
    return {
      drag: false,
      pollId:"",
      lang:"",
      playerId:"",
      answerArray:[],
      players:[],
        // players: [
        // { playerId: 1, name: "Nils", avatar: [ { "id": "Avatar_1", "image": "Paul" } ], points: 0, currentAnswer: 0, currentGuess: [] }
        // ,
        // { playerId: 123456, name: "Samuel", avatar: [ { "id": "Avatar_2", "image": "Jerome" } ], points: 0, currentAnswer: 0, currentGuess: [] }
        // ,
        // { playerId: 654321, name: "Karin", avatar: [ { "id": "Avatar_3", "image": "NoFace" } ], points: 0, currentAnswer: 0, currentGuess: [] }
        // ,
        // { playerId: 135791, name: "Pelle", avatar: [ { "id": "Avatar_4", "image": "Mononoke" } ], points: 0, currentAnswer: 0, currentGuess: [] }
        // ,
        // { playerId: 123654, name: "Lotta", avatar: [ { "id": "Avatar_5", "image": "ScareCrow" } ], points: 0, currentAnswer: 0, currentGuess: [] }
        //       ],
      answers:[
      {PlayerId: 1, Answer:20},
      {PlayerId: 123456, Answer:4},
      {PlayerId: 654321, Answer:2},
      // {PlayerId: 135791, Answer:15},
      // {PlayerId: 123654, Answer:1},

    ],
    GuessArray:[],
    randomAnswers:[],

    }
},
created: function() {
  this.pollId = this.$route.params.id;
  this.lang = this.$route.params.lang;
  this.playerId = this.$route.params.playid;
  socket.emit('joinPoll', this.pollId)
  socket.on("sendPlayers", (update) => {       //Funktion för att hämta Spelarobjekt från korrekt rum
    console.log("inside sendplayers")
    this.players = update;
    this.GuessArray = createGuessArr(this.players, this.playerId)
    });
  socket.emit('getPlayers', this.pollId)

  this.randomAnswers = randomAns(this.answers, this.randomAnswers, this.playerId)
},
methods: {
    updateGuess: function(player,Guess) {
      console.log(Guess)
      if (player.Guess != "" && player.Guess != null){
        this.randomAnswers.push(player.Guess)
      }
      else if (Guess === null){
        this.randomAnswers.push(player.Guess)
      }
      player.Guess = Guess
    },
onSelect: function(selectedOption) {

      let index = null;
      for (var i = 0, l = this.randomAnswers.length; i < l; i++){
        if (selectedOption === this.randomAnswers[i]){
           index = i
        }
      }
      if (index != null){
      this.randomAnswers.splice(index,1)
      
      }
},
sendFnc: function(){
  console.log("send!")
  for (var i = 0, l = this.GuessArray.length; i < l; i++){
    var obj = {playerID: this.GuessArray[i].playerId, guess: this.GuessArray[i].Guess }
    this.answerArray.push(obj);
  }
  socket.emit("PlayerGuessAnswer", {playerId: this.playerId, QId: "STOOPA IN QID HÄR", answers: this.GuessArray})
}
},



}


function randomAns (ans, randAns, id){
  for (var i = 0, l = ans.length; i < l; i++){
      if (ans[i].PlayerId != id){
    randAns.push(ans[i].Answer)
      }
  }
  randAns.sort(() => Math.random() - 0.5);
  return randAns
}

function createGuessArr (players, id){
  var GuessArray = []
  
  for (var i = 0, l = players.length; i < l; i++){
       if (players[i].playerId != id){
        var obj = {playerId: players[i].playerId, name: players[i].name, avatarImg: players[i].avatar[0].image, Guess:""}
        GuessArray.push(obj)
        }
}
  return GuessArray
}



</script>

<style scoped>


.dropDownMenu{
  font-size: 0.5em;
  min-width: 7em;
  margin-top: 0.4em;
}
.classTable{
  width:90%;
  border-style: solid;
  background-color: white;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
}

table {
  display: table;
  width: 100%;
}

body{
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  cursor: default;
  font-family: Righteous;
}


.playerList {
    text-align: left;
    width: 100%;
    height: 100%;
    font-family: Righteous;
    font-weight: 100;
    font-size: 3em;
    padding-top: 0;
    overflow: visible;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-evenly;
}

.playerListContainer {
    display: flex;
    height: auto;
}
.avatarImage {
    width: 1em;
    height: 1em;
}
.heading{
  font-family: Righteous;
}


.playerNameInList {
  display: flex;
  height:auto;
  justify-content: space-between;
  margin-bottom: 0.5em;
  
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
  font-size: 1.5em;
  font-weight: 600;
  line-height: 20px;
  position: relative;
  text-align:center;

}
</style>