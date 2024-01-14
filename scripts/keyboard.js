export class Keyboard {
  constructor(alphabet) {
    this.alphabet = alphabet;
    this.inputField = document.createElement('input');
    this.keyboard = document.createElement('div');
    this.keyboard.className = 'letters';
    this.initializeButtons();
    document.body.appendChild(this.inputField);
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  createButton(letter) {
    const button = document.createElement('button');
    button.textContent = letter;
    this.keyboard.appendChild(button);
    button.addEventListener('click', () => {
      this.inputField.value += letter;
    });
  }

  initializeButtons() {
    for (let i = 0; i < this.alphabet.length; i++) {
      this.createButton(this.alphabet[i]);
    }
  }

  handleKeyDown(event) {
    const key = event.key.toUpperCase();
    if (this.alphabet.includes(key)) {
      this.inputField.value += key;
    }
  }

  renderKeyboard() {
    const section = document.createElement('section');
    section.className = 'keyboard__section section';
    section.append(this.keyboard);
    return section;
  }
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const myKeyboard = new Keyboard(alphabet);
document.body.append(myKeyboard.renderKeyboard());