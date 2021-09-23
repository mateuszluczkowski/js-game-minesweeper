import { levels } from "../data/index.js";
import Mine from "./Mine.js";
import Cell from "./Cell.js";

class Game {
   constructor(
      buttonsPanelEl,
      gamePanelEl,
      gameBoardEl,
      mineCounterEl,
      timerEl
   ) {
      this.buttonsPanelEl = buttonsPanelEl;
      this.gamePanelEl = gamePanelEl;
      this.gameBoardEl = gameBoardEl;
      this.mineCounterEl = mineCounterEl;
      this.timerEl = timerEl;
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
      this.cell.pushIndexesNearBomb();
      this.startTimer();
      this.checkEndOfGame();
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
   checkEndOfGame() {
      this.cell.allCells.forEach((cell) =>
         cell.addEventListener("click", () => {
            if (this.cell.isEnd) this.end();
         })
      );
   }
   end() {
      this.mine.mineIndexes.forEach((mineIndex) => {
         this.cell.showCell(mineIndex);
         const mineCell = document.getElementById(mineIndex);
         mineCell.classList.add("cell--is-mine");
      });
      this.cell.disableAllCells();
      clearInterval(this.timer);
   }
   startTimer() {
      this.timer = setInterval(() => {
         this.timerEl.textContent = Number(this.timerEl.textContent) + 1;
      }, 1000);
   }
   start() {
      this.initLevelButtons();
   }
}
export default Game;
