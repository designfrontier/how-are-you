#!/usr/bin/env node

const questions = require('./questions.json');
const ques = require('1on1-questions');
const homedir = require('os').homedir();
const path = require('path');
const fs = require('fs');

const allQuestions = [].concat(questions, ques.map(q => q.question));

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const teammate = process.argv[2];

if (!teammate) {
  console.log(`please provide the name of your teammate like this:

    how-are-you <teammate-name>

Please don't include spaces in their name.`);
  process.exit(1);
}

try {
  const history = require(path.join(homedir, '.how-are-you.json'));
  if (typeof history[teammate] === 'undefined') {
    history[teammate] = [];
  }

  const q = allQuestions.filter(q => !history[teammate].includes(q))[getRandomInt(0, allQuestions.length - 1)];

  history[teammate].push(q);

  fs.writeFileSync(path.join(homedir, '.how-are-you.json'), `${JSON.stringify(history)}`)
  console.log(q);
} catch (_) {
  const qs = allQuestions[getRandomInt(0, allQuestions.length - 1)];
  fs.writeFileSync(path.join(homedir, '.how-are-you.json'), `{"${teammate}": ["${qs}"]}`);
  console.log(qs);
}
