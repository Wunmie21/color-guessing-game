// Predefined set of colors
const colors = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5",
  "#FFC300", "#C70039", "#900C3F", "#581845", "#1A5276", "#1E8449"
];

// DOM Elements
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelector('[data-testid="colorOptions"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

// Game Variables
let targetColor;
let score = 0; // Initialize score to 0

// Function to get a random color
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to initialize the game
function initializeGame() {
  // Reset game status
  gameStatus.textContent = "";

  // Set a new target color
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  // Clear previous color options
  colorOptions.innerHTML = "";

  // Generate 6 color options, one of which is the target color
  const options = [targetColor];
  while (options.length < 6) {
    const randomColor = getRandomColor();
    if (!options.includes(randomColor)) {
      options.push(randomColor);
    }
  }

  // Shuffle the options
  options.sort(() => Math.random() - 0.5);

  // Create buttons for each color option
  options.forEach(color => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.addEventListener("click", () => handleGuess(color));
    colorOptions.appendChild(button);
  });
}

// Function to handle a guess
function handleGuess(selectedColor) {
  if (selectedColor === targetColor) {
    gameStatus.textContent = "Correct! 🎉";
    gameStatus.style.color = "green";
    score++; // Increment the score
    scoreElement.textContent = `Score: ${score}`; // Update the score display
    setTimeout(initializeGame, 1000); // Start a new round after 1 second
  } else {
    gameStatus.textContent = "Wrong! Try again. 😢";
    gameStatus.style.color = "red";
  }
}

// Event listener for the New Game button
newGameButton.addEventListener("click", () => {
  score = 0; // Reset the score to 0
  scoreElement.textContent = `Score: ${score}`; // Update the score display
  initializeGame(); // Start a new game
});

// Initialize the game when the page loads
initializeGame();