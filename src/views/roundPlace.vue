<template>
  <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
  <body>

  <div class="firstPlace" v-if="first===show">
    <h1>First Place!</h1>
    <h2> Keep up the good work</h2>
  </div>
  <div class="lastPlace" v-if="last===show">
    <h1>Last Place!</h1>
    <h2> What are you even doing??</h2>
  </div>
  <div class="mediokerPlace" v-if="medioker===show">
    <h1>You are the definition of average</h1>
    <h2> Stop being so mellanmjölkig</h2>
  </div>
  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();
export default {
  data: function () {
    return {
      timerId: setInterval(this.timer, 1000),
      timeLeft: 10,
      sendTimer: false,
      show: '',
      first: 'FP',
      last: 'LP',
      medioker:'MP',
      placement: "",
      players:[]

    }
  },
  created: function () {

    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang;
    this.playerId = this.$route.params.playid;
    socket.emit('joinPoll', this.pollId)
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("goToNextRound", () => {
      this.$router.push('/guessQuestion/' + this.lang+'/'+this.pollId+'/'+this.playerId);
    })
    socket.on("sendPlayers", (players) => {
      this.players = players
      this.players.sort((a,b) => a.points - b.points);
      this.players.reverse()
      for(let i=0; i<this.players.length; i++){
        if (this.players[i].playerId == this.playerId){
          console.log("inside if loop, i =",i)
          this.placement = i;
          this.checkPlace()
        }
      }
      
    })
    socket.emit("getPlayers", this.pollId)

  },
  methods: {
      checkPlace: function(){
        if(this.placement==0){
          this.show = 'FP';
        }
        else if(this.placement==this.players.length-1){
          this.show = 'LP';
        }
        else{
          this.show = 'MP';
        }
      },
  }
}
</script>

<style scoped>
body {
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
}

h1,h2{
  font-family: Righteous;
}
button{
  width:100px;
  height: 100px;
}
</style>