import { levels } from "../data/index.js";
import Mine from "./Mine.js";
import Cell from "./Cell.js";

class Game {
   constructor(
      buttonsPanel,
      gamePanel,
      gameBoard,
      mineCounter,
      timer,
      modal,
      resetButton,
      resultFaceImage
   ) {
      this.buttonsPanelEl = buttonsPanel;
      this.gamePanelEl = gamePanel;
      this.gameBoardEl = gameBoard;
      this.mineCounterEl = mineCounter;
      this.modalEl = modal;
      this.resetButtonEl = resetButton;
      this.resultFaceImage = resultFaceImage;
      this.timerEl = timer;
      this.timer = null;
      this.level = {};
      this.mine = {};
      this.cell = {};
   }

   setAllProperty(e) {
      const choosenLvlName = e.target.id;

      this.level = levels.filter(({ name }) => name === choosenLvlName)[0];

      const numberOfCells = this.level.rows * this.level.columns;
      this.cell = new Cell(
         numberOfCells,
         this.gameBoardEl,
         this.level.columns,
         this.mineCounterEl
      );
      this.mine = new Mine(this.cell.numberOfCells, this.level.mines);

      this.mineCounterEl.textContent = this.level.mines;
      this.gamePanelEl.style.display = "none";
      this.mine.drawMineIndexes();
      this.cell.mineIndexes = this.mine.mineIndexes;
      this.cell.createCells();
      this.cell.pushIndexesNextToMine();
      this.startTimer();
      this.checkResult();
   }

   initLevelButtons() {
      levels.forEach(({ name }) => {
         const button = document.createElement("button");
         button.id = name;
         button.classList.add("button");
         button.innerText = name;
         button.addEventListener("click", (e) => this.setAllProperty(e));
         this.buttonsPanelEl.appendChild(button);
      });
   }
   checkResult() {
      this.cell.allCells.forEach((cell) =>
         cell.addEventListener("click", () => {
            if (this.cell.isLose) this.end("lose");
            if (this.cell.isWin) this.end();
         })
      );
   }
   displayModal(result) {
      const modalText = document.querySelector(".modal__text");
      const modalSubtext = document.querySelector(".modal__subtext");
      const modalButton = document.querySelector(".modal__button");
      const convertTime = (time) => {
         const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
         const minutes =
            Math.floor(time / 60) < 10
               ? `0${Math.floor(time / 60)}`
               : Math.floor(time / 60);
         const hours =
            Math.floor(time / (60 * 60)) < 10
               ? `0${Math.floor(time / 60)}`
               : Math.floor(time / 60);
         return `${hours === "00" ? "" : hours + ":"}${
            minutes + ":"
         }${seconds}`;
      };
      if (result === "lose") {
         modalText.textContent = "Bad luck :( You Lose!";
         modalSubtext.style.display = "none";
      } else {
         modalText.textContent = "Congratulations! You won!";
         modalSubtext.style.display = "block";
      }

      modalButton.addEventListener("click", () => {
         this.reset();
      });
      modalSubtext.textContent = `your time: ${convertTime(
         Number(this.timerEl.textContent)
      )}`;
      this.modalEl.classList.remove("hide");
   }
   startTimer() {
      this.timer = setInterval(() => {
         this.timerEl.textContent = Number(this.timerEl.textContent) + 1;
      }, 1000);
   }

   reset() {
      clearInterval(this.timer);
      document.documentElement.style.setProperty("--cells-in-row", 8);
      this.resultFaceImage.setAttribute("href", "./assets/sprite.svg#neutral");
      this.gamePanelEl.style.display = "block";
      this.gameBoardEl.textContent = "";
      this.modalEl.classList.add("hide");
      this.timerEl.textContent = 0;
      this.mineCounterEl.textContent = 0;
   }

   end(result) {
      this.cell.disableAllCells();
      clearInterval(this.timer);
      this.displayModal(result);
      if (result === "lose") {
         this.resultFaceImage.setAttribute(
            "href",
            "./assets/sprite.svg#negative"
         );
         this.mine.mineIndexes.forEach((mineIndex) => {
            this.cell.showCell(mineIndex);
            const mineCell = document.getElementById(mineIndex);
            mineCell.classList.add("cell--is-mine");
         });
      } else
         this.resultFaceImage.setAttribute(
            "href",
            "./assets/sprite.svg#positive"
         );
   }

   start() {
      this.initLevelButtons();
      this.resetButtonEl.addEventListener("click", () => this.reset());
   }
}
export default Game;
