<template>
  <body>
      <h1 class="heading">Hur många gånger har du gråtit inatt? </h1>
      {{randomAnswers}}
      {{GuessArray}}
      {{playerId}}
        <table>
    <tr>
      <th>Player</th>
      <th>Guess</th>
    </tr>
    <tr v-for="player in GuessArray" :key="player.name">
      <td>{{ player.name }}</td>
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
  <button v-if="randomAnswers.length===0"> Send </button>
  
  <section class="playerListContainer">
    <div class="playerList">
    
    </div>
  </section>


    </body>
</template>

<script>

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';



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
        players: [
        { playerId: 1, name: "Nils", avatar: [ { "id": "Avatar_1", "image": "Paul" } ], points: 0, currentAnswer: 0, currentGuess: [] }
        ,
        { playerId: 123456, name: "Samuel", avatar: [ { "id": "Avatar_2", "image": "Jerome" } ], points: 0, currentAnswer: 0, currentGuess: [] }
        ,
        { playerId: 654321, name: "Karin", avatar: [ { "id": "Avatar_3", "image": "NoFace" } ], points: 0, currentAnswer: 0, currentGuess: [] }
        ,
        { playerId: 135791, name: "Pelle", avatar: [ { "id": "Avatar_4", "image": "Mononoke" } ], points: 0, currentAnswer: 0, currentGuess: [] }
        ,
        { playerId: 123654, name: "Lotta", avatar: [ { "id": "Avatar_5", "image": "ScareCrow" } ], points: 0, currentAnswer: 0, currentGuess: [] }
              ],
      answers:[
      {PlayerId: 1, Answer:20},
      {PlayerId: 123456, Answer:4},
      {PlayerId: 654321, Answer:2},
      {PlayerId: 135791, Answer:15},
      {PlayerId: 123654, Answer:1},

    ],
    GuessArray:[],
    randomAnswers:[],

    }
},
created: function() {
  this.pollId = this.$route.params.id;
this.lang = this.$route.params.lang;
this.playerId = this.$route.params.playid;
  this.randomAnswers = randomAns(this.answers, this.randomAnswers, this.playerId)
  this.GuessArray = createGuessArr(this.players, this.playerId)


},
events: { 'option:selected': function (selectedOption) {console.log("TESTIS!" + selectedOption) } },
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
},



}


function randomAns (ans, randAns){
  for (var i = 0, l = ans.length; i < l; i++){
    //  if (ans[i].PlayerId != id){
    randAns.push(ans[i].Answer)
    //  }
  }
  randAns.sort(() => Math.random() - 0.5);
  return randAns
}

function createGuessArr (players){
  var GuessArray = []
  
  for (var i = 0, l = players.length; i < l; i++){
      // if (players[i].playerId != id){
    var obj = {playerId: players[i].playerId, name: players[i].name, avatarImg: players[i].avatar[0].image, Guess:""}
      //  }
    GuessArray.push(obj)
}
  return GuessArray
}



</script>

<style scoped>
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
}


.playerList {
    text-align: left;
    width: 100%;
    height: 100%;
    font-family: Righteous;
    font-weight: 100;
    font-size: 3em;
    padding-top: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-evenly;
}

.playerListContainer {
    display: flex;

    
}
.avatarImage {
    width: 1em;
    height: 1em;

}


.playerNameInList {
  display: flex;

  justify-content: space-between;
  margin-bottom: 0.5em;
  
}
</style>