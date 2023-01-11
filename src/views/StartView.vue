<template>
  <body>
       <link
      href="https://fonts.googleapis.com/css?family=Monoton"
      rel="stylesheet"
      type="text/css"
    />
    <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
    <div v-if="popupTriggers.buttonTriggerJoin"> <!-- Popup för att joina spel -->
      <PopUp
        v-bind:PopUp="PopUp"
        v-bind:key="PopUpFonster"
        v-on:closeCurrentPopup="togglePopup('join')"
      >
        <input class="codeInput" type="text" v-model="joinId" placeholder="GAME CODE..." />
        <router-link v-bind:to="'/chooseplayer/' + lang+'/'+joinId +'/'+this.id">
          <button class="standardButton" role="button" id="codeSubmitButton">
            OK
          </button>
        </router-link>
      </PopUp>
    </div>
    <div class="animationCont">
    <lottie-player class="animation" src="https://assets7.lottiefiles.com/packages/lf20_j7wzhpuq.json"  background="transparent"  speed="0.05"  style="width: 2200px; height: 2200px;"  autoplay></lottie-player>
    </div>
    <div v-if="popupTriggers.buttonTriggerRules"> <!-- Popup för regler -->
      <PopUp
        v-bind:PopUp="PopUp"
        v-bind:key="PopUpFonster"
      >
          <img src="../Icons/closeNew.svg" class ="popupClose" v-on:click="togglePopup('rules')">
           <pre> </pre>

          <div class="ruleText">
            <div id="Rules">{{uiLabels.rules1}}</div>
            {{uiLabels.rules2}}
            <br>
            {{uiLabels.rules3}}
            <div id="Rules">{{uiLabels.rules4}}</div>
            {{uiLabels.rules5}}
            <br>
            {{uiLabels.rules6}}
          
          </div>
      </PopUp>
    </div>
    <span class=topButtons>
          <img
      class="rulesButtonMobile"
      :src="rulesPicture"
      v-on:click="togglePopup('rules')"
    />
    <img id="playMuteButton" :src="audioPicture" v-on:click="playSong" />
    <img id="langBtn" :src="langImg" v-on:click="switchLanguage">
    </span> 
    <div class="mainContent">
      <h1 id="title">BuddyCount</h1>
    <div id="Buttons">
      <router-link v-bind:to="'/lobby/' + lang+'/'+id">
        <button class="standardButton" role="button" v-on:click="createPoll">
          <p class="buttonText">{{uiLabels.createGame}}</p>
        </button>
      </router-link>
      <hr
        style="
          height: 2vh;
          border: 0;
        "
      />
      <div>
        <button
          class="standardButton"
          role="button"
          v-on:click="togglePopup('join')"
        >
          <p class="buttonText">{{uiLabels.joinGame}}</p>
        </button>
      </div>
    </div>
        </div>
    <img
      class="rulesButton"
      :src="rulesPicture"
      v-on:click="togglePopup('rules')"
    />
  </body>
</template>

<script>
import io from "socket.io-client";
import PopUp from "../components/PopUp.vue";
import LottiePlayer from '@lottiefiles/lottie-player';
import { ref } from "vue";

const socket = io();


export default {
  name: "StartView",
  components: {
    PopUp,
    LottiePlayer,
  },
  setup() {
    const popupTriggers = ref({
      buttonTriggerJoin: false,
      buttonTriggerRules: false,
    });
    return {
      popupTriggers,
    };
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      joinId: "",
      lang: "en",
      hideNav: true,
      audioOn: false,
      audio: new Audio(require("../Music/GameMusic.mp3")),
      audioPicture: require("../Icons/music-on.svg"),
      rulesPicture: require("../Icons/question.svg"),
      langImg: require("../Icons/Sweden.png"),
    };
  },
  created: function () {
    socket.emit("pageLoaded", this.lang)
    this.id = Math.floor(100000 + Math.random() * 900000)
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
        createPoll: function () {
      socket.emit("createPoll", {pollId: this.id, lang: this.lang })
    },
    togglePopup: function (type) {
      if (type === "join") {
        this.popupTriggers.buttonTriggerJoin =
          !this.popupTriggers.buttonTriggerJoin;
      } else {
        this.popupTriggers.buttonTriggerRules =
          !this.popupTriggers.buttonTriggerRules;
      }
    },

    switchLanguage: function () {
      if (this.lang === "en"){
        this.lang = "sv";
        this.langImg = require("../Icons/England.png")
      }
      else {
        this.lang = "en";
        this.langImg = require("../Icons/Sweden.png")
      }
      socket.emit("switchLanguage", this.lang);
    },
    playSong: function () {
      if (this.audioOn === false) {
        this.audio.play();
        this.audioOn = true;
        this.audioPicture = require("../Icons/music-off.svg");
      } else {
        this.audio.pause();
        this.audioOn = false;
        this.audioPicture = require("../Icons/music-on.svg");
      }
    },
  },
};
</script>

