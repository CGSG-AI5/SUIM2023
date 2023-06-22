import { prim, vertex } from "../rnd/prim.js";
import { _vec3 } from "../math/mathvec3.js";
import { material, Matlib } from "../rnd/res/material.js";
import { _matr4, D2R } from "../math/mathmat4.js";
import { myInput } from "../input.js";

import { Tex } from "../rnd/res/texture.js";
import { body, intersec, ResolveContact } from "../physic/physic.js";
import { cam } from "../math/mathcam.js";
import { myTimer } from "../timer.js";

let Pr_sphere;

let V0 = 50;
let ball = [];
class Unit_sphere {
  constructor(Pr, body, radius) {
    this.Pr = Pr
    this.body = body;
    this.radius = radius
  }
}

class contact{
  constructor(A_WorldSpace, B_WorldSpace, normal, SeperationDist, timeOfImpact){
    this.A_WorldSpace =A_WorldSpace;
    this.B_WorldSpace = B_WorldSpace;
    this.normal = normal;
    this.SeperationDist = SeperationDist;
    this.timeOfImpact = timeOfImpact;
  }
}

export function initSphere() {
  let Vrts = [];
  let Ind = [];



  let MtlNo1 = material.add(material.set(
    ...Matlib.Obsidian,
    [Tex.create("earth1.png"), -1, -1, -1, -1, -1, -1, -1],
    0,
    "texture"
  ));

  let MtlNo2 = material.add(material.set(
    ...Matlib.Obsidian,
    [Tex.create("moon.png"), -1, -1, -1, -1, -1, -1, -1],
    0,
    "texture"
  ));

  // Pr_sphere = prim.create_sphere(
  //   50, 50, 1,
  // );
  // Pr_sphere.MtlNo = material.add(Mtl);
  ball.push(
    new Unit_sphere(
      prim.create_sphere(50, 50, 1, MtlNo2),
      new body(
        1,
        1,
        _vec3.set(0, 5, 0),
        _vec3.set(0, 0, 0),
        _vec3.set(0, 0, 0),
      ),
      1,
    )
  );

  ball.push(
    new Unit_sphere(
      prim.create_sphere1(50, 50, 100, MtlNo1),
      new body(
        0,
        0.5,
        _vec3.set(0, -100, 0),
        _vec3.set(0, 0, 0),

        _vec3.set(90, 0, 0),
      ),
      100,
    )
  );
}

export function renderSphere() {
    for (let i = 0; i < ball.length; i++){
      let mass = 1.0 / ball[i].body.invm
      let Gravity_impulse = _vec3.mulnum(_vec3.set(0, -10, 0), mass * myTimer.globalDeltaTime)
      ball[i].body.InpulseLineer(Gravity_impulse)
    }   

    for (let i = 0; i < ball.length; i++){
      for (let j = i + 1; j < ball.length; j++){
        if (ball[i].body.invm == 0 && ball[j].body.invm == 0){
          return;
        }
        let cont = new contact(_vec3.set(0, 0, 0), _vec3.set(0, 0, 0), _vec3.set(0, 0, 0), 0, 0)
        if (intersec(ball[i], ball[j], cont)){
          
          ResolveContact(ball[i], ball[j], cont)

        }
      }
    }

    for (let i = 0; i < ball.length; i++){
      ball[i].body.Pos = _vec3.add(ball[i].body.Pos, _vec3.mulnum(ball[i].body.V, myTimer.globalDeltaTime))
      console.log(ball[1].body.Pos);
      let Worl = _matr4.mulmatr(
        _matr4.mulmatr(
          _matr4.rotateX(ball[i].body.Angle.x),
          _matr4.mulmatr(
            _matr4.rotateZ(ball[i].body.Angle.z),
            _matr4.rotateY(ball[i].body.Angle.y)
          )
        ),
        _matr4.translate(ball[i].body.Pos)
      );

      prim.draw(ball[i].Pr, Worl);
    }
}
