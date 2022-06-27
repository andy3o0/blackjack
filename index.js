var human = { score: "#human-score", div: "#human-box" };
var cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"];
var cardsMap = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  K: 10,
  J: 10,
  Q: 10,
  A: 11,
};
var btns = { hitbtn: "true", standbtn: "false", dealbtn: "false" };
let hScore = 0;

//ADD CARDS
const hitSound = new Audio("assets/sounds/swish.m4a");
const winSound = new Audio("assets/sounds/cash.mp3");
const loseSound = new Audio("assets/sounds/aww.mp3");

document.querySelector("#hit").addEventListener("click", () => {
  if (btns.hitbtn == "true") {
    btns.standbtn = "true";
    //GET IMAGE
    let cardImage = document.createElement("img");

    //SHOW IMAGE
    var randomCard = cards[Math.floor(Math.random() * 13)];
    if (hScore <= 21) {
      cardImage.src = `/assets/images/${randomCard}.png`;
      document.querySelector(human.div).appendChild(cardImage);

      //PLAY SOUND
      hitSound.play();
    }

    //ADD POINTS
    if (randomCard == "A") {
      if (hScore + 11 < 21) {
        hScore += 11;
        document.querySelector(human.score).innerHTML = hScore;
      } else {
        hScore += 1;
        document.querySelector(human.score).innerHTML = hScore;
      }
    } else {
      hScore += cardsMap[randomCard];
      document.querySelector(human.score).innerHTML = hScore;
      // console.log(hScore);
    }
    if (hScore > 21) {
      document.querySelector(human.score).innerHTML = "BUST";
    }
  }
});

////////////////PC

let pcScore = 0;
var pc = { score: "#pc-score", div: "#pc-box" };

document.querySelector("#stand").addEventListener("click", () => {
  if (btns.standbtn == "true") {
    btns.hitbtn = "false";
    btns.dealbtn = "true";
    for (pcScore; pcScore <= 17; ) {
      //GET IMAGE
      let cardImage2 = document.createElement("img");

      //SHOW IMAGE
      var randomCard2 = cards[Math.floor(Math.random() * 13)];
      if (pcScore <= 21) {
        cardImage2.src = `/assets/images/${randomCard2}.png`;
        document.querySelector(pc.div).appendChild(cardImage2);

        //PLAY SOUND
        hitSound.play();
      }

      //ADD POINTS
      if (randomCard2 == "A") {
        if (pcScore + 11 < 21) {
          pcScore += 11;
          document.querySelector(pc.score).innerHTML = pcScore;
        } else {
          pcScore += 1;
          document.querySelector(pc.score).innerHTML = pcScore;
        }
      } else {
        pcScore += cardsMap[randomCard2];
        document.querySelector(pc.score).innerHTML = pcScore;
        // console.log(pcScore);
      }
      if (pcScore > 21) {
        document.querySelector(pc.score).innerHTML = "BUST";
      }
    }
  }
});

////////////////////////////////////WIN OR LOSE

var wins = 0;
var losses = 0;
var draws = 0;
document.querySelector("#deal").addEventListener("click", () => {
  if (btns.dealbtn == "true") {
    //WIN LOSE
    if (hScore > 21 && pcScore > 21) {
      draws += 1;
      document.querySelector("#draws").innerHTML = draws;
      document.querySelector("#play").innerHTML = "Draw";
    } else if (pcScore == hScore) {
      draws += 1;
      document.querySelector("#draws").innerHTML = draws;
      document.querySelector("#play").innerHTML = "Draw";
    } else if ((hScore > pcScore && hScore <= 21) || pcScore > 21) {
      wins += 1;
      document.querySelector("#wins").innerHTML = wins;
      document.querySelector("#play").innerHTML = "You Win";

      //PLAY SOUND
      winSound.play();
    } else if ((pcScore > hScore && pcScore <= 21) || hScore > 21) {
      losses += 1;
      document.querySelector("#losses").innerHTML = losses;
      document.querySelector("#play").innerHTML = "You Lose";

      //PLAY SOUND
      loseSound.play();
    }

    //SCORE 0
    hScore = 0;
    document.querySelector(human.score).innerHTML = 0;
    pcScore = 0;
    document.querySelector(pc.score).innerHTML = 0;

    // removing cards
    setTimeout(() => {
      document.querySelector("#play").innerHTML = "Let's Play";
    }, 1000);
    removal(human);
  }
});
///////////////////////////////////
document.querySelector("#deal").addEventListener("click", () => {
  if (btns.dealbtn == "true") {
    btns.hitbtn = "true";
    btns.standbtn = "false";
    btns.dealbtn == "false";
    removal(pc);
  }
});
/////////////////////////////////////REMOVE CARDS

let removal = (user) => {
  // var imgs= document.querySelector(user.div).querySelectorAll("img")
  for (
    let i = 0;
    i <= document.querySelector(user.div).querySelectorAll("img").length;
    i + 1
  ) {
    document.querySelector(user.div).querySelectorAll("img")[i].remove();
  }
};
