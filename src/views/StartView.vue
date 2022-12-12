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
        <input class="codeInput" type="text" v-model="joinId" placeholder="input code...." />
        <router-link v-bind:to="'/chooseplayer/' + lang+'/'+joinId +'/'+this.id">
          <button class="standardButton" role="button" id="codeSubmitButton">
            OK
          </button>
        </router-link>
      </PopUp>
    </div>
    <div v-if="popupTriggers.buttonTriggerRules"> <!-- Popup för regler -->
      <PopUp
        v-bind:PopUp="PopUp"
        v-bind:key="PopUpFonster"
      >
          <img src="../Icons/closeButton.png" class ="popupClose" v-on:click="togglePopup('rules')">
           <pre> </pre>

          <div class="ruleText">
            <ul>
          <li>{{uiLabels.rules1}}</li>
          <li>{{uiLabels.rules2}}</li>
          <li>{{uiLabels.rules3}}</li>
          </ul>
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
import { ref } from "vue";

const socket = io();


export default {
  name: "StartView",
  components: {
    PopUp,
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
      audio: new Audio(require("../Music/FunkyMusic.mp3")),
      audioPicture: require("../Icons/Speaker.png"),
      rulesPicture: require("../Icons/daRules.png"),
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
        this.audioPicture = require("../Icons/SpeakerOff.png");
      } else {
        this.audio.pause();
        this.audioOn = false;
        this.audioPicture = require("../Icons/Speaker.png");
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
  height:4em;
  width: 4em;
  position: absolute;
  padding: 0.2em;
  left: 0;
  top: 0;
  cursor: pointer;
}
.ruleText{
  font-size: 3vw;
  text-align: left;
  position: relative;
  margin-left: 1vw;
}

ul {
  list-style-position: outside;
}
.rulesButton {
  height: 6vw;
  padding: 2em;
  position: fixed;
  bottom: 0px;
  right: 0px;
  cursor: pointer;
}
#codeSubmitButton {
  height: 5vh;
  width: 8vw;
  padding: 0;
  background-color: #fd8469;
}
.topButtons {
  display: flex;
  height: 6vw;
  width: 100%;
  cursor: pointer;
  justify-content: space-between;
  margin-top: 1em;
}
#playMuteButton{
 margin-left: 1em;
}
#langBtn{
  margin-right: 1em;
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
}

#title {
  font-family: "Monoton";
  font-size: 10vw;
  font-synthesis: none;
  margin-top: 0;
  margin-bottom: 4vh;
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

  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 1.5vw;
  font-weight: bold;
  padding: 0.1em 0.1em;
  position: relative;
  text-align: center;
}

.standardButton:hover {
  background-color: #67b3a5b7;
}
.rulesButtonMobile{
  display: none;
}

@media screen and (max-width:50em) {
  .rulesButton {
display: none;
  }
  .topButtons {
    height: 5em;
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
  font-size: 1.5em;

  margin-left: 0;
}
#codeSubmitButton {
  width: 2.3em;
}
}
</style>
