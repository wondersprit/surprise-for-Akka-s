// -- QUIZ DATA --
const kowsiQuiz = [
    { q: "En chella akka vum naaum first uu first paatha cartoon enna?", choices: ["Jackie Chan Adventures","Dragon Booster","Shinchan","Doraemon"], answer: 0 },
    { q: "En akka enaku yaaru?", choices: ["innoru appa","innoru amma","en thangapullaw","Option A B C ellame"], answer: [0,1,2,3] },
    { q: "En chella akka enna first uu first uu epudi koopuduvanga?", choices: ["thambiyoo","Surya thangapullaw","Loosu paiya","Chella thambi"], answer: 0 }
];
const snehaQuiz = [
    { q: "En chella akka maa ku naa first uu first uu vaangi thantha chocolate enna?", choices: ["Dairy Milk","Milky Bar","KitKat","5star"], answer: 0 },
    { q: "En chella akka ku naa vaicha first chella per enna?", choices: ["Akka maa","Periya valu","Chella kolanthai","Motta kanni"], answer: [0,1] },
    { q: "En chella akka maa enaku yaaru?", choices: ["innoru appa","innoru amma","En first uu kolanthai","Option A B C ellame"], answer: [0,1,2,3] }
];

// -- GALLERIES (Preload images for speed) --
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
[...kowsiGallery, ...snehaGallery].forEach(imgObj => {
    const img = new window.Image();
    img.src = imgObj.src;
});

// --- PAGE LOGIC ---
document.addEventListener("DOMContentLoaded", function() {
    addFantasyMobileEffects();
    if(document.getElementById("quiz-section-kowsi")) {
        runQuiz("quiz-section-kowsi", kowsiQuiz, showMagicalCakeGame);
    }
    if(document.getElementById("quiz-section-sneha")) {
        runQuiz("quiz-section-sneha", snehaQuiz, showSnehaWhackAMole);
    }
});

