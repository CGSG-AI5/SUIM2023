async function fetchShader(shaderURL) {
  try {
    const response = await fetch(shaderURL);
    const text = await response.text();
    console.log(text);
    return text;
  } catch (err) {
    console.log(err);
    array(err);
    return 0;
  }
}

let names = ['../bin/frag.glsl', '../bin/vert.glsl'];

Promise.all(names.map(u=>fetch(u))).then(responses =>
  Promise.all(responses.map(res => res.text()))
).then(texts => {

  rndInit(texts[1], texts[0]);
  const draw = () => {
    render();
    window.requestAnimationFrame(draw);
  };
  draw();
})