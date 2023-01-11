<template>
    <body>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet' type='text/css'>

    <div>
        <h1 class="title">{{uiLabels.scoreboard}}</h1> 
    </div>

    <div class="topfive">




    <div v-if="(loaded == true)">
        <div v-for="element in PlayersAndPoints" v-bind:key="element"> 
          <div class="showpointsCont">
            <div class="showpoints">
                <img class ="avatarImage" :src="require('../Icons/' + element.avatar[0].image + '.png')" /> <span class ="space"></span><span class ="name">{{element.name}} </span><span class ="space"></span><span class ="point">{{element.points}}</span>
            </div>
          </div>
            </div>
             
            </div>

            <div class="Button">

               
    </div>

        </div>

</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();
















export default {
  name: "ScoreBoardView2",
  components: {},
  data: function () {
    return {
        pollId: "",
        timerId: setInterval(this.timer, 1000),
        timeLeft: 10,
        sendTimer: false,
        TotalPoints:"",
        PlayersAndPoints: [{playerId: 4, points: 1}, {playerId: 1, points: 6}],
        loaded: false,
        data: {},
        uiLabels: {},
        lang: "en",

        playerInfo: {
        clickedAvatars:[],
        username:"",
        
      },
    }


},
  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.emit('joinPoll', this.pollId);
    socket.emit("pageLoaded", this.lang);
    socket.on("sendPlayers", (players) => {
   this.PlayersAndPoints = players
   this.PlayersAndPoints.sort((a,b) => a.points - b.points);
   this.PlayersAndPoints.reverse()
   //this.CreatePlayersInfo()
   this.loaded = true
 });
 socket.emit("getPlayers", this.pollId)
    socket.on("goToNextRound", () => {
      this.$router.push('/QuestionLobby/' + this.lang+'/'+this.pollId);
    });

    //socket.on('getPoints', (update) => { //denna ska scoreboard ha
    //this.TotalPoints = update;
    //console.log("Totalpoäng",this.TotalPoints)
 // });

 // socket.on('getPlayerPoints', (update)) //denna ska scoreboard ha
 // },
    },

  methods:{
    timer: function(timerId){
      if (this.timeLeft == 0) {
        if(!this.sendTimer)
        {
          socket.emit("goToNextRound",this.pollId)

          clearTimeout(timerId);
          timerId = null;
          this.sendTimer = true;
        }

      } else {
        return this.timeLeft--;
      }
    },
    

}
}


</script>
<style scoped>

body {
    background-color: #24a07b;
    position: fixed;
    font-family:Righteous ;
    width: 100vw;
    height: 100vh;
  
}
.title {
font-family: monoton;
font-size: 6em;
margin-top: 1em;
font-weight: 300;
}

.avatarImage {
    width: 70px;
    align-self:left;
}

.playerList {
 font-size: 3em;
 text-align: left;
 margin-left: 7em;
}

.amountofpoints {
font-size: 3em;
 text-align: right;
 margin-right: 7em;
 margin-top: -6.1em;
}

.showpointsCont {
  display:flex;
  width:100%;
  justify-content: center;
}

.showpoints {
  display: flex;
  width:35%;
  justify-content: space-between;
  align-items: center;
}
.topfive {
  display:flex;
  flex-direction:column;
  height: 50%;
  justify-content: center;
}

.name {
  font-size:2.2em;
  text-align: left;
  width:100%;
  margin-left:0.2em;

}

.point {
 display: flex;
 text-align: right;
 font-size:2.2em;

}

.space {
  margin-right:1em;
}

</style>
