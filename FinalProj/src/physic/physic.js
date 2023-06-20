import { _vec3 } from "../math/mathvec3.js";
import { myTimer } from "../timer.js";

let g = 9.8;

export class body {
  constructor(m, k, V, Pos, phi, omega) {
    this.m = m;
    this.k = k;
    this.V = V;
    this.Pos = Pos;
    this.phi = phi;
   this.omega = omega;  
  }
  kinematics_of_the_fall() {
    this.Pos.y +=
      this.V.y * myTimer.globalDeltaTime -
      (g * myTimer.globalDeltaTime * myTimer.globalDeltaTime) / 2;

    this.V.y -= g * myTimer.globalDeltaTime;

    this.Pos.z -= this.V.z * myTimer.globalDeltaTime;

    this.Pos.x -= this.V.x * myTimer.globalDeltaTime;

    this.phi = _vec3.add(this.phi, _vec3.mulnum(this.omega, myTimer.globalDeltaTime));  
  }

  direct_blow(n) {
    let cos =
      (_vec3.dot(_vec3.neg(this.V), n) * _vec3.dot(_vec3.neg(this.V), n)) /
      (_vec3.len(this.V) * _vec3.len(this.V));
      if (Math.abs(_vec3.len(this.V)) < 0.5){this.V = _vec3.set(0, 0, 0)}
      this.omega = _vec3.add(this.omega,_vec3.mulnum(_vec3.neg(this.V), 0.5 / 0.4));
    console.log(this.omega)

    this.V = _vec3.mulnum(this.V, Math.sqrt(1 + (this.k * this.k - 1) * cos));
    if (n.x != 0){
        this.V.x *= -1;    
    }
    if (n.y != 0){
        this.V.y *= -1;    
    }
    if (n.z != 0){
        this.V.z *= -1;        
    }
    
  }
}
