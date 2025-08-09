// --- QUIZ DATA ---
const kowsiQuiz = [
    {
        q: "En chella akka vum naaum first uu first paatha cartoon enna?",
        choices: [
            "Jackie Chan Adventures",
            "Dragon Booster",
            "Shinchan",
            "Doraemon"
        ],
        answer: 0
    },
    {
        q: "En akka enaku yaaru?",
        choices: [
            "innoru appa",
            "innoru amma",
            "en thangapullaw",
            "Option A B C ellame"
        ],
        answer: 3
    },
    {
        q: "En chella akka enna first uu first uu epudi koopuduvanga?",
        choices: [
            "thambiyoo",
            "Surya thangapullaw",
            "Loosu paiya",
            "Chella thambi"
        ],
        answer: 0
    }
];
const snehaQuiz = [
    {
        q: "En chella akka maa ku naa first uu first uu vaangi thantha chocolate enna?",
        choices: [
            "Dairy Milk",
            "Milky Bar",
            "KitKat",
            "5star"
        ],
        answer: 0
    },
    {
        q: "En chella akka ku naa vaicha first chella per enna?",
        choices: [
            "Akka maa",
            "Periya valu",
            "Chella kolanthai",
            "Motta kanni"
        ],
        answer: [0,1]
    },
    {
        q: "En chella akka maa enaku yaaru?",
        choices: [
            "innoru appa",
            "innoru amma",
            "En first uu kolanthai",
            "Option A B C ellame"
        ],
        answer: 3
    }
];

// --- GALLERIES ---
const kowsiGallery = [
    {src: "kowsi akka birthday.png", alt: "Birthday moment"},
    {src: "kowsi akka my fav pic.png", alt: "Favorite pic"},
    {src: "my chella akka's.png", alt: "Family moment"}
];
const snehaGallery = [
    {src: "akka and me.png", alt: "Togetherness"},
    {src: "akka teasing me.png", alt: "Teasing"},
    {src: "dairymilk moment 2.png", alt: "Dairy Milk sharing"},
    {src: "dairymilk moment.png", alt: "Dairy Milk fun"},
    {src: "flower crown for sneha akka.png", alt: "Flower crown"},
    {src: "sleeping.png", alt: "Sleeping"},
    {src: "teasing while playing games.png", alt: "Gaming"}
];

// --- EVENT LISTENER ---
document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById("quiz-section-kowsi")) {
        runQuiz("quiz-section-kowsi", kowsiQuiz, showCandleGame);
    }
    if(document.getElementById("quiz-section-sneha")) {
        runQuiz("quiz-section-sneha", snehaQuiz, showBonkGame);
    }
});

// --- QUIZ LOGIC WITH OPTION LABELS ---
function runQuiz(sectionId, quizData, onComplete) {
    const section = document.getElementById(sectionId);
    let qIdx = 0, score = 0;
    function showQuestion() {
        const qObj = quizData[qIdx];
        section.innerHTML = `
            <div class="quiz-section">
                <div class="quiz-q">${qObj.q}</div>
                <div class="quiz-choices">
                    ${qObj.choices.map((c,i)=>
                        `<button class="quiz-choice" data-i="${i}"><span class="option-label">${String.fromCharCode(65+i)})</span> ${c}</button>`
                    ).join("")}
                </div>
                <div class="quiz-feedback"></div>
                <div class="quiz-emoji" style="font-size:2em;min-height:1em;"></div>
            </div>
        `;
        document.querySelectorAll(`#${sectionId} .quiz-choice`).forEach(btn => {
            btn.onclick = function() {
                let chosen = parseInt(btn.dataset.i);
                let feedback = section.querySelector('.quiz-feedback');
                let emojiDiv = section.querySelector('.quiz-emoji');
                let correct = false;
                if(Array.isArray(qObj.answer)) {
                    correct = qObj.answer.includes(chosen);
                } else {
                    correct = chosen === qObj.answer;
                }
                if(correct) {
                    feedback.textContent = "Correct! 🎉";
                    btn.classList.add("correct-anim");
                    emojiDiv.textContent = "🎉🥳";
                    showConfetti();
                    score++;
                    setTimeout(()=>emojiDiv.textContent="", 800);
                } else {
                    feedback.textContent = "Oops! Try next one.";
                    btn.classList.add("shake-anim");
                    emojiDiv.textContent = "😅";
                    setTimeout(()=>emojiDiv.textContent="", 800);
                }
                setTimeout(()=>{
                    btn.classList.remove("correct-anim", "shake-anim");
                    qIdx++;
                    if(qIdx < quizData.length) showQuestion();
                    else {
                        section.innerHTML = `<div class="quiz-section"><strong>Quiz complete! Score: ${score}/${quizData.length}</strong></div>`;
                        setTimeout(onComplete, 1000);
                    }
                }, 900);
            };
        });
    }
    showQuestion();
}

