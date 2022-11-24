<template>
  <body>
    <div v-if="popupTriggers.buttonTriggerJoin"> <!-- Popup för att joina spel -->
      <PopUp
        v-bind:PopUp="PopUp"
        v-bind:key="PopUpFonster"
        v-on:closeCurrentPopup="togglePopup('join')"
      >
        <input type="text" v-model="id" class="inputField" />
        <router-link v-bind:to="'/poll/' + id">
          <button class="standardButton" role="button" id="codeSubmitButton">
            OK!
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
    <link
      href="https://fonts.googleapis.com/css?family=Monoton"
      rel="stylesheet"
      type="text/css"
    />
    <span class=topButtons> 
    <img id="playMuteButton" :src="audioPicture" v-on:click="playSong" />
    <img id="langBtn" :src="langImg" v-on:click="switchLanguage">
    </span>
    <div>
      <h1 id="title">BuddyCount</h1>
    </div>
    

    <div id="Buttons">
      <router-link v-bind:to="'/create/' + lang">
        <button class="standardButton" role="button">
          <p class="buttonText">{{uiLabels.createGame}}</p>
        </button>
      </router-link>
      <hr
        style="
          height: 2px;
          border-width: 0;
          color: gray;
          background-color: gray;
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
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
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
  height: 4em;
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
  position: relative
}

ul {
  list-style-position: outside;
}
.rulesButton {
  height: 8em;
  width: 8em;
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
}
.topButtons {
  display: flex;
  height: 5em;
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


.buttonText {
  font-size: 1.7em;
}
#Buttons {
  display: grid;
  grid-template-columns: 20em;
  justify-content: center;
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
