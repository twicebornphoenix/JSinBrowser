const prop = ( data, name ) => data.map( item => item[ name ] ),
  summ = data => data.reduce(( total, value ) => total + value, 0 );

class SpriteGenerator {
  constructor( container ) {
    this.uploadButton = container.querySelector( '.sprite-generator__upload' );

    this.submitButton = container.querySelector( '.sprite-generator__generate' );
    this.imagesCountContainer = container.querySelector( '.images__added-count-value' );
    this.codeContainer = container.querySelector( '.sprite-generator__code' );
    this.imageElement = container.querySelector( '.sprite-generator__result-image' );
    this.images = [];

    this.imagesCount = 0;
    this.imgTypeRegExp = /^image\//;

    this.registerEvents();
  }
  registerEvents() {
    this.uploadButton.addEventListener('change', this.manageImgInfo.bind( this ));
    this.submitButton.addEventListener('click', this.arrangeImgThumb.bind( this ));
  }
  manageImgInfo(e) {
    const files = e.currentTarget.files;
    this.images.push(...files);
    this.showImgCount();
  }
  showImgCount() {
    this.imagesCountContainer.textContent = this.images.length;
  }
  generateSprite(cntr) {
    const cnvs = document.createElement('canvas');
    const cntxt = cnvs.getContext('2d');


    cnvs.width = cntr.children[1].width;
    cnvs.height = cntr.children[1].height;

    cntxt.drawImage(cnvs, cnvs.width, cnvs.height);

    const img = document.createElement('img');
    img.src = cnvs.toDataURL();
    img.addEventListener('load', e => {
      document.body.appendChild(img)
    })
  }
  arrangeImgThumb() {
    const container = this.imageElement.parentNode;
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.alignContent = 'flex-start'; 
    container.style.maxWidth = `610px`;
    container.style.paddingBottom = `5px`;

    const f = this.images.reduce( (f, img, i) => {
      if (this.imgTypeRegExp.test(img.type)) {

        const image = document.createElement('img');
        image.width = 50;
        image.height = 50;
        image.src = URL.createObjectURL(img);
        image.addEventListener('load', e => URL.revokeObjectURL(e.currentTarget.src));
        
        image.style.display = 'inline-block';
        image.style.margin = `5px 0px 0px 5px `;
        if (i === this.images.length - 1) {
          image.style.marginRight = `5px 5px 0px 5px`;
        }

        f.append(image);
      } 

      return f; 
    }, document.createDocumentFragment());
    
    this.imageElement.parentNode.appendChild(f);
    this.generateSprite(container);
  }
}

new SpriteGenerator( document.getElementById( 'generator' ));