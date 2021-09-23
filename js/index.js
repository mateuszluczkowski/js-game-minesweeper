import Game from "./Game.js";

const buttonsPanelEl = document.querySelector(".panel__buttons");
const gamePanelEl = document.querySelector(".game__panel");
const gameBoardEl = document.querySelector(".game__board");
const mineCounterEl = document.getElementById("hiddenBomb");
const timer = document.getElementById("signedBomb");

const game = new Game(
   buttonsPanelEl,
   gamePanelEl,
   gameBoardEl,
   mineCounterEl,
   timer
);

game.start();
