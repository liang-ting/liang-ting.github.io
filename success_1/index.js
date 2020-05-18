const webcamElement = document.getElementById('webcam');

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  //net = await tf.loadLayersModel('model.json');
  this.net_style = await tf.loadGraphModel('https://reiinakano.com/arbitrary-image-stylization-tfjs/saved_model_style_js/model.json');
  this.net_tran = await tf.loadGraphModel('https://reiinakano.com/arbitrary-image-stylization-tfjs/saved_model_transformer_separable_js/model.json');
  console.log('Successfully loaded model');
  
  this.target = document.getElementById('img_target');
  //this.target = document.getElementById('input').files[0];
  this.style = document.getElementById('img_style');
  
	let bottleneck = await tf.tidy(() => {
      return this.net_style.predict(tf.browser.fromPixels(this.style).toFloat().div(tf.scalar(255)).expandDims());
    })
	const stylized = await tf.tidy(() => {
      return this.net_tran.predict([tf.browser.fromPixels(this.target).toFloat().div(tf.scalar(255)).expandDims(), bottleneck]).squeeze();
    })
    await tf.browser.toPixels(stylized, this.stylized);
    bottleneck.dispose();  // Might wanna keep this around
    stylized.dispose();

  /*const webcam = await tf.data.webcam(webcamElement);
  while (true) {
    this.img = await webcam.capture();
	const stylized = await tf.tidy(() => {
      return this.net_tran.predict([tf.browser.fromPixels(this.img).toFloat().div(tf.scalar(255)).expandDims(), bottleneck]).squeeze();
    })
    await tf.browser.toPixels(stylized, this.stylized);
  console.log('sddddddddd');
    //stylized.dispose();

    // Dispose the tensor to release the memory.
    this.img.dispose();

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    await tf.nextFrame();
  }*/
}
function mouse_in5(){
	const curFile = document.getElementById('input').files[0]; // 透過 input 取得的 file object
	const objectURL = URL.createObjectURL(curFile);
	console.log(objectURL);

	//console.log(document.getElementById('input').files);
    document.getElementById("img_target").src=objectURL;
}

//app();