// --- CUSTOM QUIZ DATA ---

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

// --- PAGE LOGIC ---
document.addEventListener("DOMContentLoaded", function() {
    // Kowsi Akka Page
    if(document.getElementById("quiz-section-kowsi")) {
        runQuiz("quiz-section-kowsi", kowsiQuiz, () => {
            showCandleGame();
        });
    }
    // Sneha Akka Page
    if(document.getElementById("quiz-section-sneha")) {
        runQuiz("quiz-section-sneha", snehaQuiz, () => {
            showBonkGame();
        });
    }
});

// --- QUIZ LOGIC ---
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
                        `<button class="quiz-choice" data-i="${i}">${c}</button>`).join("")
                    }
                </div>
                <div class="quiz-feedback"></div>
            </div>
        `;
        document.querySelectorAll(`#${sectionId} .quiz-choice`).forEach(btn => {
            btn.onclick = function() {
                let chosen = parseInt(btn.dataset.i);
                let feedback = section.querySelector('.quiz-feedback');
                let correct = false;
                if(Array.isArray(qObj.answer)) {
                    correct = qObj.answer.includes(chosen);
                } else {
                    correct = chosen === qObj.answer;
                }
                if(correct) {
                    feedback.textContent = "Correct! 🎉";
                    score++;
                } else {
                    feedback.textContent = "Oops! Try next one.";
                }
                setTimeout(()=>{
                    qIdx++;
                    if(qIdx < quizData.length) showQuestion();
                    else {
                        section.innerHTML = `<div class="quiz-section"><strong>Quiz complete! Score: ${score}/${quizData.length}</strong></div>`;
                        setTimeout(onComplete, 1000);
                    }
                }, 800);
            };
        });
    }
    showQuestion();
}

// --- Kowsi Candle Game ---
function showCandleGame() {
    const section = document.getElementById("game-section-kowsi");
    section.style.display = "block";
    section.innerHTML = `<div class="candle-row"></div><div class="candle-glow"></div>`;
    let candleRow = section.querySelector(".candle-row");
    let glow = section.querySelector(".candle-glow");
    let litCount = 0;
    for(let i=0; i<10; i++) {
        let c = document.createElement("div");
        c.className = "candle";
        c.innerHTML = `
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Candle_icon.svg/120px-Candle_icon.svg.png" alt="Candle"/>
            <img class="flame" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Candle_flame_icon.svg/32px-Candle_flame_icon.svg.png" alt="Flame"/>`;
        c.onclick = function() {
            if(!c.classList.contains("lit")) {
                c.classList.add("lit");
                litCount++;
                if(litCount === 10) {
                    glow.textContent = "Happy Birthday Thangapullaw 🥰";
                    setTimeout(()=>{
                        section.style.display = "none";
                        document.getElementById("surprise-section-kowsi").style.display = "block";
                    }, 1400);
                }
            }
        };
        candleRow.appendChild(c);
    }
}

// --- Sneha Bonk Game ---
function showBonkGame() {
    const section = document.getElementById("game-section-sneha");
    section.style.display = "block";
    section.innerHTML = `
        <div class="bonk-count">Bonk the biscuit thief! (10 times)</div>
        <img src="biscuits theif.png" alt="Biscuit thief" class="biscuit-bonk-img" id="bonk-img"/>
    `;
    let bonkImg = document.getElementById("bonk-img");
    let bonkCount = 0;
    bonkImg.onclick = function() {
        bonkImg.classList.add("bonked");
        setTimeout(()=>bonkImg.classList.remove("bonked"), 200);
        bonkCount++;
        section.querySelector(".bonk-count").textContent = `Bonk count: ${bonkCount}/10`;
        if(bonkCount >= 10) {
            section.querySelector(".bonk-count").textContent = "Good job, biscuit thief caught! 😆";
            setTimeout(()=>{
                section.style.display = "none";
                document.getElementById("surprise-section-sneha").style.display = "block";
            }, 900);
        }
    };
}

// --- Surprise Button & Gallery ---
document.addEventListener("DOMContentLoaded", function() {
    // Kowsi surprise button
    let kBtn = document.getElementById("kowsi-surprise-btn");
    if(kBtn) kBtn.onclick = function() {
        document.getElementById("surprise-section-kowsi").style.display = "none";
        showGallery("gallery-kowsi", kowsiGallery, "diary-section-kowsi", "kowsi-message-btn");
        document.getElementById("diary-section-kowsi").style.display = "block";
        document.getElementById("kowsi-music").play();
    };
    // Sneha surprise button
    let sBtn = document.getElementById("sneha-surprise-btn");
    if(sBtn) sBtn.onclick = function() {
        document.getElementById("surprise-section-sneha").style.display = "none";
        showGallery("gallery-sneha", snehaGallery, "diary-section-sneha", "sneha-message-btn");
        document.getElementById("diary-section-sneha").style.display = "block";
        document.getElementById("sneha-music").play();
    };

    // Gallery next button for both
    let kNext = document.getElementById("kowsi-message-btn");
    if(kNext) kNext.onclick = function() {
        document.getElementById("diary-section-kowsi").style.display = "none";
        document.getElementById("message-section-kowsi").style.display = "block";
    };
    let sNext = document.getElementById("sneha-message-btn");
    if(sNext) sNext.onclick = function() {
        document.getElementById("diary-section-sneha").style.display = "none";
        document.getElementById("message-section-sneha").style.display = "block";
    };
});

// --- GALLERY LOGIC ---
function showGallery(galleryId, images, sectionId, nextBtnId) {
    let gallery = document.getElementById(galleryId);
    let idx = 0;
    function showImg() {
        gallery.innerHTML = `<img src="${images[idx].src}" alt="${images[idx].alt}">`;
    }
    showImg();
    gallery.onclick = function() {
        idx++;
        if(idx < images.length) showImg();
        else {
            gallery.innerHTML = "<em>That's all! Click below to see your message.</em>";
            document.getElementById(nextBtnId).style.display = "inline-block";
        }
    };
    document.getElementById(nextBtnId).style.display = "none";
}