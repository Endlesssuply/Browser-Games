// for pausing
flag = true;

// setting the size of the board
const boardWidth = 100
const boardHeight = 100

// establishing the rules
const underpopulation = 2
const overpopulation = 3
const rebirth = 3


function setup() {
    // setting the canvas up
    createCanvas(400, 400);
    background(55)
    strokeWeight(1)
    squareSize = min(width/boardWidth, height/boardHeight)

    // number of ticks per second
    // frameRate(5)

    //creating the board
    board = createBoard(boardWidth, boardHeight)
    tempBoard = createBoard(boardWidth, boardHeight)

    fillBoard()
    updateBoard()
}

function draw() {
    updateBoard()
}

function mousePressed() {
    flag = !flag;
    if (flag)
        loop();
    else
        noLoop();
}


// creates a 2d array filled with zeros that represents the board
function createBoard(boardWidth, boardHeight) {
    return Array(boardHeight).fill().map(() => Array(boardWidth).fill(0))
}


// randomly assigns 0s or 1s to board cells
function fillBoard() {
    board = board.map(row => row.map(() => round(random(0, 0.7))))
}


// draws the board on the screen
function drawBoard() {
    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            if (board[row][col] == 1) {
                fill(255)
                square(col * squareSize, row * squareSize, squareSize)
            }
            else {
                fill(100)
                square(col * squareSize, row * squareSize, squareSize)
            }
        }
    }
}


// updates the board (simulates one tick)
function updateBoard() {
    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            let state = board[row][col]
            let an = aliveNeighbours(row, col)

            // if the cell is alive, check for death from under/overpopulation
            if (state == 1) {
                if (an < 2 || an > 3) {
                    tempBoard[row][col] = 0
                }
                else {
                    tempBoard[row][col] = 1
                }
                fill(255)
                square(col * squareSize, row * squareSize, squareSize)
            }
            else {
                if (an == 3) {
                    tempBoard[row][col] = 1
                }
                else {
                    tempBoard[row][col] = 0
                }
                fill(100)
                square(col * squareSize, row * squareSize, squareSize)
            }
        }
    }
    console.table(board)
    var newArray = [];
    for (var i = 0; i < tempBoard.length; i++)
        newArray[i] = tempBoard[i].slice();
    board = newArray
}


// counts the number of adjacent alive cells
function aliveNeighbours(cRow, cCol) {
    let count = 0
    for (let row = - 1; row < 2; row++) {
        for (let col = - 1; col < 2; col++) {
            if (row == 0 && col == 0) {
                continue
            }
            // modular arithmetic to wrap around the edges
            let nRow = (cRow + row + board.length) % board.length
            let nCol = (cCol + col + board[0].length) % board[0].length
            count += board[nRow][nCol]
        }
    }
    return count
}