// --- QUIZ LOGIC --- (unchanged from previous version)
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
                        `<button class="quiz-choice" data-i="${i}">
                            <span class="option-label">${String.fromCharCode(65+i)}:</span> ${c}
                        </button>`
                    ).join("")}
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
                // Animation logic
                if(correct) {
                    feedback.textContent = "Correct! 🎉";
                    btn.classList.add('quiz-right');
                    score++;
                } else {
                    feedback.textContent = "Oops! Try next one.";
                    btn.classList.add('quiz-wrong');
                    btn.classList.add('shake');
                    setTimeout(()=>btn.classList.remove('shake'), 600);
                }
                setTimeout(()=>{
                    btn.classList.remove('quiz-right','quiz-wrong');
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

// --- Kowsi Magical Cake Game --- (unchanged except for floating heart animation)
function showMagicalCakeGame() {
    let oldOverlay = document.getElementById('full-darkness');
    if(oldOverlay) oldOverlay.remove();
    let overlay = document.createElement('div');
    overlay.id = 'full-darkness';
    overlay.style = `
        position:fixed;top:0;left:0;width:100vw;height:100vh;
        background:rgba(30,18,40,0.96);z-index:1999;pointer-events:none;
        transition:background 1.1s cubic-bezier(.7,0,.3,1);
        mix-blend-mode: multiply;
    `;
    document.body.appendChild(overlay);

    const section = document.getElementById("game-section-kowsi");
    section.classList.remove("hidden");
    section.innerHTML = `
        <div class="cake-zone" style="position:relative;z-index:2;text-align:center;">
            <div class="hint-msg" id="cake-hint-msg">Tap the candles to light them and remove the darkness!</div>
            <svg id="cake-svg" width="100%" height="320" viewBox="0 0 420 320" style="max-width: 420px;">
                <!-- Cake base shadow -->
                <ellipse cx="210" cy="290" rx="100" ry="18" fill="#d2b48c" opacity="0.44"/>
                <!-- Bottom layer -->
                <ellipse cx="210" cy="220" rx="110" ry="36" fill="#f8c471"/>
                <rect x="100" y="110" width="220" height="110" fill="#f8c471"/>
                <!-- Middle icing -->
                <ellipse cx="210" cy="140" rx="110" ry="33" fill="#fff0fa"/>
                <rect x="100" y="140" width="220" height="45" fill="#fff0fa"/>
                <!-- Top layer -->
                <ellipse cx="210" cy="140" rx="85" ry="26" fill="#fffde4"/>
                <rect x="125" y="70" width="170" height="70" fill="#fffde4"/>
                <!-- Sprinkles -->
                <ellipse cx="160" cy="115" rx="7" ry="3" fill="#d72660"/>
                <ellipse cx="210" cy="107" rx="6" ry="2.5" fill="#a3e635"/>
                <ellipse cx="255" cy="124" rx="8" ry="2.5" fill="#00bcd4"/>
                <ellipse cx="175" cy="135" rx="6" ry="2" fill="#009688"/>
                <ellipse cx="240" cy="128" rx="6" ry="2" fill="#b8005a"/>
                <ellipse cx="265" cy="108" rx="7" ry="2.2" fill="#e06666"/>
                <ellipse cx="145" cy="125" rx="5" ry="2" fill="#ffd700"/>
                <ellipse cx="225" cy="113" rx="5" ry="1.6" fill="#99e6ff"/>
                <text x="210" y="210" font-size="2.2em" fill="#b8005a" text-anchor="middle" font-family="Baloo 2, cursive">（｡♥‿♥｡）</text>
                <!-- Candles group -->
                <g id="candles">
                    ${[...Array(10)].map((_,i)=>{
                        const cakeLeft = 120, cakeRight = 300, candleWidth = 12;
                        const x = cakeLeft + i*(cakeRight-cakeLeft)/9;
                        const colorArr = ["#ffb3ba","#bae1ff","#baffc9","#ffffba","#ffdfba"];
                        const color = colorArr[i%colorArr.length];
                        return `
                        <g class="candle" data-idx="${i}">
                            <rect class="candle-body" x="${x-(candleWidth/2)}" y="44" width="${candleWidth}" height="50" fill="${color}" rx="3"/>
                            <ellipse cx="${x}" cy="44" rx="6" ry="3" fill="#fff" opacity="0.93"/>
                            <ellipse class="candle-flame" cx="${x}" cy="36" rx="5" ry="9" fill="#ffd966"/>
                        </g>`;
                    }).join("")}
                </g>
            </svg>
        </div>
        <div id="confetti" class="confetti"></div>
        <audio id="cake-ambience" src="for kowsi akka.mp3" preload="auto" loop></audio>
    `;
    let ambiance = section.querySelector('#cake-ambience');
    let musicStarted = false;
    function tryMusic() {
        if (!musicStarted) {
            ambiance.volume = 0.17;
            ambiance.play().catch(()=>{});
            musicStarted = true;
        }
    }
    document.body.addEventListener('click', tryMusic, {once:true});
    document.body.addEventListener('touchstart', tryMusic, {once:true});

    // Candle interactivity
    const candles = section.querySelectorAll('.candle');
    let lit = Array(10).fill(false);

    candles.forEach((candle, idx) => {
        candle.addEventListener('click', () => {
            if (!lit[idx]) {
                candle.classList.add('candle-lit');
                lit[idx] = true;
                candle.style.transform = "scale(1.15)";
                setTimeout(()=>candle.style.transform = "", 180);
                updateDarkness();
                checkAllLit();
                tryMusic();
            }
        });
        candle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            candle.click();
        });
    });

    function updateDarkness() {
        let ratio = lit.filter(Boolean).length / candles.length;
        let minAlpha = 0.02;
        let maxAlpha = 0.96;
        let currentAlpha = maxAlpha - (ratio * (maxAlpha-minAlpha));
        overlay.style.background = `rgba(30,18,40,${currentAlpha})`;
    }

    function checkAllLit() {
        if (lit.every(x => x)) {
            document.getElementById('cake-hint-msg').textContent = "🎂 Make a wish!";
            overlay.style.background = `rgba(30,18,40,0.01)`;
            launchConfetti();
            showBirthdayMsg();
            setTimeout(()=>{
                overlay.remove();
                section.classList.add("hidden");
                showAutoSlideshowKowsi();
            }, 3200);
        }
    }

    function launchConfetti() {
        const confettiDiv = document.getElementById('confetti');
        confettiDiv.innerHTML = '';
        const colors = ["#f8c471","#e06666","#6fa8dc","#baffc9","#ffd966","#d72660","#b8005a","#fff","#bae1ff","#ffb3ba"];
        for(let i=0;i<70;i++){
            let c = document.createElement('div');
            c.className = 'confetti-piece';
            c.style.position = 'absolute';
            c.style.background = colors[Math.floor(Math.random()*colors.length)];
            c.style.left = (Math.random()*350+32) + 'px';
            c.style.top = (Math.random()*20+2) + 'px';
            c.style.width = "14px";
            c.style.height = "14px";
            c.style.borderRadius = "50%";
            c.style.opacity = "0.87";
            c.style.pointerEvents = "none";
            c.style.animation = `confetti-fall 2.1s cubic-bezier(.13,.82,.62,1.1) forwards`;
            c.style.animationDelay = (Math.random()*0.7)+'s';
            confettiDiv.appendChild(c);
        }
        setTimeout(()=>{ confettiDiv.innerHTML = ''; }, 2400);
    }

    function showBirthdayMsg() {
        let msg = document.createElement('div');
        msg.id = "birthday-msg";
        msg.innerHTML = "Happy Birthday Thangapullaw 🥰💕";
        msg.style.cssText = `
            font-family:'Pacifico',cursive;font-size:2.1em;color:#fff7cc;
            text-shadow:0 2px 14px #d72660,0 0 16px #f8e71c;
            opacity:0;transition:opacity 1.2s;position:fixed;z-index:202;
            left:0;right:0;top:17vh;text-align:center;pointer-events:none;
        `;
        document.body.appendChild(msg);
        setTimeout(()=>{ msg.style.opacity = 1; }, 120);
        setTimeout(()=>{ msg.style.opacity = 0; }, 2700);
        setTimeout(()=>{ msg.remove(); }, 3500);
    }
}

