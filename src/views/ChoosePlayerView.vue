<template>

  <body v-on:click="usernameColorFix">

  <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>

  <div class="usernameGroup">
    <input type="text" autocomplete="off" class="inputUsername" v-model="playerInfo.username" placeholder="Username" name="name" id='name' required v-on:keyup.enter="onEnter"/>
    <label for="name" id="labelUse" class="labelUsername" >Username... </label>
  </div>

  <div>
    <b id="characterText">
      Choose a character:
    </b>
  </div>


<div class="FlexCenter">
  <div class="container">
    <div class="emptyFiller"></div>
  <div v-for="(avatar) in avatars" v-bind:avatar="avatar" v-bind:key="avatar.image" >
  <div class="box"><img  id="avatarer" class="characters" :src="require('../Icons/'+avatar.image + '.png')" :key="avatar.image" v-on:click="selectThisCharacter(avatar)"/></div>
</div>
</div>
</div>
<div class="profileContainer">
  <p id="profileHeadingText">Your profile</p>
  <div class="nameAndProfile">
  <div id="profile"></div>
  <div id="profileName"> {{playerInfo.username}}</div>
  </div>
</div>
 <div class="bottomArea">
    
    <button class="Button" id="joinGameButton" :disabled="correctInput" v-on:click="addParticipant();">

      JOIN!
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
    addParticipant: function() {
      socket.emit("editParticipant", {pollId: this.pollId, nm: this.playerInfo.username, av: this.playerInfo.clickedAvatars, playerId: this.playerId})
    },
    onEnter:function(){
      document.getElementById("labelUse").style.display = 'none';
      document.getElementById("name").style.textAlign = "center";
      document.getElementById("name").style.borderImage ="linear-gradient(to right, #046B79, #24a07b)";
      document.getElementById("name").style.borderImageSlice = "1";
    },
    selectThisCharacter: function (avatar){
    var avt = avatar.image
      if (this.playerInfo.clickedAvatars.length===0){
        this.playerInfo.clickedAvatars.push(avatar)


      }
      else {
        this.playerInfo.clickedAvatars.splice(0,1);
        this.playerInfo.clickedAvatars.push(avatar);


      }
      var avataren =document.getElementById("profile");
      avataren.innerHTML="<img id='pictureAvatar' src='img/"+avt+".png' width=\"100em\" height=\"100em\" >";

    },
    usernameColorFix: function(){
      if (this.playerInfo.username != ""){
        document.getElementById("labelUse").style.color = "#a02449";
        document.getElementById("labelUse").style.fontWeight = "700";
        document.getElementById("name").style.borderImage ="linear-gradient(to right, #046B79, #24a07b)";
        document.getElementById("name").style.borderImageSlice = "1";
        document.getElementById("labelUse").style.top="0";
        document.getElementById("name").style.padding ="0.675em 0 0";
      }

    }

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

.profileContainer{
  display:flex;
  border-radius: 5%;
  flex-direction: column;
  margin-top:1em;
  min-height: 20%;
  min-width: 25%;
  font-family: righteous;
  align-items: center;
  font-size: 2em;
  background-color: #0791a3;
    box-shadow: 0px 5px 4px rgba(55,54,51, 1);


}
.nameAndProfile{
  display: flex;
  align-items: center;
}
#profileHeadingText{
margin-top: 0;

}
#profile{
  margin-top: -0.7em;
}
#profileName{
  margin-top: -0.7em;
margin-left: 0.5em;
}

.FlexCenter{
    margin-top:-3em;
  display: flex;
  justify-content: center;
  width: 100%;
}
.container {

  overflow: auto;
  overflow-y: hidden;
  display: flex;
  scroll-snap-type: x mandatory;
  width: 20%;
  box-shadow: 0px 0px 25px 25px  #0a292d;
  margin-top:5em;
  background-color: #046B79;

}

.box {
  height: 200px;
  width: 200px;
  margin-right: 5px;
  flex-shrink: 0;
  scroll-snap-align: center;
  margin-top: 0.5em;
  margin-left: -1em;
  margin-right: -1em;
}


#chosenAvatar{
  border-radius: 2em;
  background-color: #00acae;
}
.usernameGroup{
  position:relative;
  padding: 0.675em 0 0;
  margin-top: 0.625em;
  width:50%;
  margin-bottom: 1em;
}
.inputUsername {

  font-family: righteous;
  width: 100%;
  border: 0;
  border-bottom: 0.125em solid #046B79;
  outline: 0;
  font-size: 2.6rem;
  color: black;
  padding: 0.4em 0;
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
  display: block;
  transition: 0.2s;
  font-size: 2rem;
  color: black;
  opacity: 0.4;
  width: 100%;
}
.emptyFiller{
 min-height: 2em; 
  min-width: 6em; 
}
.inputUsername:placeholder-shown ~.labelUsername{
  font-size:2.6rem;
  cursor:text;
  top: 1.25em;

}
.inputUsername:focus{
  border-image: linear-gradient(to right,#046B79 ,#24a07b);
  border-image-slice: 1;
  padding-bottom: 0;

}
.inputUsername:focus~.labelUsername{
  position:absolute;
  top: 0;

  display: block;
  transition: 0.2s;
  font-size: 2rem;
  font-weight: 700;
  color: #0791a3;

}
#characterText{
  font-family: righteous;
  font-size: 2em;


}
.Button{
  height: 4em;
  width: 9em;
  background-color: #70c1b3;
  border: 0.1em solid rgba(27, 31, 35, 0.15);
  border-radius: 0.3em;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
  sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 2em;
  font-weight: 800;
  line-height: 2em;
  padding: 1em 2em;
}
.characters{
  width:70%;
  height:auto;
  cursor:pointer;
  padding: 1em;
  margin: 1em;
  z-index:10;
}
.characters:hover{
  transform: scale(1.2);
}


.bottomArea{
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  margin-top:3em;
}
#joinGameButton{
  font-family: Righteous;
    font-size: 2em;
    margin-top: -0.5em;
    padding: 0.5em;
    height:3em;
    width: 7em;
    border: 1px solid;
    border-radius: 20px;
    background-color: #046B79;
    color: white;
    transition: 0.2s;
    box-shadow: 0px 5px 4px #046B79;
}
#joinGameButton:hover {
    background-color: #00acae;
    transition: 0.2s;
    cursor: pointer;
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
@media screen and (max-width:50em) {

  .container {
    width:85%
  }
  .profileContainer{
    width:80%
  }
}

</style>-->
