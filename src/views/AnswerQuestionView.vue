<template>
  <body>
      <h1 class="heading">Hur många gånger har du gråtit inatt? </h1>
  <div class="characterRow">
    <div class="characterColumn" v-for="player in avatars"
         v-bind:avatar="avatar" v-bind:key="player.image">
            <span class="nameAndImg">
                {{avatar.name}}
          <img  class="characters" :src="require('../Icons/'+avatar.image + '.png')" :key="avatar.image" v-on:click="selectThisCharacter(avatar)"/>
            </span>

    </div>
  </div>
    </body>
</template>

<script>
export default {
name: "AnswerQuestionView",
data: function () {
    return {
        Players: ["Nils","Pedro","Karin","Pelle","Lotta"],
        Answers: [5,10,54,2,0],
        avatars: [
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
        }
      ],
    }
}
}
</script>

<style scoped>
.characterRow {
    display: flex;
    width: 100%;
    align-content: flex-start;
    flex-flow: column wrap;
}
.nameAndImg {
    height: 0.4em;
}

</style>