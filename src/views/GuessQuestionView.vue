<template>
  <body>
      <h1 class="heading">Hur många gånger har du gråtit inatt? </h1>
  <section class="playerListContainer">
    <div class="playerList">
    <div v-for="(player) in players"
         v-bind:players="players" v-bind:key="player.image">
            <span class="playerNameInList">
          <img  class="avatarImage" :src="require('../Icons/'+player.image + '.png')" :key="player.image"/>
            {{player.name}}
            <div class="dropZone">
            
               </div>
            </span>
    </div>
    </div>

    <div class="drop2zone">
      <div v-for="item in items"
      v-bind:items="items" v-bind:key="item.title">
      <component :is="interact" />
    <span class="draggable"> {{item.title}}</span>
    </div>
    </div>
  </section>
 

 
    </body>
</template>

<script>
/*import vSelect from 'vue-select'*/
import '@interactjs/auto-start'
import '@interactjs/actions/drag'
import '@interactjs/actions/resize'
import '@interactjs/modifiers'
import '@interactjs/dev-tools'
import interact from '@interactjs/interact'

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    /* modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ], */
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener



export default {
name: "AnswerQuestionView",
        components: {
      interact,
        },

created(){
  
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

.draggable{
  height:2em;
  width:2em;
  background-color:gray;
}

.playerNameInList {
  display: flex;

  justify-content: space-between;
  margin-bottom: 0.5em;
  
}
</style>