import { prim, vertex } from "../rnd/prim.js";
import { _vec3 } from "../math/mathvec3.js";
import { material, Matlib } from "../rnd/res/material.js";
import { _matr4, D2R, R2D } from "../math/mathmat4.js";
import { myTimer } from "../timer.js";
import { myInput } from "../input.js";
import { cam } from "../math/mathcam.js";

let ball = [];
let Pr_tru_cub_oct;
let col = [1, Math.sqrt(2) + 1, 2 * Math.sqrt(2) + 1];
let V0 = 70,
  g = 18,
  Pos0;

class Unit_obj {
  constructor(
    status,
    V,
    ElevatorDrop,
    AzimuthDrop,
    S,
    H,
    Z,
    Pos,
    IsRefl,
    rotateX
  ) {
    this.status = status;
    this.V = V;
    this.ElevatorDrop = ElevatorDrop;
    this.AzimuthDrop = AzimuthDrop;
    this.S = S;
    this.H = H;
    this.Z = Z;
    this.Pos = Pos;
    this.IsRefl = IsRefl;
    this.rotateX = rotateX;
  }
  kinematics_of_the_fall() {
    this.Pos.y +=
      this.V * myTimer.globalDeltaTime -
      (g * myTimer.globalDeltaTime * myTimer.globalDeltaTime) / 2;
    this.V -= g * myTimer.globalDeltaTime;
    // this.rotateX =R2D(Math.acos(this.V / -V0))
    this.rotateX -= myTimer.globalDeltaTime * 1000;
    if (this.IsRefl) {
      this.Pos.z +=
        (V0 * Math.sin(D2R(this.ElevatorDrop)) * myTimer.globalDeltaTime) / 4;
    } else {
      this.Pos.z -=
        V0 * Math.sin(D2R(this.ElevatorDrop)) * myTimer.globalDeltaTime;
    }
    this.Pos.x -=
      V0 * Math.sin(D2R(this.AzimuthDrop)) * myTimer.globalDeltaTime;
  }
  return_to_a_stable_position() {
    let f = (this.rotateX - (this.rotateX % 45)) / 45;
    if (this.rotateX != f * 45) {
      if (this.rotateX + 3 < f * 45) {
        this.rotateX += myTimer.globalDeltaTime * 80 * Math.sign(this.rotateX);
      } else if (this.rotateX - 3 > f * 45) {
        this.rotateX -= myTimer.globalDeltaTime * 80 * Math.sign(this.rotateX);
      } else {
        this.rotateX = f * 45;
        this.Pos.y -= Math.abs(Math.cos(D2R(Math.abs(this.rotateX) + 45))) / 6;
      }
    }
  }
  intersection_sphere(ind) {
    for (let i = 0; i < ball.length; i++) {
      if (i != ind) {
        if (_vec3.len(_vec3.sub(this.Pos, ball[i].Pos)) < 2) {
          console.log(_vec3.len(_vec3.sub(this.Pos, ball[i].Pos)))
          return 1;

        }
      }
    }
    return 0;
  }
}
export function initTruCubOct() {
  let Vs = [];
  let Vr = [];

  for (let m = 0; m < 2; m++) {
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        col[0] *= m * 2 - 1;
        col[1] *= j * 2 - 1;
        col[2] *= i * 2 - 1;

        for (let l = 0; l < 3; l++) {
          for (let k = 0; k < 2; k++) {
            Vr[k + l * 2 + i * 6 + j * 12 + m * 24] = new vertex(
              _vec3.set(
                col[l],
                col[(l + k + 1) % 3],
                col[3 - ((l + k + 1) % 3) - l]
              ),
              _vec3.set((m + k + i) / 7, l / 2, k),
              _vec3.set(0, 0, 0),
              _vec3.set(0, 0, 0)
            );
          }
        }
        col[0] *= m * 2 - 1;
        col[1] *= j * 2 - 1;
        col[2] *= i * 2 - 1;
      }
    }
  }

  let indices = [
    /*hexagon 1*/

    42, 43, 44,

    45, 47, 46,

    45, 42, 47,

    42, 44, 47,

    /*hexagon 2*/

    30, 21, 22,

    35, 38, 37,

    30, 22, 35,

    35, 37, 30,

    /*hexagon 3*/

    32, 19, 18,

    41, 33, 40,

    33, 41, 32,

    33, 32, 18,

    /*hexagon 4*/

    20, 36, 23,

    23, 36, 39,

    23, 39, 34,

    20, 31, 36,

    /*square 1-3*/

    46, 22, 21,

    46, 21, 45,

    18, 19, 43,

    43, 42, 18,

    20, 23, 44,

    47, 44, 23,

    /*square 4-5*/

    40, 33, 9,

    9, 16, 40,

    41, 17, 32,

    8, 32, 17,

    /*square 6-7*/

    30, 37, 13,

    13, 6, 30,

    35, 14, 38,

    35, 11, 14,

    /*square 8-9*/

    36, 31, 12,

    31, 7, 12,

    34, 39, 10,

    10, 39, 15,

    /*hexagon 5*/

    13, 9, 6,

    13, 16, 9,

    16, 13, 26,

    16, 26, 29,

    /*hexagon 6*/

    10, 14, 11,

    14, 10, 15,

    15, 25, 14,

    25, 15, 24,

    /*hexagon 7*/

    17, 27, 8,

    17, 28, 27,

    27, 12, 8,

    12, 7, 8,

    /*sqaure 10-12*/

    2, 5, 26,

    5, 29, 26,

    27, 28, 4,

    3, 27, 4,

    0, 1, 25,

    25, 24, 0,

    /*hexagon 8*/

    0, 2, 1,

    3, 4, 5,

    0, 3, 5,

    0, 5, 2,

    /* octagon  1*/

    7, 20, 8,

    20, 19, 8,

    7, 31, 20,

    8, 19, 32,

    19, 44, 43,

    44, 19, 20,

    /* octagon  2*/

    6, 9, 33,

    18, 6, 33,

    6, 18, 30,

    42, 30, 18,

    30, 42, 45,

    45, 21, 30,

    /* octagon  3 */

    10, 11, 34,

    11, 35, 34,

    35, 23, 34,

    23, 35, 22,

    23, 22, 46,

    47, 23, 46,

    /*octagon  4*/

    1, 2, 25,

    26, 25, 2,

    14, 25, 26,

    26, 13, 14,

    38, 14, 13,

    38, 13, 37,

    /*octagon  5*/

    4, 28, 5,

    5, 28, 29,

    28, 17, 29,

    29, 17, 16,

    16, 17, 41,

    40, 16, 41,

    /*octagon  6*/

    3, 0, 24,

    3, 24, 27,

    24, 15, 27,

    12, 27, 15,

    12, 15, 39,

    39, 36, 12,
  ];

  for (let i = 0; i < indices.length; i++) {
    Vs[i] = vertex.create(Vr[indices[i]]);
  }
  for (let i = 0; i < indices.length; i++) {
    indices[i] = i;
  }

  for (let i = 0; i < indices.length / 3; i++) {
    prim.create_normal(Vs, i * 3);
  }

  let Mtl = material.set(
    ...Matlib.Turquoise,
    [-1, -1, -1, -1, -1, -1, -1, -1],
    0,
    "texture"
  );
  Pr_tru_cub_oct = prim.create(
    Vs,
    Vs.length,
    indices,
    indices.length,
    material.add(Mtl)
  );

  ball.push(new Unit_obj(0, V0, 0, 0, 0, 0, 0, _vec3.set(0, 0, 0), 0, 0));
}

