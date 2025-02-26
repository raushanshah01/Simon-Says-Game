let gameSeq=[];
let userSeq=[];

let highscore=0;

let started = false;
let level = 0;
let h2=document.querySelector("h2");

let btns = ["yellow", "red", "purple", "green"];

document.addEventListener("keypress", function(){
    if(started === false){
        console.log("Started");
        started = true;

        levelup();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //random btn choose
    let randIdx = Math.floor(Math.random()*btns.length);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`)
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    // console.log("curr level: ", level);
    if(userSeq[idx]===gameSeq[idx]){
        // console.log("correct");
        if(userSeq.length==gameSeq.length){
            setTimeout(levelup,1000)
        }
    }else{
        if (level > highscore) {
            highscore = level;
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>.<br>Highscore: <b>${highscore}</b><br>Press any key to Start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute('id');
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
    console.log(userColor);
}

let allbtns=document.querySelectorAll('.btn');
for(btn of allbtns){
    btn.addEventListener("click", btnPress);
}


function reset(){
    let currentLevel = level;  // Store the current level
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
 