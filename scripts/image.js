export class Image {
  constructor(images) {
    this.img = images;
    this.imageBlock = 0;
    this.image = 0;
  }

  renderImage() {
    const imageBlock = document.createElement('section');
    imageBlock.className = "img__section section";

    const image = document.createElement('img');
    image.setAttribute('src', `./images/${this.img[0]}`);
    image.className = "gallows__img";

    this.imageBlock = imageBlock;
    this.image = image

    imageBlock.append(image);
    return imageBlock;
  }
}

export const images = ['gallows.png', 'head.png', 'body.png', 'hand-one.png', 'hand-two.png', 'leg-one.png', 'leg-two.png'];