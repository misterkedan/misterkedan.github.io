const background = document.getElementById('background');
const container = document.getElementById('container');
const confirmation = document.getElementById('confirmation');

const playlists = [
  {
    name: '80s Japanese Pop',
    url: 'https://open.spotify.com/playlist/7lGmJcLihxa3bVawvCsCpW?si=55ba2d6674a147bb',
    img: 'https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da8448d257a2a5a9f146b4b7e26b',
  },
  {
    name: 'Home Sweet Home',
    url: 'https://open.spotify.com/playlist/11Q6T9nQucowBYSTwgzyLc?si=79e7356a6c884d69',
    img: 'https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da84a7d0fb0aaffe5420e8e8f1ff',
  },
  {
    name: 'Midnight Bourbon',
    url: 'https://open.spotify.com/playlist/4HyGkv6S9rGhLHXAlyHtkW?si=844aecc2d4b9403a',
    img: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da842e53edaec085214a37868f47',
  },
  {
    name: 'Sleep Jazz',
    url: 'https://open.spotify.com/playlist/4HyGkv6S9rGhLHXAlyHtkW?si=4fc5dfa5ab2e4f45',
    img: 'https://mosaic.scdn.co/300/ab67616d00001e0267a53566d0155a7a8b5c14e3ab67616d00001e027525fae4fbb894430bdb2766ab67616d00001e02d99ccee752519a34a06210a0ab67616d00001e02e7643f8ed5dc5a8c947f9bcd',
  },
];
const controls = [
  {
    name: '⏸️ Pause',
    command: '-pause',
  },
  {
    name: '▶️ Resume',
    command: '-resume',
  },
  {
    name: '⏹️ Stop',
    command: '-stop',
  },
];

let elements = [];
function deselect() {
  elements.forEach((element) => element.classList.remove('selected'));
}
function select(element) {
  deselect();
  element.classList.add('selected');
}

let timeout;
function showConfirmation(message) {
  const showElement = () => confirmation.classList.remove('hidden');
  const hideElement = () => confirmation.classList.add('hidden');
  if (!message) return hideElement();

  confirmation.innerHTML = message;
  showElement();
  clearTimeout(timeout);
  timeout = setTimeout(hideElement, 2000);
}

function copyToClipboard(text, confirmation) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showConfirmation(confirmation);
      //alert(`Copied to clipboard: ${url}`);
    })
    .catch((err) => {
      console.error('Error copying text: ', err);
    });
}

playlists.forEach((playlist) => {
  const command = `-play ${playlist.url}`;
  const confirmation = `-play &lt${playlist.name.toLowerCase()}&gt; &#10004;`;

  const element = document.createElement('div');
  element.className = 'item';
  element.onclick = () => {
    copyToClipboard(command, confirmation);
    select(element);
  };

  const img = document.createElement('img');
  img.addEventListener('error', () => {
    img.src = 'default.png';
  });
  img.src = playlist.img;
  img.alt = playlist.name;

  const span = document.createElement('span');
  span.textContent = playlist.name;

  element.appendChild(img);
  element.appendChild(span);
  container.appendChild(element);
  elements.push(element);
});

controls.forEach((control) => {
  const { command } = control;
  const confirmation = `${command} &#10004;`;

  const element = document.createElement('div');
  element.className = 'item';
  element.classList.add('control');
  element.onclick = () => {
    copyToClipboard(command, confirmation);
    select(element);
  };

  const span = document.createElement('span');
  span.textContent = control.name;

  element.appendChild(span);
  container.appendChild(element);
  elements.push(element);
});

background.addEventListener('click', () => {
  showConfirmation();
  deselect();
});
