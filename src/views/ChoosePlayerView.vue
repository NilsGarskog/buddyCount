<template>
  <body>
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
  <div class="characterColumn">
    <img src="../Icons/Paul.png">
    <img src="../Icons/Jerome.png">
    <img src="../Icons/NoFace.png">
    <img src="../Icons/Mononoke.png">
    <img src="../Icons/ScareCrow.png">
    <img src="../Icons/lucy.png">
    <img src="../Icons/grodanBoll.png">
    <img src="../Icons/Tintin.png">
    <img src="../Icons/Milou.png">
    <img src="../Icons/Voldermort.png">
    <img src="../Icons/Dobby.png">



    <div class="joinGame">
      <router-link v-bind:to="'/lobby/'">
      <button class="Button" id="joinGameButton">
        Join
      </button>
      </router-link>

    </div>


  </div>
</div>


  </body>


</template>

<script>




export default {
  name: "ChoosePlayerView",
  data(){
    return{
      username:"",
    };
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
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
  sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
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
  width: 9em;
  background-color: #70c1b3;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
  sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 3vw;
  font-weight: 800;
  line-height: 20px;
  padding: 6px 16px;


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
.characterRow {
  display: flex;
  flex-wrap: wrap;
  padding: 0 2em;


}

/* Create two equal columns that sits next to each other */
.characterColumn {
  flex: 50%;
  padding: 0 4px;

}

.characterColumn  img {
  margin-top: 8px;
  vertical-align: middle;
}
#joinGameButton{
margin-bottom: 1em;

}
#joinGameButton:hover{
  transform: scale(1.1);

}

</style>