let closeNavBtn = document.querySelector(".close-btn");
let barsNavBtn = document.querySelector(".bars-icon");
let navbar = document.querySelector(".navbar");
let arrdown1 = document.querySelector(".arr-down-one");
let concertWatchStatus = document.querySelector(".submenu");
let bg_video = document.getElementById("myvideo");
let overlay = document.querySelector(".overlay");
let albumCover = document.querySelector(".ablum-cover");
let diskCover = document.querySelector(".disk-cover");
let subLogin = document.querySelector(".sublogin");
let closeLogin = document.querySelector(".closeLogin");
arrdown1.addEventListener("click", () => {
    if (concertWatchStatus.classList.contains("hidden")) {
        concertWatchStatus.classList.replace("hidden", "grid");
    } else {
        concertWatchStatus.classList.add("hidden");
    }
    arrdown1.parentElement.classList.toggle("text-blue-400");
});
barsNavBtn.addEventListener("click", () => {
    overlay.classList.replace("hidden", "block");

    navbar.classList.replace("translate-x-[100%]", "translate-x-[0%]");
});
function closehandeler() {
    navbar.classList.replace("translate-x-[0%]", "translate-x-[100%]");
    overlay.classList.replace("block", "hidden");
}
closeNavBtn.addEventListener("click", closehandeler);
closeLogin.addEventListener("click", () => {
    subLogin.classList.replace("block", "hidden");
});
overlay.addEventListener("click", closehandeler);

albumCover.addEventListener("mouseover", (event) => {
    diskCover.classList.replace("translate-x-12", "translate-x-56");
});
albumCover.addEventListener("mouseout", (event) => {
    diskCover.classList.replace("translate-x-56", "translate-x-12");
});
//
const sectionHome = document.querySelector(".home");
const secObs = document.querySelectorAll(".secItem");

const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.replace("opacity-0", "opacity-100");
    entry.target.classList.remove("translate-y-6");
    observer.unobserve(entry.target);
};

const obs = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
secObs.forEach((sec) => {
    console.log(sec);
    obs.observe(sec);

    sec.classList.remove("opacity-100");
    sec.classList.add("translate-y-6");
});
// const obs = new IntersectionObserver(
//     function (entries) {
//         const ent = entries[0];
//         if (ent.isIntersecting === false) {
//             document
//                 .querySelector(".navbarhome")
//                 .classList.add("bg-zinc-700/50");
//         } else
//             document
//                 .querySelector(".navbarhome")
//                 .classList.remove("bg-zinc-700/50");
//     },
//     {
//         root: null,
//         threshold: 0.15,
//     }
// );
// obs.observe(sectionHome);
//
//
//

/////////////////////////////MUSIC PLAYER ?////////////////////
const playMusicBtn = document.querySelectorAll(".play-music-btn");
let currentAudio = null;
let currentTimer = null;

function markup(player) {
    player.innerHTML = `
        <div class="bg-gradient-to-tr from-violet-500 to-indigo-400 p-1 bottom-0 right-0 left-0 absolute z-10 text-white">
            <div class="relative">
                <div class="flex justify-around child:cursor-pointer child-hover:text-indigo-900">
                    <svg class="play-next size-6">
                        <use href="#play-next"></use>
                    </svg>
                    <svg class="size-6 playMusic" >
                        <use href="#pause"></use>
                    </svg>
                    <svg class="play-back size-6">
                        <use href="#play-back"></use>
                    </svg>
                </div>
                <div class="MusicTimer text-center absolute -top-7 right-0 left-0 text-indigo-400/50">
                    <span class=''>00:00</span>
                </div>
            </div>
        </div>`;
}

function playHandler(button) {
    const audioId = button.dataset.audio;
    const audio = document.getElementById(audioId);

    if (!audio) {
        console.error(`Audio element with ID ${audioId} not found.`);
        return;
    }

    if (currentAudio && currentAudio !== audio) {
        pauseHandler(button);
    }

    audio.play();
    console.log("play");

    button.querySelector(".PlayPuaseIcon").setAttribute("href", "#pause-icon");

    const player = button
        .closest(".musicPlayers")
        .querySelector(".musicPlayer");
    markup(player);
    let playNext = document.querySelector(".play-next");
    let playBack = document.querySelector(".play-back");
    let playMusic = document.querySelector(".playMusic");
    playNext.addEventListener("click", function () {
        audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
    });
    let isPlaying = false;
    playMusic.addEventListener("click", function () {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
    });
    playBack.addEventListener("click", function () {
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
    });
    currentAudio = audio;

    if (currentTimer) clearInterval(currentTimer);
    currentTimer = setInterval(() => {
        let currentTime = audio.currentTime;
        let minutes = Math.floor(currentTime / 60);
        let seconds = Math.floor(currentTime % 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        player.querySelector(
            ".MusicTimer span"
        ).innerHTML = `${minutes}:${seconds}`;
    }, 1000);
}

function pauseHandler(button) {
    const audioId = button.dataset.audio;
    const audio = document.getElementById(audioId);

    if (audio) {
        audio.pause();
        console.log("pause");

        button
            .querySelector(".PlayPuaseIcon")
            .setAttribute("href", "#play-icon");

        const player = button
            .closest(".musicPlayers")
            .querySelector(".musicPlayer");
        player.innerHTML = ""; // حذف مارک آپ
    }

    if (currentTimer) {
        clearInterval(currentTimer);
        currentTimer = null;
    }
}

function playPauseHandler(btn) {
    if (
        btn.querySelector(".PlayPuaseIcon").getAttribute("href") ===
        "#pause-icon"
    ) {
        pauseHandler(btn);
    } else {
        playHandler(btn);
    }
}

playMusicBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        playPauseHandler(btn);
    });
});
