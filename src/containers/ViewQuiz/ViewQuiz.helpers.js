/* eslint-disable import/prefer-default-export */
const wrongAnswerReactions = [
  'Oops! Wrong answer',
  "That wasn't it!",
  'NOPE!',
  "That's not the answer!",
  "That's wrong!",
  'Nah uh!',
  'DOH!',
];

export const getWrongAnswerReaction = () =>
  wrongAnswerReactions[Math.floor(Math.random() * wrongAnswerReactions.length)];
