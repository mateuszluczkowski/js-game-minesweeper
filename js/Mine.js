class Mine {
   constructor(numberOfCells, numberOfMines) {
      this.numberOfCells = numberOfCells;
      this.numberOfMines = numberOfMines;
   }
   drawMineIndexes() {
      const mineIndexes = [];
      for (let i = 0; i < this.numberOfMines; i++) {
         let drawIndex = Math.floor(Math.random() * this.numberOfCells);

         while (mineIndexes.includes(drawIndex))
            drawIndex = Math.floor(Math.random() * this.numberOfCells);

         mineIndexes.push(drawIndex);
      }
      return mineIndexes;
   }
}

export default Mine;
