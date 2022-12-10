<template>

    <body>
        {{players}}
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
        <div class ="headerContainer">
            <div>
                <p>No. of players: {{this.players.length}}</p>
            </div>
            <div class ="gameCode">
            <p>CODE: {{pollId}} </p>
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
        <span v-on:click="removeParticipant(player)"><span id="playerNameInList"> <img class ="avatarImage" :src="require('../Icons/'+player.avatar[0].image + '.png')" /> {{player.name}}</span></span>
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
import io from 'socket.io-client';
const socket = io();



export default {

    data: function () {
        return {
            firstNames,
            players: [],
            pollId: "",
            lang:""
            
        }
    },
    created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    socket.emit('joinPoll', this.pollId)
    socket.on("playerEdited", (update) => {       //Funktion för att hämta Spelarobjekt från korrekt rum
    console.log("PlayerEdit kallas på i lobbyn")
    this.players = update;
    });
    socket.on("goToQuestions", () => {
      this.$router.push('/creatqhost/' + this.lang+'/'+this.pollId);
    })
    },

    methods: {
    getRandID: function () {
            let number1 = Math.floor(Math.random()*10000);
      return number1.toString().padStart(4,'0');
    },

    getRandName: function () {
        var array = this.firstNames;
        var ran_key = array[Math.random()* array.length | 0 ];
        return ran_key;
    }, 

    removeParticipant: function (player) {
        if(player.playerId != 1){
            socket.emit('removeParticipant', {pollId: this.pollId, playerId: player.playerId})
        }
        
    }
    }

    
}

</script>



<style scoped>

body {
    background-color:#24a07b;
    cursor: default;

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