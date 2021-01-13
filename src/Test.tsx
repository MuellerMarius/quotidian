const Test: React.FC = () => (
  <div>
    <h3>Tetrisodoku</h3>
    <p>
      Tetrisodoku is a game combining the famous game Tetris and Sodoku. With
      each move you can chose between three Tetris tiles which you can drag and
      drop anywhere on the game board. Once you completely fill one of the
      marked squares on the gameboard, the blocks disappear and make room for
      new tiles to place. On top of that you will be credited the respective
      score. The darker the color of the Tetris blocks, the more points you will
      receive. Chose wiseley where to place your tiles as the game is over when
      none of the tiles can be placed on the board any more.
    </p>
    <h3>Source code</h3>
    <p>
      This game is a little fun project written in Typescript and React. If you
      are interested in the source code please visit the{' '}
      <a href="https://github.com/MuellerMarius/tetrisudoku">
        Github repository
      </a>
      . I would be happy if you leave a comment or suggestion for improvement!
      Thanks and stay healthy!
    </p>
  </div>
);

export default Test;
