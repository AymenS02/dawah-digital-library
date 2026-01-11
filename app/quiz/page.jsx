'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, CheckCircle, Loader2 } from 'lucide-react';
import { quizQuestions, calculateQuizScore, determineCategory, getLearningPreferences } from '../data/quizData';

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });

  const currentQuestion = quizQuestions[currentStep];
  const isLastQuestion = currentStep === quizQuestions.length - 1;

  const handleAnswer = (value) => {
    if (currentQuestion.multiple) {
      const current = answers[currentQuestion.id] || [];
      const newAnswers = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [currentQuestion.id]: newAnswers });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const canProceed = () => {
    if (currentQuestion.optional) return true;
    if (currentQuestion.multiple) {
      return (answers[currentQuestion.id] || []).length > 0;
    }
    return answers[currentQuestion.id] !== undefined;
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResults = () => {
    const scoreData = calculateQuizScore(answers);
    const categoryData = determineCategory(scoreData.percentage);
    const preferences = getLearningPreferences(answers);

    const resultsData = {
      ...scoreData,
      ...categoryData,
      preferences,
      answers
    };

    setResults(resultsData);
    setShowResults(true);
    setShowAccountPrompt(true);
  };

  const saveQuizResults = async (withAccount = false) => {
    setSaving(true);
    setSaveMessage({ type: '', text: '' });
    try {
      const token = localStorage.getItem('token');
      const isAuthenticated = !!token;

      const payload = {
        answers,
        score: results.percentage,
        category: results.category,
        isAnonymous: !isAuthenticated
      };

      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isAuthenticated && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        
        if (withAccount && !isAuthenticated) {
          // Store quiz data temporarily and redirect to register
          sessionStorage.setItem('pendingQuizResults', JSON.stringify(payload));
          router.push('/register?from=quiz');
        } else {
          // Show success message
          setSaveMessage({ type: 'success', text: 'Quiz results saved successfully!' });
          setShowAccountPrompt(false);
        }
      } else {
        setSaveMessage({ type: 'error', text: 'Failed to save quiz results. Please try again.' });
      }
    } catch (error) {
      console.error('Error saving quiz results:', error);
      setSaveMessage({ type: 'error', text: 'An error occurred while saving your results.' });
    } finally {
      setSaving(false);
    }
  };

  const handleContinueWithoutAccount = async () => {
    await saveQuizResults(false);
  };

  const handleCreateAccount = () => {
    saveQuizResults(true);
  };

  const handleViewRecommendedResources = () => {
    router.push(results.redirectPath);
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8 mt-42">
        <div className="max-w-4xl mx-auto">
          <div className="bg-foreground/5 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Quiz Complete!</h1>
              <p className="text-foreground/70 text-lg">Here are your results</p>
            </div>

            <div className="bg-primary/10 rounded-xl p-6 mb-8">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-primary mb-2">{results.percentage}%</div>
                <p className="text-foreground/70">Your Score</p>
              </div>
              
              <div className="border-t border-foreground/10 pt-6">
                <h2 className="text-2xl font-bold mb-3 text-center">{results.title}</h2>
                <p className="text-foreground/80 text-center">{results.description}</p>
              </div>
            </div>

            {saveMessage.text && (
              <div className={`rounded-xl p-4 mb-8 ${
                saveMessage.type === 'success' 
                  ? 'bg-green-500/10 border border-green-500/50 text-green-500' 
                  : 'bg-red-500/10 border border-red-500/50 text-red-500'
              }`}>
                <p className="text-center font-semibold">{saveMessage.text}</p>
              </div>
            )}

            {showAccountPrompt && (
              <div className="bg-foreground/5 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-center">Save Your Results</h3>
                <p className="text-foreground/70 text-center mb-6">
                  Create an account to save your quiz results and track your learning journey, or continue without an account.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleCreateAccount}
                    disabled={saving}
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-foreground rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                    Create Account
                  </button>
                  <button
                    onClick={handleContinueWithoutAccount}
                    disabled={saving}
                    className="px-6 py-3 bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-lg font-semibold transition-all disabled:opacity-50"
                  >
                    Continue Without Account
                  </button>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleViewRecommendedResources}
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-foreground rounded-lg font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto"
              >
                View Recommended Resources
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 mt-42 font-ovo">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-foreground/70">Question {currentStep + 1} of {quizQuestions.length}</span>
            <span className="text-sm text-foreground/70">{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-foreground/10 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-foreground/5 rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">{currentQuestion.question}</h2>
          
          {currentQuestion.type === 'text' ? (
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
              placeholder="Type your answer here (optional)..."
              className="w-full p-4 bg-foreground/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
            />
          ) : (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.multiple
                  ? (answers[currentQuestion.id] || []).includes(option.value)
                  : answers[currentQuestion.id] === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                      isSelected
                        ? 'bg-primary/20 border-primary'
                        : 'bg-foreground/5 border-foreground/10 hover:border-foreground/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-primary bg-primary' : 'border-foreground/30'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-foreground" />}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          
          {currentQuestion.optional && (
            <p className="text-sm text-foreground/50 mt-4">This question is optional</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-foreground rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLastQuestion ? 'View Results' : 'Next'}
            {!isLastQuestion && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
