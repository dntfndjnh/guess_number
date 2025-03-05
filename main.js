let comNum=0;

let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceInfo = document.getElementById("chance-info");
let current_percent = document.getElementById("percent");
let current_range = document.getElementById("num-range");
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


function solve_percent()
{   

    history.sort();
    nummin=1;
    nummax=100;
    per=0;
    //history 배열에 2개 이상 값이 들어와있을 때
    if(history.length>1){
        //배열 원소 개수 만큼 반복문
        for(i=1;i<history.length;i++){
            //배열에 들어있는
            if (comNum<history[i])
            {
                if(history[i-1]<comNum){
                    nummin=history[i-1];
                    nummin++;
                    nummax=history[i];
                    nummax--;
                }
                else{
                    nummax=history[i-1];
                    nummax--;
                }
            }
        }
        if(history[history.length-1]<comNum)
        {
            nummin=history[history.length-1]
        }
    }
    //배열에 입력된게 1개일 때
    else{
        if(comNum<history[0])
        {
            nummax=history[0];
            nummax--
        }
        else{
            nummin=history[0];
            nummin++
        }
    }
    per=(1/(nummax-nummin+1)*100).toFixed(2);
    current_range.textContent="정답의 범위:"+(nummin)+"~"+(nummax);
    current_percent.textContent="현재 맞출확률:"+(per)+"%";
    
}

function get_num(){
while (true){
chances=prompt("몇 번 시도할까요? (1~100 사이의 숫자를 입력해주세요)");
if (chances==null)
{
    playButton.disabled=true;
    break;
}
chances=Math.round(Number(chances));
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
    let userValue=Math.round(userInput.value);

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
    if((chances-go)<=0){
        playButton.disabled=true;
    }
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
        return 0;
    }
    if (go== chances)
        {
            playButton.disabled=true;
            resultArea.textContent="실패...";
        }
    
        
        solve_percent();
    
}

function re(){
   
 get_num();
 if(chances==null){
    playButton.disabled=true;
}

    resultArea.textContent="게임을 시작합니다"
    go=0;
    chanceInfo.textContent="남은횟수: "+(chances-go);
    current_range.textContent="정답의 범위:1~100";
    current_percent.textContent="현재 맞출확률:1%";
    history.length=0
    if(chances!=null){
    playButton.disabled=false;
    }
    userInput.value="";
    mkRanNum();


}

mkRanNum();