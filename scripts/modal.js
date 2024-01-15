export class Modal {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.className = 'modal';
    this.resetButton = null;
    
    document.body.append(this.modal);
  }

  // Метод для отображения модального окна
  renderModal(message, word) {
    const button = document.createElement('button');
    button.className = "restart__btn";
    button.textContent = "Start again?";
    this.resetButton = button;

    this.modal.innerHTML = `
      <h2 class = "message-modal">${message}</h2>
      <p class = "word-modal">The word was: ${word}</p>
    `;

    this.modal.append(button);
    this.modal.className = "modal-show";
    this.modal.querySelector(".restart__btn").addEventListener("click", () => {
      this.hideModal();
    });
  }

  renderEndModal(message, word) {
    const button = document.createElement('button');
    button.className = "restart__btn";
    button.textContent = "Start again";
    this.resetButton = button;

    this.modal.innerHTML = `
      <h2 class = "message-modal">${message}</h2>
      <p class = "word-modal">${word}</p>
    `;

    this.modal.append(button);
    this.modal.className = "modal-end";
    this.modal.querySelector(".restart__btn").addEventListener("click", () => {
      this.hideModal();
    });
  }

  // метод для вызова модального окна при выигрыше
  showWinModal(word) {
    this.renderModal("You've won!", word);
  }

  // метод для вызова модального окна при проигрыше
  showLoseModal(word) {
    this.renderModal("You've lost", word);
  }
  // метод для вывода окончания игры
  showEndModal() {
    this.renderEndModal("The game end", "Want restart?");
  }

  // Метод для скрытия модального окна
  hideModal() {
    this.modal.className = "modal";
  }
}