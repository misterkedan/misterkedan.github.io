/*
  TODO
  - Style subtitles with classes
  - Replace "Style" with "Font Family"
  - Check files loading function implementation
  - Fix solid shadow option
  - Add support for playlists/multiple files (tv series)
*/

const video = document.getElementById('video');
const customSubs = document.getElementById('custom-subs');

const videoInput = document.getElementById('videoFile');
const subtitleInput = document.getElementById('subtitleFile');
const videoName = document.getElementById('videoName');
const subtitleName = document.getElementById('subtitleName');

const subSettings = {
  size: document.getElementById('subSize'),
  font: document.getElementById('subFont'),
  color: document.getElementById('subColor'),
  shadow: document.getElementById('subShadow'),
  opacity: document.getElementById('subOpacity'),
  enabled: document.getElementById('subEnabled'),
};

let subtitles = [];
let currentSubtitleIndex = -1;
let currentSubtitle = { index: -1, text: '' };

videoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    video.src = url;
    videoName.textContent = file.name;
    videoName.classList.add('loaded');
  }
});

subtitleInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      subtitles = parseSRT(reader.result);
    };
    reader.readAsText(file);
    subtitleName.textContent = file.name;
    subtitleName.classList.add('loaded');
  }
});

video.addEventListener('timeupdate', () => {
  if (!subSettings.enabled.checked) {
    customSubs.innerHTML = '';
    return;
  }

  const currentTime = video.currentTime;
  const sub = subtitles.find(
    (s) => currentTime >= s.start && currentTime <= s.end
  );

  if (sub && currentSubtitleIndex !== sub.index) {
    currentSubtitleIndex = sub.index;
    renderSubtitle(sub.text);
    currentSubtitle = sub;
  } else if (!sub) {
    customSubs.innerHTML = '';
    currentSubtitleIndex = -1;
  }
});

function parseSRT(data) {
  const entries = data.split(/\r?\n\r?\n/);
  return entries
    .map((entry, index) => {
      const lines = entry.split(/\r?\n/);
      if (lines.length >= 3) {
        const time = lines[1].split(' --> ');
        return {
          index,
          start: srtTimeToSeconds(time[0]),
          end: srtTimeToSeconds(time[1]),
          text: lines.slice(2).join('<br>'),
        };
      }
      return null;
    })
    .filter((e) => e);
}

function srtTimeToSeconds(time) {
  const [h, m, s] = time.split(':');
  const [sec, ms] = s.split(',');
  return (
    parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(sec) + parseInt(ms) / 1000
  );
}

function renderSubtitle(text) {
  const size = subSettings.size.value;
  const font = subSettings.font.value;
  const color = subSettings.color.value;
  const shadow = subSettings.shadow.value;
  const opacity = subSettings.opacity.value;

  const shadowColor = `rgba(0,0,0,${opacity})`;
  let styles = `font-size: ${size}; font-family: ${font}; color: ${color};`;
  if (shadow === 'soft') {
    styles += ` text-shadow: 0 0 1em ${shadowColor};`;
  } else if (shadow === 'stroke') {
    styles += ` -webkit-text-stroke: 0.2em ${shadowColor};`;
  } else if (shadow === 'background') {
    styles += ` background: ${shadowColor}; padding: 0.2em 0.5em; border-radius: 0.3em;`;
  }
  customSubs.innerHTML = `<div class="subtitles" style="${styles}">${text}</div>`;
}

document.querySelectorAll('select').forEach((select) => {
  select.addEventListener('change', () => {
    renderSubtitle(currentSubtitle.text);
  });
});

// Drag and drop support
['dragenter', 'dragover'].forEach((event) => {
  document.body.addEventListener(event, (e) => e.preventDefault());
});

document.body.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = [...e.dataTransfer.files];
  const loadVideo = (file) => {
    const url = URL.createObjectURL(file);
    video.src = url;
    videoName.textContent = file.name;
    videoName.classList.add('loaded');
  };
  const loadSubtitles = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      subtitles = parseSRT(reader.result);
    };
    reader.readAsText(file);
    subtitleName.textContent = file.name;
    subtitleName.classList.add('loaded');
  };

  files.forEach((file) => {
    if (file.type.startsWith('video/')) {
      loadVideo(file);
    } else if (file.name.endsWith('.srt')) {
      loadSubtitles(file);
    }
  });
});

// Fullscreen toggle
document.addEventListener('keydown', (e) => {
  if (e.key === 'f') {
    const wrapper = document.getElementById('video-wrapper');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      wrapper.requestFullscreen();
    }
  }
});
