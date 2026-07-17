import React, { useState } from 'react';
import { initialMethods } from './data/methods';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import MethodCard from './components/MethodCard';
import AddMethodForm from './components/AddMethodForm';

export default function App() {
  const [methods, setMethods] = useState(initialMethods);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizRecommendation, setQuizRecommendation] = useState(null);

  const quizQuestions = [
    {
      question: "What is your biggest struggle right now?",
      options: [
        { text: "Staying focused without getting distracted", value: "Focus" },
        { text: "Forgetting things too quickly", value: "Memory" },
        { text: "Procrastinating and running out of time", value: "Productivity" },
        { text: "Struggling to wrap my head around complex topics", value: "Understanding" }
      ]
    },
    {
      question: "How much time do you want to spend in a single session?",
      options: [
        { text: "Short bursts (under 25 mins)", value: "short" },
        { text: "Medium blocks (30-45 mins)", value: "medium" },
        { text: "Deep dive focus sessions (45+ mins)", value: "long" }
      ]
    },
    {
      question: "What type of learner are you?",
      options: [
        { text: "Action-oriented (I like doing & testing myself)", value: "active" },
        { text: "Visual or structural (I like maps & schedules)", value: "visual" }
      ]
    }
  ];

  const handleAnswerSelect = (value) => {
    const updatedAnswers = [...quizAnswers, value];
    setQuizAnswers(updatedAnswers);

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const preferredCategory = updatedAnswers[0];
      const matchingMethods = methods.filter(m => m.category === preferredCategory);
      const finalPick = matchingMethods.length > 0 
        ? matchingMethods[Math.floor(Math.random() * matchingMethods.length)]
        : methods[0];

      setQuizRecommendation(finalPick);
      setCurrentQuestion(quizQuestions.length);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setQuizAnswers([]);
    setQuizRecommendation(null);
  };

  const filteredMethods = methods.filter((method) => {
    const matchesSearch = method.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || method.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddMethod = (newMethod) => {
    setMethods((prevMethods) => [newMethod, ...prevMethods]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎓 Study Methods Finder</h1>
        <p>Discover optimized cognitive techniques tailored for your learning style.</p>
      </header>

      <section className="quiz-section">
        {!quizStarted ? (
          <div className="quiz-intro-card">
            <h2>Not sure which study method is right for you?</h2>
            <p>Take our quick 3-question quiz to find your perfect match!</p>
            <button className="quiz-start-btn" onClick={() => setQuizStarted(true)}>
              Start Match Quiz
            </button>
          </div>
        ) : (
          <div className="quiz-container">
            <div className="quiz-header">
              <span className="quiz-score-live">Study Style Quiz</span>
              {currentQuestion < quizQuestions.length && (
                <span className="quiz-progress">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
              )}
            </div>

            {currentQuestion < quizQuestions.length ? (
              <div className="quiz-question-section">
                <h4 className="quiz-question-text">{quizQuestions[currentQuestion].question}</h4>
                <div className="quiz-options-list">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button 
                      key={index} 
                      className="quiz-option-btn"
                      onClick={() => handleAnswerSelect(option.value)}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="quiz-results-summary">
                <h4 className="quiz-results-title">Your Perfect Match Is:</h4>
                {quizRecommendation ? (
                  <div style={{ margin: '1.5rem 0', textAlign: 'left' }}>
                    <MethodCard method={quizRecommendation} />
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>
                    We couldn't generate a specific match. Check out the full list below!
                  </p>
                )}
                <button className="quiz-restart-btn" onClick={resetQuiz}>
                  🔄 Retake Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      <main className="app-content">
        <div className="controls-section">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        </div>

        <div className="results-count">
          Showing {filteredMethods.length} {filteredMethods.length === 1 ? 'method' : 'methods'}
        </div>

        {filteredMethods.length === 0 ? (
          <div className="no-results" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            <p>No study methods found. Try another keyword or filter criteria.</p>
          </div>
        ) : (
          <div className="methods-grid">
            {filteredMethods.map((method) => (
              <MethodCard key={method.id} method={method} />
            ))}
          </div>
        )}

        <AddMethodForm onAddMethod={handleAddMethod} />
      </main>
    </div>
  );
}