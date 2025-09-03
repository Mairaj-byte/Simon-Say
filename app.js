let gseq = [];
let useq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 150);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 150);
}

function levelUp() {
    useq = []; // reset user sequence for new level
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 4);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
    
    gseq.push(ranColor); // store game sequence
    console.log(gseq);
    gameFlash(ranBtn); // flash game button
}

function checkAns(idx) {
    if (useq[idx] === gseq[idx]) {
        if (useq.length === gseq.length) {
            setTimeout(levelUp, 500); // ✅ fixed
        }
    } else {
        h2.innerHTML = `Game Over! Your Score is <b> ${level}  </b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="#222";
        },150);
        resetgame();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    useq.push(userColor);

    checkAns(useq.length - 1);
}

let btnAll = document.querySelectorAll(".btn");
for (let btn of btnAll) {
    btn.addEventListener("click", btnPress);
}

function resetgame() {
    gseq = [];
    useq = [];
    started = false;
    level = 0;
}
