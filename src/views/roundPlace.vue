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
    <h2> Stop being so mellamjölkig</h2>
  </div>
  <button v-on:click="checkPlace()">
tryck
  </button>
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
      x: 3,


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
    socket.on("goToNextQuestion", () => {
      this.$router.push('/guessQuestion/' + this.lang+'/'+this.pollId+'/'+this.playerId);
    })
  },
  methods: {
      checkPlace: function(){
        if(this.x>3){
          this.show = 'FP';
        }
        else if(this.x===3){
          this.show = 'LP';
        }
        else{
          this.show = 'MP';
        }




      },
    timer: function(timerId){
      if (this.timeLeft == 0) {
        if(!this.sendTimer)
        {
          console.log("slut")
          socket.emit("goToNextQuestion",this.pollId)

          clearTimeout(timerId);
          timerId = null;
          this.sendTimer = true;
        }

      } else {
        console.log(this.timeLeft)
        return this.timeLeft--;
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