<style scoped>


.inputField{
  height: 5em;
  width: 15em;
}
.popupClose{
  height:4.5em;
  width: 4.5em;
  position: absolute;
  padding: 0.2em;
  left: 0;
  top: 0;
  cursor: pointer;
  margin-left:0.5em;
  margin-top:0.5em;
  transition:0.3s;
  opacity:0.5;
}

.popupClose:hover {
  transition:0.3s;
  opacity:1;
}
.ruleText{
  font-size: 1.5em;
  text-align: left;
  position: relative;
  margin-left: 2vw;
  font-family: Righteous;
  font-weight: 200;
  padding: 0.5em;
}
#Rules{
  font-size:1.7em;
  font-weight: bold;
}
ul {
  list-style-position: outside;
}
.rulesButton {
  height: 7em;
  width:7em;
  margin-right:1em;
  margin-bottom: 1em;
  position: fixed;
  bottom: 0px;
  right: 0px;
  cursor: pointer;
  opacity:0.7;
  transition:0.3s;
}

.rulesButton:hover{
  opacity: 1;
  transition: 0.3s;
  height: 7.5em;
  width:7.5em;
}
#codeSubmitButton {
  height: 5vh;
  width: 7vw;
  padding: 0;
  margin-left:1em;
  background-color: #046B79;
  transition:0.3s;
}

#codeSubmitButton:hover {
  background-color: #1c8896;
  transition:0.3s;
}
.topButtons {
  display: flex;
  height: 6vw;
  width: 100%;
  cursor: default;
  justify-content: space-between;
  margin-top: 2em;
}
#playMuteButton{
 margin-left: 2em;
 height:4em;
  width:4em;
  opacity: 0.7;
  transition: 0.3s;
  cursor:pointer;
}

#playMuteButton:hover {
  opacity:1;
  transition: 0.3s;
  height:4.2em;
  width:4.2em;
}
#langBtn{
  margin-right: 2em;
  height:4em;
  width:4em;
  opacity: 0.7;
  transition: 0.3s;
  cursor: pointer;
}

#langBtn:hover {
  opacity:1;
  transition: 0.3s;
  height:4.2em;
  width:4.2em;
}

.codeInput{
  border:none;
  border-bottom: 0.1em solid black;
  width:80%;
  height: 4vh;
  background-color: inherit;
  font-size: 2em;
  font-family: righteous;
  font-weight: bold;
  text-align: left;
}

.buttonText {
  font-size: 1.7em;
}

body {
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  cursor:default;
}

#title {
  font-family: "Monoton";
  font-size: 10vw;
  font-synthesis: none;
  margin-top: 0;
  margin-bottom: 4vh;
  cursor:default;
  z-index: 10;
}

.standardButton {

  width: 20vw;
  background-color: #70c1b3;
  border: 0.1em solid rgba(27, 31, 35, 0.15);
  border-radius: 1em;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: black;
  cursor: pointer;

  font-family: Righteous;
  color: white;
  background-color: #046B79;
  box-shadow: 0px 7px 10px #063d45;
    border: 1px solid white;
  font-size: 1.5vw;
  padding: 0.1em 0.1em;
  position: relative;
  text-align: center;
  transition:0.3s;
}

.standardButton:hover {
  background-color: #1c8896;
  transition:0.3s;
}
.rulesButtonMobile{
  display: none;
  margin-top:-10px;
}

.animation {
  position:absolute;
  z-index:-100;
  top:-20%;
  
}

.animationCont{

  display:flex;
  justify-content: center;
  align-content: center;

}

@media screen and (max-width:50em) {
  .rulesButton {
display: none;
  }
  .topButtons {
    height: 5em;
    cursor: default;
  }
  .standardButton {
    width: 12em;
    font-size: 1.5em;
  }
  #title{
    margin-bottom: 2em;
    margin-top: 1em;
    font-size: 12vw;
  }
  #playMuteButton {
    display: none;
  }
 .rulesButtonMobile{
   display: inline-flex;
     width: 6em;
    height: 6em;
    margin-left: 1em;
 }
 .popupClose{
  height:3em;
  width: 3em;
 
}
.ruleText{
  font-size: 20px;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: -20px;
}
#codeSubmitButton {
  width: 2.3em;
}
}

@media (max-width:450px){
  .codeInput{
    width:180px;
    font-size:20px;
  }

  #codeSubmitButton {

    width:80px;
  }

  #title {
    margin-top:80px;
    margin-bottom: 30px;
    font-size: 40px;
  }

  .standardButton{
    width:200px;
    height:80px;
  }

  .buttonText{
    font-size:25px;
    margin-top:20px;
  }

  #Buttons {
    margin-top:0px;
  }

  .rulesButtonMobile{
    opacity:0.7;
  transition:0.3s;
}

.rulesButtonMobile:hover{
  opacity: 1;
  transition: 0.3s;
}

.animation {
  display:none;
}
}
</style>
