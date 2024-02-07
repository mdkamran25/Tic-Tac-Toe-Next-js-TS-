'use client'
import React, { useState } from 'react'
import { XIcon } from '../xIcon/xIcon';
import { OIcon } from '../oIcon/oIcon';
// import { OIcon } from './OIcon'
// import { XIcon } from './XIcon'

interface PlayerProp {
  winner:string,
  playerX: boolean,
  squares: Array<any>,
  handlePlayer(i: number): void,
  handleRestartGame(): void,
}

interface SquareProp {
  value: JSX.Element | string | null,
  onClick(): void,
}




export const Board = ({ winner, playerX, handleRestartGame}: PlayerProp) => {
    const [squares, setSqaures] = useState<Array<any>>(Array(9).fill(null));
    console.log({squares})
    const [isX, setIsX] = useState<boolean>(true);
    function handlePlayer(i: number) {
        squares[i] = isX ? "X" : "O";
        setSqaures(squares);
        setIsX(!isX);
      }
  
  function Square({ value, onClick }: SquareProp) {
    return (
      <button className="square" onClick={onClick} disabled={winner ? true :false} >
        {value}
      </button>
    )

  }

  function value(i:number){
     let value;
     if( squares[i] ==="X"){
       value=<XIcon />
     }else if( squares[i] === "O"){
        value=<OIcon />
     }else{
        value=null;
     }

     return value;

  }

  const renderSquare = (i: number) => {
    return <Square value={value(i)} onClick={() => handlePlayer(i)} />
  }

  return (
    <div>
      <div className="board">
        <div className=" w-[300px] md:[w-400px] rounded-lg flex items-center justify-center space-x-10">
          <div>
            {playerX
              ?
              <div className="text-white bg-gray-700 text-xl px-4 py-1 w-28 rounded-lg font-medium uppercase">
                <span className="text-purple-600 text-2xl font-bold">
                  X
                </span>
                {" "}
                Turn
              </div>

              :
              <div className="text-white bg-gray-700 text-xl px-4 py-1 w-28 rounded-lg font-medium uppercase">
                <span className=" text-[#f3b236] text-2xl font-bold">
                  O
                </span>
                {" "}
                Turn
              </div>

            }

          </div>
        </div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>

        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>

        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  )
}