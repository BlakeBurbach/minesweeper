//
// This is only a SKELETON file for the 'Minesweeper' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

// ============= TODO ==============
/*
  ------ Initial setup -------
  1. First we take an input which is our minefield - an array of strings which are each a "row"
  2. We want to loop through that minefield to gain access to each "row"
  3. Then we want to loop through that row to gain access to each space in that "row"
  4. So now we have access to both the index of each specific row and the indices of each space in that row
  5. From there we can check to see if the previous, current, and next rows contain a mine in any adjacent space index

  -------- Identifying mines ------
  1. We should probably make a new empty `annotatedMineField` array that we will return at the end where we will show the numbers of adjacent mines in each row
  2. When we loop through the minefield, we need to make a reference to 3 things
     a. `previousRow`
     b. `currentRow`
     c. `nextRow`
  3. Same for each space in each row - `previous`, `current`, and `next` spaces.
   - I believe this will help us keep a track of each row and each space and we can check the value of each adjacent space this way
   - It will probably also help us to not check previous space or row if it is the first space or row, and last space or row if last space or row
  4. When we find that any adjacent space contains an `*`, we need to make the current space index count equal to how many adjacent mines we find
  - i.e. previous, current, and next indexOf space in previous, current, and next row
  5. If current space has an `*`, we skip it, because we want to preserve that space has an asterisk and not change it to a space or number

*/
const MINE = '*';

export const annotate = (minefield) => {
  const annotatedMineField = minefield.map((currentRow, rowIndex) => {
    const previousRow = rowIndex - 1 !== -1 ? minefield[rowIndex - 1] : null;
    const nextRow = rowIndex + 1 !== minefield.length ? minefield[rowIndex + 1] : null;
    let annotatedRow = '';

    for(let spaceIndex = 0; spaceIndex < currentRow.length; spaceIndex++) {
      let count = 0;
      const currentSpace = currentRow[spaceIndex];
      const previousSpace = spaceIndex - 1 !== -1 ? currentRow[spaceIndex - 1] : null;
      const nextSpace = spaceIndex + 1 !== currentRow.length ? currentRow[spaceIndex + 1] : null;

      if(currentSpace !== MINE) {
        count = isNotNull(previousRow) ? countForRow(previousRow, spaceIndex, count) : count;
        count = isNotNull(previousSpace) ? countForSpace(previousSpace, count) : count;
        count = isNotNull(nextSpace) ? countForSpace(nextSpace, count) : count;
        count = isNotNull(nextRow) ? countForRow(nextRow, spaceIndex, count) : count;

        annotatedRow = annotatedRow.concat(count > 0 ? count : ' ');
      }
    }
    return annotatedRow;
  });

  return annotatedMineField;
};

const isNotNull = (item) => item !== null;

const countForSpace = (space, count) => space === MINE ? count + 1 : count;

// Only used for previous and next rows so that we can use current index to check directly vertical adjacent spaces
const countForRow = (row, spaceIndex, count) => {
  const previousSpace = spaceIndex - 1 !== -1 ? row[spaceIndex - 1] : null;
  const nextSpace = spaceIndex + 1 !== row.length ?  row[spaceIndex + 1] : null;

  if(row.includes(MINE)) {
    count = countForSpace(previousSpace, count);
    count = countForSpace(row[spaceIndex], count);
    count = countForSpace(nextSpace, count);
  }
  return count;
};