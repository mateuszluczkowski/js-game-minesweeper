class Cell {
   constructor(
      end,
      numberOfCells,
      gameBoardEl,
      numberOfColumns,
      mineCounterEl
   ) {
      this.numberOfCells = numberOfCells;
      this.allCells = [];
      this.numberOfColumns = numberOfColumns;
      this.gameBoardEl = gameBoardEl;
      this.mineIndexes = [];
      this.numberOfGuessedCells = 0;
      this.indexesCellsNextToMine = [];
      this.flagedIndexes = [];
      this.mineCounterEl = mineCounterEl;
      this.numberOfFlagedBomb = 0;
      this.end = end;
   }

   disableAllCells() {
      this.allCells.forEach((cell) => (cell.style.pointerEvents = "none"));
   }

   showCell(index) {
      const cell = this.allCells[index];
      cell.classList.remove("border--concave");
      cell.classList.remove("cell--is-flag");
      cell.classList.add("border--revealed");
      this.numberOfGuessedCells++;
      const isWin =
         this.numberOfGuessedCells ===
         this.numberOfCells - this.mineIndexes.length;
      if (isWin) this.end();
   }

   handleCellClick(e) {
      const cellIndex = Number(e.target.id);
      const isLose = this.mineIndexes.includes(cellIndex);
      if (this.flagedIndexes.includes(cellIndex)) return;
      if (isLose) return this.end(true);
      this.showCell(cellIndex);
      this.showNumber(cellIndex);
   }
   createCells() {
      document.documentElement.style.setProperty(
         "--cells-in-row",
         this.numberOfColumns
      );
      for (let i = 0; i < this.numberOfCells; i++) {
         const cell = document.createElement("div");
         cell.className = "cell border border--concave";
         cell.id = i;
         cell.addEventListener("click", (e) => this.handleCellClick(e));
         cell.addEventListener("contextmenu", (e) => this.putFlag(e, cell));

         this.allCells.push(cell);
         this.gameBoardEl.appendChild(cell);
      }
   }

   getNeighborIndexes(index) {
      const neighborIndexes = [];
      let startColumn, endColumn;

      if (index % this.numberOfColumns === 0) {
         startColumn = 0;
         endColumn = 1;
      } else if (index % this.numberOfColumns === this.numberOfColumns - 1) {
         startColumn = -1;
         endColumn = 0;
      } else {
         startColumn = -1;
         endColumn = 1;
      }
      const isIndexOnTheBoard = (index) => {
         return (
            index >= 0 &&
            index <= this.numberOfCells - 1 &&
            !this.mineIndexes.includes(index)
         );
      };
      for (startColumn; startColumn <= endColumn; startColumn++) {
         const firstNumber = index + startColumn;
         const secondNumber = index + startColumn - this.numberOfColumns;
         const thirdNumber = index + startColumn + this.numberOfColumns;

         if (startColumn !== 0 && isIndexOnTheBoard(firstNumber))
            neighborIndexes.push(firstNumber);
         if (isIndexOnTheBoard(secondNumber))
            neighborIndexes.push(secondNumber);
         if (isIndexOnTheBoard(thirdNumber)) neighborIndexes.push(thirdNumber);
      }
      return neighborIndexes;
   }

   pushIndexesNextToMine() {
      this.mineIndexes.forEach((mineIndex) =>
         this.getNeighborIndexes(mineIndex).forEach((neighbor) =>
            this.indexesCellsNextToMine.push(neighbor)
         )
      );

      this.indexesCellsNextToMine = this.indexesCellsNextToMine.filter(
         (index) =>
            index >= 0 &&
            index <= this.numberOfCells - 1 &&
            !this.mineIndexes.includes(index)
      );
   }

   putFlag(e, cell) {
      e.preventDefault();
      const isFlaged = cell.className.includes("cell--is-flag");
      const isRevealed = cell.className.includes("border--revealed");
      const numberOfMines = this.mineIndexes.length;
      if (isFlaged) {
         this.flagedIndexes = this.flagedIndexes.filter(
            (index) => index !== Number(cell.id)
         );
         this.numberOfFlagedBomb--;
         this.mineCounterEl.textContent =
            numberOfMines - this.numberOfFlagedBomb;
      } else {
         if (this.numberOfFlagedBomb == numberOfMines || isRevealed) return;
         this.flagedIndexes.push(Number(cell.id));
         this.numberOfFlagedBomb++;
         this.mineCounterEl.textContent =
            numberOfMines - this.numberOfFlagedBomb;
      }

      cell.classList.toggle("cell--is-flag");
   }

   showNumber(clickedIndex) {
      if (this.mineIndexes.includes(clickedIndex)) return;
      const showZeroNeighbors = (zeroIndex) => {
         this.getNeighborIndexes(zeroIndex).forEach((neighIndex) => {
            const isConcave =
               this.allCells[neighIndex].className.includes("border--concave");
            if (isConcave) {
               this.showCell(neighIndex);
               this.showNumber(neighIndex);
            }
         });
      };

      const number = this.indexesCellsNextToMine.filter(
         (index) => index === clickedIndex
      ).length;
      if (number) {
         this.allCells[clickedIndex].classList.add(`cell-info-${number}`);
         this.allCells[clickedIndex].textContent = number;
      } else {
         showZeroNeighbors(clickedIndex);
      }
   }
}
export default Cell;
