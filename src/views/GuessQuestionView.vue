<template>
  <body>
    <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
      <h1 class="heading">Hur många gånger har du gråtit inatt? </h1>
  <section class="playerListContainer">
    <div class="playerList">
    <div v-for="(player) in players"
         v-bind:players="players" v-bind:key="player.image">
            <span class="playerNameInList">
          <img  class="avatarImage" :src="require('../Icons/'+player.image + '.png')" :key="player.image"/>
          
            <span id="name">{{player.name}}</span>
            <component :is="interact" />
            <div class="dropZone" v-bind:id="player.id">
               </div>
            </span>
    </div>
    </div>
  </section>
    <div  class="drop2zone">
      <div v-for="item in items"
      v-bind:items="items" v-bind:key="item.title" v-bind:id="item.id">
      <component :is="interact" />
      <div class="dropZone" id="numberCont">  
    <span v-on:mouseover="showButton()" class="draggable"> 
      {{item.title}}
    </span>
    </div>
    </div>
    </div>
    <button v-if="showButtonBoolean">HEJ</button>
  
 

 
    </body>
</template>

<script>
/*import vSelect from 'vue-select'*/

  import interact from "interactjs";


  const interval = setInterval(function() {
   this.showButton();
 }, 5000);

clearInterval(interval);

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
      modifiers: [
      interact.modifiers.restrictRect({
        restriction: '.dropzone',
        endOnly: true
      })
    ],  
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
  //console.log('event')
  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
  //console.log(event)
  //console.log(event.currentTarget.innerHTML)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

// enable draggables to be dropped into this
interact('.dropZone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.draggable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
    //console.log(event)
    
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target
    //console.log(event)
    
    /* if(event.currentTarget.id != "numberCont"){
      event.currentTarget.innerHTML = "";
    } */
    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    //draggableElement.textContent = 'In'
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    //event.relatedTarget.textContent = 'Dragged out'
    if(event.currentTarget.id != "numberCont"){
      event.currentTarget.innerHTML = "";
    }
   //console.log(event.currentTarget.innerHTML)
  },
  ondrop: function (event) {
    //event.relatedTarget.textContent = 'Dropped'
  
    console.log(event)
    if(event.currentTarget.id != "numberCont"){
      event.currentTarget.innerHTML += event.relatedTarget.innerHTML
      //event.currentTarget.style.color="transparent"
    }
    console.log(event.currentTarget.innerHTML)
   /*  this.showButton(); */
    

    
  },
   ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  } 
})

/*  interact('.draggable')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: '.dropZone',
        endOnly: true
      })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener }
  }) */
 
export default {
name: "AnswerQuestionView",
        components: {
      interact,
        },

created(){
 /*  this.timerstart()*/
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

    ],
    showButtonBoolean: false,
    //timerobj: null,

    }
},

methods: {
  print: function(){
    console.log("click")
  },

/*   timerstart() {
    this.timerobj = setInterval(() => {
      this.showButton()
    },3000)
  },
 */
  showButton: function(){
    console.log('hej')
    let noEmpty = true;
    for(let i = 0; i<this.players.length;i++){
      let playId = "#"+this.players[i].id;
      //console.log(playId)
      let dropDiv = document.querySelector(playId);
      console.log(i,dropDiv.innerHTML);
      if(dropDiv.innerHTML === ""){
        //console.log('empty')
        noEmpty = false;
      }   
    }
    if(noEmpty){
      this.showButtonBoolean = true;
    }
    //console.log(noEmpty)
  }
},
/* beforeUnmount(){
  clearInterval(this.timerstart)
}, */


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
  font-family: Righteous;
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
    height: auto;
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
    margin-right:0.5em;

}
.dropZone{
  background-color: #046B79;
  color: white;
  border: 1px solid white;
  box-shadow: 0px 5px 4px #046B79;
  width: 3em;
  -ms-touch-action: none;
  touch-action: none;
}

.draggable {
  cursor:pointer;
}

.drop2zone {
  display: flex;
  flex-direction: row;
  justify-content: center;

}




#numberCont {
  background-color:#046B79;
  border: 1px solid white;
  box-shadow: 0px 5px 4px #046B79;
  height:2em;
  width: 2em;
  display:flex;
  margin: 1em;
  font-size:2em;
  justify-content: center;
  align-items: center;
  

}

.playerNameInList {
  display: flex;

  justify-content: space-between;
  margin-bottom: 0.5em;

}

#name {
  width:100%;
}

</style>