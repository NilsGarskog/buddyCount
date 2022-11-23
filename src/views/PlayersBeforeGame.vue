<template>

    <body>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
        <div>
            <div class ="gameCode">
            <p>CODE: {{gameID}} </p>
            </div>
        <h1 class ="playersTitle">PLAYERS</h1>
        <section class="playerListContainer">
            
        <div class = "playerList">
        <div v-for="player in players"
        v-bind:player="player"
        v-bind:key="player.name" >
        <img class ="avatarImage" v-bind:src = "player.avatar" /> {{player.name}}
        </div>
    </div>
        
    </section>

    <div>
        <button class="startGameButton">START GAME!</button>
    </div>
            </div>
    </body>

</template>



<script>

function PlayerItem (nm, av){
    this.name = nm;
    this.avatar = av;
}

let player1 = new PlayerItem('Nils', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-heart-eyes_1f60d.png');
let player2 = new PlayerItem('Samuel', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/cold-face_1f976.png');
let player3 = new PlayerItem('Linnea', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/clown-face_1f921.png');
let player4 = new PlayerItem('Isak', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/front-facing-baby-chick_1f425.png');
let player5 = new PlayerItem('Hanna', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/eagle_1f985.png');
let player6 = new PlayerItem('Pettson', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/top-hat_1f3a9.png');
let player7 = new PlayerItem('Findus', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/grinning-cat-with-smiling-eyes_1f638.png');
let player8 = new PlayerItem('Santa', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/santa-claus_1f385.png');
let player9 = new PlayerItem('Fido', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/dog-face_1f436.png');
let player10 = new PlayerItem('Dracula', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/man-vampire_1f9db-200d-2642-fe0f.png');


let myPlayers = [player1,player2,player3,player4,player5,player6,player7,player8,player9,player10];

console.log(myPlayers);



export default {

    

    data: function () {
        return {
            players: myPlayers,
            gameID: this.getRandID(),
        }
    },

    methods: {
        getRandID: function () {
      return Math.floor(Math.random()*1000) + " " + Math.floor(Math.random()*1000);
    },
    }
}

</script>



<style>

body {
    background-color: #24a07b;
}

.playersTitle {
font-family: 'monoton';
font-size: 5em;
margin-top: -0.7em;
font-weight: 300;
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

.startGameButton {
    font-family: Righteous;
    font-size: 2.5em;
    margin-top: 1.5em;
    padding: 0.5em;
    border: 1px solid;
    border-radius: 1em;
    background-color: #046B79;
    color: white;
}

.startGameButton:hover {
    background-color: #007D80;
    transition: 0.2s;
    cursor: pointer;


}

.gameCode {
    font-family: righteous;
    font-weight: bold;
    color: white;
    text-align: right;
    margin-right: 1.5em;
    margin-top: 1em;
    font-size: 3em;
}

.avatarImage {
    width: 50px;
    margin-bottom: -5px;
}

</style>