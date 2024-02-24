const timer = document.getElementById("Timer");
document.getElementById("start").addEventListener("click", startGame);
document.getElementById("stop").addEventListener("click", endGame);
let continueTimer = false,
  flag = 1;
function startGame() {
  document.getElementById("start").disabled = true;
  document.getElementById("stop").disabled = false;
  continueTimer = true;
  if (flag == 1) timer_start();
  flag = 0;
  initialise_game();
}
function endGame() {
  document.getElementById("start").disabled = false;
  document.getElementById("stop").disabled = true;
  continueTimer = false;
  let tiles=document.querySelectorAll(".tile");
    for(let i=0;i<tiles.length;i++)
    {
        tiles[i].disabled=true;
    }
    tiles=document.querySelectorAll(".tile-sol");
    for(let i=0;i<tiles.length;i++)
    {
        tiles[i].disabled=true;
    }
}
var count = 0;
function timer_start() {
  setInterval(() => {
    if (!continueTimer) {
      count = 0;
    } else timer.innerText = count++ + "s";
  }, 1000);
}
var previousQ = 0;
function sampleQ() {
  const unsolvedSudoku1 = [
    [5, 3, 0, 0, 0, 7, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 0, 0, 0, 7, 9],
  ];
  const unsolvedSudoku2 = [
    [0, 2, 0, 0, 0, 0, 8, 4, 0],
    [0, 0, 0, 0, 6, 1, 0, 0, 0],
    [8, 0, 0, 5, 0, 2, 0, 0, 0],
    [0, 4, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 3, 0, 0, 0, 7, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 7, 0, 3, 0, 0, 8],
    [0, 0, 0, 2, 8, 0, 0, 0, 0],
    [0, 5, 2, 0, 0, 0, 0, 3, 0],
  ];
  const unsolvedSudoku3 = [
    [0, 7, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 8, 0, 0, 4, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 9],
    [0, 0, 0, 6, 0, 0, 0, 0, 0],
    [2, 1, 0, 0, 0, 0, 4, 0, 0],
    [0, 0, 5, 0, 0, 4, 0, 0, 0],
    [4, 0, 0, 0, 1, 0, 8, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const unsolvedSudoku4 = [
    [0, 2, 0, 8, 0, 0, 0, 0, 1],
    [8, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 1, 9, 4, 8, 0],
    [0, 0, 0, 5, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 7, 0, 8, 0, 0],
    [0, 9, 0, 0, 0, 6, 0, 0, 0],
    [0, 7, 3, 9, 8, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 5],
    [6, 0, 0, 0, 0, 4, 0, 3, 0],
  ];
  const unsolvedSudoku5 = [
    [0, 0, 3, 0, 1, 0, 0, 0, 7],
    [0, 1, 0, 0, 0, 5, 2, 0, 0],
    [0, 0, 0, 0, 7, 0, 1, 9, 0],
    [0, 0, 0, 9, 0, 2, 0, 0, 0],
    [0, 8, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 1, 0, 7, 0, 0, 0],
    [0, 4, 1, 0, 2, 0, 0, 0, 0],
    [0, 0, 6, 3, 0, 0, 0, 7, 0],
    [2, 0, 0, 0, 8, 0, 3, 0, 0],
  ];
  let random = Math.round(Math.random() * 5);
  if (random == previousQ) return sampleQ();
  else previousQ = random;
  if (random == 1) return unsolvedSudoku1;
  else if (random == 2) return unsolvedSudoku2;
  else if (random == 3) return unsolvedSudoku3;
  else if (random == 4) return unsolvedSudoku4;
  else return unsolvedSudoku5;
}
function initialise_game() 
{
    let tilesol=document.querySelectorAll(".tile-sol");
    for(let i=0;i<tilesol.length;i++)
    {
        tilesol[i].disabled=false;
    }
  let arr = sampleQ();
  const gameArea = document.querySelector(".SudokuBox-container");
  gameArea.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let tile = document.createElement("button");
      tile.id = "" + i + "-" + j;
      tile.classList.add("tile");
      tile.type="button";
      if (arr[i][j] != 0) {
        tile.innerText = arr[i][j];
        tile.classList.add("filled");
        tile.disabled=false;
      }
      else{
        tile.classList.add("un-filled");
        tile.innerText = "";
      }
      if ((j + 1) % 3 == 0) tile.classList.add("right-dark-border");
      if ((i + 1) % 3 == 0) tile.classList.add("down-dark-border");
      gameArea.append(tile);
    }
  }
  solving(arr);
}
function solving(array) 
{
    let solTiles=document.querySelectorAll(".tile-sol");
    let prevsolTile=null;
    let sol=null;
    for(let i=0;i<10;i++)
    {
        solTiles[i].addEventListener("click", (event)=>
        {
            console.log(event.target);
            let solSelected=event.target.id;
            if(prevsolTile != null)
            prevsolTile.classList.remove("selected");
            event.target.classList.add("selected");
            prevsolTile=event.target;
            sol=event.target;
        });    
    }
    let prevTile=null;
    let tiles=document.querySelectorAll(".un-filled");
    let fill=null;
    for(let i=0;i<tiles.length;i++)
    {
        tiles[i].addEventListener("click", (event)=>
        {
            let tileSelected=event.target.id;
            if(prevTile != null)
            prevTile.classList.remove("selected");
            event.target.classList.add("selected");
            prevTile=event.target;
            fill=event.target;
            let i=Number(fill.id.charAt(0)),j=Number(fill.id.charAt(2));
            if(sol.innerText=="Clear"||sol.innerText==fill.innerText)
            {
                fill.innerText="";
                fill.classList.remove("wrong");
                array[i][j]=0;
            }
            else
            {
                 fill.innerText=Number(sol.innerText);
                 array[i][j]=Number(sol.innerText);
                 console.log("here");
                 console.log(isSafe(array,i,j,array[i][j]));
                 if(!isSafe(array,i,j,array[i][j]))
                 fill.classList.add("wrong");
                 else
                 fill.classList.remove("wrong");
            }
        });
    }
}
function isSafe(board, row, col, c)
{
    for(let i=0; i<9; i++)
    {
        if(i!=row)      if(board[i][col] == c) return false;
        if(i!=col)      if(board[row][i] == c) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) 
    {
      for (let j = 0; j < 3; j++) 
      {
        if(startRow+i!==row&&startCol+j!==col&&board[startRow+i][startCol+j]==c)
          return false;
      }
    }
    return true;
}