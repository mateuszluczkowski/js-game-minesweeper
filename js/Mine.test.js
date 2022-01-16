import Mine from "./Mine";
describe("mine", () => {
   it("get mine indexes array with correct length and each different elements in proper interval ", () => {
      const numberOfCells = 5;
      const numberOfMines = 5;
      const newMine = new Mine(numberOfCells, numberOfMines);
      const mineIndexes = newMine.drawMineIndexes();
      ///check number of mines
      expect(mineIndexes.length).toBe(numberOfMines);
      ///proper index interval
      expect(
         mineIndexes.every((item) => item >= 0 && item < numberOfCells)
      ).toBe(true);
      ///each element is different
      expect(
         mineIndexes.every(
            (item) =>
               mineIndexes.filter((filteredItem) => filteredItem === item)
                  .length === 1
         )
      ).toBe(true);
   });
});
