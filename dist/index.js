#! /usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import words from './words.json' assert { type: "json" };
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';
program.command('words')
    .description('Start the "Arrange the Words" Game!')
    .action(fn_words)
    .aliases(['word', 'w']);
program.command('sentences')
    .description('Start the "Arrange the Sentences" Game!')
    .action(fn_sentences)
    .aliases(['sentence', 's']);
function fn_words() {
    const randomWord = words['words'][Math.floor(Math.random() * words['words'].length)];
    const letters = randomWord.split('')
        .sort(() => Math.random() - 0.5)
        .join('');
    const rl = readline.createInterface({ input, output });
    rl.question(chalk.yellow(`Scrambled Word: ${chalk.green(letters)}.\nYour Guess: `), (answer) => {
        if (answer === randomWord)
            console.log(chalk.green('Yay! You won!'));
        else
            console.log(chalk.red(`Oops! Wrong Guess! Better luck next time. The correct answer was ${chalk.green(`"${randomWord}"`)}`));
        rl.close();
    });
}
function fn_sentences() {
    const randomSentence = words['sentences'][Math.floor(Math.random() * words['sentences'].length)];
    const wordss = randomSentence.split(' ')
        .sort(() => Math.random() - 0.5)
        .join(' ')
        .split(' ');
    const rl = readline.createInterface({ input, output });
    rl.question(chalk.yellow(`Scrambled Sentence: ${chalk.green(wordss.join(' '))}.\nYour Guess: `), (answer) => {
        if (answer === randomSentence)
            console.log(chalk.green('Yay! You won!'));
        else
            console.log(chalk.red(`Wrong Guess! Try again. The correct answer was ${chalk.green(`"${randomSentence}"`)}`));
        rl.close();
    });
}
program.parse();
