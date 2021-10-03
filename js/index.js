import Game from "./Game.js";

const buttonsPanel = document.querySelector(".panel__buttons");
const gamePanel = document.querySelector(".game__panel");
const gameBoard = document.querySelector(".game__board");
const mineCounter = document.getElementById("hiddenBomb");
const timer = document.getElementById("signedBomb");
const modal = document.querySelector("article.modal");
const resetButton = document.querySelector("button.header__reset");
const resultFaceImage = document.querySelector("use");
const modalText = document.querySelector(".modal__text");
const modalSubtext = document.querySelector(".modal__subtext");
const modalButton = document.querySelector(".modal__button");
const game = new Game(
   buttonsPanel,
   gamePanel,
   gameBoard,
   mineCounter,
   timer,
   modal,
   resetButton,
   resultFaceImage,
   modalText,
   modalSubtext,
   modalButton
);

game.start();
