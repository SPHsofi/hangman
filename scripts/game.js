import { words } from "./words.js"
import { Modal } from "./modal.js";
import { Image, images } from "./image.js";
import { Keyboard, alphabet } from "./keyboard.js";

export class Game {
  constructor(gameArr, modal, img, keyboard) {
    this.game = gameArr;
    this.modal = modal;
    this.img = img;
    this.keyboard = keyboard;
    this.app = null;
    this.field = null;
    this.question = '';
    this.counter = null;
    this.answer = [];
    this.countError = 0;
    this.riddle = '';
    this.title = null;
  }

  // Создание основной секции.
  createApp() {
    const app = document.createElement('section');
    app.className = 'game__section section';
    this.app = app;
    return app;
  }

  // создание счетчика ошибок
  createCountError() {
    const p = document.createElement('p');
    p.textContent = `You have attempts left: ${this.countError} / 6`;
    p.className = 'error-counter';
    this.counter = p;
    return p;
  }

  // метод для определения рандомного слова и соответствующего вопроса
  createEmptyField() {
    const randomIndex = this.game[Math.floor(Math.random() * this.game.length)];
    this.question = randomIndex.word;
    this.riddle = randomIndex.question;

    //  const letterValue = gameKeyboard.letter; // получаем значение из переменной this.letter
    // console.log(letterValue);
    console.log(`Ответ - ${this.question}`);

    this.answer = new Array(this.question.length).fill('_')
    this.field.innerHTML = ''

    for (let i = 0; i < this.question.length; i++) {
      const span = document.createElement('span');
      span.textContent = '_';
      span.className = 'letter__span';
      this.field.append(span);
    }
  }

  // Создание области для загаданного слова.
  createField() {
    const field = document.createElement('div');
    field.className = 'answer';
    this.field = field;
    return field;
  }

  // метод для счетчика ошибок
  increaseError() {
    this.countError++;
    this.counter.textContent = `You have attempts left: ${this.countError} / 6`;
  }

  // метод для обновления поля ответа
  updateField() {
    // let letters = this.answer.map((letter) => `<span>${letter}</span>`).join('');
    const spans = document.querySelectorAll('span');
    spans.forEach((span, i) => {
      if (this.answer[i] !== span.textContent) {
        span.textContent = this.answer[i];
      }
    })
  }

  updateImgSrc() {
    this.img.image.setAttribute('src', `./images/${this.img.img[this.countError]}`);
  }

  renderApp() {
    document.body.append(this.keyboard.renderKeyboard());
    document.body.append(this.img.renderImage());
    const app = this.createApp();
    app.append(this.createField());
    this.createEmptyField();
    app.append(this.createQuestion());
    app.append(this.createCountError());
    document.body.append(app);

    this.inputLetter();
  }

  // обновление контента
  reset() {
    this.countError = 0;
    this.counter.textContent = `You have attempts left: ${this.countError} / 6`;
    this.createEmptyField();
    this.updateTitle();
  }

  // создание области для вопроса
  createQuestion() {
    const questionBlock = document.createElement('h1');
    questionBlock.textContent = this.riddle;
    questionBlock.className = 'question';
    this.title = questionBlock;
    document.body.append(questionBlock);
    return questionBlock;
  }

  updateTitle() {
    this.title.textContent = this.riddle;
  }

  checkLetter(letter) {
    const key = letter;
    if (key.length > 1) {
      return;
    }

    if (this.countError >= 5) {
      this.modal.showLoseModal(this.question);
      this.modal.resetButton.addEventListener('click', (e) => {
        this.reset();
      })
    }

    if (!this.question.includes(key)) {
      this.increaseError();
      this.updateImgSrc();
      return;
    }

    for (let i = 0; i < this.question.length; i++) {
      if (this.question[i] === key) {
        this.answer[i] = key;
      }
    }

    this.updateField()

    if (!this.answer.includes('_')) {
      this.modal.showWinModal(this.question);
      this.modal.resetButton.addEventListener('click', (e) => {
        this.reset();
      })
    }
  }

  inputLetter() {
    const buttonsLetter = document.querySelectorAll('.letter__btn ');

    buttonsLetter.forEach((button) => {
      button.addEventListener('click', (event) => {
        const letter = event.target.textContent;
        this.checkLetter(letter);
      })
    })

    document.body.addEventListener('keydown', (e) => {
      this.checkLetter(e.key.toUpperCase());
    })
  }
}

const game = new Game(words, new Modal(), new Image(images), new Keyboard(alphabet));
game.renderApp();

document.body.appendChild(game.app);