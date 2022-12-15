<template>
<body>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Patrick Hand' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>

<div class="flexContainer">
  <div class="Credits">
    <div class="fade"></div>

    <section class="star-wars">

      <div class="crawl">
        <div class="title">
    <h1>Thank you for playing BuddyCount!</h1>
        </div>
     <p>We hope you had as much fun playing it as we had making it.

We are a small team of programmers and designers: Nils Gärskog, Samuel Ram, Linnea Nilsson, Hanna Andersson, and Isak Lindström. We put our hearts and souls into making this game, and we are grateful for all the support we received along the way.

However, we want to be transparent and let you know that the development process was not without its challenges. One of the biggest challenges we faced was dealing with the constant crashes of Samuel's computer.

In our case, Samuel's computer seemed to crash at the most inopportune moments, causing us to lose valuable work and forcing us to spend countless hours trying to resolve the issues. We can't tell you how many times we wanted to throw our computers out the window because of it.

Despite these challenges, we persevered and were able to deliver a high-quality game that we are proud of. We want to thank you again for playing BuddyCount and supporting our team. We hope you will continue to enjoy the game and look forward to bringing you more fun and engaging experiences in the future.

In comparison to the lame "true or false" game that Felix and his minions created, BuddyCount is far superior in every way. The gameplay is engaging and entertaining, the graphics are colorful and vibrant, and the overall experience is much more enjoyable. We put a lot of time and effort into making BuddyCount the best game it could be, and we are confident that it will provide hours of entertainment for players of all ages.

Thank you again for playing BuddyCount, and we hope you will continue to enjoy the game!

Sincerely,
The BuddyCount team
    </p>
  </div>
    </section>
    </div>
  <div class="flexContainerHnP">
    <div class="Heading">
      Thank you for counting your buddies!
    </div>
    <div class="PodiumContainer">
      <div class="thirdPlace">
        <div class="thirdPlaceBox">

        </div>
        <div class="thirdPlaceAvatar">
          <h1>{{players[2].name}}</h1>
          <img class ="avatarImage" :src="require('../Icons/' + players[2].avatar + '.png')" />
        </div>  
      </div>
      <div class="firstPlace">
        <div class="firstPlaceBox">

        </div>
        <div class="firstPlaceAvatar">
          <h1>{{players[0].name}}</h1>
          <img class ="avatarImage" :src="require('../Icons/Winner/' + players[0].avatar + 'Crown' + '.png')" />
        </div>  
      </div>
      <div class="secondPlace">
        <div class="secondPlaceBox">

        </div>
        <div class="secondPlaceAvatar">
          <h1>{{players[1].name}}</h1>
          <img class ="avatarImage" :src="require('../Icons/' + players[1].avatar + '.png')" />
        </div>  
      </div>
    </div>
  </div>
</div>

</body>
</template>

<script>
export default {
data: function () {
  return {
    players:[
      {name: "Isak", avatar: "Tintin", points: 10},
      {name: "Nils", avatar: "Mononoke", points: 5},
      {name: "Hanna", avatar: "Voldermort", points: 2}
    ],
    placement:[]
  }
},
created: function () {
this.players.sort((a,b) => a.points - b.points);
this.players.reverse()
}
}
</script>

<style scoped>
body {
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  font-family: Righteous;
}

.flexContainer{
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  margin-top: 3em;
}
.Credits{
width: 35%;
height: 80vh;
background-color: black;
overflow: hidden;

}
.flexContainerHnP{
  display: flex;
  flex-direction: column;
}
.Heading{
  font-family: "monoton";
  font-size: 2.5em;
}
.PodiumContainer{
  display: flex;
  flex-direction: row;
  min-width: 60%;
  min-height: 80%;
  align-items: flex-end;
}
.avatarImage{
  filter: drop-shadow(0.5em 0.1em 0.1px black);
}
.thirdPlace{
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
}
.thirdPlaceBox{
background-color: #134450;
height: 20vh;
width: 100%;
filter: drop-shadow(0.5em 0.1em 0.1px black);

}
.thirdPlaceAvatar{

}
.firstPlace{
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
}
.firstPlaceBox{
background-color: #2487a0;
height: 40vh;
width: 100%;
filter: drop-shadow(0.5em 0.1em 0.1px black);

}
.firstPlaceAvatar{

}
.secondPlace{
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
}
.secondPlaceBox{
background-color: #1b6375;
height: 30vh;
width: 100%;
filter: drop-shadow(0.5em 0.1em 0.1px black);

}
.secondPlaceAvatar{

}
.avatarImage{
  height: 8em;
  width: 8em;
}


.fade {
  position: relative;
  width: 100%;
  min-height: 60vh;
  top: -25px;
  background-image: linear-gradient(0deg, transparent, black 75%);
  z-index: 1;
}

.star-wars {
  display: flex;
  justify-content: center;
  position: relative;
  height: 800px;
  color: #feda4a;
  font-family: 'Pathway Gothic One', sans-serif;
  font-size: 300%;
  font-weight: 600;
  letter-spacing: 6px;
  line-height: 150%;
  perspective: 400px;
  text-align: justify;
}

.crawl {
  position: relative;
  top: -100px;
  transform-origin: 50% 100%;
  animation: crawl 60s linear;
}

.crawl > .title {
  font-size: 90%;
  text-align: center;
}

.crawl > .title h1 {
  margin: 0 0 100px;
  text-transform: uppercase;
}

@keyframes crawl {
  0% {
    /* The element starts below the screen */
    top: 0;
    /* Rotate the text 20 degrees but keep it close to the viewer */
    transform: rotateX(20deg) translateZ(0);
  }
  100% { 
    /* This is a magic number, but using a big one to make sure the text is fully off the screen at the end */
    top: -12000px;
    /* Slightly increasing the rotation at the end and moving the text far away from the viewer */
    transform: rotateX(21deg) translateZ(-4000px);
  }
}
</style>