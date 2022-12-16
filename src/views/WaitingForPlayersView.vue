<template>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
  <body>
<h1>Waiting for players to join....</h1>
<button class="continueButton" v-if="this.playerId === '1'" v-on:click = goToQuestion() > Everyboy is in! </button>
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
    socket.on("goToNextPage", () => {
      this.$router.push('/creatqpart/' + this.lang+'/'+this.pollId +'/'+ this.playerId);
    })
},
methods: {
    goToQuestion: function(){
        socket.emit('goToNextPage', this.pollId)
    }
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

h1{
  font-family: Righteous;
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
  font-size: 2em;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 12px;
  position: relative;
  text-align:center;

}

.continueButton {
position: absolute;
bottom:3em;
left:20px;
right:20px;
width: calc(100% - 40px);
}

</style>