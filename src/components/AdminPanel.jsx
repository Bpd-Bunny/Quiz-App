/* eslint-disable react/prop-types */

import { useState } from 'react';

const AdminPanel = ({ addQuestion }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addQuestion({ question, options, correctAnswer });
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto mt-4">
            <h2 className="text-xl font-bold mb-4">Add a New Question</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                {options.map((option, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Option {index + 1}:</label>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Correct Answer:</label>
                    <select
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    >
                        <option value="" disabled>Select Correct Answer</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Question
                </button>
            </form>
        </div>
    );
};

export default AdminPanel;
