type Side = "White" | "Black";
type PieceType = "King" | "Queen" | "Rook" | "Bishop" | "Knight" | "Pawn";

type PieceDisplay =
  | "♔"
  | "♕"
  | "♖"
  | "♗"
  | "♘"
  | "♙"
  | "♚"
  | "♛"
  | "♜"
  | "♝"
  | "♞"
  | "♟"
  | " ";

class Piece {
  public side: Side;
  public pieceType: PieceType;

  constructor(side: Side, pieceType: PieceType) {
    this.side = side;
    this.pieceType = pieceType;
  }
}

type MaybePiece = Piece | null;

export class Position {
  private board!: MaybePiece[][];

  constructor(fen: string) {
    this.initEmptyBoard();
  }

  private initEmptyBoard() {
    this.board = [];

    for (let rank = 0; rank < 8; rank++) {
      this.board[rank] = [];
      for (let file = 0; file < 8; file++) {
        this.board[rank][file] = null;
      }
    }
  }

  public getPieceAtSquare(rank: number, file: number): MaybePiece {
    return this.board[rank][file];
  }
}

function printBoard(position: Position) {
  console.log("    a   b   c   d   e   f   g   h  ");
  console.log("  ┌───┬───┬───┬───┬───┬───┬───┬───┐");

  for (let rank = 7; rank >= 0; rank--) {
    let rowString = `${rank + 1} │`;

    for (let file = 0; file < 8; file++) {
      const piece = position.getPieceAtSquare(rank, file);

      const pieceDisplay = characterForPiece(piece);

      rowString = rowString + ` ${pieceDisplay} │`;
    }

    rowString = rowString + ` ${rank + 1}`;

    console.log(rowString);
    if (rank > 0) {
      console.log("  ├───┼───┼───┼───┼───┼───┼───┼───┤");
    }
  }
  console.log("  └───┴───┴───┴───┴───┴───┴───┴───┘");
  console.log("    a   b   c   d   e   f   g   h  ");
}

function characterForPiece(piece: MaybePiece): PieceDisplay {
  let pieceDisplay: PieceDisplay = " ";
  if (piece === null) {
    pieceDisplay = " ";
  } else {
    if (piece.side === "White") {
      switch (piece.pieceType) {
        case "Pawn":
          pieceDisplay = "♙";
          break;
        case "Rook":
          pieceDisplay = "♖";
          break;
        case "Knight":
          pieceDisplay = "♘";
          break;
        case "Bishop":
          pieceDisplay = "♗";
          break;
        case "Queen":
          pieceDisplay = "♕";
          break;
        case "King":
          pieceDisplay = "♔";
          break;
      }
    } else {
      switch (piece.pieceType) {
        case "Pawn":
          pieceDisplay = "♟";
          break;
        case "Rook":
          pieceDisplay = "♜";
          break;
        case "Knight":
          pieceDisplay = "♞";
          break;
        case "Bishop":
          pieceDisplay = "♝";
          break;
        case "Queen":
          pieceDisplay = "♛";
          break;
        case "King":
          pieceDisplay = "♚";
          break;
      }
    }
  }

  return pieceDisplay;
}

let position = new Position(process.argv[2]);

printBoard(position);
