function canPlaceWord(grid, word, row, col, direction) {
    const n = word.length;
    if (direction === 'H') {
    if (col + n > grid[0].length || (col > 0 && grid[row][col - 1] !== '.') || (col + n < grid[0].length && grid[row][col + n] !== '.')) {
    return false;
    }
    for (let i = 0; i < n; i++) {
    if (grid[row][col + i] !== '-' && grid[row][col + i] !== word[i]) {
    return false;
    }
    }
    } else if (direction === 'V') {
    if (row + n > grid.length || (row > 0 && grid[row - 1][col] !== '.') || (row + n < grid.length && grid[row + n][col] !== '.')) {
    return false;
    }
    for (let i = 0; i < n; i++) {
    if (grid[row + i][col] !== '-' && grid[row + i][col] !== word[i]) {
    return false;
    }
    }
    }
    return true;
    }
    
    function placeWord(grid, word, row, col, direction) {
    const placements = [];
    if (direction === 'H') {
    for (let i = 0; i < word.length; i++) {
    if (grid[row][col + i] === '-') {
    grid[row][col + i] = word[i];
    placements.push([row, col + i]);
    }
    }
    } else if (direction === 'V') {
    for (let i = 0; i < word.length; i++) {
    if (grid[row + i][col] === '-') {
    grid[row + i][col] = word[i];
    placements.push([row + i, col]);
    }
    }
    }
    return placements;
    }
    
    function removeWord(grid, placements) {
    for (let i = 0; i < placements.length; i++) {
    const [row, col] = placements[i];
    grid[row][col] = '-';
    }
    }
    
    function solveCrossword(grid, words) {
    if (words.length === 0) {
    return true;
    }
    
    const word = words.shift();
    
    for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
    for (const direction of ['H', 'V']) {
    if (canPlaceWord(grid, word, i, j, direction)) {
    const placements = placeWord(grid, word, i, j, direction);
    if (solveCrossword(grid, words)) {
    return true;
    }
    removeWord(grid, placements);
    }
    }
    }
    }
    
    words.unshift(word);
    return false;
    }
    
    // numberEqual checks if the words have the total number of words indicated in the puzzle
    function numberEqual(puzzle, words) {
    const rows = puzzle.split('\n');
    let totalNumbersSum = 0;
    
    for (const row of rows) {
    for (const char of row) {
    const num = parseInt(char);
    if (!isNaN(num) && num > 0 && num < 3) {
    totalNumbersSum += num;
    }
    }
    }
    
    return totalNumbersSum === words.length;
    }
    
    function noRepeat(words) {
    const uniqueWords = new Set(words);
    return uniqueWords.size === words.length;
    }
    
    function errorFuction(){
    console.log("Error")
    }
    
    function crosswordSolver(crossword, words) {
    
    if (typeof crossword !=='string' || !Array.isArray(words)){
    errorFuction()
    return
    }
    
    if (!numberEqual(crossword, words)) {
    errorFuction()
    return
    }
    
    if (!noRepeat(words)){
    errorFuction()
    return
    }
    
    if (words.length <= 3){
    errorFuction()
    return
    }
    
    const puzzleArray = crossword.split('\n');
    const newBoard = puzzleArray.map(row =>
    row.split('').map(element => element === '.' ? '.' : '-').join('')
    );
    
    const grid = newBoard.map(row => row.split(''));
    words.sort((a, b) => b.length - a.length);
    
    if (!numberEqual(crossword, words)) {
    console.log("Error")
    } else if(solveCrossword(grid, words)) {
    let solution = grid.map(row => row.join(''));
    let formattedSolution = solution.join('\n');
    console.log(formattedSolution);
    } else {
    console.log("Error")
    }
    }
        
    