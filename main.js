let comNum=0;

let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceInfo = document.getElementById("chance-info");
let chances=5;
let go=0;
let history=[]




playButton.addEventListener("click",play);
resetButton.addEventListener("click",re);
userInput.addEventListener("focus",function(){userInput.value=""});

console.log(playButton);
get_num();

if(chances<=0){
    playButton.disabled=true;
}

function get_num(){
while (true){
chances=prompt("몇 번 시도할까요? (1~100 사이의 숫자를 입력해주세요)");
if (chances==null)
{
    playButton.disabled=true;
    break;
}
chances=Number(chances);
if ((chances>0)&&(chances<=100))
{
    break;
}
}
}


function mkRanNum(){
    comNum=Math.floor(Math.random()*100)+1;
    console.log("랜덤값: ", comNum);
}
chanceInfo.textContent="남은횟수: "+(chances-go);

function play(){
    
    console.log("남은 횟수",chances-go);
    let userValue=userInput.value;

    if((userValue>100)||(userValue<1))
    {
        if(userValue>100){
            console.log("100 이하의 수를 입력하세요");
            alert("100이하의 수를 입력하세요");
            return 0;
        }
        if(userValue<1){
            console.log("1 이상의 수를 입력하세요");
            alert("1이상의 수를 입력하세요");
            return 0;
        }
    }
    if(history.includes(userValue)){
        alert("이미 입력한 값 입니다. 다른 값을 입력하세요");
        return 0;
    }
    history.push(userValue);
    console.log(history);
    go++;
    if (userValue<comNum){
        resultArea.textContent="UP";
        chanceInfo.textContent="남은횟수: "+(chances-go);
        console.log("UP!! 남은횟수:");

    }else if(userValue>comNum){
        resultArea.textContent="DOWN";
        chanceInfo.textContent="남은횟수: "+(chances-go);
        console.log("Down!");
    }else{
        resultArea.textContent="맞췄습니다.!";
        chanceInfo.textContent="남은횟수: "+(chances-go);
        console.log("맟췄습니다");
        playButton.disabled=true;
    }
    if (go== chances)
        {
            playButton.disabled=true;
            resultArea.textContent="실패...";
        }
    
    
}

function re(){
   
 get_num();
 if(chances<=0){
    playButton.disabled=true;
}
    resultArea.textContent="게임을 시작합니다"
    go=0;
    chanceInfo.textContent="남은횟수: "+(chances-go);
    history.length=0
    playButton.disabled=false;
    userInput.value="";
    mkRanNum();


}

mkRanNum();