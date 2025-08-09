const akkas = {
  kowsi: {
    displayName: "Kowsi Akka",
    minigameImg: "kowsi akka birthday.png",
    diaryImgs: [
      "kowsi akka birthday.png",
      "kowsi akka my fav pic.png",
      "my chella akka's.png",
      "pic for surprice homepage.png"
    ],
    music: "for kowsi akka.mp3",
    heartfelt: `Inakiku en chella akka ooda special day aana, en akka enaku eppavum special thaan 😌💕 Happy birthday thangapullaw! Life long sirichukite happy aa iru 🥰🥰🥰💕💕🫂`,
  },
  sneha: {
    displayName: "Sneha Akka",
    minigameImg: "biscuits theif.png",
    diaryImgs: [
      "akka and me.png",
      "akka teasing me.png",
      "dairymilk moment 2.png",
      "dairymilk moment.png",
      "flower crown for sneha akka.png",
      "sleeping.png",
      "teasing while playing games.png"
    ],
    music: "for sneha akka.mp3",
    heartfelt: `Oii periya valu 😄 nee enaku romba rombaaa rombaaaaa special 💕 En life la kadicha first akka – special akka forever and ever 😘 Love you sooo soooooo soooooooooo much akka maa 💕💕🫂`,
  }
};

let currentAkka = null;
let mainContent = document.getElementById("main-content");

window.startGame = function(akkaKey) {
  currentAkka = akkas[akkaKey];
  mainContent.innerHTML = "";
  stopMusic();
  showMinigame();
};

function showMinigame() {
  let score = 0;
  let maxScore = 10;
  let gameDiv = document.createElement("div");
  gameDiv.className = "game-area";

  if (currentAkka.displayName === "Kowsi Akka") {
    gameDiv.innerHTML = `
      <h2>${currentAkka.displayName} Minigame 🎂</h2>
      <p class="game-score">Candles lit: <span id="scoreVal">0</span> / ${maxScore}</p>
      <div style="position:relative; display:inline-block;">
        <img src="${currentAkka.minigameImg}" alt="Cake" class="game-character" id="gameChar">
        <div id="cake-message" style="position:absolute; left:0; right:0; top:50%; width:100%; text-align:center; color:#ff69b4; font-size:1.4em; font-weight:bold; pointer-events:none;"></div>
      </div>
      <p>Light the candles for your birthday! Tap/click the cake 10 times 🎂</p>
      <button class="back-btn" onclick="goBackHome()">Back to Home</button>
    `;
    mainContent.appendChild(gameDiv);

    let charImg = gameDiv.querySelector("#gameChar");
    let cakeMsg = gameDiv.querySelector("#cake-message");
    charImg.onclick = () => {
      if (score < maxScore) {
        score++;
        document.getElementById("scoreVal").textContent = score;
        charImg.style.transform = "scale(1.10)";
        setTimeout(()=> charImg.style.transform = "scale(1)", 120);
      }
      if (score === maxScore) {
        cakeMsg.textContent = "Happy Birthday Thangapullaw 🥰";
        setTimeout(showPhotoDiary, 1100);
      }
    };
  } else {
    gameDiv.innerHTML = `
      <h2>${currentAkka.displayName} Minigame 🎮</h2>
      <p class="game-score">Score: <span id="scoreVal">0</span> / ${maxScore}</p>
      <img src="${currentAkka.minigameImg}" alt="Game Character" class="game-character" id="gameChar">
      <p>Bonk the biscuit thief! Tap/click as fast as you can 🥳</p>
      <button class="back-btn" onclick="goBackHome()">Back to Home</button>
    `;
    mainContent.appendChild(gameDiv);

    let charImg = gameDiv.querySelector("#gameChar");
    charImg.onclick = () => {
      if (score < maxScore) {
        score++;
        document.getElementById("scoreVal").textContent = score;
        charImg.style.transform = "scale(1.18)";
        setTimeout(()=> charImg.style.transform = "scale(1)", 120);
      }
      if (score === maxScore) {
        setTimeout(showPhotoDiary, 600);
      }
    };
  }
}

function showPhotoDiary() {
  mainContent.innerHTML = "";
  let diaryDiv = document.createElement("div");
  diaryDiv.className = "photo-diary";
  diaryDiv.innerHTML = `
    <h2>${currentAkka.displayName} Photo Diary 📸</h2>
    <div class="photo-gallery" id="gallery"></div>
    <div class="photo-count" id="photoCount"></div>
    <button class="back-btn" onclick="goBackHome()">Back to Home</button>
  `;
  mainContent.appendChild(diaryDiv);

  let idx = 0;
  function renderGallery() {
    let gallery = diaryDiv.querySelector("#gallery");
    gallery.innerHTML = `
      <button class="gallery-nav-btn gallery-prev" ${idx==0?"disabled":""}>&lt;</button>
      <img src="${currentAkka.diaryImgs[idx]}" class="gallery-img" alt="Diary Pic">
      <button class="gallery-nav-btn gallery-next" ${idx==currentAkka.diaryImgs.length-1?"disabled":""}>&gt;</button>
    `;
    diaryDiv.querySelector("#photoCount").textContent =
      `Photo ${idx+1} of ${currentAkka.diaryImgs.length}`;
    gallery.querySelector(".gallery-prev").onclick = () => { if(idx>0){idx--;renderGallery();} };
    gallery.querySelector(".gallery-next").onclick = () => { if(idx<currentAkka.diaryImgs.length-1){idx++;renderGallery();} };
    if(idx === currentAkka.diaryImgs.length-1){
      setTimeout(showHeartfelt, 700);
    }
  }
  renderGallery();
}

function showHeartfelt() {
  mainContent.innerHTML = "";
  playMusic(currentAkka.music);
  let heartfeltDiv = document.createElement("div");
  heartfeltDiv.className = "heartfelt-section";
  heartfeltDiv.innerHTML = `
    <div class="heartfelt-title">💖 For ${currentAkka.displayName}:</div>
    <div class="heartfelt-message">${currentAkka.heartfelt}</div>
    <div class="music-player">
        <audio src="${currentAkka.music}" autoplay controls loop></audio>
    </div>
    <button class="back-btn" onclick="goBackHome()">Back to Home</button>
  `;
  mainContent.appendChild(heartfeltDiv);
}

window.goBackHome = function() {
  window.location.reload();
};

function playMusic(src) {
  let bgMusic = document.getElementById("bg-music");
  if(bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic.src = src;
    bgMusic.play();
  }
}
function stopMusic() {
  let bgMusic = document.getElementById("bg-music");
  if(bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic.src = "for lobby.mp3";
    bgMusic.play();
  }
}