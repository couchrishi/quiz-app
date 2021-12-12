import { nanoid } from "nanoid";

export function createQuiz(data) {
  const quizList = [];
  console.log(data);
  for (let i = 0; i < data.results.length; i++) {
    const choices = [];
    for (let j = 0; j < data.results[i].incorrect_answers.length; j++) {
      //const choices = data.results[i].incorrect_answers;

      choices.push({
        value: b64_to_utf8(data.results[i].incorrect_answers[j]),
        status: "unselected",
        id: nanoid(),
      });
    }

    choices.push({
      value: b64_to_utf8(data.results[i].correct_answer),
      status: "unselected",
      id: nanoid(),
    });
    const shuffledChoices = shuffle(choices);
    quizList.push({
      question: b64_to_utf8(data.results[i].question),
      choices: shuffledChoices,
      id: nanoid(),
      correctAnswer: b64_to_utf8(data.results[i].correct_answer),
      isOptionChosen: false,
    });
  }

  console.log(quizList);

  return quizList;
}

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function checkIncomplete(item) {
  return item.isOptionChosen === false;
}

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
