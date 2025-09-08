// -- QUIZ DATA --
const kowsiQuiz = [
    { q: "En chella akka vum naaum first uu first paatha cartoon enna?", choices: ["Jackie Chan Adventures","Dragon Booster","Shinchan","Doraemon"], answer: 0 },
    { q: "En akka enaku yaaru?", choices: ["innoru appa","innoru amma","en thangapullaw","Option A B C ellame"], answer: 3 },
    { q: "En chella akka enna first uu first uu epudi koopuduvanga?", choices: ["thambiyoo","Surya thangapullaw","Loosu paiya","Chella thambi"], answer: 0 }
];
const snehaQuiz = [
    { q: "En chella akka maa ku naa first uu first uu vaangi thantha chocolate enna?", choices: ["Dairy Milk","Milky Bar","KitKat","5star"], answer: 0 },
    { q: "En chella akka ku naa vaicha first chella per enna?", choices: ["Akka maa","Periya valu","Chella kolanthai","Motta kanni"], answer: [0,1] },
    { q: "En chella akka maa enaku yaaru?", choices: ["innoru appa","innoru amma","En first uu kolanthai","Option A B C ellame"], answer: 3 }
];

// -- GALLERIES --
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
    if(document.getElementById("quiz-section-kowsi")) {
        runQuiz("quiz-section-kowsi", kowsiQuiz, showCandleGame);
    }
    if(document.getElementById("quiz-section-sneha")) {
        runQuiz("quiz-section-sneha", snehaQuiz, showBonkGame);
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
        section.querySelectorAll('.quiz-choice').forEach(btn => {
            btn.onclick = function() {
                let chosen = parseInt(btn.dataset.i);
                let feedback = section.querySelector('.quiz-feedback');
                let correct = Array.isArray(qObj.answer)
                    ? qObj.answer.includes(chosen)
                    : chosen === qObj.answer;
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
                        setTimeout(onComplete, 900);
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
        {left:"32px", top:"24px"}, {left:"76px", top:"18px"}, {left:"120px", top:"21px"},
        {left:"164px", top:"18px"}, {left:"208px", top:"27px"}, {left:"60px", top:"53px"},
        {left:"104px", top:"48px"}, {left:"148px", top:"54px"}, {left:"190px", top:"49px"}, {left:"232px", top:"39px"},
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
                    setTimeout(()=>{
                        section.classList.add("hidden");
                        showCelebrationKowsi();
                    }, 1200);
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
        <div style="padding:20px;background:linear-gradient(115deg,#ffdde1 0%,#ee9ca7 40%,#fbc2eb 70%);border-radius:18px;">
            <h2 style="font-size:2em;color:#d72660;text-shadow:1px 2px 12px #fff6b5,0 0 16px #f8e71c;">
                🎉 Happy Birthday Thangapullaw 🥰 🎉
            </h2>
        </div>
    `;
    setTimeout(()=>{
        celebrationDiv.classList.add("hidden");
        showGallery('kowsi');
    }, 2000);
}

// --- Sneha Bonk Game ---
function showBonkGame() {
    const section = document.getElementById("game-section-sneha");
    section.classList.remove("hidden");
    section.innerHTML = `
        <div class="bonk-count" id="bonk-count-sneha">Bonk the biscuit thief! (10 times)</div>
        <img src="biscuits thief.png" alt="Biscuit thief" class="biscuit-bonk-img" id="bonk-img"/>
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
                section.classList.add("hidden");
                showCelebrationSneha();
            }, 900);
        }
    };
}

function showCelebrationSneha() {
    const celebrationDiv = document.getElementById("celebration-section-sneha");
    celebrationDiv.classList.remove("hidden");
    celebrationDiv.innerHTML = `
        <div style="padding:20px;background:linear-gradient(115deg,#e0ecff 0%,#c3fffd 40%,#f6f6f6 70%);border-radius:18px;">
            <h2 style="font-size:2em;color:#0099b8;text-shadow:1px 2px 12px #fff6b5,0 0 16px #f8e71c;">
                🎉 You caught the Biscuit Thief! 😁🍪
            </h2>
        </div>
    `;
    setTimeout(()=>{
        celebrationDiv.classList.add("hidden");
        showGallery('sneha');
    }, 2000);
}

// --- GALLERY LOGIC ---
function showGallery(who) {
    let gallery, images, prevBtn, nextBtn, img, music, sectionId, msgSectionId;
    if(who === 'kowsi') {
        gallery = document.querySelector('#gallery-img-kowsi');
        prevBtn = document.getElementById('kowsi-prev');
        nextBtn = document.getElementById('kowsi-next');
        images = kowsiGallery;
        music = document.getElementById('kowsi-music');
        sectionId = 'diary-section-kowsi';
        msgSectionId = 'message-section-kowsi';
    } else {
        gallery = document.querySelector('#gallery-img-sneha');
        prevBtn = document.getElementById('sneha-prev');
        nextBtn = document.getElementById('sneha-next');
        images = snehaGallery;
        music = document.getElementById('sneha-music');
        sectionId = 'diary-section-sneha';
        msgSectionId = 'message-section-sneha';
    }

    let idx = 0;
    function updateImg() {
        gallery.src = images[idx].src;
        gallery.alt = images[idx].alt;
    }
    updateImg();
    document.getElementById(sectionId).classList.remove('hidden');
    if(music) music.play().catch(()=>{});

    prevBtn.onclick = () => {
        idx = (idx - 1 + images.length) % images.length;
        updateImg();
    };
    nextBtn.onclick = () => {
        idx = (idx + 1) % images.length;
        updateImg();
    };

    // Swipe support
    let startX = null;
    gallery.ontouchstart = (e) => { startX = e.touches[0].clientX; }
    gallery.ontouchend = (e) => {
        if (!startX) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 30) prevBtn.onclick();
        else if (startX - endX > 30) nextBtn.onclick();
        startX = null;
    }
    // After last image (double-tap next), show message
    let nextClicks = 0;
    nextBtn.ondblclick = () => {
        document.getElementById(sectionId).classList.add('hidden');
        document.getElementById(msgSectionId).classList.remove('hidden');
    }
}