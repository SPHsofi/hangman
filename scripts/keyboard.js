export class Keyboard {
  constructor(alphabet) {
    this.alphabet = alphabet;
    this.letter = '';
    this.keyboard = document.createElement('div');
    this.keyboard.className = 'letters';
  }

  createButton(letter) {
    const button = document.createElement('button');
    button.textContent = letter;
    button.className = "letter__btn ";
    
    this.keyboard.appendChild(button);
  }

  initializeButtons() {
    for (let i = 0; i < this.alphabet.length; i++) {
      this.createButton(this.alphabet[i]);
    }
  }

  handleKeyDown(event) {
    const key = event.key;
    if (this.alphabet.includes(key)) {
      this.inputField.value += key;
    }
  }

  renderKeyboard() {
    const section = document.createElement('section');
    section.className = 'keyboard__section section';
    section.append(this.keyboard);
    this.initializeButtons();
    return section;
  }
}

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';