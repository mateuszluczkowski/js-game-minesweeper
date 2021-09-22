class Mine {
   constructor(numberOfCells, numberOfMines) {
      this.mineIndexes = [];
      this.numberOfCells = numberOfCells;
      this.numberOfMines = numberOfMines;
   }
   drawMineIndexes() {
      for (let i = 0; i < this.numberOfMines; i++) {
         let drawIndex = Math.floor(Math.random() * this.numberOfCells);

         while (this.mineIndexes.includes(drawIndex))
            drawIndex = Math.floor(Math.random() * this.numberOfCells);

         this.mineIndexes.push(drawIndex);
      }
   }
}

export default Mine;