// --- Sneha Whack-a-Mole Minigame --- (unchanged)

// --- Kowsi Gallery: Auto-advancing, animated slideshow ---
function showAutoSlideshowKowsi() {
    const sectionId = "diary-section-kowsi";
    const galleryImgs = kowsiGallery;
    const section = document.getElementById(sectionId);
    section.classList.remove("hidden");
    const img = document.getElementById('gallery-img-kowsi');
    const music = document.getElementById('kowsi-music');
    if(music) music.play().catch(()=>{});

    document.getElementById('kowsi-prev').style.display = 'none';
    document.getElementById('kowsi-next').style.display = 'none';

    let idx = 0;
    img.classList.add('fadein');

    function fantasyTransition() {
        // Add sparkles for fantasy effect
        let spark = document.createElement('div');
        spark.className = 'img-sparkle';
        spark.style.left = (Math.random()*80+10) + '%';
        spark.style.top = (Math.random()*40+30) + '%';
        document.body.appendChild(spark);
        setTimeout(()=>spark.remove(),1200);
    }

    function showImg(animated=true) {
        if(animated) {
            img.classList.remove('fadein','fantasy-img');
            void img.offsetWidth;
            img.classList.add('fadein','fantasy-img');
            fantasyTransition();
        }
        img.src = galleryImgs[idx].src;
        img.alt = galleryImgs[idx].alt;
    }
    showImg(false);

    let intervalID = setInterval(()=>{
        idx = (idx + 1) % galleryImgs.length;
        showImg();
        if(idx===0) {
            clearInterval(intervalID);
            setTimeout(()=>{
                section.classList.add('hidden');
                document.getElementById('message-section-kowsi').classList.remove('hidden');
            }, 1800);
        }
    }, 4000); // SLOWER: 4 seconds

    let paused = false;
    img.onclick = () => {
        paused = !paused;
        if(paused) clearInterval(intervalID);
        else intervalID = setInterval(()=>{
            idx = (idx + 1) % galleryImgs.length;
            showImg();
            if(idx===0) {
                clearInterval(intervalID);
                setTimeout(()=>{
                    section.classList.add('hidden');
                    document.getElementById('message-section-kowsi').classList.remove('hidden');
                }, 1800);
            }
        }, 4000);
    };
}

// --- Sneha Gallery: Auto-advancing, animated slideshow ---
function showAutoSlideshowSneha() {
    const sectionId = "diary-section-sneha";
    const galleryImgs = snehaGallery;
    const section = document.getElementById(sectionId);
    section.classList.remove("hidden");
    const img = document.getElementById('gallery-img-sneha');
    const music = document.getElementById('sneha-music');
    if(music) music.play().catch(()=>{});

    document.getElementById('sneha-prev').style.display = 'none';
    document.getElementById('sneha-next').style.display = 'none';

    let idx = 0;
    img.classList.add('fadein');

    function fantasyTransition() {
        let spark = document.createElement('div');
        spark.className = 'img-sparkle';
        spark.style.left = (Math.random()*80+10) + '%';
        spark.style.top = (Math.random()*40+30) + '%';
        document.body.appendChild(spark);
        setTimeout(()=>spark.remove(),1200);
    }

    function showImg(animated=true) {
        if(animated) {
            img.classList.remove('fadein','fantasy-img');
            void img.offsetWidth;
            img.classList.add('fadein','fantasy-img');
            fantasyTransition();
        }
        img.src = galleryImgs[idx].src;
        img.alt = galleryImgs[idx].alt;
    }
    showImg(false);

    let intervalID = setInterval(()=>{
        idx = (idx + 1) % galleryImgs.length;
        showImg();
        if(idx===0) {
            clearInterval(intervalID);
            setTimeout(()=>{
                section.classList.add('hidden');
                document.getElementById('message-section-sneha').classList.remove('hidden');
            }, 1800);
        }
    }, 4000); // SLOWER: 4 seconds

    let paused = false;
    img.onclick = () => {
        paused = !paused;
        if(paused) clearInterval(intervalID);
        else intervalID = setInterval(()=>{
            idx = (idx + 1) % galleryImgs.length;
            showImg();
            if(idx===0) {
                clearInterval(intervalID);
                setTimeout(()=>{
                    section.classList.add('hidden');
                    document.getElementById('message-section-sneha').classList.remove('hidden');
                }, 1800);
            }
        }, 4000);
    };
}

