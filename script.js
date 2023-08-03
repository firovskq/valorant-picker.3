// Retrieve the necessary elements
let inputName = document.getElementById("inputName");
let teamSizeInput = document.getElementById("teamSizeInput");
let pickButton = document.getElementById("pickButton");
let clearButton = document.getElementById("clearButton");
let randomButton = document.getElementById("randomButton");
let teamOneResult = document.getElementById("teamOneResult");
let teamTwoResult = document.getElementById("teamTwoResult");
let out = document.getElementById("out");
let gunLine = document.getElementById("gunLine");
let mapLine = document.getElementById("mapLine");

inputName.value = "";
out.innerHTML = "";
teamOneResult.innerHTML = "";
teamTwoResult.innerHTML = "";

const guns = [
  "Operator",
  "Phantom",
  "Vandal",
  "Sheriff",
  "Classic",
  "Judge",
  "Guardian",
  "Odin",
  "Spectre",
  "Ares",
  "Bulldog",
  "Marshall",
  "Ghost",
  "Stinger",
  "Bucky",
  "Knife",
  "Shorty",
  "Frenzy",
];

// Object to keep track of which player has picked which gun
let playerGunMap = {};

// Add event listeners to the buttons
pickButton.addEventListener("click", pickPlayerButton);
clearButton.addEventListener("click", clearInputAndOutput);
randomButton.addEventListener("click", pickRandomGun);

inputName.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    pickPlayerButton();
  }
});

function pickPlayerButton() {
  let input = inputName.value;
  // Generate a random number (0 or 1)
  let randomNum = Math.floor(Math.random() * 2);

  // Check the current number of players in each team
  let teamOnePlayers = teamOneResult.querySelectorAll("p").length;
  let teamTwoPlayers = teamTwoResult.querySelectorAll("p").length;

  // Check if either team has reached the maximum limit of three players
  if (teamOnePlayers === 3 && teamTwoPlayers === 3) {
    alert("Both teams already have three players each.");
    return; // Stop further execution of the function
  }

  // Decide which team to assign the name based on the random number
  if (randomNum === 0) {
    // Check if Team 1 can have more players
    if (teamOnePlayers < 3) {
      // Assign to Team 1
      teamOneResult.innerHTML += `<p class="out">${input}</p>`;
    } else {
      // If Team 1 is full, assign to Team 2
      teamTwoResult.innerHTML += `<p class="out">${input}</p>`;
    }
  } else {
    // Check if Team 2 can have more players
    if (teamTwoPlayers < 3) {
      // Assign to Team 2
      teamTwoResult.innerHTML += `<p class="out">${input}</p>`;
    } else {
      // If Team 2 is full, assign to Team 1
      teamOneResult.innerHTML += `<p class="out">${input}</p>`;
    }
  }

  // Clear the input field after reading the value
  inputName.value = "";
}

function clearInputAndOutput() {
  inputName.value = "";
  out.innerHTML = "";
  teamOneResult.innerHTML = "";
  teamTwoResult.innerHTML = "";
  gunLine.innerHTML = "";

  // Preserve mapLine and gunLine elements, just clear their content
  if (mapLine) {
    mapLine.querySelector("h4").textContent = "";
  }
  if (gunLine) {
    gunLine.querySelector("h4").textContent = "";
  }
}

function pickRandomGun() {
  let teamOnePlayers = Array.from(teamOneResult.querySelectorAll("p"));
  let teamTwoPlayers = Array.from(teamTwoResult.querySelectorAll("p"));
  let allPlayers = teamOnePlayers.concat(teamTwoPlayers);

  if (allPlayers.length === 0) {
    alert("No players added to either Team 1 or Team 2.");
    return;
  }

  // Filter out players who have already picked a gun
  let availablePlayers = allPlayers.filter(
    (player) => !playerGunMap[player.innerText]
  );

  if (availablePlayers.length === 0) {
    alert("All players have already picked guns.");
    return;
  }

  let randomPlayerIndex = Math.floor(Math.random() * availablePlayers.length);
  let randomPlayer = availablePlayers[randomPlayerIndex].innerText;
  let randomGunIndex = Math.floor(Math.random() * guns.length);
  let randomGun = guns[randomGunIndex];

  // Update the player-gun mapping
  playerGunMap[randomPlayer] = randomGun;
  gunLine.innerText = `${randomPlayer} picks ${randomGun}`;
}

const maps = ["ascent", "pearl", "lotus", "haven", "bind", "fracture"];

// Add event listener to the "Pick random Map" button
let randomMapButton = document.getElementById("randomMap");
randomMapButton.addEventListener("click", pickRandomMap);

function pickRandomMap() {
  let randomMapIndex = Math.floor(Math.random() * maps.length);
  let randomMap = maps[randomMapIndex];
  let mapLineElement = document.getElementById("mapLine"); // Get mapLine element

  if (mapLineElement) {
    mapLineElement.querySelector("h4").textContent = randomMap;
  } else {
    console.error("mapLine element not found!");
  }
}
