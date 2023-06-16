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

fetchShader("./bin/vert.glsl").then((vert) => {
  fetchShader("./bin/frag.glsl").then((frag) => {
    rndInit(vert, frag);
    const draw = () => {
      render();
      window.requestAnimationFrame(draw);
    };
    draw();
  });
});
