<template>
  <body>
  <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
  <div class="username field">
    <input type="input" class="inputUsername" v-model="username" placeholder="Username" name="name" id='name' required v-on:keyup.enter="onEnter"/>
    <label for="name" id="labelUse" class="labelUsername" >Username</label>
  </div>

<!--<div class="dropdownAndText">

  <b id="characterText">
    Choose a character:
  </b>
<div class="dropdown">

  <button class="btnCharacter" type="button" id="dropdownMenuButton">
    Characters
  </button>
  <div class="dropdownContent">
    <a href="#">Bild 1</a>
    <a href="#">Bild 2</a>
    <a href="#">Bild 3</a>
    <a href="#">Bild 4</a>
    <a href="#">Bild 5</a>

  </div>

</div>
</div>
-->

  <div>
    <b id="characterText">
      Choose a character:
    </b>
  </div>


  <div class="characterRow">
    <div class="characterColumn" v-for="avatar in avatars"
         v-bind:avatar="avatar" v-bind:key="avatar">
    <p id="avatarName">
      {{avatar.image}}
    </p>
      <img class="characters" :src="getImage(avatar.image)" :key="avatar.image" v-on:click="selectThisCharacter(avatar)"/>

      <!--
      <img src="avatar.image"/>
-->
    </div>
    <!--
    <img class="characters" id="avatar1"  v-bind:src="require('../Icons/Paul.png')" v-on:click="selectThisCharacter($event)">
    <img class="characters" id="avatar2"  v-bind:src="require('../Icons/Jerome.png')" v-on:click="selectThisCharacter($event)">
    <img class="characters" id="avatar3"  v-bind:src="require('../Icons/NoFace.png')" v-on:click="selectThisCharacter($event)">
    <img class="characters" id="avatar4"  v-bind:src="require('../Icons/Mononoke.png')" v-on:click="selectThisCharacter($event)">
    <img class="characters" id="avatar5"  v-bind:src="require('../Icons/ScareCrow.png')" v-on:click="selectThisCharacter($event)">
    <img class="characters" id="avatar6"  v-bind:src="require('../Icons/lucy.png')" v-on:click="selectThisCharacter($event)">
    <img class="characters" id="avatar7"  v-bind:src="require('../Icons/grodanBoll.png')" v-on:click="selectThisCharacter($event)">
    <img class="characters" id="avatar8"  v-bind:src="require('../Icons/Tintin.png')" v-on:click="selectThisCharacter($event)">
    <img class="characters" id="avatar9"  v-bind:src="require('../Icons/Milou.png')" v-on:click="selectThisCharacter($event)">
    <img class="characters" id="avatar10" v-bind:src="require('../Icons/Voldermort.png')" v-on:click="selectThisCharacter($event)">
    <img class="characters" id="avatar11" v-bind:src="require('../Icons/Dobby.png')" v-on:click="selectThisCharacter($event)">
-->
  </div>


    <button class="Button" id="joinGameButton">
      Join
    </button>



  </body>


</template>

<script>
//import image from '/avatars.json'
//import id from '/avatars.json'



export default {
  name: "ChoosePlayerView",

  data(){
    return{
      avatars: [
        {
        id: "1",
          image: "Paul",
        },
        {
          id: "2",
          image: 'Jerome'
        },
        {
          id: "3",
          image: 'NoFace'
        },
        {
          id:"4",
          image: 'Mononoke'
        },
        {
          id: "5",
          image: 'ScareCrow'
        },
        {
          id: "6",
          image: 'lucy'
        },
        {
          id: "7",
          image: 'grodanBoll'
        },
        {
          id: "8",
          image: 'Tintin'
        },
        {
          id: "9",
          image: 'Milou'
        },
        {
          id: "10",
          image: 'Voldermort'
        },
        {
          id: "11",
          image: 'Dobby'
        }
      ],
      clickedAvatars:[]

    }
  },



  //Metod för att ta bort placeholder
  methods: {
    onEnter:function(){

      document.getElementById("labelUse").style.display = 'none';
      document.getElementById("name").style.textAlign = "center";
      document.getElementById("name").style.fontWeight = "700";
      document.getElementById(("name")).style.borderWidth="0.2em";
      document.getElementById("name").style.paddingBottom = "0.4em";
      document.getElementById("name").style.borderImage ="linear-gradient(to right, #a02436, #24a07b)";
      document.getElementById("name").style.borderImageSlice = "1";







    },

    selectThisCharacter(avatar){
      this.clickedAvatars.push(avatar)
      console.log(this.clickedAvatars);


    },

    getImage(img) {
      return require('../Icons/'+img+ '.png');
    }


  }
}



</script>

<style lang="scss" scoped>

body {
  position: relative;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;


}
$primary: /*#11998e*/ #a02436;
$secondary: /*#38ef7d*/  #24a07b;
$white: #fff;
$gray: black;
.username {
  font-size: 1.5rem;
  position: relative;
  padding: 0.5rem 0 0;
  margin-top: 2rem;
  width: 50%;
}

.inputUsername {
  font-family: righteous;
  width: 100%;
  border: 0;
  border-bottom: 0.1em solid $gray;
  outline: 0;
  font-size: 1.3rem;
  color: black;
  padding: 0.3em 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .labelUsername {
    font-size: 1.3rem;
    cursor: text;
    top: 1em;
  }
}

.labelUsername {
  font-family: righteous;
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1.5rem;
  color: $gray;
}

.inputUsername:focus {
  ~ .labelUsername {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight: 700;
  }
  padding-bottom: 0.4em;
  font-weight: 700;
  border-width: 0.2em;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}
/* reset input */
.inputUsername {
  &:required,
  &:invalid {
    box-shadow: none;
  }
}
#characterText{
  font-family: righteous;
  font-size: 3vw;
  margin-top:4em;
  position:relative;
  display: inline-block;
  align-items: center;
  justify-content: center;

}
/*
.dropdown{
  margin-top:4em;
  /*display:flex;
  align-items: center;
  justify-content: center;


  position:relative;
  display: inline-block;
  align-items: center;
  justify-content: center;

}
*/


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
/*
#dropdownMenuButton:hover {
  background-color: #67b3a5b7;
}
.dropdownContent{
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropdownContent a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdownContent a:hover {background-color: #ddd;}
.dropdown:hover .dropdownContent {display: block;}
.dropdown:hover .btnCharacter {background-color: #3e8e41;}
*/
img {
  width:10%;
  height:auto;
  box-shadow: 1em;
  cursor:pointer;
  padding: 1em;
  margin: 1em;
}
img:hover{
  transform: scale(1.1);
}



.characterColumn {
  float: left;
  width: 33.33%;
  padding: 5px;
}

/* Clear floats after image containers */
.characterRow::after {
  content: "";
  clear: both;
  display: table;
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
  font-size: 2em;
  font-weight: 800;



}
.characters{

}
@media screen and (max-width: 500px) {
  .characterColumn {
    width: 100%;
  }
}

</style>