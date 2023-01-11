<template>
  <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
  <link rel="stylesheet" href="css/three-dots.min.css">
<body>
<h1 class="nonhosttext" v-if="this.playerId !== '1'">{{uiLabels.waitForHost}}</h1>
<div class="loadContainer">
<div v-if="this.playerId !== '1'">
  <lottie-player class="animation" src="https://assets4.lottiefiles.com/private_files/lf30_jk2sj58w.json"  background="transparent"  speed="1"  style="width: 150px; height: 150px;"  loop autoplay></lottie-player>
</div>
</div>
<div v-if="this.playerId === '1'">
  <div v-if="this.popUpClosed==true">
    <h1 class="readytext">{{uiLabels.allReady}}</h1>
    <div class ="hostanimation" >
    <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_6aYlBl.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
  </div>
  </div>
<div v-if="popupTriggers.buttonTriggerHost">
  <PopUp class="popup"
        v-bind:PopUp="PopUp"
        v-bind:key="PopUpFonster"
        v-on:closeCurrentPopup="togglePopup()"
      >
      <div class = "popuphost">
      <h1 id="hostTitle">{{uiLabels.youAreHost1}}</h1>
<h2 class="hostTitle2">{{uiLabels.youAreHost2}}<br>{{uiLabels.youAreHost3}}</h2>

<h2 class="hostTitle3">{{uiLabels.youAreHost4}}<br></h2>
<h2 class="hostTitle3">{{uiLabels.youAreHost5}}</h2> 
<button class="gotItButton" v-on:click="togglePopup()">{{uiLabels.okGotIt}}</button> 
</div>
</PopUp>
</div>
    

</div>
<div class="buttonCont" v-if="this.playerId === '1'">
<button v-if="this.players.length < 3" class="continueButton noClick"> {{uiLabels.startGame}} </button>
<button v-else class="continueButton click"  v-on:click = goToQuestion() > {{uiLabels.startGame}} </button>
</div>
</body>
</template>

<script>
import io from 'socket.io-client';
import LottiePlayer from '@lottiefiles/lottie-player';
import PopUp from "../components/PopUp.vue";
import { ref } from "vue";
const socket = io();

export default {


  components: {
    PopUp,
    LottiePlayer,
  },
  setup() {
    const popupTriggers = ref({
      buttonTriggerHost: true,
    });
    return {
      popupTriggers,
      
    };
  },

  data: function(){
  return{
  pollId:'',
  uiLabels: {},
  lang:"en",
  playerId:'',
  popUpClosed: false,
  players:[],

}
},

created: function () {

this.pollId = this.$route.params.id
this.lang = this.$route.params.lang;
socket.emit("pageLoaded",this.lang);
socket.on("init", (labels) => {
this.uiLabels = labels
});
this.playerId = this.$route.params.playid;
socket.emit('joinPoll', this.pollId)
    socket.on("sendPlayers", (update) => {       //Funktion för att hämta Spelarobjekt från korrekt rum
    this.players = update;
    });
    socket.emit('getPlayers', this.pollId)
    socket.on("playerEdited", (update) => {       //Funktion för att hämta Spelarobjekt från korrekt rum
    this.players = update;
    });
socket.emit("pageLoaded", this.lang);
socket.on("goToNextPage", () => {
this.$router.push('/creatqpart/' + this.lang+'/'+this.pollId +'/'+ this.playerId);
});

},
methods: {
goToQuestion: function(){
  socket.emit('goToNextPage', this.pollId)
},
togglePopup: function () {
     
        this.popupTriggers.buttonTriggerHost =
          !this.popupTriggers.buttonTriggerHost;
          this.popUpClosed = true;
      
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
font-size:1.9em;
bottom: 3em;
color: white;
background-color: #046B79;
width: 300px;
height: 100px;
box-shadow: 0px 7px 10px #063d45;
border: 1px solid white;
margin-bottom:50px;
transition:0.2s;
}



.noClick {
  opacity: 0.5;
  cursor: default;
  pointer-events: none;
}

.continueButtonNoClick {
position: absolute;
font-family: Righteous;
font-size:1.9em;
bottom: 3em;
color: white;
background-color: #046B79;
width: 300px;
height: 100px;
box-shadow: 0px 7px 10px #063d45;
border: 1px solid white;
margin-bottom:50px;
transition:0.2s;
opacity:0.5;
}



.gotItButton {
font-family: Righteous;
color: white;
background-color: #046B79;
font-size:23px;
width: 200px;
height: 70px;
box-shadow: 0px 7px 10px #063d45;
border: 1px solid white;
margin-bottom:20px;
margin-top:10px;
transition: 0.2s;
}




#hostTitle {
margin-top: 20px;
font-size: 40px;
font-family: Righteous;
margin-left: 0px;
margin-right:0px;

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

.hostanimation {
  display:flex;
  justify-content: center;
}

lottie-player {
  margin-right:20px;
}

@media (max-width:450px){

.popupinner{
 top:-5%;
}

#hostTitle{ 
font-size:30px;
}

.hostTitle2, .hostTitle3{
  font-size:15px;
}

h1 {
margin-top: 250px;
margin-left: 20px;
margin-right: 20px;
}

.readytext {
  margin-top:30%;
}

}

@media (min-width:600px){

  .readytext{
    margin-top:200px;
    margin-bottom: 10px;
    font-size: 50px;
    cursor:default;
  }

  .gotItButton:hover, .click:hover {
background-color: #00acae;
transition: 0.2s;
cursor: pointer;

  }

  .nonhosttext {
    margin-top:20%;
  }

}
</style>