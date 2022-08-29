const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}
//  Passing Jocke to VoiceRSS API
function tellMe(joke) {
  // console.log("tell me", joke);
  VoiceRSS.speech({
    key: "1ee8441ff75b4266a967cdfcd8c7610b",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
//  Get jokes from Joke API

async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,sexist&type=single";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    //Text-to-speech
    tellMe(joke);

    // Disable Button
    toggleButton();
  } catch (error) {
    //Catch Errors Here
    console.log("Whoops", error);
  }
}
// Event Listners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
