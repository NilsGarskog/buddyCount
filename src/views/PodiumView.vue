<template>
<body>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>

<div class="flexContainer">
  <div class="Credits">
    <div class="fade"></div>

    <section class="star-wars">

      <div class="crawl">
        <div class="title">
    <h1>{{uiLabels.CreditsHeading}}</h1>
        </div>
     <p>{{uiLabels.Credits}}
    </p>
  </div>
    </section>
    </div>
  <div class="flexContainerHnP">
    <div class="Heading">
      Thank you for counting your buddies!
    </div>
    <div v-if="loaded == true" class="PodiumContainer">
      <div class="thirdPlace">
        <div class="thirdPlaceBox">

        </div>
        <div class="thirdPlaceAvatar">
          <h1>{{players[2].name}}</h1><p>{{players[2].points}}</p>
          <img class ="avatarImage" :src="require('../Icons/' + players[2].avatar[0].image + '.png')" />
        </div>  
      </div>
      <div class="firstPlace">
        <div class="firstPlaceBox">

        </div>
        <div class="firstPlaceAvatar">
          <h1>{{players[0].name}}</h1> <p>{{players[0].points}}</p>
          <img class ="avatarImage" :src="require('../Icons/Winner/' + players[0].avatar[0].image + 'Crown' + '.png')" />
        </div>  
      </div>
      <div class="secondPlace">
        <div class="secondPlaceBox">

        </div>
        <div class="secondPlaceAvatar">
          <h1>{{players[1].name}}</h1> <p>{{players[1].points}}</p>
          <img class ="avatarImage" :src="require('../Icons/' + players[1].avatar[0].image + '.png')" />
        </div>  
      </div>
    </div>
  </div>
</div>
<div class="ButtomArea">
  <router-link v-bind:to="'/'">
      <button class="Button" id="joinGameButton" >
        {{uiLabels.playagain}}
      </button>
    </router-link>
      </div>

</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
data: function () {
  return {
    players:[
      {name: "Isak", avatar: "Tintin", points: 10},
      {name: "Nils", avatar: "Mononoke", points: 5},
      {name: "Hanna", avatar: "Voldermort", points: 2}
    ],
    placement:[],
    loaded: false,
    pollId:"",
    lang:"en",
    uiLabels: {},
  }
},
created: function () {
this.pollId = this.$route.params.id;
this.lang = this.$route.params.lang;
socket.emit('joinPoll', this.pollId);
socket.emit("pageLoaded", this.lang);
  socket.on("init", (labels) => {
    this.uiLabels = labels
})
 socket.on("sendPlayers", (players) => {
   this.players = players
   this.players.sort((a,b) => a.points - b.points);
   this.players.reverse()
   this.loaded = true
 });
 socket.emit("getPlayers", this.pollId)
},
}
</script>

<style scoped>
body {
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  font-family: Righteous;
}

.Button{
  height: 5em;
  width: 14em;
  background-color: #70c1b3;
  border: 0.1em solid rgba(27, 31, 35, 0.15);
  border-radius: 0.3em;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: black;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
  sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  cursor: pointer;
  font-size: 2em;
  font-weight: 800;
  line-height: 2em;
  padding: 1em 2em;
}

.ButtomArea{
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  margin-top:-7em;
}

#joinGameButton:hover {
    background-color: #00acae;
    transition: 0.2s;
    cursor: pointer;
}
.flexContainer{
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  margin-top: 3em;
}
.Credits{
width: 30%;
height: 90vh;
overflow: hidden;
border-left: 6px solid white;
border-right: 6px solid white;

}
.flexContainerHnP{
  display: flex;
  flex-direction: column;
}
.Heading{
  font-family: "monoton";
  font-size: 2.5em;
}
.PodiumContainer{
  display: flex;
  flex-direction: row;
  min-width: 60%;
  min-height: 80%;
  align-items: flex-end;
}
.avatarImage{
  filter: drop-shadow(0.5em 0.1em 0.1px black);
}
.thirdPlace{
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
}
.thirdPlaceBox{
background-color: #134450;
height: 20vh;
width: 100%;
filter: drop-shadow(0.5em 0.1em 0.1px black);

}
.firstPlace{
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
}
.firstPlaceBox{
background-color: #2487a0;
height: 40vh;
width: 100%;
filter: drop-shadow(0.5em 0.1em 0.1px black);

}
.secondPlace{
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
}
.secondPlaceBox{
background-color: #1b6375;
height: 30vh;
width: 100%;
filter: drop-shadow(0.5em 0.1em 0.1px black);

}
.avatarImage{
  height: 8em;
  width: 8em;
}


.fade {
  position: relative;
  width: 100%;
  min-height: 75vh;
  top: -25px;
  /* background-image: linear-gradient(0deg, transparent, #24a07b 75%); */
  z-index: 1;
}

.star-wars {
  display: flex;
  justify-content: center;
  position: relative;
  height: 800px;
  color: black;
  font-family: Righteous;
  font-size: 200%;
  font-weight: 600;
  line-height: 150%;
  perspective: 400px;
  text-align: justify;
  margin: 0.5em;

}

.crawl {
  position: relative;
  top: -100px;
  transform-origin: 50% 100%;
  animation: crawl 300s linear;
}

.crawl > .title {
  font-size: 90%;
  text-align: center;
}

.crawl > .title h1 {
  margin: 0 0 100px;
  text-transform: uppercase;
}

@keyframes crawl {
  0% {
    /* The element starts below the screen */
    top: 0;
    /* Rotate the text 20 degrees but keep it close to the viewer */
  }
  100% { 
    /* This is a magic number, but using a big one to make sure the text is fully off the screen at the end */
    top: -600em;
    /* Slightly increasing the rotation at the end and moving the text far away from the viewer */
  }
}
</style>