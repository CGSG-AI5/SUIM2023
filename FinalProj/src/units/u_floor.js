import { prim, vertex } from "../rnd/prim.js";
import { _vec3 } from "../math/mathvec3.js";
import { material, Matlib } from "../rnd/res/material.js";
import { _matr4 } from "../math/mathmat4.js";
import { myInput } from "../input.js";

let Pr_floor;

export function initFloor() {
  let Vrts = [];

  Vrts[0] = new vertex(
    _vec3.set(-1, -1, 5),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 1, 0)
  );
  Vrts[1] = new vertex(
    _vec3.set(1, -1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 1, 0)
  );
  Vrts[2] = new vertex(
    _vec3.set(1, -1, 5),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 1, 0)
  );
  Vrts[3] = new vertex(
    _vec3.set(-1, -1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 1, 0)
  );

  let indices = [
    0, 1, 2,

    1, 0, 3,
  ];
  let Mtl = material.MtlGetDef();
  Mtl = new material(
    _vec3.set(),
    _vec3.set(0.23125, 0.23125, 0.23125),
    _vec3.set(0.2775, 0.2775, 0.2775),
    _vec3.set(0.773911, 0.773911, 0.773911),
    9.8,
    1,
    [-1, -1, -1, -1, -1, -1, -1, -1]
  );
  Pr_floor = prim.create(
    Vrts,
    Vrts.length,
    indices,
    indices.length,
    material.add(Matlib.Ruby)
  );
}

export function renderFloor() {


  let Worl = _matr4.mulmatr(
    _matr4.scale(_vec3.set(10, 1, 10)),
    _matr4.translate(_vec3.set(0, -5, -25))
  );

  prim.draw(Pr_floor, Worl);
}