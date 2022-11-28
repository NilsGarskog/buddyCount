<template>
<body>
    <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
    <div>
        <h1 class="title">ScoreBoard</h1> 
    </div>

    <div class="playerList">
    <div v-for="name in names"
      v-bind:name="name"
      v-bind:key="name.message">
      {{name.avatar}} {{ name.message }} 
    </div>
    </div>

    <div class="amountofpoints">
    <div v-for="point in points"
      v-bind:point="point"
      v-bind:key="point.amount">
      {{ point.amount }}  
    </div>
</div>




</body>

</template>

<script>
/*import io from "socket.io-client";
const socket = io(); */

export default {
  name: "ScoreBoardView",
  components: {},
  data: function () {
    return {
      names: [{ message: 'Nils', avatar: '😍', }, { message: 'Samuel', avatar: '😵‍💫' }, 
    {message: 'Linnea', avatar: '😩'}, {message: 'Isak', avatar: '🐥'}, {message: 'Hanna', avatar: '🦅'}],
    points: [{amount: '12'}, {amount: '11'}, {amount: '8'}, {amount: '5'}, {amount: '4'}]    
    };

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

.title {
font-family: 'monoton';
font-size: 4em;
margin-top: 0em;
font-weight: 300;
}

.playerList {
  font-family: Righteous;
  font-size: 3em;
  text-align: left;
  margin-left: 7em;
}

.amountofpoints {
  font-family: Righteous;
  font-size: 3.3em;
  text-align: right;
  margin-right: 7em; 
  margin-top: -6.1em;
}


</style>





/*playerArray: [{"picture.jpg","Nils", }] */