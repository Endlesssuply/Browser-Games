function setup() {
    createCanvas(400, 400);
    background(55)
    strokeWeight(1)

    // setting the size of the board
    boardWidth = 20
    boardHeight = 20
    squareSize = min(width/boardWidth, height/boardHeight)

    // establishing the rules
    underpopulation = 2
    overpopulation = 3
    rebirth = 3

    createBoard(boardWidth, boardHeight)

    // number of ticks per second
    frameRate(5)
    drawBoard()

}

function draw() {
    updateBoard()
    drawBoard()
}


// creates a 2d array that represents the board, randomly assigns 0 or 1
function createBoard(boardWidth, boardHeight) {
    board = new Array(boardHeight)
    for (let i = 0; i < boardHeight; i++) {
        board[i] = new Array(boardWidth)
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            board[row][col] = round(random(0, 0.8))
        }
    }
}


// draws the board on the screen
function drawBoard() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
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
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            state = board[row][col]
            an = aliveNeighbours(row, col)
            // if the cell is alive, check for death from under/overpopulation
            if (state == 1 && (an < underpopulation || an > overpopulation)) {
                board[row][col] = 0
            }
            else if (state == 0 && an == rebirth) {
                board[row][col] = 1
            }
        }
    }
}


function aliveNeighbours(curRow, curCol) {
    count = 0
    for (let row = curRow-1; row < curRow+2; row++) {
        for (let col = curCol-1; col < curCol+2; col++) {
            count += board[row][col]
        }
    }
    print(count)
    return count
}