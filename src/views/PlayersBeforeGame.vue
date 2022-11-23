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
            {{player.avatar}} {{player.name}}
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

let player1 = new PlayerItem('Nils', '😍');
let player2 = new PlayerItem('Samuel', '😵‍💫');
let player3 = new PlayerItem('Linnea', '😩');
let player4 = new PlayerItem('Isak', '🐥');
let player5 = new PlayerItem('Hanna', '🦅');
let player6 = new PlayerItem('Pettson', '🎩');
let player7 = new PlayerItem('Findus', '😺');
let player8 = new PlayerItem('Santa', '🎅🏽');
let player9 = new PlayerItem('Fido', '🐶');
let player10 = new PlayerItem('Dracula', '🧛‍♂️');

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
font-size: 4em;
margin-top: -0.7em;
font-weight: 300;
}

.playerList {
    text-align: left;
    width: 100%;
    height: 8em;
    font-family: Righteous;
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
    font-size: 2.5em;
    margin-top: 1.5em;
    padding: 0.5em;
    border: 1px solid;
    border-radius: 1em;
    background-color: #6dcaae;
    color: white;
}

.startGameButton:hover {
    background-color: #5ba790;
    transition: 0.2s;
    cursor: pointer;

}

.gameCode {
    font-family: arial;
    font-weight: bold;
    color: white;
    text-align: right;
    margin-right: 2.5em;
    margin-top: 2em;
    font-size: 2em;
}

</style>