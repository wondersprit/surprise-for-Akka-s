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

// --- (other code for gallery, games, etc. unchanged) ---

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

// --- (rest of your script.js unchanged) ---