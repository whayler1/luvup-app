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
  'What is my opinion of the Lord of the Rings movie franchise?',
  "What is my favorite vacation I've ever been on?",
  'How do I react to mice in my bedroom?',
  'How many times a day do I shower?',
  'What is my favorite kind of pasta?',
  'How clean of a person am I?',
  'How often do I floss?',
  'What books have I read this year?',
  "What is my favorite 90's movie?",
  'Where do I like to be tickled?',
  'How much walking do I do on an average day?',
];
const mult = questions.length - 1;

export const getRandomQuestion = () =>
  questions[Math.round(Math.random() * mult)];
