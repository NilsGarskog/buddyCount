<template>
<body>
<link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet' type='text/css'>

<img class="playMuteButton" :src="audioPicture" v-on:click="playSong" />
  <div>
  <h1 id="title">BuddyCount</h1>
  </div>
  
  <div id="Buttons">
  
  <router-link v-bind:to="'/create/'+lang">
  <button class="standardButton" role="button"><p class="buttonText">Create Game</p></button>
  </router-link>
<!--
  <label>
    Write poll id: 
    <input type="text" v-model="id">
  </label>
-->
<hr style="height:2px;border-width:0;color:gray;background-color:gray">
  <router-link v-bind:to="'/poll/'+id">
  <button class="standardButton" role="button"><p class="buttonText">Join game </p></button>
  </router-link>
  </div>
</body>
</template>

<script>
import io from "socket.io-client";
const socket = io();







export default {
  name: "StartView",
  components: {},
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      hideNav: true,
      audioOn: false,
      audio: new Audio(require('../Music/FunkyMusic.mp3')),
      audioPicture: require('../Icons/Speaker.png')

    };
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
    switchLanguage: function () {
      if (this.lang === "en") this.lang = "sv";
      else this.lang = "en";
      socket.emit("switchLanguage", this.lang);
    },
    toggleNav: function () {
      this.hideNav = !this.hideNav;
    },
    playSong: function(){
      if (this.audioOn === false){
      this.audio.play()
      this.audioOn = true
      this.audioPicture = require('../Icons/SpeakerOff.png')
      }
      else {
      this.audio.pause()
      this.audioOn = false
      this.audioPicture = require('../Icons/Speaker.png')

      }

    }
  },
};
</script>
<style scoped>
.playMuteButton{
  display: grid;
  height:5em;
  width: 5em;
  padding:1em;

}
.buttonText{
  font-size: 1.7em;
}
#Buttons {
  display: grid;
  grid-template-columns: 20em;
  justify-content: center;
}
.noLink {
  text-decoration: none;
  color: inherit;
}
body {
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
}

#title {
  font-family: "Monoton";
  font-size: 10vw;
  font-synthesis: none;
  
}

.standardButton {
  height: 7em;
  width: 15em;
  background-color: #70c1b3;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
}

.standardButton:hover {
  background-color: #67b3a5b7;
}
</style>
