let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
const minNumbOfCharacters = 4;

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value === '' || attempt.value === '') setHiddenFields();

    if (!validateInput(input.value)) {
      return false;
    } else {
      attempt.value = parseInt(attempt.value) + 1;
    }

    let results = getResults(input.value);
    if (results) {
      setMessage("You Win! :)");
      showAnswer(true);
      showReplay();
    } else if (!results && parseInt(attempt.value) >= 10) {
      setMessage("You Lose! :(");
      showAnswer(false);
      showReplay();
    } else {
      setMessage("Incorrect, try again.");
    }
}

//implement new functions here

// sets answer to a value between 0 and 9999
function setHiddenFields() {
  answer.value = Math.floor(Math.random()*10000).toString();
  while(answer.value.length < minNumbOfCharacters) {
    answer.value = '0' + answer.value;
  }
  attempt.value = 0;
}

function setMessage(message) {
  document.getElementById('message').innerHTML = message;
}

function validateInput(param) {
  if (param.length === minNumbOfCharacters) return true;
  else {
    message = "Guesses must be exactly " + minNumbOfCharacters + " characters long."
    setMessage(message);
    return false;
  }
}

function getResults(input) {
  let innerHTML = '<div class="row"><span class="col-md-6">'
                + input + '</span><div class="col-md-6">';
  let correctGuesses = 0;

  for (var i = 0; i < input.length; i++) {
    if (input[i] === answer.value[i]) {
      correctGuesses++;
      innerHTML += '<span class="glyphicon glyphicon-ok"></span>';
    } else if (answer.value.indexOf(input[i]) !== -1) {
      innerHTML += '<span class="glyphicon glyphicon-transfer"></span>';
    } else if (answer.value.indexOf(input[i]) === -1) {
      innerHTML += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }

  innerHTML += '</div></div>';
  document.getElementById('results').innerHTML = innerHTML;
  if (correctGuesses === input.length) return true;
  return false;
}

function showAnswer(success) {
  let code = document.getElementById('code');
  code.innerHTML = answer.value;
  code.className += success ? ' success' : ' failure';
}

function showReplay() {
  let guessingDiv = document.getElementById('guessing-div');
  let replayDiv = document.getElementById('replay-div');
  guessingDiv.style.display = 'none';
  replayDiv.style.display = 'block';
}
