import { levels } from "../data/index.js";
import Mine from "./Mine.js";
import Cell from "./Cell.js";

class Game {
   constructor(
      buttonsPanelEl,
      gamePanelEl,
      gameBoardEl,
      mineCounterEl,
      signedMineCounterEl
   ) {
      this.buttonsPanelEl = buttonsPanelEl;
      this.gamePanelEl = gamePanelEl;
      this.gameBoardEl = gameBoardEl;
      this.mineCounterEl = mineCounterEl;
      this.signedMineCounterEl = signedMineCounterEl;
      this.level = {};
      this.mine = {};
      this.cell = {};
   }

   setAllProperty(e) {
      const choosenLvlName = e.target.id;

      this.level = levels.filter(({ name }) => name === choosenLvlName)[0];

      const numberOfCells = this.level.rows * this.level.columns;
      this.cell = new Cell(numberOfCells, this.gameBoardEl, this.level.columns);
      this.mine = new Mine(this.cell.numberOfCells, this.level.mines);

      this.mineCounterEl.textContent = this.level.mines;
      this.gamePanelEl.style.display = "none";
      this.mine.drawMineIndexes();
      this.cell.mineIndexes = this.mine.mineIndexes;
      this.cell.createCells();
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

   end() {
      this.mine.mineIndexes.forEach((mineIndex) => {
         const mineCell = document.getElementById(mineIndex);
         this.showCell(mineCell);
         mineCell.classList.add("cell--is-mine");
      });
   }

   start() {
      this.initLevelButtons();
   }
}
export default Game;
