import { useState } from 'react';
import AdminPanel from './components/AdminPanel';
import Quiz from './components/Quiz';

const App = () => {
  const [questions, setQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem('quizQuestions');
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });

  const addQuestion = (question) => {
    const updatedQuestions = [...questions, question];
    setQuestions(updatedQuestions);
    localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Quiz App</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <AdminPanel addQuestion={addQuestion} />
        </div>
        <div className="md:w-1/2">
          <Quiz questions={questions} />
        </div>
      </div>
    </div>
  );
};

export default App;
