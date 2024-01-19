let songDetails = [
  {
    id: "0",
    title: "Lost in the City Lights",
    singer: "Cosmo Sheldrake",
    urlImage: "./src/pictures/cover-1.png",
    imageAlt: "cover-1.png",
    track: "./src/tracks/lost-in-city-lights-145038.mp3",
  },
  {
    id: "1",
    title: "Forest Lullaby",
    singer: "Lesfm",
    urlImage: "./src/pictures/cover-2.png",
    imageAlt: "cover-2.png",
    track: "./src/tracks/forest-lullaby-110624.mp3",
  },
];

const song = document.querySelector(".song_container");
const progressBar = document.getElementById("progressBar");
let audio = document.querySelector("audio");
let playStopBtn = document.querySelector(".play-stop_button");
let currentSongIndex = 0;

function showSong() {
  let currentSong = songDetails[currentSongIndex];
  let html = `
          <article class="image_container">
              <img src="${currentSong.urlImage}" alt="${currentSong.imageAlt}">
          </article>
          <article class="song_info">
              <p class="song_title">${currentSong.title}</p>
              <span class="song_singer">${currentSong.singer}</span>
          </article>
          <audio src="${currentSong.track}?t=${Date.now()}"></audio>
    `;
  song.innerHTML = html;
  audio = document.querySelector("audio");
  audio.currentTime = 0;

  audio.removeEventListener("timeupdate", updateProgress);
  audio.addEventListener("timeupdate", updateProgress);

  // Restablecer la duración del audio al cargar una nueva canción
  audio.addEventListener("loadedmetadata", function () {
    progressBar.value = 0; // Restablecer la posición de la barra de progreso
    functionAsync(); // Actualizar el tiempo total
  });

  audio.load();
}

showSong();

/ Botones de control de usuario /;

function resetPlayButton() {
  let playBtn = `
    <img class="play-stop"  src="./src/icons/Play_fill.svg" alt="play_btn"> 
  `;
  playStopBtn.innerHTML = playBtn;
}

// Obtener el botón de siguiente
let nextBtn = document.querySelector(".next-song");
nextBtn.addEventListener("click", function () {
  currentSongIndex++;
  if (currentSongIndex >= songDetails.length) {
    currentSongIndex = 0;
  }
  resetPlayButton();
  showSong();
  functionAsync();
});
// Obtener el botón de anterior
let prevBtn = document.querySelector(".prev-song");
prevBtn.addEventListener("click", function () {
  if (currentSongIndex === 0) {
    currentSongIndex = songDetails.length - 1;
  } else {
    currentSongIndex--;
  }
  resetPlayButton();
  showSong();
  functionAsync();
});

// Agregar un listener al botón de reproducción
playStopBtn.addEventListener("click", function () {
  let playBtn = `
  <img class="play-stop"  src="./src/icons/Play_fill.svg" alt="play_btn"> 
  `;
  let pauseBtn = `
  <img class="play-stop"  src="./src/icons/Stop_fill.svg" alt="pause_btn"> 
  `;
  if (audio.paused) {
    audio.play();
    playStopBtn.innerHTML = pauseBtn;
  } else {
    audio.pause();
    playStopBtn.innerHTML = playBtn;
  }
});

// Obtener el elemento HTML donde se mostrará el tiempo de reproducción
const playbackTime = document.getElementById("playbackTime");

// Añadir evento de interacción del usuario a la barra de progreso
progressBar.addEventListener("input", function () {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Actualizar el tiempo de reproducción cada segundo
function updateProgress() {
  var minutos = Math.floor(audio.currentTime / 60);
  var segundos = Math.floor(audio.currentTime % 60);
  playbackTime.innerHTML =
    segundos < 10
      ? "0" + minutos + ":" + 0 + segundos
      : "0" + minutos + ":" + segundos;

  // Actualizar la posición de la barra de progreso
  const progressValue = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressValue;
  if (audio.currentTime === audio.duration) {
    playStopBtn.innerHTML = `
    <img class="play-stop"  src="./src/icons/Play_fill.svg" alt="play_btn"> 
    `;
  }
}

async function functionAsync() {
  await new Promise((resolve) => {
    audio.addEventListener("loadedmetadata", resolve);
  });
  var minutosTotal = Math.floor(audio.duration / 60);
  var segundosTotal = Math.floor(audio.duration % 60);

  const totalPlaybackTime = document.getElementById("totalPlaybackTime");
  totalPlaybackTime.innerHTML = "0" + minutosTotal + ":" + segundosTotal;
}
functionAsync();
