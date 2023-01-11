<template>
  <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
  <link rel="stylesheet" href="css/three-dots.min.css">
<body>
<h1 v-if="this.playerId !== '1'">Waiting for others to join....</h1>
<div class="loadContainer">
<div v-if="this.playerId !== '1'">
  <lottie-player class="animation" src="https://assets4.lottiefiles.com/private_files/lf30_jk2sj58w.json"  background="transparent"  speed="1"  style="width: 150px; height: 150px;"  loop autoplay></lottie-player>
</div>
</div>
<div v-if="this.playerId === '1'">
<h1 id="hostTitle">You are the host!</h1>
<h2 class="hostTitle2">When you press the button below</h2>

<h2 class="hostTitle3">- the game will start for EVERYONE!</h2>
</div>
<div class="buttonCont">
<button class="continueButton" v-if="this.playerId === '1'" v-on:click = goToQuestion() > START GAME! </button>
</div>
</body>
</template>

<script>
import io from 'socket.io-client';
import LottiePlayer from '@lottiefiles/lottie-player';
const socket = io();

export default {


  components: {
    LottiePlayer,
  },

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
font-family: Righteous;
bottom: 3em;
color: white;
background-color: #046B79;
width: 300px;
height: 100px;
box-shadow: 0px 7px 10px #063d45;
border: 1px solid white;
margin-bottom:50px;
}

.continueButton:hover {
background-color: #00acae;
transition: 0.2s;
cursor: pointer;
}

#hostTitle {
margin-top: 70px;
font-size: 40px;
font-family: Righteous;

}

.hostTitle2 {
font-family: Righteous;
margin-left: 20px;
margin-right: 20px;
color: white;
font-size: 20px;
}

.hostTitle3 {
font-family: Righteous;
margin-left: 20px;
margin-right: 20px;
margin-top: -10px;
color: white;
font-size: 20px;
}

.buttonCont {
display: flex;
width: 100%;
justify-content: center;
}
.dot-bricks {
position: relative;
margin-left:-5px;
top: 20px;
left: -9999px; 
width: 10px;
height: 10px;
border-radius: 0px;
background-color: #046B79;
color: #046B79;
box-shadow: 9991px -16px 0 0 #046B79, 9991px 0 0 0 #046B79, 10007px 0 0 0 #046B79;
animation: dot-bricks 2s infinite ease;
}

.loadContainer {
  display:flex;
  justify-content: center;
}

.animation {
  opacity: 1;
  margin-top:-40px;
}

@keyframes dot-bricks {
0% {
box-shadow: 9991px -16px 0 0 #034851, 9991px 0 0 0 #046B79, 10007px 0 0 0 #034851;
}
8.333% {
box-shadow: 10007px -16px 0 0 #046B79, 9991px 0 0 0 #034851, 10007px 0 0 0 #046B79;
}
16.667% {
box-shadow: 10007px -16px 0 0 #034851, 9991px -16px 0 0 #034851, 10007px 0 0 0 #046B79;
}
25% {
box-shadow: 10007px -16px 0 0 #046B79, 9991px -16px 0 0 #046B79, 9991px 0 0 0 #034851;
}
33.333% {
box-shadow: 10007px 0 0 0 #034851, 9991px -16px 0 0 #034851, 9991px 0 0 0 #046B79;
}
41.667% {
box-shadow: 10007px 0 0 0 #046B79, 10007px -16px 0 0 #046B79, 9991px 0 0 0 #034851;
}
50% {
box-shadow: 10007px 0 0 0 #046B79, 10007px -16px 0 0 #034851, 9991px -16px 0 0 #046B79;
}
58.333% {
box-shadow: 9991px 0 0 0 #034851, 10007px -16px 0 0 #046B79, 9991px -16px 0 0 #046B79;
}
66.666% {
box-shadow: 9991px 0 0 0 #046B79, 10007px 0 0 0 #034851, 9991px -16px 0 0 #046B79;
}
75% {
box-shadow: 9991px 0 0 0 #046B79, 10007px 0 0 0 #046B79, 10007px -16px 0 0 #034851;
}
83.333% {
box-shadow: 9991px -16px 0 0 #034851, 10007px 0 0 0 #034851, 10007px -16px 0 0 #046B79;
}
91.667% {
box-shadow: 9991px -16px 0 0 #046B79, 9991px 0 0 0 #034851, 10007px -16px 0 0 #046B79;
}
100% {
box-shadow: 9991px -16px 0 0 #034851, 9991px 0 0 0 #046B79, 10007px 0 0 0 #034851;
}
}

@media (max-width:450px){

#hostTitle{ 
font-size:35px;
}

h1 {
margin-top: 250px;
margin-left: 20px;
margin-right: 20px;
}

}
</style>