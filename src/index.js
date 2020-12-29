import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board.js'

ReactDOM.render(
  <Board squares={ [[ 0, 0, 4,   0, 0, 0,   0, 6, 7 ],
                    [ 3, 0, 0,   4, 7, 0,   0, 0, 5 ],
                    [ 1, 5, 0,   8, 2, 0,   0, 0, 3 ],

                    [ 0, 0, 6,   0, 0, 0,   0, 3, 1 ],
                    [ 8, 0, 2,   1, 0, 5,   6, 0, 4 ],
                    [ 4, 1, 0,   0, 0, 0,   9, 0, 0 ],

                    [ 7, 0, 0,   0, 8, 0,   0, 4, 6 ],
                    [ 6, 0, 0,   0, 1, 2,   0, 0, 0 ],
                    [ 9, 3, 0,   0, 0, 0,   7, 1, 0 ]] }/>,
  document.getElementById('root')
);
