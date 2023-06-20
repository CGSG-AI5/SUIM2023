import { prim, vertex } from "../rnd/prim.js";
import { _vec3 } from "../math/mathvec3.js";
import { material, Matlib } from "../rnd/res/material.js";
import { _matr4, D2R } from "../math/mathmat4.js";
import { myInput } from "../input.js";

import { Tex } from "../rnd/res/texture.js";
import { body } from "../physic/physic.js";
import { cam } from "../math/mathcam.js";

let Pr_sphere;

let V0 = 50;
let ball = [];
class Unit_obj {
  constructor(status, body) {
    this.status = status;
    this.body = body;
  }
}

export function initSphere() {
  let Vrts = [];
  let Ind = [];

  for (let i = 0, theta = Math.PI, k = 0; i < 50; i++, theta -= Math.PI / 49) {
    for (let j = 0, phi = 0; j < 50; j++, phi += (2 * Math.PI) / 49) {
      Vrts[k++] = new vertex(
        _vec3.set(
          Math.sin(theta) * Math.sin(phi),
          Math.cos(theta),
          Math.sin(theta) * Math.cos(phi)
        ),
        _vec3.set(
          Math.sin(theta) * Math.sin(phi),
          Math.cos(theta),
          Math.sin(theta) * Math.cos(phi)
        ),
        _vec3.set(
          5 * Math.sin(theta) * Math.sin(phi),
          5 * Math.cos(theta),
          5 * Math.sin(theta) * Math.cos(phi)
        ),
        _vec3.set(j / 49, i / 49, 0)
      );
    }
  }

  for (let k = 0, f = 0, i = 0; i < 49; i++, k++) {
    for (let j = 0; j < 49; j++, k++) {
      Ind[f++] = k;
      Ind[f++] = k + 1;
      Ind[f++] = k + 50;

      Ind[f++] = k + 51;
      Ind[f++] = k + 1;
      Ind[f++] = k + 50;
    }
  }

  let Mtl;
  Mtl = material.set(
    ...Matlib.Obsidian,
    [Tex.create("earth.jpg"), -1, -1, -1, -1, -1, -1, -1],
    0,
    "texture"
  );

  Pr_sphere = prim.create(
    Vrts,
    Vrts.length,
    Ind,
    Ind.length,
    material.add(Mtl)
  );
  ball.push(
    new Unit_obj(
      0,
      new body(
        1,
        0.25,
        _vec3.set(0, 0, 0),
        _vec3.set(0, 0, 0),
        _vec3.set(0, 0, 0),
        0
      )
    )
  );
}

export function renderSphere() {
  let Dist = _vec3.len(_vec3.sub(cam.At, cam.Loc));

  let cosT = (cam.Loc.y - cam.At.y) / Dist;
  let sinT = Math.sqrt(1 - cosT * cosT);

  let plen = Dist * sinT;
  let cosP = (cam.Loc.z - cam.At.z) / plen;
  let sinP = (cam.Loc.x - cam.At.x) / plen;

  let Azimuth = (Math.atan2(sinP, cosP) / Math.PI) * 180;

  let Elevator = (Math.atan2(sinT, cosT) / Math.PI) * 180;
  let Worl = _matr4.identity();

  ball.forEach((a, ind) => {
    if (myInput.Keys[87] && !a.status && a.ElevatorDrop != 0) {
      a.status = 1;
    }

    if (a.status == 0) {
      a.body.phi.x = Elevator;
      a.body.phi.y = Azimuth;
      a.body.omega = _vec3.set(-50, 0, 0);
      a.body.V.y = V0 * Math.cos(D2R(180 - Elevator));
      a.body.V.z = V0 * Math.sin(D2R(Elevator)) * Math.cos(D2R(a.body.phi.y));
      a.body.V.x = V0 * Math.sin(D2R(Elevator)) * Math.sin(D2R(a.body.phi.y));
      a.body.Pos = _vec3.set(cam.At.x, cam.At.y - 1, cam.At.z);
    } else if (a.status == 1) {
      a.body.kinematics_of_the_fall();
    }
    if (a.body.Pos.z < -38) {
      a.body.Pos.z = -38;
      // a.status = 2;
      a.body.direct_blow(_vec3.set(0, 0, 1));
    }
    if (a.body.Pos.x < -19) {
      a.body.Pos.x = -19;
      a.body.direct_blow(_vec3.set(1, 0, 0));
    }
    if (a.body.Pos.x > 17) {
      a.body.Pos.x = 17;
      a.body.direct_blow(_vec3.set(1, 0, 0));
    }

    if (a.body.Pos.y < -5) {
      a.body.Pos.y = -5;
      a.body.direct_blow(_vec3.set(0, 1, 0));
    }
    if (a.body.Pos.z > 0) {
      a.body.Pos.z = 0;
      a.body.direct_blow(_vec3.set(0, 0, -1));
    }
    //   if (a.V.x == 0 && a.V.z) {
    //     a.status = 3;
    //     ball.push(
    //       new Unit_obj(
    //         0,
    //         _vec3.set(V0, V0, V0),
    //         0,
    //         0,
    //         0,
    //         0,
    //         0,
    //         _vec3.set(0, 0, 0),
    //         0,
    //         0,
    //         0,
    //         0,
    //         0
    //       )
    //     );
    //   }
    // } else if (a.status == 3) {
    // }

    Worl = _matr4.mulmatr(
      _matr4.mulmatr(
        _matr4.rotateX(a.body.phi.x + 90),
        _matr4.mulmatr(
          _matr4.rotateZ(a.body.phi.z),
          _matr4.rotateY(a.body.phi.y)
        )
      ),
      _matr4.translate(a.body.Pos)
    );

    prim.draw(Pr_sphere, Worl);
  });
}
