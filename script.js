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
    if(document.getElementById("quiz-section-kowsi")) {
        runQuiz("quiz-section-kowsi", kowsiQuiz, showMagicalCakeGame);
    }
    if(document.getElementById("quiz-section-sneha")) {
        runQuiz("quiz-section-sneha", snehaQuiz, showSnehaWhackAMole);
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

// --- Kowsi Magical Cake Game ---
function showMagicalCakeGame() {
    // Remove overlay if exists
    let oldOverlay = document.getElementById('full-darkness');
    if(oldOverlay) oldOverlay.remove();

    // Add a full-screen darkness overlay
    let overlay = document.createElement('div');
    overlay.id = 'full-darkness';
    overlay.style = `
        position:fixed;top:0;left:0;width:100vw;height:100vh;
        background:rgba(30,18,40,0.96);z-index:1999;pointer-events:none;
        transition:background 1.1s cubic-bezier(.7,0,.3,1);
        mix-blend-mode: multiply;
    `;
    document.body.appendChild(overlay);

    // Add the magical cake game
    const section = document.getElementById("game-section-kowsi");
    section.classList.remove("hidden");
    section.innerHTML = `
        <div class="cake-zone" style="position:relative;z-index:2;text-align:center;">
            <div class="hint-msg" id="cake-hint-msg">Tap the candles to light them and remove the darkness!</div>
            <svg id="cake-svg" width="420" height="320" viewBox="0 0 420 320">
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
                <!-- Cute cake face -->
                <text x="210" y="210" font-size="2.2em" fill="#b8005a" text-anchor="middle" font-family="Baloo 2, cursive">（｡♥‿♥｡）</text>
                <!-- Candles group -->
                <g id="candles">
                    ${[...Array(10)].map((_,i)=>{
                        // Spread candles evenly
                        const x = 110 + i*20;
                        const colorArr = ["#ffb3ba","#bae1ff","#baffc9","#ffffba","#ffdfba"];
                        const color = colorArr[i%colorArr.length];
                        return `
                        <g class="candle" data-idx="${i}">
                            <rect class="candle-body" x="${x}" y="44" width="12" height="50" fill="${color}" rx="3"/>
                            <ellipse cx="${x+6}" cy="44" rx="6" ry="3" fill="#fff" opacity="0.93"/>
                            <ellipse class="candle-flame" cx="${x+6}" cy="36" rx="5" ry="9" fill="#ffd966"/>
                        </g>`;
                    }).join("")}
                </g>
            </svg>
        </div>
        <div id="confetti" class="confetti"></div>
        <audio id="cake-ambience" src="for kowsi akka.mp3" preload="auto" loop></audio>
    `;
    // Play music on first interaction
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
        // Touch support
        candle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            candle.click();
        });
    });

    function updateDarkness() {
        // Darkness fades as more candles are lit
        let ratio = lit.filter(Boolean).length / candles.length;
        let minAlpha = 0.02;
        let maxAlpha = 0.96;
        let currentAlpha = maxAlpha - (ratio * (maxAlpha-minAlpha));
        overlay.style.background = `rgba(30,18,40,${currentAlpha})`;
    }

    function checkAllLit() {
        if (lit.every(x => x)) {
            // <<<<<<<< REPLACED HERE >>>>>>>>>
            document.getElementById('cake-hint-msg').textContent = "Happy Birthday Thangapullaw 🎂 🥰🥰💕💕💕🫂";
            overlay.style.background = `rgba(30,18,40,0.01)`;
            launchConfetti();
            showBirthdayMsg();
            // Clean up after delay
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
        const colors = [
            "#f8c471", "#e06666", "#6fa8dc", "#baffc9", "#ffd966", "#d72660", "#b8005a", "#fff", "#bae1ff", "#ffb3ba"
        ];
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
        msg.innerHTML = "Happy Birthday Thangapullaw 🥰🥰💕💕💕🫂";
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

// --- Sneha Whack-a-Mole Minigame ---
function showSnehaWhackAMole() {
    const section = document.getElementById("game-section-sneha");
    section.classList.remove("hidden");
    section.innerHTML = `
        <div class="whack-mole-zone" style="position:relative;height:340px;width:100%;max-width:340px;margin:auto;">
            <div class="hint-msg" id="mole-hint-msg">Catch the biscuit thief 10 times!</div>
            <div id="mole-score" style="font-size:1.1em;color:#0099b8;margin-bottom:6px;">Caught: 0/10</div>
            <div id="mole-area" style="width:100%;height:270px;position:relative;background:#fff8e1;border-radius:18px;box-shadow:0 2px 12px #d0bfae;"></div>
        </div>
        <audio id="sneha-ambience" src="for sneha akka.mp3" preload="auto" loop></audio>
        <div id="sneha-confetti" class="confetti"></div>
    `;
    // Play music on first interaction
    let ambiance = section.querySelector('#sneha-ambience');
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

    let score = 0, total = 10, moleTimeout = null, canClick = true;
    const moleArea = document.getElementById('mole-area');
    const moleScore = document.getElementById('mole-score');
    const whackImg = "biscuits thief.png";
    const size = 72;
    // Possible positions (random but always visible)
    const posArr = [
        {top: 10, left: 22},
        {top: 20, left: 160},
        {top: 100, left: 50},
        {top: 150, left: 200},
        {top: 190, left: 70},
        {top: 60, left: 220},
        {top: 200, left: 130},
        {top: 140, left: 250},
        {top: 80, left: 170},
        {top: 30, left: 90}
    ];

    function showMole() {
        if(score >= total) return;
        moleArea.innerHTML = '';
        canClick = true;
        const idx = Math.floor(Math.random()*posArr.length);
        const pos = posArr[idx];
        let mole = document.createElement('img');
        mole.src = whackImg;
        mole.alt = "Biscuit thief";
        mole.style.position = "absolute";
        mole.style.width = size+"px";
        mole.style.height = size+"px";
        mole.style.top = pos.top+"px";
        mole.style.left = pos.left+"px";
        mole.style.cursor = "pointer";
        mole.style.transition = "transform 0.13s";
        mole.style.userSelect = "none";
        mole.draggable = false;
        mole.onclick = function() {
            if(!canClick) return;
            canClick = false;
            mole.style.transform = "scale(1.22) rotate(-16deg)";
            score++;
            moleScore.textContent = `Caught: ${score}/${total}`;
            setTimeout(()=>{
                mole.style.transform = "";
                if(score < total) setTimeout(showMole, 400);
                else {
                    moleArea.innerHTML = '';
                    document.getElementById('mole-hint-msg').textContent = "You caught the thief!";
                    launchSnehaConfetti();
                    setTimeout(()=>{
                        section.classList.add('hidden');
                        showAutoSlideshowSneha();
                    }, 2200);
                }
            }, 220);
        };
        // Touch support
        mole.addEventListener('touchstart', (e) => {
            e.preventDefault();
            mole.click();
        });
        moleArea.appendChild(mole);

        // If not clicked in 1.2s, disappear and reappear elsewhere
        moleTimeout = setTimeout(()=>{
            if(score < total && canClick) showMole();
        }, 1200 + Math.random()*300);
    }
    showMole();

    function launchSnehaConfetti() {
        const confettiDiv = document.getElementById('sneha-confetti');
        confettiDiv.innerHTML = '';
        const colors = [
            "#c3f584", "#b3e5fc", "#ffd966", "#ffb3ba", "#bae1ff", "#baffc9", "#ffe6e6", "#fff", "#fbc2eb", "#e06666"
        ];
        for(let i=0;i<50;i++){
            let c = document.createElement('div');
            c.className = 'confetti-piece';
            c.style.position = 'absolute';
            c.style.background = colors[Math.floor(Math.random()*colors.length)];
            c.style.left = (Math.random()*240+20) + 'px';
            c.style.top = (Math.random()*20+2) + 'px';
            c.style.width = "12px";
            c.style.height = "12px";
            c.style.borderRadius = "50%";
            c.style.opacity = "0.85";
            c.style.pointerEvents = "none";
            c.style.animation = `confetti-fall 2.1s cubic-bezier(.13,.82,.62,1.1) forwards`;
            c.style.animationDelay = (Math.random()*0.7)+'s';
            confettiDiv.appendChild(c);
        }
        setTimeout(()=>{ confettiDiv.innerHTML = ''; }, 2000);
    }
}

// --- Kowsi Gallery: Auto-advancing, animated slideshow ---
function showAutoSlideshowKowsi() {
    const sectionId = "diary-section-kowsi";
    const galleryImgs = kowsiGallery;
    const section = document.getElementById(sectionId);
    section.classList.remove("hidden");
    const img = document.getElementById('gallery-img-kowsi');
    const music = document.getElementById('kowsi-music');
    if(music) music.play().catch(()=>{});

    // Hide nav buttons for auto mode
    document.getElementById('kowsi-prev').style.display = 'none';
    document.getElementById('kowsi-next').style.display = 'none';

    let idx = 0;
    img.classList.add('fadein');
    function showImg(animated=true) {
        if(animated) {
            img.classList.remove('fadein');
            void img.offsetWidth;
            img.classList.add('fadein');
        }
        img.src = galleryImgs[idx].src;
        img.alt = galleryImgs[idx].alt;
    }
    showImg(false);

    // Auto-advance every 2.2s, with fade animation
    let intervalID = setInterval(()=>{
        idx = (idx + 1) % galleryImgs.length;
        showImg();
        if(idx===0) { // after full cycle, stop and show message
            clearInterval(intervalID);
            setTimeout(()=>{
                section.classList.add('hidden');
                document.getElementById('message-section-kowsi').classList.remove('hidden');
            }, 1800);
        }
    }, 2200);

    // Optional: tap to pause/resume auto
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
        }, 2200);
    };
}

