<template>
<body>
<link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
<div class="questions">
  <div>
    <div v-if="loaded===true">
     <h1 id="firstQ">
    {{question}}

     </h1>
    </div>
  </div>
</div>

<div class="playerListContainer">

  <div class = "playerList" v-for="player in showPlayers"
       v-bind:player="player"
       v-bind:key="player.name" >
    <div class="innerCharacter" >
      <img  v-bind:id="player.playerId" class ="avatarImage" :src="require('../Icons/'+player.avatar[0].image + '.png')" />

    </div>

  </div>
</div>
<!--
<div class="timeLeft" >
  <h1 id="tid" >
    Time left:
  </h1>
  <div class="timer">
    <span>30</span>
    <span>29</span>
    <span>28</span>
    <span>27</span>
    <span>26</span>
    <span>25</span>
    <span>24</span>
    <span>23</span>
    <span>22</span>
    <span>21</span>
    <span>20</span>
    <span>19</span>
    <span>18</span>
    <span>17</span>
    <span>16</span>
    <span>15</span>
    <span>14</span>
    <span>13</span>
    <span>12</span>
    <span>11</span>
    <span>10</span>
    <span>9</span>
    <span>8</span>
    <span>7</span>
    <span>6</span>
    <span>5</span>
    <span>4</span>
    <span>3</span>
    <span>2</span>
    <span>1</span>
    <span id="endQuestionLobby">0</span>
  </div>
</div>
-->
</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();
export default {
  name: "QuestionLobby",
  data: function () {
    return {
      lang: "",
      pollId: "",
      questionObject: "",
      question:"",
      questions: "", /* la till en tom array*/
      data: {},
      uiLabels: {},
      hide:false,
      nextQ: 0,
      showPlayers: "",
      player: "",
      loaded: false,
      timerId: setInterval(this.answerSubmit, 1000),
      timeLeft: 30,
      sendAnswer: false,
      donePlayers: [],
    }
  },


  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    this.playerId = this.$route.params.playid;
    socket.emit('joinPoll', this.pollId);
    socket.emit("pageLoaded", this.lang);
    //Spelarinfo
    socket.on("sendPlayers", (update) => {
      this.showPlayers = update;
    });
    socket.on("currentQuestion", (QnAobj) => {
      this.question = QnAobj.question;
    });
    socket.emit("getCurrentQuestion", this.pollId)

    socket.on("playerDoneGuess", (playerId) => {
      this.donePlayers.push(playerId);
      this.displayGuessedAvatars(playerId);
      if(this.donePlayers.length == this.showPlayers.length){
        socket.emit("goToResult",this.pollId)
      }
    });
    socket.emit("getPlayers",this.pollId)
    //frågeinfo
    socket.on("goToResultPage", () => { 
      this.$router.push('/questionresult/' + this.lang+'/'+this.pollId);
    });
    socket.on("allQuestions", (update) => {       //Funktion för att hämta fråge-array /Nils
      this.questions = update;
      this.loaded=true;
    });
    socket.emit('getQuestions',this.pollId)

  },

  methods:{
    displayGuessedAvatars: function(playId){
      for(let i=0; i<this.showPlayers.length; i++) {
        if (this.showPlayers[i].playerId==playId){
          document.getElementById(''+playId+'').style.opacity = "1";
        }
      }
      }
    }


}
</script>

<style scoped>

body{
  position: absolute;
  background-color: #24a07b;
  width: 100vw;
  height: 100vh;
  padding: 0;
  color:black;
  font-family: righteous;
}
.questions{
  margin-top:2vh;
  font-weight: 700;
  font-size:3em;
}
span {
  color: black;
  font-size: 3vh;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  line-height: 1;
  filter: blur(0.2rem);
  transition: all 1.5s ease;
  opacity: 0;
  filter: blur(0.6rem);
  position: absolute;
  transform: translate(-50%, -50%);
  margin:0;
  bottom: -1vh;
}
.playerListContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 0.25em;
  align-content: space-evenly;
}
.playerList{
  flex:25%;
  max-width: 20%;
  padding: 0 0.25em;
  margin-bottom: 3em;
}
playerList characters{
  margin-top: 0.5em;
  vertical-align: middle;
  width: 100%;
}
.avatarImage{
  opacity: 0.3;
  width:15vh;
  height: auto;

}
#firstQ{
  font-size: 1em;
  font-weight: 700;
  font-family: Righteous;
  word-wrap: break-word;
}


</style>