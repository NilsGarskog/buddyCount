<template>
  <body>
      <h1 class="heading">Hur många gånger har du gråtit inatt? </h1>

  <section class="playerListContainer">
    <div class="playerList">
    <div v-for="player in players"
         v-bind:players="players" v-bind:key="player.image">
            <span class="playerNameInList">
          <img  class="avatarImage" :src="require('../Icons/'+player.image + '.png')" :key="player.image" />
            {{player.name}}
            </span>
    </div>
    </div>
  </section>
  <div class="answers">
  </div>
    </body>
</template>

<script>
export default {
name: "AnswerQuestionView",
data: function () {
    return {
        players: [
        {
          id: "Avatar_1",
          image: "Paul",
          name: "Nils"
        },
        {
          id: "Avatar_2",
          image: 'Jerome',
          name: "Pedro"
        },
        {
          id: "Avatar_3",
          image: 'NoFace',
          name: "Karin"
        },
        {
          id:"Avatar_4",
          image: 'Mononoke',
          name: "Pelle"
        },
        {
          id: "Avatar_5",
          image: 'ScareCrow',
          name: "Lotta"
        },
              ]

    }
},
}

</script>

<style scoped>
body{
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
}
.playerList {
    text-align: left;
    width: 100%;
    height: 6em;
    font-family: Righteous;
    font-weight: 100;
    font-size: 3em;
    padding-top: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-evenly;



}

.playerListContainer {
    display: flex;
    justify-content: center;
    
}
.avatarImage {
    width: 50px;
    margin-bottom: -5px;
}

</style>