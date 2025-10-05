let lvlNameStrong = document.querySelector(".message .lvl");
let lvlSecondsTime = document.querySelector(".message time");
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".word-area .the-word");
let input = document.querySelector(".word-area input");
let upcomingWords = document.querySelector(".upcoming-words ul");
let timeLeft = document.querySelector(".control time");
let scoreGot = document.querySelector(".control .score output");
let scoreTotal = document.querySelector(".control .score .total");
let finishPopUp = document.querySelector(".finish");
let option = document.querySelector("select");
let Words = {
  5: ["Hello", "Programming", "Code", "JavaScript", "Town"],
  3: [
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
      "Playing",
  ],
  2: [
    "country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
  ],
};
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
let length = Object.values(Words);
let defaultLevelName;
let defaultLevelSeconds;
let dynamic;
let UserSelect;
function setLevel(levelName) {
  defaultLevelName = levelName;
  defaultLevelSeconds = lvls[defaultLevelName];
  lvlNameStrong.innerHTML = defaultLevelName;
  lvlSecondsTime.innerHTML = defaultLevelSeconds;
  timeLeft.textContent = defaultLevelSeconds;
  // Dynamic length
  defaultLevelName === "Easy"
    ? (dynamic = length[2].length)
    : defaultLevelName === "Normal"
    ? (dynamic = length[1].length)
    : (dynamic = length[0].length);
  scoreTotal.innerHTML = dynamic;

  // UserSelect
  defaultLevelName === "Easy"
    ? (UserSelect = 5)
    : defaultLevelName === "Normal"
    ? (UserSelect = 3)
    : (UserSelect = 2);
}

window.onload = function () {
  option.children[0].selected = true;
  setLevel(option.value);
};

option.addEventListener("change", function (e) {
  setLevel(e.target.value);
});
input.onpaste = (_) => {
  return false;
};
startButton.onclick = function () {
  if (dynamic) {
    this.remove();
    input.focus();
    genWords();
    document.querySelector(".parent").remove();
  }
};
let CheckCurrentWord;
function genWords() {
  let currentArray = Words[UserSelect];
  let RandomWord =
    currentArray[Math.floor(Math.random() * currentArray.length)];
  let randomIndex = currentArray.indexOf(RandomWord);
  currentArray.splice(randomIndex, 1);
  theWord.innerHTML = RandomWord;
  upcomingWords.innerHTML = "";
  currentArray.forEach((e) => {
    let li = document.createElement("li");
    let txt = document.createTextNode(e);
    li.appendChild(txt);
    upcomingWords.appendChild(li);
  });
  startPlay();
  CheckCurrentWord = currentArray;
}
// genWords();
function startPlay() {
  timeLeft.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeft.innerHTML--;
    MainCondition: if (+timeLeft.innerHTML === 0) {
      clearInterval(start);
      Nested: if (
        theWord.innerHTML.toLowerCase() === input.value.toLowerCase()
      ) {
        // Empty Input Field
        input.value = "";
        // Increase Score:
        scoreGot.innerHTML++;
        isThereWord: if (CheckCurrentWord.length > 0) {
          // Call Generate Word :
          genWords();
        } else {
          // DownBelow this Else If Winner,
          let span = document.createElement("span");
          span.className = `good`;
          let spanText = document.createTextNode("CongratZ");
          span.appendChild(spanText);
          finishPopUp.appendChild(span);
          upcomingWords.remove();
        }
      } else {
        // If Lose Downbelow
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishPopUp.appendChild(span);
      }
    }
  }, 1000);
}
