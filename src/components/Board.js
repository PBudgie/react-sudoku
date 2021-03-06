import React, { useState, useEffect, useRef } from 'react'
import Square from './Square'

function Board(props) {
    //props:
    //  puzzleId - a number specifying the ID of the puzzle
    //  squares - a 2d array of numbers representing the starting state of the puzzle

    var lockedArr = props.squares.map((value1) => {
        return value1.map((value2) => {
            if (value2 === 0) {
                return false;
            } else {
                return true;
            }
        });
    })

    const [puzzle, setPuzzle] = useState(props.squares)
    const [locked, setLocked] = useState(lockedArr)
    const [seconds, setSeconds] = useState(0)
    const [completed, setCompleted] = useState(false)
    const apiEndpoint = "http://localhost:3000"
    
    var myTimer = useRef();

    useEffect(() => {
        myTimer.current = setInterval(() => {
            setSeconds(seconds => seconds + 1)
        }, 1000)
        return () => clearInterval(myTimer)
    }, [])

    useEffect(() => {
        if(completed === true) {
            clearInterval(myTimer.current)
            const requestOptions = {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({ puzzle_id: props.puzzleId, time: seconds})
            };
            console.log(requestOptions.body)
            fetch(apiEndpoint, requestOptions)
        }
    }, [completed])

    const onChange = (index1, index2) => {
        return (event) => {
            if (/^[1-9]{1}$/.test(event.target.value) || event.target.value.length === 0) {
                var newPuzzle = puzzle.map((el1, i1) => {
                    return el1.map((el2, i2) => {
                        if (index1 === i1 && index2 === i2) {
                            if(event.target.value.length !== 0) {
                                return event.target.value
                            } else {
                                return 0
                            }
                        } else {
                            return el2
                        }
                    })
                })
                setPuzzle(newPuzzle)
            }

            if(checkComplete) {
                setCompleted(true)
            }
        }
    }

    //Formats seconds into mm:ss string
    const secondToString = (sec) => {
        var mm = Math.floor(sec / 60)
        var ss = sec % 60
        
        if(ss < 10) {
            return mm + ":0" + ss
        } else {
            return mm + ":" + ss
        }
    }

    const checkComplete = () => {
        //Check whether there are incomplete squares first since this is most common
        for(var i = 0; i < puzzle.length; i++) {
            for(var j = 0; j < puzzle[i].length; j++) {
                if(puzzle[i][j] === 0) {
                    console.log("has 0")
                    return false
                }
            }
        }

        //Check rows for duplicates
        for(var i = 0; i < puzzle.length; i++) {
            for(var j = 0; j < puzzle[i].length; j++) {
                var setOfNums = new Set()
                setOfNums.add(puzzle[i][j])
            }
            if(setOfNums.size < 9) {
                console.log("row " + i)
                return false
            }
        }

        //Check columns for duplicates
        for(var i = 0; i < puzzle.length; i++) {
            for(var j = 0; j < puzzle[i].length; j++) {
                var setOfNums = new Set()
                setOfNums.add(puzzle[j][i])
            }
            if(setOfNums.size < 9) {
                console.log("col " + i)
                return false
            }
        }

        // Check 3x3 squares for duplicates
        for(var square of [[0,0], [0,3], [0, 6], [3, 0], [3, 3], [3, 6], [6, 0], [6,3], [6, 6]]) {
            var i = square[0]
            var j = square[1]
            var setOfNums = new Set()
            for(var counti = 0; counti <= 2; counti++) {
                for(var countj = 0; countj <= 2; countj++) {
                    setOfNums.add(puzzle[i+counti][j+countj])
                }
            }
            if(setOfNums.size < 9) {
                console.log("square " + square)
                return false
            }
        }

        //Passed all checks
        console.log("Completed")
        return true
    }

    return (
        <React.Fragment>
        <div id="timer">{secondToString(seconds)}</div>
        <table><tbody>
            {
                puzzle.map((value1, index1) => {
                    return (
                        <tr key={index1} className="row">
                            {
                                value1.map((value2, index2) => {
                                    return <Square
                                        key={"" + index1 + index2}
                                        value={puzzle[index1][index2]}
                                        locked={locked[index1][index2]}
                                        onChange={onChange(index1, index2)}
                                    />
                                })
                            }
                        </tr>
                    );
                })
            }
        </tbody></table>
        <div className="win-text">{completed ? "Congratulations!" : ""}</div>
        </React.Fragment>
    );
}

export default Board;