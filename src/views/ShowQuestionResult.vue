<template>
<body>
    <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
   <div class="questionResultPage">
    <div class="resultList">
        <div class="participants">
        <div v-for="playerans in PlayersWithAnswers"
        v-bind:player="playerans"
        v-bind:key="playerans.name">
        <img class ="avatarImage" v-bind:src = "playerans.avatar" /> {{playerans.name}} 
        </div>
        </div>
        <div class="shuffledNumbers">
        <div v-for="playerans in ShuffledAnswers"
        v-bind:playerans="playerans"
        v-bind:key="playerans.answer">
        {{playerans.answer}}
        </div>
    </div>
    </div>
    </div>
    
</body>
</template>

<script>




function PlayerWithAnswer (nm, av, ans){
    this.name = nm;
    this.avatar = av;
    this.answer = ans;
}



let playerans1 = new PlayerWithAnswer('Nils', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-heart-eyes_1f60d.png', Math.floor((Math.random()*100)));
let playerans2 = new PlayerWithAnswer('Samuel', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/cold-face_1f976.png', Math.floor((Math.random()*100)));
let playerans3 = new PlayerWithAnswer('Isak', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/clown-face_1f921.png', Math.floor((Math.random()*100)));
let playerans4 = new PlayerWithAnswer('Linnea', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/front-facing-baby-chick_1f425.png', Math.floor((Math.random()*100)));
let playerans5 = new PlayerWithAnswer('Hanna', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/eagle_1f985.png', Math.floor((Math.random()*100)));
/*let player6 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/top-hat_1f3a9.png');
let player7 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/grinning-cat-with-smiling-eyes_1f638.png');
let player8 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/santa-claus_1f385.png');
let player9 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/dog-face_1f436.png');
let player10 = new PlayerItem(firstNames[Math.random() * firstNames.length | 0], 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/man-vampire_1f9db-200d-2642-fe0f.png');
*/

let myPlayersAnswers = [playerans1,playerans2,playerans3,playerans4,playerans5];
let myPlayersAnswersClone = structuredClone(myPlayersAnswers);
let shuffleAnswer = myPlayersAnswersClone.sort(() => Math.random() - 0.5);

console.log(myPlayersAnswers);
console.log(shuffleAnswer);



export default {

data: function () {
    return {
        
        PlayersWithAnswers: myPlayersAnswers,
        ShuffledAnswers: shuffleAnswer,
        
    }
}, 

methods: {
    ShuffleAnswers: function () {
        var currentIndex = this.PlayersWithAnswers.length;
        var temporaryValue;
        var randomIndex;
        var myRandomizedList;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = myRandomizedList[currentIndex];
            myRandomizedList[currentIndex] = myRandomizedList[randomIndex];
            myRandomizedList[randomIndex] = temporaryValue;
        }
        this.ShuffledAnswers = myRandomizedList;

        console.log(this.ShuffledAnswers);

    }
}

}
</script>

<style>

body {
    background-color: #24a07b;
  
}

.avatarImage {

    width: 40px;

}

.questionResultPage {
    height: auto;
    display:flex;
   padding-top: 13em;
}

.resultList {

    text-align: left;
    width: 100%;
    height: 8em;
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

.participants {

    height: 8em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-family: righteous;
    font-weight: bold;
}
.shuffledNumbers {
    height: 8em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>