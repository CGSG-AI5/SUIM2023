import { prim, vertex } from "../rnd/prim.js";
import { _vec3 } from "../math/mathvec3.js";
import { material, Matlib } from "../rnd/res/material.js";
import { _matr4, D2R, R2D} from "../math/mathmat4.js";
import { myTimer } from "../timer.js";
import { myInput } from "../input.js";
import { cam } from "../math/mathcam.js";

let Pr_cube;
let V0 = 40, V = 15, g = 9.8, S = 0, H = 0, Pos0, Z = 0, ElevatorDrop = 0, AzimuthDrop = 0, ElevatorDropR = 0;
let flag = 0;

export function initCube() {
  let Vrts = [];
  Vrts[0] = new vertex(
    _vec3.set(-1, 1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 0, 1)
  );
  Vrts[1] = new vertex(
    _vec3.set(-1, -1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 0, 1)
  );
  Vrts[2] = new vertex(
    _vec3.set(1, 1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 0, 1)
  );
  Vrts[3] = new vertex(
    _vec3.set(1, -1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 0, 1)
  );

  Vrts[4] = new vertex(
    _vec3.set(-1, 1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(-1, 0, 0)
  );
  Vrts[5] = new vertex(
    _vec3.set(-1, -1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(-1, 0, 0)
  );
  Vrts[6] = new vertex(
    _vec3.set(-1, 1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(-1, 0, 0)
  );
  Vrts[7] = new vertex(
    _vec3.set(-1, -1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(-1, 0, 0)
  );

  Vrts[8] = new vertex(
    _vec3.set(-1, 1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 0, -1)
  );
  Vrts[9] = new vertex(
    _vec3.set(-1, -1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 0, -1)
  );
  Vrts[10] = new vertex(
    _vec3.set(1, 1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 0, -1)
  );
  Vrts[11] = new vertex(
    _vec3.set(1, -1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 0, -1)
  );

  Vrts[12] = new vertex(
    _vec3.set(1, 1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(1, 0, 0)
  );
  Vrts[13] = new vertex(
    _vec3.set(1, -1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(1, 0, 0)
  );
  Vrts[14] = new vertex(
    _vec3.set(1, 1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(1, 0, 0)
  );
  Vrts[15] = new vertex(
    _vec3.set(1, -1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(1, 0, 0)
  );

  Vrts[16] = new vertex(
    _vec3.set(-1, 1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 1, 0)
  );
  Vrts[17] = new vertex(
    _vec3.set(1, 1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 1, 0)
  );
  Vrts[18] = new vertex(
    _vec3.set(-1, 1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 1, 0)
  );
  Vrts[19] = new vertex(
    _vec3.set(1, 1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, 1, 0)
  );

  Vrts[20] = new vertex(
    _vec3.set(-1, -1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, -1, 0)
  );
  Vrts[21] = new vertex(
    _vec3.set(1, -1, 1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, -1, 0)
  );
  Vrts[22] = new vertex(
    _vec3.set(-1, -1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, -1, 0)
  );
  Vrts[23] = new vertex(
    _vec3.set(1, -1, -1),
    _vec3.set(0.47, 0.3, 0.27),
    _vec3.set(0, -1, 0)
  );

  let indices = [
    0, 1, 2,

    2, 3, 1,

    4, 5, 6,

    5, 6, 7,

    8, 9, 10,

    10, 9, 11,

    12, 13, 14,

    13, 14, 15,

    12, 13, 14,

    16, 17, 18,

    17, 18, 19,

    20, 21, 22,

    21, 22, 23,
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
  Pr_cube = prim.create(
    Vrts,
    Vrts.length,
    indices,
    indices.length,
    material.add(Matlib.Gold)
  );
}

export function renderCube() {
    
  let Dist = _vec3.len(_vec3.sub(cam.At, cam.Loc));

  let cosT = (cam.Loc.y - cam.At.y) / Dist;
  let sinT = Math.sqrt(1 - cosT * cosT);

  let plen = Dist * sinT;
  let cosP = (cam.Loc.z - cam.At.z) / plen;
  let sinP = (cam.Loc.x - cam.At.x) / plen;

  let Azimuth = (Math.atan2(sinP, cosP) / Math.PI) * 180;


  let Elevator = (Math.atan2(sinT, cosT) / Math.PI) * 180;
  let Worl = _matr4.identity();

  if (myInput.Keys[87] && !flag) {flag = 1}

  if (flag == 0){
    
    ElevatorDrop = ElevatorDropR = Elevator;
    AzimuthDrop = Azimuth;
    S = 0;
    H = 0;
    V = V0 * Math.cos(D2R(180 - Elevator));
    Z = 0;
    Worl = _matr4.mulmatr(
      _matr4.mulmatr(
      _matr4.scale(
        _vec3.set(
          1 / _vec3.len(_vec3.set(1, 1, 1)),
          2 / _vec3.len(_vec3.set(1, 1, 1)),
          1 / _vec3.len(_vec3.set(1, 1, 1))
        )
      ),
      _matr4.mulmatr(_matr4.rotateX(Elevator), _matr4.rotateY(Azimuth))),_matr4.translate(cam.At)
    );
    Pos0 = _vec3.set(cam.At.x, cam.At.y, cam.At.z)
  }
  else if (flag == 1){
    H += V * myTimer.globalDeltaTime - g * myTimer.globalDeltaTime * myTimer.globalDeltaTime / 2;  
    V -= g * myTimer.globalDeltaTime;
    S += V0 * Math.sin(D2R(ElevatorDrop)) * myTimer.globalDeltaTime; 
    Z += V0 * Math.sin(D2R(AzimuthDrop)) * myTimer.globalDeltaTime;
    console.log(R2D(Math.atan2(V, V0)) + ":" + R2D(Math.acos(V / -V0)) + ":" + ElevatorDrop)
    Worl = _matr4.mulmatr(
      _matr4.mulmatr(
      _matr4.scale(
        _vec3.set(
          1 / _vec3.len(_vec3.set(1, 1, 1)),
          2 / _vec3.len(_vec3.set(1, 1, 1)),
          1 / _vec3.len(_vec3.set(1, 1, 1))
        )
      ), _matr4.mulmatr(_matr4.rotateX(R2D(Math.acos(V / -V0))), _matr4.rotateY(AzimuthDrop))), _matr4.translate(_vec3.add(_vec3.set(-Z, H, -S), Pos0))
    );
    if (H < -10  || S > 40) {flag = 2}
  }
  else{
    H += V * myTimer.globalDeltaTime - g * myTimer.globalDeltaTime * myTimer.globalDeltaTime / 2;  
    V -= g * myTimer.globalDeltaTime;
    S -= V0 * Math.sin(D2R(ElevatorDrop)) * myTimer.globalDeltaTime; 
    Z += V0 * Math.sin(D2R(AzimuthDrop)) * myTimer.globalDeltaTime;
    Worl = _matr4.mulmatr(
      _matr4.mulmatr(
      _matr4.scale(
        _vec3.set(
          1 / _vec3.len(_vec3.set(1, 1, 1)),
          2 / _vec3.len(_vec3.set(1, 1, 1)),
          1 / _vec3.len(_vec3.set(1, 1, 1))
        )
      ), _matr4.mulmatr(_matr4.rotateX(-R2D(Math.acos(V / -V0))), _matr4.rotateY(AzimuthDrop))), _matr4.translate(_vec3.add(_vec3.set(-Z, H, -S), Pos0))
    );
  }
  prim.draw(Pr_cube, Worl);
}
