<template>
  <body>
      <h1 class="heading">Hur många gånger har du gråtit inatt? </h1>
  <section class="playerListContainer">
    <div class="playerList">
    <div v-for="(player) in players"
         v-bind:players="players" v-bind:key="player.image">
            <span class="playerNameInList">
          <img  class="avatarImage" :src="require('../Icons/'+player.image + '.png')" :key="player.image" draggable="true"/>
            {{player.name}}
            <form id="Guesses">
              <select width=300 
                      style="width: 350px">
                <option value='blue'>Blue</option>
                <option value='green'>Green</option>
                <option value='red'>Red</option>
                <option value='yellow'>Yellow</option>
                <option value='' selected>Select a Color</option>
              </select>
            </form>
            </span>
    </div>
    </div>
  </section>

  <!-- <div class="gridwrapper">
    <div class="playerGrid">
       <div v-for="(player) in players"
         v-bind:players="players" v-bind:key="player.image">
      <div class="avatar1"> <img  class="avatarImage" :src="require('../Icons/'+player.image + '.png')" :key="player.image" draggable="true"/></div>
      <div class="name1">{{player.name}}</div>
      <div class="dropBox1">dropBox</div>
      <div class="avatar2"></div>
      <div class="name2"></div>
      <div class="dropBox2"></div>
      </div>
    </div>
  </div>
    {{players}}{{items}} -->

  <!-- <draggable 
  v-model="items" 
  group="people" 
  @start="drag=true" 
  @end="drag=false" 
  item-key="id">
  <template #item="{element}">
    <div>{{element.title}} {{element.name}}</div>
   </template>
</draggable>

<br>
<br>

 <draggable 
  v-model="players" 
  group="people" 
  @start="drag=true" 
  @end="drag=false" 
  item-key="id">
  <template #item="{element}">
    <div class="playerNameInList">
          <img  class="avatarImage" :src="require('../Icons/'+element.image + '.png')" :key="element.image" />
            {{element.name}}
    {{element.name}} {{element.title}}</div>
   </template>
</draggable> -->

    </body>
</template>

<script>
// import draggable from 'vuedraggable'

export default {
name: "GuessQuestionView",
        components: {
            // draggable,
        },
data: function () {
    return {
      drag: false,
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
              ],
      items:[
      { id: 1, title: '24'},
      { id: 2, title: '54'},
      { id: 3, title: '11'},
      { id: 4, title: '2'},
      { id: 5, title: '3'},

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
  cursor: default;
}

.gridwrapper {
  height:50%;
}

.playerGrid{
  display: grid;

  grid-template-columns: 0.3fr 1fr 0.3fr 0.3fr 1fr 0.3fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;

    gap: 0px;
   height: 50%;

}

.avatar1 {
  grid-column-start: 1;
  grid-column-end: 2;

  grid-row-start: 1;
  grid-row-end: 6;

}

.name1 {
    grid-column-start: 2;
  grid-column-end: 3;

  grid-row-start: 1;
  grid-row-end: 6;
}

.dropBox1 {
      grid-column-start: 3;
  grid-column-end: 4;

  grid-row-start: 1;
  grid-row-end: 6;
}

.avatar2 {
        grid-column-start: 4;
  grid-column-end: 5;

  grid-row-start: 1;
  grid-row-end: 6;
}

.name2 {
          grid-column-start: 5;
  grid-column-end: 6;

  grid-row-start: 1;
  grid-row-end: 6;
}

.dropBox1 {
            grid-column-start: 6;
  grid-column-end: 7;

  grid-row-start: 1;
  grid-row-end: 6;
}


.playerList {
    text-align: left;
    width: 100%;
    height: 100%;
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

    
}
.avatarImage {
    width: 1em;
    height: 1em;

}
.dropZone{
  background-color: grey;
  width: 1em;


  
}

.playerNameInList {
  display: flex;

  justify-content: space-between;
  margin-bottom: 0.5em;
  
}
</style>