<template>

    <body>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
        <div class ="headerContainer">
            <div>
                <p>No. of players: {{this.players.length}}</p>
            </div>
            <div class ="gameCode">
            <p>CODE: {{gameID}} </p>
            </div>
        </div>
        <div>
        <h1 class ="playersTitle">PLAYERS</h1>
        <h3 class="removeText">Click name to remove from game. No naughty names allowed!</h3>
        </div>
        <section class="playerListContainer">
            
        <div class = "playerList">
        <div v-for="player in players"
        v-bind:player="player"
        v-bind:key="player.name" >
        <span v-on:click="removePlayer(player)"><span id="playerNameInList"> <img class ="avatarImage" v-bind:src = "player.avatar" /> {{player.name}}</span></span>
        </div>
    </div>
        
    </section>

    <div>
        <button class="startGameButton">START GAME!</button>
    </div>
            
    </body>

</template>



<script>
import firstNames from '/first-names.json'



function PlayerItem (nm, av){
    this.name = nm;
    this.avatar = av;
}



let player1 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-heart-eyes_1f60d.png');
let player2 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/cold-face_1f976.png');
let player3 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/clown-face_1f921.png');
let player4 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/front-facing-baby-chick_1f425.png');
let player5 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/eagle_1f985.png');
let player6 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/top-hat_1f3a9.png');
let player7 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/grinning-cat-with-smiling-eyes_1f638.png');
let player8 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/santa-claus_1f385.png');
let player9 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/dog-face_1f436.png');
let player10 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/man-vampire_1f9db-200d-2642-fe0f.png');
let player11 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/hut_1f6d6.png');
let player12 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/woman-golfing_1f3cc-fe0f-200d-2640-fe0f.png');
let myPlayers = [player1,player2,player3,player4,player5,player6,player7,player8,player9,player10,player11,player12];

console.log(myPlayers);





export default {

    data: function () {
        return {
            firstNames,
            players: myPlayers,
            gameID: this.getRandID(),
            
        }
    },

    methods: {
        getRandID: function () {
            let number1 = Math.floor(Math.random()*1000);
            let number2 = Math.floor(Math.random()*1000)
      return number1.toString().padStart(3,'0') + ' ' + number2.toString().padStart(3,'0');
    },

    getRandName: function () {
        var array = this.firstNames;
        var ran_key = array[Math.random()* array.length | 0 ];
        return ran_key;
    }, 

    removePlayer: function (player) {

        for(let i = 0; i < this.players.length; i++){
            if(this.players[i] === player){
                this.players.splice(i,1);
            }
        }
        

    }
    }

    
}

</script>



<style>

body {
    background-color:#24a07b;
}

.headerContainer {
    display:flex;
    justify-content: space-between;
    font-family: righteous;
    font-weight: bold;
    color: white;
    margin: 1em;
    margin-top: 0em;
    font-size: 3em;
}

.playersTitle {
font-family: 'monoton';
font-size: 5em;
margin-top: -1em;
font-weight: 300;
}

.removeText {
    font-family: Righteous;
    margin-top: -2.5em;
    margin-bottom: 3em;
    font-size: 1.5em;
    color: white;

    
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
    margin-top: 0.5em;
    padding: 0.5em;
    border: 1px solid;
    border-radius: 1em;
    background-color: #046B79;
    color: white;
    transition: 0.2s;
    box-shadow: 0px 5px 4px #046B79;
}

.startGameButton:hover {
    background-color: #00acae;
    transition: 0.2s;
    cursor: pointer;


}

/*.gameCode {
    font-family: righteous;
    font-weight: bold;
    color: white;
    text-align: right;
    margin-right: 1.5em;
    margin-top: 1em;
    font-size: 3em;
}*/

.avatarImage {
    width: 50px;
    margin-bottom: -5px;
}

#playerNameInList {
    transition: 0.2s;
}

#playerNameInList:hover {
font-size: 1.1em;
color: rgb(255, 97, 97);
transition: 0.2s;
cursor:pointer;
}
</style>