const diaryImgs = [
  "kowsi akka birthday.png",
  "kowsi akka my fav pic.png",
  "my chella akka's.png",
  "pic for surprice homepage.png"
];

function showMinigame() {
  let score = 0, maxScore = 10, finished = false;
  let html = `
    <h2>Light the Candles! 🎂</h2>
    <p class="game-score">Candles lit: <span id="scoreVal">0</span> / ${maxScore}</p>
    <div style="position:relative; display:inline-block;">
      <img src="kowsi akka birthday.png" alt="Cake" class="game-character" id="gameChar">
      <div id="cake-message" style="position:absolute; left:0; right:0; top:50%; width:100%; text-align:center; color:#ff69b4; font-size:1.4em; font-weight:bold; pointer-events:none;"></div>
    </div>
    <p>Tap/click the cake to light all 10 candles!</p>
    <button class="back-btn" onclick="showDiary()">Next</button>
  `;
  document.getElementById("main-content").innerHTML = html;

  let charImg = document.getElementById("gameChar");
  let cakeMsg = document.getElementById("cake-message");
  charImg.addEventListener('click', tap);
  charImg.addEventListener('touchstart', function(e){e.preventDefault();tap();});

  function tap() {
    if (finished) return;
    if (score < maxScore) {
      score++;
      document.getElementById("scoreVal").textContent = score;
      charImg.style.transform = "scale(1.10)";
      setTimeout(()=> charImg.style.transform = "scale(1)", 120);
    }
    if (score === maxScore && !finished) {
      finished = true;
      cakeMsg.textContent = "Happy Birthday Thangapullaw 🥰";
    }
  }
}

function showDiary() {
  let idx = 0;
  renderGallery();
  function renderGallery() {
    document.getElementById("main-content").innerHTML = `
      <h2>Photo Diary 📸</h2>
      <div class="photo-gallery" style="display:flex;align-items:center;justify-content:center;">
        <button class="gallery-nav-btn" ${idx==0?"disabled":""}">&lt;</button>
        <img src="${diaryImgs[idx]}" class="gallery-img" alt="Diary Pic">
        <button class="gallery-nav-btn" ${idx==diaryImgs.length-1?"disabled":""}">&gt;</button>
      </div>
      <div class="photo-count">Photo ${idx+1} of ${diaryImgs.length}</div>
      <button class="back-btn" onclick="showHeartfelt()">Next</button>
    `;
    let btns = document.querySelectorAll(".gallery-nav-btn");
    btns[0].onclick = () => { if(idx>0){idx--;renderGallery();} };
    btns[1].onclick = () => { if(idx<diaryImgs.length-1){idx++;renderGallery();} };
  }
}

function showHeartfelt() {
  document.getElementById("main-content").innerHTML = `
    <div class="heartfelt-section">
      <div class="heartfelt-title">💖 For Kowsi Akka:</div>
      <div class="heartfelt-message">
        Inakiku en chella akka ooda special day aana, en akka enaku eppavum special thaan 😌💕<br>
        Happy birthday thangapullaw! Life long sirichukite happy aa iru 🥰🥰🥰💕💕🫂
      </div>
      <div class="music-player">
          <audio src="for kowsi akka.mp3" autoplay controls loop></audio>
      </div>
      <button class="back-btn" onclick="showQuiz()">Next</button>
    </div>
  `;
}

function showQuiz() {
  document.getElementById("main-content").innerHTML = `
    <h2>Birthday Quiz 🎉</h2>
    <form id="quizForm">
      <p>What is the name of Kowsi Akka's favorite sweet?</p>
      <input type="text" name="q1" required>
      <br><br>
      <button type="submit" class="back-btn">Submit</button>
    </form>
    <div id="quizResult"></div>
  `;
  document.getElementById("quizForm").onsubmit = function(e) {
    e.preventDefault();
    let ans = e.target.q1.value.trim().toLowerCase();
    let result = (ans === "dairymilk" || ans === "dairy milk") ?
      "Yay! You got it right! 🎂" : "Hmm, try again or ask Kowsi Akka!";
    document.getElementById("quizResult").textContent = result;
  };
}

// Start the adventure
showMinigame();