// --- Kowsi Candle Game ---
function showCandleGame() {
    const section = document.getElementById("game-section-kowsi");
    section.classList.remove("hidden");
    section.innerHTML = `
        <div style="position:relative;">
            <img src="kowsi akka birthday.png" alt="Cake" style="width:100%;border-radius:18px;">
            <div id="dark-overlay-kowsi" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(30,20,40,0.88);border-radius:18px;transition:opacity 0.7s;pointer-events:none;z-index:2;"></div>
            <div id="candles-kowsi" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:3;"></div>
        </div>
        <div class="candle-glow" id="candle-glow-kowsi"></div>
    `;
    let overlay = section.querySelector("#dark-overlay-kowsi");
    let candlesDiv = section.querySelector("#candles-kowsi");
    let litCount = 0;
    const candleCount = 10;
    const positions = [
        {left:"32px", top:"24px"},
        {left:"76px", top:"18px"},
        {left:"120px", top:"21px"},
        {left:"164px", top:"18px"},
        {left:"208px", top:"27px"},
        {left:"60px", top:"53px"},
        {left:"104px", top:"48px"},
        {left:"148px", top:"54px"},
        {left:"190px", top:"49px"},
        {left:"232px", top:"39px"},
    ];
    for(let i=0; i<candleCount; i++) {
        let c = document.createElement("div");
        c.className = "candle";
        c.style.left = positions[i].left;
        c.style.top = positions[i].top;
        c.innerHTML = `
            <img src="Candle.png" alt="Candle" style="width:32px;height:60px;"/>
            <img class="flame" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Candle_flame_icon.svg" alt="Flame"/>
        `;
        c.onclick = function() {
            if(!c.classList.contains("lit")) {
                c.classList.add("lit");
                litCount++;
                overlay.style.opacity = 0.88 - (litCount * 0.085);
                c.querySelector('.flame').style.opacity = "1";
                if(litCount === candleCount) {
                    section.querySelector("#candle-glow-kowsi").textContent = "Happy Birthday Thangapullaw 🥰 🎉✨";
                    showConfetti();
                    showSparkles();
                    setTimeout(()=>{
                        section.classList.add("hidden");
                        showCelebrationKowsi();
                    }, 1800);
                }
            }
        };
        candlesDiv.appendChild(c);
    }
    overlay.style.opacity = 0.88;
}

function showCelebrationKowsi() {
    const celebrationDiv = document.getElementById("celebration-section-kowsi");
    celebrationDiv.classList.remove("hidden");
    celebrationDiv.innerHTML = `
        <div style="padding:20px;background:linear-gradient(115deg,#ffdde1 0%,#ee9ca7 40%,#fbc2eb 70%);border-radius:18px;box-shadow:0 2px 16px #ffd6e0;position:relative;">
            <h2 style="font-size:2em;color:#d72660;text-shadow:1px 2px 12px #fff6b5,0 0 16px #f8e71c;">
                🎉 Happy Birthday Thangapullaw 🥰 🎉
            </h2>
            <div id="confetti-celebration"></div>
            <div id="sparkles-celebration"></div>
        </div>
    `;
    showConfetti("confetti-celebration");
    showSparkles("sparkles-celebration");
    setTimeout(()=>{
        celebrationDiv.classList.add("hidden");
        showAutoSlideshow(kowsiGallery, "gallery-img-kowsi", "diary-section-kowsi", function(){
            document.getElementById("diary-section-kowsi").classList.add("hidden");
            document.getElementById("message-section-kowsi").classList.remove("hidden");
        });
        document.getElementById("diary-section-kowsi").classList.remove("hidden");
        document.getElementById("kowsi-music").play();
    }, 2500);
}

// --- Sneha Bonk Game ---
function showBonkGame() {
    const section = document.getElementById("game-section-sneha");
    section.classList.remove("hidden");
    section.innerHTML = `
        <div class="bonk-count" id="bonk-count-sneha">Bonk the biscuit thief! (10 times)</div>
        <div style="position:relative;height:200px;">
            <img src="biscuits thief.png" alt="Biscuit thief" class="biscuit-bonk-img" id="bonk-img"/>
        </div>
    `;
    let bonkImg = document.getElementById("bonk-img");
    let bonkCount = 0;
    function randomPosition() {
        bonkImg.style.left = Math.random()*70 + "%";
        bonkImg.style.top = Math.random()*50 + "%";
    }
    randomPosition();
    bonkImg.onclick = function() {
        bonkImg.classList.add("bonked");
        setTimeout(()=>bonkImg.classList.remove("bonked"), 200);
        bonkCount++;
        section.querySelector(".bonk-count").textContent = `Bonk count: ${bonkCount}/10`;
        randomPosition();
        if(bonkCount >= 10) {
            section.querySelector(".bonk-count").textContent = "Good job, biscuit thief caught! 😆";
            showConfetti();
            setTimeout(()=>{
                section.classList.add("hidden");
                showCelebrationSneha();
            }, 1200);
        }
    };
}

