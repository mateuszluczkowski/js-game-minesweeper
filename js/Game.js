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
      resultFaceImage,
      modalText,
      modalSubtext,
      modalButton
   ) {
      this.elements = {
         buttonsPanel,
         gamePanel,
         gameBoard,
         mineCounter,
         modal,
         resetButton,
         timer,
         resultFaceImage,
         modalText,
         modalSubtext,
         modalButton,
      };
      this.timer = null;
      this.cell = {};
   }

   setLvlProperties(levelName) {
      const level = levels.filter(({ name }) => name === levelName)[0];
      const numberOfCells = level.rows * level.columns;
      const mine = new Mine(numberOfCells, level.mines);
      const { gameBoard, mineCounter, gamePanel } = this.elements;

      mineCounter.textContent = level.mines;
      gamePanel.style.display = "none";

      this.cell = new Cell(
         this.end.bind(this),
         numberOfCells,
         gameBoard,
         level.columns,
         mineCounter,
         mine.drawMineIndexes()
      );
      this.cell.init();
      this.startTimer();
   }

   initUIButtons() {
      levels.forEach(({ name }) => {
         const button = document.createElement("button");
         button.id = name;
         button.classList.add("button");
         button.innerText = name;
         button.addEventListener("click", (e) =>
            this.setLvlProperties(e.target.id)
         );
         this.elements.buttonsPanel.appendChild(button);
      });
      this.elements.resetButton.addEventListener("click", () => this.reset());
   }

   displayModal(isLose) {
      const convertTime = (time) => {
         const shouldAddZero = (timeToCheck) =>
            timeToCheck < 10 ? "0" + timeToCheck : String(timeToCheck);
         const seconds = shouldAddZero(time % 60);
         const minutes = shouldAddZero(Math.floor(time / 60) % 60);
         const hours = shouldAddZero(Math.floor(time / (60 * 60)));

         return `${hours === "00" ? "" : hours + ":"}${minutes}:${seconds}`;
      };

      if (isLose) {
         this.elements.modalText.textContent = "Bad luck :( You Lose!";
         this.elements.modalSubtext.style.display = "none";
      } else {
         this.elements.modalText.textContent = "Congratulations! You won!";
         this.elements.modalSubtext.style.display = "block";
      }

      this.elements.modalButton.addEventListener("click", () => this.reset());
      this.elements.modalSubtext.textContent = `your time: ${convertTime(
         Number(this.elements.timer.textContent)
      )}`;
      this.elements.modal.classList.remove("hide");
   }
   startTimer() {
      this.timer = setInterval(() => {
         this.elements.timer.textContent =
            Number(this.elements.timer.textContent) + 1;
      }, 1000);
   }

   reset() {
      clearInterval(this.timer);
      document.documentElement.style.setProperty("--cells-in-row", 8);
      this.elements.resultFaceImage.setAttribute(
         "href",
         "./assets/sprite.svg#neutral"
      );
      this.elements.gamePanel.style.display = "block";
      this.elements.gameBoard.textContent = "";
      this.elements.modal.classList.add("hide");
      this.elements.timer.textContent = 0;
      this.elements.mineCounter.textContent = 0;
   }

   end(isLose) {
      this.cell.disableAllCells();
      clearInterval(this.timer);
      this.displayModal(isLose);
      if (isLose) {
         this.elements.resultFaceImage.setAttribute(
            "href",
            "./assets/sprite.svg#negative"
         );
         this.cell.mineIndexes.forEach((mineIndex) => {
            this.cell.showCell(mineIndex);
            const mineCell = document.getElementById(mineIndex);
            mineCell.classList.add("cell--is-mine");
         });
      } else
         this.elements.resultFaceImage.setAttribute(
            "href",
            "./assets/sprite.svg#positive"
         );
   }

   start() {
      this.initUIButtons();
   }
}
export default Game;
