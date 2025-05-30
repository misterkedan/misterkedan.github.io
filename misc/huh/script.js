/*
  TODO
  - Add support for playlists/multiple files (tv series)
*/

const video = document.getElementById('video');
const subsWrapper = document.getElementById('subs-wrapper');
const subs = document.getElementById('subs');
const videoInput = document.getElementById('videoInput');
const videoFileName = document.getElementById('videoFileName');
const subsInput = document.getElementById('subsInput');
const subsFileName = document.getElementById('subsFileName');

const subsControls = {
  size: document.getElementById('subSize'),
  font: document.getElementById('subFont'),
  color: document.getElementById('subColor'),
  bgd: document.getElementById('subBgd'),
  bgdAlpha: document.getElementById('subBgdAlpha'),
  enabled: document.getElementById('subEnabled'),
};
let subsData = [];
let currentSub = { index: -1, text: '' };

function loadVideo(file) {
  const url = URL.createObjectURL(file);
  video.src = url;
  videoFileName.textContent = file.name;
  videoFileName.classList.add('loaded');
}
function loadSubs(file) {
  const reader = new FileReader();
  reader.onload = () => {
    subsData = parseSRT(reader.result);
  };
  reader.readAsText(file);
  subsFileName.textContent = file.name;
  subsFileName.classList.add('loaded');
  subsControls.enabled.checked = true;
  setSubsVisibility();
}

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

function updateSubs() {
  const currentTime = video.currentTime;
  const sub = subsData.find(
    (s) => currentTime >= s.start && currentTime <= s.end
  );
  if (!sub) {
    currentSub.index = -1;
    currentSub.text = '';
    subs.innerHTML = '';
  } else if (currentSub.index !== sub.index) {
    currentSub = sub;
    subs.innerHTML = sub.text;
  }
}

function setSubsStyle() {
  const size = subsControls.size.value;
  const color = subsControls.color.value;
  const font = subsControls.font.value;
  const bgd = subsControls.bgd.value;
  const bgdAlpha = subsControls.bgdAlpha.value;
  const bgdColor = `rgba(0,0,0,${bgdAlpha})`;
  let style = `font-size: ${size}; color: ${color};`;
  if (bgd === 'soft') {
    style += ` text-shadow: 0 0 0.2em ${bgdColor};`;
  } else if (bgd === 'stroke') {
    style += ` -webkit-text-stroke: 0.2em ${bgdColor};`;
  } else if (bgd === 'solid') {
    style += ` background: ${bgdColor}; padding: 0.2em 0.5em; border-radius: 0.1em;`;
  }
  subs.setAttribute('style', style);
  subs.classList.remove('monospace', 'sans-serif', 'serif');
  subs.classList.add(font);
}

function setSubsVisibility() {
  if (subsControls.enabled.checked) {
    subsWrapper.classList.remove('hidden');
  } else {
    subsWrapper.classList.add('hidden');
  }
  updateSubs();
}

videoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) loadVideo(file);
});

subsInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) loadSubs(file);
});

video.addEventListener('timeupdate', () => {
  if (subsControls.enabled.checked) updateSubs();
});

document.querySelectorAll('select').forEach((select) => {
  select.addEventListener('change', setSubsStyle);
});

subsControls.enabled.addEventListener('change', setSubsVisibility);

// Drag and drop
['dragenter', 'dragover'].forEach((event) => {
  document.body.addEventListener(event, (e) => e.preventDefault());
});

document.body.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = [...e.dataTransfer.files];
  files.forEach((file) => {
    if (file.type.startsWith('video/')) {
      loadVideo(file);
    } else if (file.name.endsWith('.srt')) {
      loadSubs(file);
    }
  });
});

// Pseudo fullscreen toggle
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.body.classList.remove('pseudo-fullscreen');
  }

  if (e.key === 'f') {
    document.body.classList.toggle('pseudo-fullscreen');
  }

  if (e.key === 'e') {
    subsControls.enabled.checked = !subsControls.enabled.checked;
    setSubsVisibility();
  }
});

video.volume = 0.5;
setSubsStyle();
