/* eslint-disable import/prefer-default-export */
const questions = [
  'What is my favorite type of food?',
  'Where is my favorite place to be kissed?',
  'What makes me feel shy?',
  'Who is my most disliked coworker?',
  'What was the name of my pet Cat growing up?',
  'Where did I go to High School?',
  'What is my favorite restaurant?',
  "If money wasn't an issue, what city would I live in?",
  'What is my favorite movie?',
  'Who is my favorite musician?',
  'What annoys me?',
  'What are my favorite pizza topings?',
  "What's something I do that I hate?",
  'How many cups of coffee do I have per day?',
  "What's my fondest childhood memory?",
  'How good am I at opening jars?',
  "What's something I'd like to learn?",
  'What was the name of my first crush?',
  "What's my favorite beverage?",
  'What genre of music do I find completely intolerable?',
];
const mult = questions.length - 1;

export const getRandomQuestion = () =>
  questions[Math.round(Math.random() * mult)];
