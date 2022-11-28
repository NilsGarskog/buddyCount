<template>
    <body>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet' type='text/css'>

    <div>
        <h1 class="title">ScoreBoard</h1> 
    </div>

    <div class="topfive">
    <div class="playerList">
    <div v-for="name in names"
      v-bind:name="name"
      v-bind:key="name">
      <img class="avatarImage" v-bind:src = "name.avatar" />
      {{name.message}}
    </div>
    </div>

    <div class="amountofpoints">
    <div v-for="point in points"
      v-bind:point="point"
      v-bind:key="point.amount">
      {{ point.amount }}  
    </div>
    </div>
</div>
</body>
</template>

<script>

function ScoreBoardNames (nm, av) {
    this.message= nm;
    this.avatar=av;
    
}

let name1= new ScoreBoardNames('Linnea', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-heart-eyes_1f60d.png');

let mynames= [name1];


console.log(mynames);

function ScoreBoardPoints(po) {
    this.amount=po;
}

let point1= new ScoreBoardPoints(12);

let mypoints= [point1];



export default {
  name: "ScoreBoardView2",
  components: {},
  data: function () {
    return {
        names: mynames,
        points: mypoints,
    }


}
}
</script>
<style>

body {
    background-color: #24a07b;
    font-family:Righteous ;
  
}
.title {
font-family: monoton;
font-size: 4em;
margin-top: 0em;
font-weight: 300;
}

.avatarImage {
    width: 40px;
}

.playerList {
 font-size: 3em;
 text-align: left;
 margin-left: 7em;
}

.amountofpoints {
font-size: 3.3em;
 text-align: right;
 margin-right: 7em;
 margin-top: -1.2em;
}

</style>
