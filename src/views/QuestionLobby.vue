<template>
<body>
<link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
<div class="questions">
  <div>
    <div v-if="loaded===true">
     <h1 id="firstQ">
    {{question}}
    {{donePlayers}}
     </h1>
    </div>
  </div>
</div>

<div class="playerListContainer">

  <div class = "playerList" v-for="player in showPlayers"
       v-bind:player="player"
       v-bind:key="player.name" v-bind:id="player.playerId">
    <div class="innerCharacter" >

      <img  class ="avatarImage" :src="require('../Icons/'+player.avatar[0].image + '.png')" />
    </div>


  </div>
</div>

<div class="timeLeft" >
  <h1 id="tid">
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

    answerSubmit: function(timerId){
      if (this.timeLeft == 0) {
        if(!this.sendAnswer)
        {
          console.log("slut")
          //socket.emit("goToResult",this.pollId)
          
          clearTimeout(timerId);
          timerId = null;
          this.sendAnswer = true;
        }

      } else {
        //console.log(this.timeLeft)
        return this.timeLeft--;
      }

    },
    displayGuessedAvatars: function(){



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
#endQuestionLobby{

}
.timeLeft{
  position: absolute;
  text-align: left;
  bottom: 0vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 1.4vh;
  font-weight: 700;
  font-family: Righteous;
}
.timer{

  width: 7.5em;
  height:4em;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1vh;
  font-weight: 700;
  font-family: Righteous;
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


span:nth-child(1) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 0s;
 }
span:nth-child(2) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 1s;
 }
span:nth-child(3) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 2s;
 }
span:nth-child(4) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 3s;
 }
span:nth-child(5) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 4s;
 }
span:nth-child(6) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 5s;
 }
span:nth-child(7) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 6s;
 }
span:nth-child(8) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 7s;
 }
span:nth-child(9) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 8s;
 }
span:nth-child(10) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 9s;
 }
span:nth-child(11) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 10s;
 }
span:nth-child(12) {
  animation: letteranim 31s infinite ease;
  animation-delay: 11s;
}
span:nth-child(13) {
  animation: letteranim 31s infinite ease;
  animation-delay: 12s;
}
span:nth-child(14) {
  animation: letteranim 31s infinite ease;
  animation-delay: 13s;
}
span:nth-child(15) {
  animation: letteranim 31s infinite ease;
  animation-delay: 14s;
}
span:nth-child(16) {
  animation: letteranim 31s infinite ease;
  animation-delay: 15s;
}
span:nth-child(17) {
  animation: letteranim 31s infinite ease;
  animation-delay: 16s;
}
span:nth-child(18) {
  animation: letteranim 31s infinite ease;
  animation-delay: 17s;
}
span:nth-child(19) {
  animation: letteranim 31s infinite ease;
  animation-delay: 18s;
}
span:nth-child(20) {
  animation: letteranim 31s infinite ease;
  animation-delay: 19s;
}
span:nth-child(21) {
  animation: letteranim 31s infinite ease;
  animation-delay: 20s;
}
span:nth-child(22) {
  animation: letteranim 31s infinite ease;
  animation-delay: 21s;
}
span:nth-child(23) {
  animation: letteranim 31s infinite ease;
  animation-delay: 22s;
}
span:nth-child(24) {
  animation: letteranim 31s infinite ease;
  animation-delay: 23s;
}
span:nth-child(25) {
  animation: letteranim 31s infinite ease;
  animation-delay: 24s;
}
span:nth-child(26) {
  animation: letteranim 31s infinite ease;
  animation-delay: 25s;
}
span:nth-child(27) {
  animation: letteranim 31s infinite ease;
  animation-delay: 26s;
}
span:nth-child(28) {
  animation: letteranim 31s infinite ease;
  animation-delay: 27s;
}
span:nth-child(29) {
  animation: letteranim 31s infinite ease;
  animation-delay: 28s;
}
span:nth-child(30) {
  animation: letteranim 31s infinite ease;
  animation-delay: 29s;
}
span:nth-child(31) {
  animation: letteranim 31s infinite ease;
  animation-delay: 30s;
}


@keyframes letteranim {
  0% {
    opacity: 0;
    filter: blur(0.3rem);
  }
  1.78% {
    opacity: 1;
    filter: blur(0rem);
  }
  3.56% {
    opacity: 1;
    filter: blur(0rem);
  }
  7.1% {
    opacity: 0;
    filter: blur(0.3rem);
  }
  100% {
    opacity: 0;
    filter: blur(0.3rem);
  }
}
/*.playerList{
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-evenly;

}

.playerListContainer {
  display: flex;
  justify-content: center;
  max-height: 20vh;

}
*/
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
.avatarImageFull{
  opacity: 1;
  width:15vh;
  height: auto;
}
#firstQ{
  font-size: 1em;
  font-weight: 700;
  font-family: Righteous;
  word-wrap: break-word;
}
#tid{
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  text-align: center;
  margin:0;
}


</style>