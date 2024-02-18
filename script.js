const timer= document.getElementById("Timer");
document.getElementById("start").addEventListener("click", startGame); 
document.getElementById("stop").addEventListener("click", endGame); 
var continueTimer=false;
function startGame()
{
    document.getElementById("start").disabled=true;
    document.getElementById("stop").disabled=false;
    continueTimer=true;
    timer_start();
    initialise_game();
}
function endGame()
{
    document.getElementById("start").disabled=false;
    document.getElementById("stop").disabled=true;
    continueTimer=false;
}
var count=0;
function timer_start()
{
    setInterval(()=>{
        if(!continueTimer)
        {
            count=0;
        }
        else timer.innerText=(++count)+"s";
    },1000)   
}
var previousQ=0;
function sampleQ()
{
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
  let random = Math.round((Math.random()*5));
  if(random==previousQ) return sampleQ();
  else previousQ=random;
  if(random==1) return unsolvedSudoku1;
  else if(random==2) return unsolvedSudoku2;
  else if(random==3) return unsolvedSudoku3;
  else if(random==4) return unsolvedSudoku4;
  else return unsolvedSudoku5;
}
function initialise_game()
{
    let arr=sampleQ();
    const gameArea=document.querySelector(".SudokuBox-container");
    gameArea.innerHTML="";
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            let tile = document.createElement("button");
            tile.id = ""+i+"-"+j;
            tile.classList.add("tile");
            if(arr[i][j]!=0)
            {
                tile.innerText=arr[i][j];
                tile.classList.add("filled");
            }
            if((j+1)%3==0)  tile.classList.add("right-dark-border");
            if((i+1)%3==0)  tile.classList.add("down-dark-border");
            gameArea.append(tile);
        }
    }
}