// --- Sneha Gallery: Auto-advancing, animated slideshow (No boring click) ---
function showAutoSlideshowSneha() {
    const sectionId = "diary-section-sneha";
    const galleryImgs = snehaGallery;
    const section = document.getElementById(sectionId);
    section.classList.remove("hidden");
    const img = document.getElementById('gallery-img-sneha');
    const music = document.getElementById('sneha-music');
    if(music) music.play().catch(()=>{});

    // Hide nav buttons for auto mode
    document.getElementById('sneha-prev').style.display = 'none';
    document.getElementById('sneha-next').style.display = 'none';

    let idx = 0;
    img.classList.add('fadein');
    function showImg(animated=true) {
        if(animated) {
            img.classList.remove('fadein');
            void img.offsetWidth;
            img.classList.add('fadein');
        }
        img.src = galleryImgs[idx].src;
        img.alt = galleryImgs[idx].alt;
    }
    showImg(false);

    // Auto-advance every 2.2s, with fade animation
    let intervalID = setInterval(()=>{
        idx = (idx + 1) % galleryImgs.length;
        showImg();
        if(idx===0) { // after full cycle, stop and show message
            clearInterval(intervalID);
            setTimeout(()=>{
                section.classList.add('hidden');
                document.getElementById('message-section-sneha').classList.remove('hidden');
            }, 1800);
        }
    }, 2200);

    // Optional: tap to pause/resume auto
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
        }, 2200);
    };
}

// --- GALLERY ANIMATION CSS ---
const style = document.createElement('style');
style.innerHTML = `
.fadein { animation: fadein 0.8s; }
@keyframes fadein {
    0% { opacity: 0; transform: scale(0.97);}
    60% {opacity: 1;transform: scale(1.03);}
    100% { opacity: 1; transform: scale(1);}
}
@keyframes confetti-fall {
    0% { transform: translateY(-50px) scale(1);}
    70% { transform: translateY(260px) scale(1.09);}
    100% { transform: translateY(350px) scale(0.7);}
}
.confetti-piece {
    animation: confetti-fall 2.1s cubic-bezier(.13,.82,.62,1.1) forwards;
}
`;
document.head.appendChild(style);