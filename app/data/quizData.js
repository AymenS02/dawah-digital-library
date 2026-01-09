// Quiz questions and scoring configuration
export const quizQuestions = [
  {
    id: 'q1',
    question: 'How familiar are you with Islam?',
    weight: 3, // Higher weight for more important questions
    options: [
      { value: 'muslim-practicing', label: 'I am Muslim and practice Islam', score: 10 },
      { value: 'muslim-learning', label: 'I am Muslim but still learning or struggling', score: 8 },
      { value: 'revert', label: 'I recently accepted Islam', score: 5 },
      { value: 'curious', label: 'I am not Muslim but curious about Islam', score: 2 },
      { value: 'not-religious', label: 'I am not religious or unsure what I believe', score: 0 }
    ]
  },
  {
    id: 'q2',
    question: 'Which statement best describes your belief about God?',
    weight: 2,
    options: [
      { value: 'one-god', label: 'I believe in one God', score: 10 },
      { value: 'higher-power', label: 'I believe in a higher power but not a specific religion', score: 5 },
      { value: 'many-gods', label: 'I believe in many gods', score: 2 },
      { value: 'unsure', label: 'I am unsure what I believe', score: 1 },
      { value: 'no-god', label: 'I do not believe in God', score: 0 }
    ]
  },
  {
    id: 'q3',
    question: 'How do you currently view religion?',
    weight: 1,
    options: [
      { value: 'divine-guidance', label: 'Divine guidance from God', score: 10 },
      { value: 'helpful', label: 'Helpful but not necessary', score: 5 },
      { value: 'man-made', label: 'Man-made or outdated', score: 2 },
      { value: 'confusing', label: 'Confusing or contradictory', score: 1 },
      { value: 'never-thought', label: "I've never really thought about it", score: 0 }
    ]
  },
  {
    id: 'q4',
    question: 'Have you ever read or listened to the Qur\'an?',
    weight: 1,
    options: [
      { value: 'regularly', label: 'Yes, regularly', score: 10 },
      { value: 'little', label: 'Yes, a little', score: 7 },
      { value: 'parts', label: 'Only parts or quotes', score: 4 },
      { value: 'never', label: 'No, never', score: 0 }
    ]
  },
  {
    id: 'q5',
    question: 'What are you mainly looking for right now?',
    weight: 2,
    options: [
      { value: 'strengthen-faith', label: 'Strengthening my faith', score: 10 },
      { value: 'basics', label: 'Learning the basics of Islam', score: 6 },
      { value: 'comparison', label: 'Understanding Islam compared to other beliefs', score: 3 },
      { value: 'purpose', label: 'Finding purpose or spiritual truth', score: 2 },
      { value: 'doubts', label: 'Addressing doubts or misconceptions', score: 4 }
    ]
  },
  {
    id: 'q6',
    question: 'If you have questions or doubts, what are they mostly about? (Select all that apply)',
    weight: 1,
    multiple: true,
    options: [
      { value: 'existence-god', label: 'Existence of God', score: 0 },
      { value: 'true-religion', label: 'Why Islam claims to be the true religion', score: 3 },
      { value: 'other-religions', label: 'Other religions (Christianity, Judaism, Hinduism, etc.)', score: 2 },
      { value: 'spirituality', label: 'Spirituality without religion', score: 1 },
      { value: 'practices', label: 'Islamic practices or rulings', score: 7 },
      { value: 'no-doubts', label: "I don't have doubts right now", score: 10 }
    ]
  },
  {
    id: 'q7',
    question: 'How long have you been Muslim (if applicable)?',
    weight: 2,
    options: [
      { value: 'born-muslim', label: 'Born Muslim', score: 10 },
      { value: 'revert-1year', label: 'Revert (less than 1 year)', score: 5 },
      { value: 'revert-1-5years', label: 'Revert (1–5 years)', score: 6 },
      { value: 'revert-5plus', label: 'Revert (5+ years)', score: 8 },
      { value: 'not-muslim', label: 'Not Muslim', score: 0 }
    ]
  },
  {
    id: 'q8',
    question: 'How do you prefer to learn?',
    weight: 0, // Preference questions don't affect category
    options: [
      { value: 'articles', label: 'Short articles', score: 0 },
      { value: 'videos', label: 'Videos or lectures', score: 0 },
      { value: 'guides', label: 'Step by step guides', score: 0 },
      { value: 'qa', label: 'Question and answer format', score: 0 },
      { value: 'not-sure', label: 'Not sure', score: 0 }
    ]
  },
  {
    id: 'q9',
    question: 'What style of explanation do you prefer?',
    weight: 0, // Preference questions don't affect category
    options: [
      { value: 'simple', label: 'Very simple and beginner-friendly', score: 0 },
      { value: 'balanced', label: 'Balanced and explanatory', score: 0 },
      { value: 'direct', label: 'Direct and evidence-based', score: 0 },
      { value: 'detailed', label: 'Detailed and in-depth', score: 0 }
    ]
  },
  {
    id: 'q10',
    question: 'Is there a specific topic or question you\'re looking for?',
    optional: true,
    type: 'text'
  }
];

// Calculate the quiz score
export function calculateQuizScore(answers) {
  let totalScore = 0;
  let maxPossibleScore = 0;

  quizQuestions.forEach(question => {
    if (question.weight > 0) {
      if (question.multiple) {
        // For multiple choice questions, average the selected options
        const selectedAnswers = answers[question.id] || [];
        if (selectedAnswers.length > 0) {
          const scores = selectedAnswers.map(value => {
            const option = question.options.find(opt => opt.value === value);
            return option ? option.score : 0;
          });
          const avgScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;
          totalScore += avgScore * question.weight;
        }
        maxPossibleScore += 10 * question.weight;
      } else {
        // For single choice questions
        const answer = answers[question.id];
        if (answer) {
          const option = question.options.find(opt => opt.value === answer);
          if (option) {
            totalScore += option.score * question.weight;
          }
        }
        maxPossibleScore += 10 * question.weight;
      }
    }
  });

  // Calculate percentage score
  const percentageScore = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

  return {
    rawScore: totalScore,
    maxScore: maxPossibleScore,
    percentage: Math.round(percentageScore)
  };
}

// Determine the category based on score
export function determineCategory(scorePercentage) {
  if (scorePercentage >= 70) {
    return {
      category: 'muslim',
      title: 'Muslim Resources',
      description: 'Based on your responses, we recommend exploring our resources for practicing Muslims to strengthen your faith and knowledge.',
      redirectPath: '/muslim'
    };
  } else if (scorePercentage >= 35) {
    return {
      category: 'revert',
      title: 'Revert Resources',
      description: 'Based on your responses, we recommend starting with our resources for new Muslims and reverts to build a strong foundation.',
      redirectPath: '/revert'
    };
  } else {
    return {
      category: 'non-muslim',
      title: 'Non-Muslim Resources',
      description: 'Based on your responses, we recommend exploring our introductory resources to learn about Islam and its core beliefs.',
      redirectPath: '/non-muslim'
    };
  }
}

// Get learning preferences
export function getLearningPreferences(answers) {
  return {
    learningStyle: answers.q8 || 'not-sure',
    explanationStyle: answers.q9 || 'balanced',
    specificTopic: answers.q10 || ''
  };
}
