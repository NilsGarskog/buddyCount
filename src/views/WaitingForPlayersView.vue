<template>
  <body>
<h1>Waiting for players to join....</h1>
<button v-if="this.playerId === '1'" v-on:click = goToQuestion() > Everyboy is in! </button>
</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {

  data: function(){
    return{
    pollId:'',
    lang:'',
    playerId:''

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
    socket.on("goToQuestions", () => {
      this.$router.push('/creatqpart/' + this.lang+'/'+this.pollId +'/'+ this.playerId);
    })
},
methods: {
    goToQuestion: function(){
        socket.emit('goToQuestion', this.pollId)
    }
}
}
</script>

<style>
body {
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
}

</style>