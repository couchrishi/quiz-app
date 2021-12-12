import React, { useCallback } from "react";
import "./App.css";

import Intro from "./components/Intro";
import Questions from "./components/Questions";
import Choice from "./components/Choice";
import { createQuiz, checkIncomplete } from "./utils.js";

export default function App() {
  const [hasStarted, setHasStarted] = React.useState(false);
  const [hasRestarted, setHasRestarted] = React.useState(false);
  const [quiz, setQuiz] = React.useState([
    {
      question: "",
      choices: [{ value: "", status: "unselected" }],
      id: "",
      correctAnswer: "",
      isOptionChosen: false,
    },
  ]);
  //const [incorrectCount, setIncorrectCount] = React.useState(0);
  const [result, setResult] = React.useState({
    status: "started",
    incorrectCount: 0,
  });

  function startQuiz() {
    setHasStarted((prevState) => !prevState);
  }

  function restartQuiz() {
    setHasRestarted((prevState) => !prevState);
  }

  React.useEffect(async () => {
    setResult({
      status: "started",
      incorrectCount: 0,
    });

    const res = await fetch(
      //"https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
      "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode=base64"
    );
    const data = await res.json();

    const quizData = createQuiz(data);

    setQuiz(quizData);
  }, [hasStarted, hasRestarted]);

  function clickHandler(qId, cId) {
    console.log("Clicked");
    const newQuiz = [...quiz];

    newQuiz.forEach((quizEl) => {
      if (quizEl.id === qId) {
        quizEl.choices.forEach((choice) => {
          //choice.selected = false;
          choice.status = "unselected";

          if (choice.id === cId) {
            //choice.selected = true;
            choice.status = "selected";
            quizEl.isOptionChosen = true;
          }
        });
      }
    });

    console.log(newQuiz);
    setQuiz(newQuiz);
  }

  // Construct the Quiz
  const quizElements = quiz.map((question) => {
    const choiceElements = question.choices.map((choice) => {
      return (
        <Choice
          choice={choice}
          handleClick={() => clickHandler(question.id, choice.id)}
          className="answer-option"
        />
      );
    });

    return (
      <div>
        <Questions question={question.question} qId={question.id} />
        <div className="answers">
          {choiceElements}
          <hr className="line-break"></hr>
        </div>
      </div>
    );
  });

  function checkAnswers() {
    console.log("Checking Answers...");
    const newQuiz = [...quiz];
    let wrongCount = 0;

    console.log("Incomplete or Not?", newQuiz.some(checkIncomplete));

    if (!newQuiz.some(checkIncomplete)) {
      newQuiz.forEach((quizEl) => {
        quizEl.choices.forEach((choice) => {
          if (
            choice.status === "unselected" &&
            quizEl.correctAnswer === choice.value
          ) {
            //choice.selected = true;
            choice.status = "unselectedCorrectAnswer";
            wrongCount += 1;
          }
        });
      });

      console.log(newQuiz);
      setQuiz(newQuiz);
      setResult({ status: "completed", incorrectCount: wrongCount });
    } else {
      //setQuiz(newQuiz);
      console.log("I'm inside false");
      setResult({ status: "incomplete", incorrectCount: wrongCount });
    }
  }

  // function checkAnswers() {
  //   console.log("Checking Answers...");
  //   const newQuiz = [...quiz];
  //   let wrongCount = 0;
  //   let isIncomplete = []];

  //   newQuiz.forEach((quizEl) => {
  //     if (quizEl.choices.every( (val, i, arr) => val.status === "unselected"))

  //   })

  //   newQuiz.forEach((quizEl) => {

  //     if (!quizEl.choices.every( (val, i, arr) => val.status === "unselected"))
  //         {
  //           quizEl.choices.forEach((choice) => {

  //               if (
  //                 choice.status === "unselected" &&
  //                 quizEl.correctAnswer === choice.value
  //               ) {
  //                 //choice.selected = true;
  //                 choice.status = "unselectedCorrectAnswer";
  //                 wrongCount += 1;
  //               }

  //           });
  //         }
  //       else {
  //         isIncomplete.push(false);
  //       }
  //   });

  //   console.log(newQuiz);
  //   setQuiz(newQuiz);
  //   setResult({ status: "completed", incorrectCount: wrongCount });
  // }

  // Render the main components of the website
  if (!hasStarted && !hasRestarted) {
    console.log("here");
    return <Intro callback={startQuiz} />;
  } else {
    return (
      <div className="quiz-questions">
        {quizElements}

        {result.status === "started" ? (
          <div className="check-answers-btn-started">
            <button className="check-answers-btn" onClick={checkAnswers}>
              Check Answers{" "}
            </button>
          </div>
        ) : result.status === "completed" ? (
          <div className="check-answers-btn-completed">
            <p className="result-desc">
              {" "}
              You scored {quiz.length - result.incorrectCount}/{quiz.length}{" "}
              correct answers
            </p>
            <button className="check-answers-btn" onClick={restartQuiz}>
              {" "}
              Play Again{" "}
            </button>
          </div>
        ) : (
          <div className="check-answers-btn-started">
            <p className="incomplete-desc">
              {" "}
              You have unanswered questions above
            </p>
            <button className="check-answers-btn" onClick={checkAnswers}>
              Check Answers{" "}
            </button>
          </div>
        )}
      </div>
    );
  }
}
