import { CamSet, cam } from "../math/mathcam.js";
import { gl } from "./rnddata.js";
import { _vec3 } from "../math/mathvec3.js";
import { _matr4 } from "../math/mathmat4.js";
import { UBO, Ubo_Matr } from "./res/ubo.js";
import { myTimer } from "../timer.js";
import { shaderInit } from "./res/shader.js";
import { initCube, renderCube } from "../units/u_cube.js";
import { initCam, renderCam } from "../units/u_control.js";
import { initDod, renderDod } from "../units/Arhimed/u_dodecahedron.js";
import { initHex, renderHex } from "../units/Arhimed/u_hexahedron.js";
import { initIso, renderIso } from "../units/Arhimed/u_isocahedron.js";
import { initTetr, renderTetr } from "../units/u_tetraider.js";
import { initWall, renderWall } from "../units/u_wall.js";
import { initFloor, renderFloor } from "../units/u_floor.js";
import { initText, renderText } from "../units/u_text.js";
import { initWallLR, renderWallLR } from "../units/u_wall_LR.js";
import { initSphere, renderSphere } from "../units/u_sphere.js";

import {
  initTruCubOct,
  renderTruCubOct,
} from "../units/u_truncated_cuboctahedron.js";
export let CamUBO;

export function rndInit(s, n) {
  gl.clearColor(0.28, 0.47, 0.8, 1);

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  initCam();
  //CamSet(_vec3.set(0, 0, 10), _vec3.set(0, 0, 0), _vec3.set(0, 1, 0));
  let World = _matr4.identity();
  let w = _matr4.mulmatr(_matr4.identity(), World);
  let winv = _matr4.transpose(_matr4.inverse(w));
  let WVP = _matr4.mulmatr(w, cam.MatrVP);

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

  shaderInit(s, n);

  // initTetr();

  // initHex();
  // initIso();
  // // initTruTetr();
  // // initCubOct();
  // // initTruCub();
  // initTruOct();
  // initDod();
  // initRhom();
  initFloor();
  initWall();
  //initTruCubOct();
  initText();
  initSphere();
  initWallLR();
}

export function render() {
  gl.clearColor(0.28, 0.47, 0.8, 1);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  renderCam();
  // renderTetr();
  // renderHex();

  // renderIso();
  // renderDod();
  // renderTruTetr();
  // renderCubOct();
  //renderTruCub();
  //renderTruOct();
  // renderRhom();
  renderText();
  renderSphere();
  renderFloor();
  renderWall();
  //renderTruCubOct();

  //renderCube();
  renderWallLR();
}
