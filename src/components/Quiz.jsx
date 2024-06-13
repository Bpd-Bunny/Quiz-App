/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';

const Quiz = ({ questions }) => {
  const [quizStarted, setQuizStarted] = useState(() => {
    const savedState = localStorage.getItem('quizProgress');
    return savedState ? JSON.parse(savedState).quizStarted : false;
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedState = localStorage.getItem('quizProgress');
    return savedState ? JSON.parse(savedState).currentQuestionIndex : 0;
  });

  const [score, setScore] = useState(() => {
    const savedState = localStorage.getItem('quizProgress');
    return savedState ? JSON.parse(savedState).score : 0;
  });

  const [selectedOption, setSelectedOption] = useState(() => {
    const savedState = localStorage.getItem('quizProgress');
    return savedState ? JSON.parse(savedState).selectedOption : '';
  });

  const [userAnswers, setUserAnswers] = useState(() => {
    const savedState = localStorage.getItem('quizProgress');
    return savedState ? JSON.parse(savedState).userAnswers : [];
  });

  useEffect(() => {
    const quizProgress = {
      quizStarted,
      currentQuestionIndex,
      score,
      selectedOption,
      userAnswers,
    };
    localStorage.setItem('quizProgress', JSON.stringify(quizProgress));
  }, [quizStarted, currentQuestionIndex, score, selectedOption, userAnswers]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const isCorrect = selectedOption === correctAnswer;
    
    setUserAnswers([
      ...userAnswers,
      {
        question: questions[currentQuestionIndex].question,
        selectedOption,
        correctAnswer,
        isCorrect
      }
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedOption('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setSelectedOption('');
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption('');
    setUserAnswers([]);
    localStorage.removeItem('quizProgress');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto mt-4">
      {!quizStarted ? (
        <div className="text-center">
          <button
            onClick={startQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        currentQuestionIndex < questions.length ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{questions[currentQuestionIndex].question}</h2>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4"
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Your score is: {score} / {questions.length}</h2>
            <h3 className="text-lg font-bold mb-4">Review Your Answers</h3>
            {userAnswers.map((answer, index) => (
              <div key={index} className="mb-4 p-4 border rounded-md">
                <h4 className="text-md font-medium mb-2">{answer.question}</h4>
                <p className={`mb-1 ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  Your Answer: {answer.selectedOption}
                </p>
                {!answer.isCorrect && (
                  <p className="text-blue-600">Correct Answer: {answer.correctAnswer}</p>
                )}
              </div>
            ))}
            <button
              onClick={resetQuiz}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
            >
              Restart Quiz
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Quiz;