export function renderTruCubOct() {
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
      a.rotateX = Elevator;
      a.ElevatorDrop = Elevator;
      a.AzimuthDrop = Azimuth;
      a.V = V0 * Math.cos(D2R(180 - Elevator));
      Worl = _matr4.mulmatr(
        _matr4.mulmatr(
          _matr4.scale(
            _vec3.set(
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2])),
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2])),
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2]))
            )
          ),
          _matr4.mulmatr(_matr4.rotateX(Elevator), _matr4.rotateY(Azimuth))
        ),
        _matr4.translate(_vec3.sub(cam.At, _vec3.set(0, 1, 0)))
      );
      a.Pos = _vec3.set(cam.At.x, cam.At.y - 1, cam.At.z);
    } else if (a.status == 1) {
      a.kinematics_of_the_fall();
      Worl = _matr4.mulmatr(
        _matr4.mulmatr(
          _matr4.scale(
            _vec3.set(
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2])),
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2])),
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2]))
            )
          ),
          _matr4.mulmatr(
            _matr4.rotateX(a.rotateX),
            _matr4.rotateY(a.AzimuthDrop)
          )
        ),
        _matr4.translate(a.Pos)
      );
      if (a.intersection_sphere(ind)) {
        a.status = 3;
        ball.push(new Unit_obj(0, V0, 0, 0, 0, 0, 0, _vec3.set(0, 0, 0), 0, 0));
      } else {
        if (a.Pos.z < -38) {
          a.status = 2;
          a.IsRefl = 1;
          a.rotateX /= 4;
        }
        if (a.Pos.x < -19) {
          a.Pos.x = -19;
          a.AzimuthDrop *= -1;
        }
        if (a.Pos.x > 17) {
          a.Pos.x = 17;
          a.AzimuthDrop *= -1;
        }

        if (a.Pos.y < -5) {
          a.Pos.y = -5;
          a.status = 2;
        }
      }
    } else if (a.status == 2) {
      a.kinematics_of_the_fall();
      Worl = _matr4.mulmatr(
        _matr4.mulmatr(
          _matr4.scale(
            _vec3.set(
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2])),
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2])),
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2]))
            )
          ),
          _matr4.mulmatr(
            _matr4.rotateX(-a.rotateX),
            _matr4.rotateY(-a.AzimuthDrop)
          )
        ),
        _matr4.translate(a.Pos)
      );
      if (a.Pos.y < -5) {
        a.Pos.y = -5;
        a.status = 3;
        ball.push(new Unit_obj(0, V0, 0, 0, 0, 0, 0, _vec3.set(0, 0, 0), 0, 0));
      }
      if (a.Pos.x < -19) {
        a.Pos.x = -19;
        a.AzimuthDrop *= -1;
      }
      if (a.Pos.x > 17) {
        a.Pos.x = 17;
        a.AzimuthDrop *= -1;
      }
    } else if (a.status == 3) {
      // a.return_to_a_stable_position();
      Worl = _matr4.mulmatr(
        _matr4.mulmatr(
          _matr4.scale(
            _vec3.set(
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2])),
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2])),
              1 / _vec3.len(_vec3.set(col[0], col[1], col[2]))
            )
          ),
          _matr4.mulmatr(
            _matr4.rotateX(-a.rotateX),
            _matr4.rotateY(-a.AzimuthDrop)
          )
        ),
        _matr4.translate(a.Pos)
      );
    }
    prim.draw(Pr_tru_cub_oct, Worl);
  });
}
