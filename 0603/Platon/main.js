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

fetchShader("./bin/shader/vert.glsl").then((vert) => {
  fetchShader("./bin/shader/frag.glsl").then((frag) => {
    rndInit(vert, frag);
    const draw = () => {
      render();
      window.requestAnimationFrame(draw);
    };
    draw();
  });
});
