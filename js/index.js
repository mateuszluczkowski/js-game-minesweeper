import Game from "./Game.js";

const buttonsPanelEl = document.querySelector(".panel__buttons");
const gamePanelEl = document.querySelector(".game__panel");
const gameBoardEl = document.querySelector(".game__board");
const mineCounterEl = document.getElementById("hiddenBomb");
const timer = document.getElementById("signedBomb");
const modal = document.querySelector("article.modal");
const resetButton = document.querySelector("button.header__reset");
const resultFaceImage = document.querySelector("use");
const game = new Game(
   buttonsPanelEl,
   gamePanelEl,
   gameBoardEl,
   mineCounterEl,
   timer,
   modal,
   resetButton,
   resultFaceImage
);

game.start();
