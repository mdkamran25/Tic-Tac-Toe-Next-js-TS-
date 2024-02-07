import mongoose, { Schema, Document } from 'mongoose';

interface GameModel extends Document, GameSchema {
    playerX: { type: typeof Schema.Types.ObjectId; ref: string; required: boolean; };
    playerO: {type: typeof Schema.Types.ObjectId; ref: string; };
}

const GameSchema: Schema = new Schema<GameModel>(
  {
    roomCode: {
      type: String,
      required: true,
    },
    playerX: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    playerO: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    board: {
      type: [String],
      default: ['', '', '', '', '', '', '', '', ''],
    },
    turn: {
      type: String,
      default: 'X',
    },
    winner: {
      type: String,
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
    leftGame: {
      playerX: {
        type: Boolean,
        default: false,
      },
      playerO: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model('Game', GameSchema);
export default Game;
