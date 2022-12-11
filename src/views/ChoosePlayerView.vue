<template>
  <body>

  <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
  <div class="wrapper">
  <div class="usernameGroup">
    <input type="input" class="inputUsername" v-model="playerInfo.username" placeholder="Username" name="name" id='name' required v-on:keyup.enter="onEnter"/>
    <label for="name" id="labelUse" class="labelUsername" >Username</label>
  </div>

  <div>
    <b id="characterText">
      Choose a character:
    </b>
  </div>





  <div class="characterRow">
    <div class="characterColumn" v-for="(avatar) in avatars"
         v-bind:avatar="avatar" v-bind:key="avatar.image">
      <p id="avatarName">
        {{avatar.image}}
      </p>


      <div class="borderCharacter">
        <div class="innerCharacter">

          <img  class="characters" :src="require('../Icons/'+avatar.image + '.png')" :key="avatar.image" v-on:click="selectThisCharacter(avatar)"/>

      </div>

      </div>


    </div>
  </div>
    <button class="Button" id="joinGameButton" :disabled="correctInput" v-on:click="getPlayerInfo(); addParticipant();">
      Join
    </button>
    </div>
  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: "ChoosePlayerView",

  components: {

  },
  data: function(){
    return{
      avatars: [
        {
          id: "Avatar_1",
          image: "Paul",
        },
        {
          id: "Avatar_2",
          image: 'Jerome'
        },
        {
          id: "Avatar_3",
          image: 'NoFace'
        },
        {
          id:"Avatar_4",
          image: 'Mononoke'
        },
        {
          id: "Avatar_5",
          image: 'ScareCrow'
        },
        {
          id: "Avatar_6",
          image: 'lucy'
        },
        {
          id: "Avatar_7",
          image: 'grodanBoll'
        },
        {
          id: "Avatar_8",
          image: 'Tintin'
        },
        {
          id: "Avatar_9",
          image: 'Milou'
        },
        {
          id: "Avatar_10",
          image: 'Voldermort'
        },
        {
          id: "Avatar_11",
          image: 'Dobby'
        }
      ],
      playerInfo: {
        clickedAvatars:[],
        username:"",
      },
      
      lang: "",
      pollId: "",
      playerId: "",
      question: "",
      answers: ["", ""],         ////Oklart om denna behövs?
      questionNumber: 0,
      data: {},
      uiLabels: {},
      Qid: 0,
      players: []
    }
    
  },

  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang;
    this.playerId = this.$route.params.playid;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) => {          //Oklart om denna behövs?
      this.data = data
    })
      socket.on("isFirst", (playerArray) => {          //Oklart om denna behövs?
      this.players = playerArray
      if (this.players.length === 1){
        this.$router.push('/Waiting/' + this.lang+'/'+this.pollId +'/'+ 1);
      }else{
        this.$router.push('/Waiting/' + this.lang+'/'+this.pollId +'/'+ this.playerId);
      }
    })
    
    },
  //Metod för att ta bort placeholder
  methods: {
    getPlayerInfo: function(){
          console.log(this.playerInfo)
    },

    addParticipant: function() {
      console.log('participant added');
      console.log(this.playerInfo.username);
      socket.emit("editParticipant", {pollId: this.pollId, nm: this.playerInfo.username, av: this.playerInfo.clickedAvatars, playerId: this.playerId})
    },
    onEnter:function(){
      document.getElementById("labelUse").style.display = 'none';
      document.getElementById("name").style.textAlign = "center";
      document.getElementById("name").style.fontWeight = "700";
      document.getElementById(("name")).style.borderWidth="0.2em";
      document.getElementById("name").style.paddingBottom = "0.4em";
      document.getElementById("name").style.borderImage ="linear-gradient(to right, #a02436, #24a07b)";
      document.getElementById("name").style.borderImageSlice = "1";
    },
    selectThisCharacter: function (avatar){

      if (this.playerInfo.clickedAvatars.length===0){
        this.playerInfo.clickedAvatars.push(avatar)
        console.log(this.playerInfo);

      }
      else {
        this.playerInfo.clickedAvatars.splice(0,1);
        this.playerInfo.clickedAvatars.push(avatar);
        console.log(this.playerInfo);

      }
    },

  },
  computed: {
    correctInput() {
      return (this.playerInfo.username != "" && this.playerInfo.clickedAvatars.length>0) ? false : true;
    }

  },
}

</script>


<style scoped>

body {
  position: relative;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrapper {
height: 60em;
overflow: scroll;
overflow-x: hidden;
display: flex;
flex-direction: column;
align-items: center;
}

#characterText{
  margin-top:8em;
}
.usernameGroup{
  position:relative;
  padding: 0.9375em 0 0;
  margin-top: 0.625em;
  width:50%
}
.inputUsername {
  font-family: righteous;
  width: 100%;
  border: 0;
  border-bottom: 0.125em solid #70c1b3;
  outline: 0;
  font-size: 2.6rem;
  color: black;
  padding: 0.4375em 0;
  background: transparent;
  transition: border-color 0.2s;
  text-align: center;
}
.inputUsername::placeholder{
  color:transparent;
}
.labelUsername {
  font-family: righteous;
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 2rem;
  color: black;
}
.inputUsername:placeholder-shown ~.labelUsername{
  font-size:2.6rem;
  cursor:text;
  top: 1.25em;
}
.inputUsername:focus{
  padding-bottom:  0.375em;
  font-weight: 700;
  border-width: 0.1875em;
  border-image: linear-gradient(to right,#a02449 ,#24a07b);
  border-image-slice: 1;
}
.inputUsername:focus~.labelUsername{
  position:absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 2rem;
  font-weight: 700;
  color: #a02449;
}
#characterText{
  font-family: righteous;
  font-size: 3vw;
}
.Button{
  height: 4em;
  width: 8em;
  background-color: #70c1b3;
  border: 0.1em solid rgba(27, 31, 35, 0.15);
  border-radius: 0.3em;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
  sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 3vw;
  font-weight: 800;
  line-height: 2em;
  padding: 1em 2em;
}
img {
  width:50%;
  height:auto;
  cursor:pointer;
  padding: 1em;
  margin: 1em;
  z-index:10;
}
img:hover{
  transform: scale(1.1);
}
.characterRow{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 0.25em;
}
.characterColumn {
  flex:25%;
  max-width: 20%;
  padding: 0 0.25em;
}
characterColumn img{
  margin-top: 0.5em;
  vertical-align: middle;
  width: 100%;
}

#joinGameButton{
margin-bottom: 1em;
  font-family: righteous;
}
#joinGameButton:hover{
  transform: scale(1.1);
}
#avatarName{
  font-family: righteous;
  font-size: 2vw;
  font-weight: 800;
  margin-top:1em;
  position:relative;
  display: inline-block;
  align-items: center;
  justify-content: center;
}
::-webkit-scrollbar{
  width: 0px;
}
button.Button:disabled{
  opacity:0.3;
  pointer-events: none !important;
}

</style>-->
