const webcamElement = document.getElementById('webcam');

async function initial() {
  console.log('載入模型...');
  document.getElementById('console').innerText = `載入模型...`
  this.net_style = await tf.loadGraphModel('https://reiinakano.com/arbitrary-image-stylization-tfjs/saved_model_style_js/model.json');
  this.net_tran = await tf.loadGraphModel('https://reiinakano.com/arbitrary-image-stylization-tfjs/saved_model_transformer_separable_js/model.json');
  console.log('Successfully loaded model');
  document.getElementById('console').innerText = `成功載入模型`
  this.style = document.getElementById('img_style');
	this.bottleneck = await tf.tidy(() => {
      return this.net_style.predict(tf.browser.fromPixels(this.style).toFloat().div(tf.scalar(255)).expandDims());
    })
	  console.log('成功計算bottleneck');
  document.getElementById('console').innerText = `成功計算bottleneck`
}
async function app() {
 document.getElementById('console').innerText = `轉換中...`
  // Load the model.
  //net = await tf.loadLayersModel('model.json');
  
  //this.target = document.getElementById('input').files[0];
  this.target = document.getElementById('img_target');
	const stylized = await tf.tidy(() => {
      return this.net_tran.predict([tf.browser.fromPixels(this.target).toFloat().div(tf.scalar(255)).expandDims(), bottleneck]).squeeze();
    })
    document.getElementById('console').innerText = `轉換完成!!!`
    await tf.browser.toPixels(stylized, this.stylized);
    //bottleneck.dispose();  // Might wanna keep this around
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
initial();
//app();