// --- Fantasy Mobile Animations ---
function addFantasyMobileEffects() {
    if(window.innerWidth < 600) {
        // Floating hearts/stars
        setInterval(()=>{
            let el = document.createElement('div');
            el.className = 'float-heart';
            el.style.left = (Math.random()*90+5) + 'vw';
            el.style.animationDuration = (2+Math.random()*2) + 's';
            document.body.appendChild(el);
            setTimeout(()=>el.remove(),4000);
        }, 1200);

        // Touch sparkles
        document.body.addEventListener('touchstart', function(e){
            for(let i=0;i<2;i++){
                let spark = document.createElement('div');
                spark.className = 'touch-sparkle';
                spark.style.left = (e.touches[0].clientX + Math.random()*30-15) + 'px';
                spark.style.top = (e.touches[0].clientY + Math.random()*30-15) + 'px';
                document.body.appendChild(spark);
                setTimeout(()=>spark.remove(),1500);
            }
        });
    }
}

// --- GALLERY ANIMATION CSS ---
const style = document.createElement('style');
style.innerHTML = `
.fadein { animation: fadein 0.8s; }
@keyframes fadein {
    0% { opacity: 0; transform: scale(0.97);}
    60% {opacity: 1;transform: scale(1.08) rotate(-2deg);}
    100% { opacity: 1; transform: scale(1);}
}
.fantasy-img { animation: fantasyPop 1.2s; }
@keyframes fantasyPop {
    0% { filter: drop-shadow(0 0 0 #fbc2eb); transform: scale(1) rotate(0deg);}
    45% { filter: drop-shadow(0 0 10px #fbc2eb); transform: scale(1.08) rotate(-6deg);}
    80% { filter: drop-shadow(0 0 20px #b8005a); transform: scale(1.05) rotate(6deg);}
    100% { filter: none; transform: scale(1) rotate(0deg);}
}
.img-sparkle {
    position: fixed; width:28px;height:28px; pointer-events:none; z-index:999;
    background: radial-gradient(circle,#fff7cc 0%,#ffd6e0 80%, transparent 100%);
    border-radius:50%; animation: sparkleAnim 1.2s;
}
@keyframes sparkleAnim {
    0% { opacity:0; transform: scale(0.3);}
    30% { opacity:1; transform: scale(1.2);}
    100% { opacity:0; transform: scale(0.5);}
}
.float-heart {
    position: fixed; bottom:-32px; font-size:2.1em;
    color:#fbc2eb; z-index:999; pointer-events:none;
    animation: floatUp 3.2s ease-in;
}
.float-heart:after {
    content:"💖";
    font-family:'Pacifico',cursive;
    font-size:1.7em;
    opacity:0.8;
}
@keyframes floatUp {
    0% {transform: translateY(0) scale(0.8) rotate(-10deg);}
    30% {transform: translateY(-30vh) scale(1.1) rotate(10deg);}
    100% {transform: translateY(-65vh) scale(0.7) rotate(0deg); opacity:0;}
}
.touch-sparkle {
    position: fixed; width:22px;height:22px; pointer-events:none; z-index:9999;
    background: radial-gradient(circle,#baffc9 0%,#bae1ff 80%, transparent 100%);
    border-radius:50%; animation: sparkleAnim 1.5s;
}
@keyframes confetti-fall {
    0% { transform: translateY(-50px) scale(1);}
    70% { transform: translateY(260px) scale(1.09);}
    100% { transform: translateY(350px) scale(0.7);}
}
.confetti-piece {
    animation: confetti-fall 2.1s cubic-bezier(.13,.82,.62,1.1) forwards;
}
.option-label {
    font-weight: bold;
    margin-right: 7px;
    color: #b8005a;
}
.quiz-right {
    background: #c8f7c5 !important;
    color: #168039 !important;
    box-shadow: 0 0 12px #7bed9f;
    animation: correctPop 0.5s;
}
@keyframes correctPop {
    0% { transform: scale(1); }
    60% { transform: scale(1.15); }
    100% { transform: scale(1); }
}
.quiz-wrong {
    background: #f5b7b1 !important;
    color: #b8005a !important;
    box-shadow: 0 0 10px #ff7979;
}
.shake {
    animation: shakeAnim 0.6s;
}
@keyframes shakeAnim {
    10%, 90% { transform: translateX(-2px); }
    20%, 80% { transform: translateX(4px); }
    30%, 50%, 70% { transform: translateX(-8px); }
    40%, 60% { transform: translateX(8px); }
}
`;
document.head.appendChild(style);