class Cell {
   constructor(numberOfCells, gameBoardEl, numberOfColumns) {
      this.numberOfCells = numberOfCells;
      this.gameBoardEl = gameBoardEl;
      this.numberOfColumns = numberOfColumns;
      this.mineIndexes = [];
      this.isEnd = false;
      console.log(this.numberOfCells);
   }

   showCell(cell) {
      cell.classList.remove("border--concave");
      cell.classList.add("border--revealed");
   }

   handleCellClick(e) {
      const clickedCell = e.target;
      const clickedId = Number(clickedCell.id);
      this.showCell(clickedCell);
      if (this.mineIndexes.includes(clickedId)) this.isEnd = true;
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
         this.gameBoardEl.appendChild(cell);
      }
   }
}
export default Cell;
