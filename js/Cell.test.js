import Cell from "./Cell";

describe("cell", () => {
   it("get neighbor indexes", () => {
      const cell = new Cell();
      cell.numberOfColumns = 8;
      cell.numberOfCells = 64;
      cell.mineIndexes = [0, 1, 2, 3, 4, 5, 6, 7];
      const result = cell.getNeighborIndexes(12).sort((a, b) => a - b);
      const expectedResult = [11, 13, 19, 20, 21];
      const checkResult = () => {
         for (let i = 0; i < result.length; i++) {
            if (expectedResult[i] !== result[i]) return false;
         }
         return true;
      };
      expect(checkResult()).toBe(true);
   });
});
