<template>

    <body>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
        <div class ="headerContainer">
            <div>
                <p>{{uiLabels.noPlayers}}: {{this.players.length}}</p>
            </div>
            <div class ="gameCode">
            <p>{{uiLabels.code}}: {{pollId}} </p>
            </div>
        </div>
        <div>
        <h1 class ="playersTitle">{{uiLabels.players}}</h1>
        <h3 class="removeText">{{uiLabels.removeText}}</h3>
        </div>
        <section class="playerListContainer">
            
        <div class = "playerList">
        <div v-for="player in players"
        v-bind:player="player"
        v-bind:key="player.name">
        <span v-on:click="removeParticipant(player)"><span id="playerNameInList"> <img class ="avatarImage" :src="require('../Icons/'+player.avatar[0].image + '.png')" />{{player.name}}</span></span>
        </div>
    </div>
        
    </section>
    <!--
    <div id="footer">
        <button class="startGameButton" v-on:click="goToQuestion()">{{uiLabels.startGame}}</button>
    </div>
-->
    </body>

</template>



<script>
import io from 'socket.io-client';
const socket = io();



export default {

    data: function () {
        return {
            uiLabels: {},
            lang: "en",
            players: [],
            pollId: "",
            
            
        }
    },
    created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    socket.emit("pageLoaded",this.lang)
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.emit('joinPoll', this.pollId)
    socket.on("sendPlayers", (update) => {       //Funktion för att hämta Spelarobjekt från korrekt rum
    this.players = update;
    });
    socket.emit('getPlayers', this.pollId)
    socket.on("playerEdited", (update) => {       //Funktion för att hämta Spelarobjekt från korrekt rum
    this.players = update;
    });
    socket.on("goToNextPage", () => {
      this.$router.push('/creatqhost/' + this.lang+'/'+this.pollId);
    })
    },

    methods: {
  
    

    removeParticipant: function (player) {
        if(player.playerId != 1){
            socket.emit('removeParticipant', {pollId: this.pollId, playerId: player.playerId})
        }
        
    },
    goToQuestion: function(){
        socket.emit('goToNextPage', this.pollId)
    }

    
}}

</script>



<style scoped>

body {
    background-color:#24a07b;
    cursor: default;
    width: 100%;
    position: fixed;  
    min-height: 100vh;
}
#footer {
  
    position: absolute;
    bottom: 10%;
     width: 100%;

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
    border-radius: 20px;
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