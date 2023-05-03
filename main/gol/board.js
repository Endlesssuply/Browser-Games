class Board {
    constructor(height, width) {
        this.height = height
        this.width = width
    }

    createBoard() {
        let squareSize = min(width/this.width, height/this.height)
        print(squareSize)
        board = new Array(boardHeight)
        for (let i = 0; i < boardHeight; i++) {
            board[i] = new Array(boardWidth)
        }

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                board[row][col] = round(random(0, 0.8))

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
}