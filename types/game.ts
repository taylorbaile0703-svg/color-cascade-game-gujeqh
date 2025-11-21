
export interface GameColor {
  id: string;
  color: string;
  name: string;
}

export interface GameState {
  level: number;
  sequence: string[];
  playerSequence: string[];
  isShowingSequence: boolean;
  isPlayerTurn: boolean;
  score: number;
  highScore: number;
  gamePhase: 'idle' | 'showing' | 'playing' | 'correct' | 'incorrect';
}
