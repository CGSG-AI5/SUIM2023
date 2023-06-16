function rndInit(vs, fs) {
  const canvas = document.getElementById("glCanvas");
  gl = canvas.getContext("webgl2");

  gl.clearColor(0.28, 0.47, 0.8, 1);

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  initCam();
  World = _matr4.identity();
  w = _matr4.mulmatr(_matr4.identity(), World);
  winv = _matr4.transpose(_matr4.inverse(w));
  WVP = _matr4.mulmatr(w, cam.MatrVP);

  let U = new Ubo_Matr(
    WVP,
    w,
    winv,
    cam.MatrVP,
    cam.MatrView,
    cam.Loc,
    cam.At,
    cam.Right,
    cam.Up,
    cam.Dir,
    _vec3.set(cam.ProjDist, cam.ProjFarClip, myTimer.localTime),
    _vec3.set(
      myTimer.globalTime,
      myTimer.globalDeltaTime,
      myTimer.localDeltaTime
    ),
    _vec3.set(cam.ProjSize, 1, 1)
  );

  CamUBO = UBO.add(U, "BaseData");

  shaderInit(vs, fs);
  initTetr();
  initCube();
  initHex();
  initIso();
  initTruTetr();
  initCubOct();
  initTruCub();
  initTruOct();
  initDod();
  initRhom();
}

function render() {
  gl.clearColor(0.28, 0.47, 0.8, 1);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  myTimer.response();
  renderCam();
  renderTetr();
  renderHex();
  renderCube();
  renderIso();
  renderDod();
  renderTruTetr();
  renderCubOct();
  renderTruCub();
  renderTruOct();
  renderRhom();
}