function showCelebrationSneha() {
    const celebrationDiv = document.getElementById("celebration-section-sneha");
    celebrationDiv.classList.remove("hidden");
    celebrationDiv.innerHTML = `
        <div style="padding:20px;background:linear-gradient(115deg,#e0ecff 0%,#c3fffd 40%,#f6f6f6 70%);border-radius:18px;box-shadow:0 2px 16px #e0ecff;position:relative;">
            <h2 style="font-size:2em;color:#0099b8;text-shadow:1px 2px 12px #fff6b5,0 0 16px #f8e71c;">
                🎉 You caught the Biscuit Thief! 😁🍪
            </h2>
            <div id="confetti-celebration-sneha"></div>
            <div id="sparkles-celebration-sneha"></div>
        </div>
    `;
    showConfetti("confetti-celebration-sneha");
    showSparkles("sparkles-celebration-sneha");
    setTimeout(()=>{
        celebrationDiv.classList.add("hidden");
        showAutoSlideshow(snehaGallery, "gallery-img-sneha", "diary-section-sneha", function(){
            document.getElementById("diary-section-sneha").classList.add("hidden");
            document.getElementById("message-section-sneha").classList.remove("hidden");
        });
        document.getElementById("diary-section-sneha").classList.remove("hidden");
        document.getElementById("sneha-music").play();
    }, 2500);
}

// --- Confetti Animation ---
function showConfetti(divId) {
    let confettiDiv;
    if(divId && document.getElementById(divId)) {
        confettiDiv = document.getElementById(divId);
        confettiDiv.innerHTML = '';
    } else {
        confettiDiv = document.createElement("div");
        confettiDiv.className = "confetti";
        document.body.appendChild(confettiDiv);
    }
    for(let i=0;i<60;i++){
        let c = document.createElement("div");
        let size = Math.random()*10+8;
        c.style.width = c.style.height = size+"px";
        c.style.background = `hsl(${Math.random()*360},90%,60%)`;
        c.style.position = "absolute";
        c.style.left = Math.random()*100+"vw";
        c.style.top = "-20px";
        c.style.borderRadius = "50%";
        c.style.opacity = 0.8;
        c.style.transition = "top 1.2s cubic-bezier(.14,.86,.71,.99)";
        confettiDiv.appendChild(c);
        setTimeout(()=>{
            c.style.top = (Math.random()*80+20)+"vh";
        },100+i*20);
        setTimeout(()=>{
            c.style.opacity = 0;
        },1600);
    }
    setTimeout(()=>{if(!divId) confettiDiv.remove();},2000);
}

// --- Sparkle Animation ---
function showSparkles(divId) {
    let sparkleDiv;
    if(divId && document.getElementById(divId)) {
        sparkleDiv = document.getElementById(divId);
        sparkleDiv.innerHTML = '';
    } else {
        sparkleDiv = document.createElement("div");
        sparkleDiv.className = "confetti";
        document.body.appendChild(sparkleDiv);
    }
    for(let i=0;i<16;i++){
        let sp = document.createElement("div");
        sp.style.position = "absolute";
        sp.style.width = "28px";
        sp.style.height = "28px";
        sp.style.left = Math.random()*98+"%";
        sp.style.top = Math.random()*88+"%";
        sp.style.opacity = "0.7";
        sp.style.background = "url('https://pngimg.com/uploads/sparkle/sparkle_PNG52.png') center/contain no-repeat";
        sp.style.pointerEvents = "none";
        sp.style.animation = "sparkleTwinkle 1.5s infinite";
        sparkleDiv.appendChild(sp);
    }
    setTimeout(()=>{if(!divId) sparkleDiv.remove();},2000);
}

// --- AUTO-SLIDESHOW GALLERY LOGIC ---
function showAutoSlideshow(galleryArr, imgId, sectionId, onFinish) {
    const section = document.getElementById(sectionId);
    section.classList.remove("hidden");
    const imgEl = document.getElementById(imgId);
    let idx = 0;
    let interval;

    function showImg(i) {
        imgEl.classList.add("fade");
        setTimeout(() => {
            imgEl.src = galleryArr[i].src;
            imgEl.alt = galleryArr[i].alt;
            imgEl.classList.remove("fade");
        }, 700);
    }

    showImg(idx);

    interval = setInterval(() => {
        idx++;
        if (idx < galleryArr.length) {
            showImg(idx);
        } else {
            clearInterval(interval);
            setTimeout(() => {
                section.innerHTML += `<em>That's all! Enjoy your message below.</em>`;
                if (onFinish) setTimeout(onFinish, 1200);
            }, 2000);
        }
    }, 6000); // 6 seconds per image for slow slideshow
}