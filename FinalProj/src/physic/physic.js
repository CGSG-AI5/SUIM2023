import { _vec3 } from "../math/mathvec3.js";
import { myTimer } from "../timer.js";

export class body {
  constructor(invm, epsilon, Pos, V, Angle) {
    this.invm = invm;
    this.epsilon = epsilon;
    this.V = V;
    this.Pos = Pos;
    this.Angle = Angle;  
  }
  InpulseLineer (impulse){
    if (this.invm != 0){
      this.V = _vec3.add(this.V, _vec3.mulnum(impulse, this.invm))
    } 
  }

  ImpulseAngula( impulse ) {
    if (this.invm != 0) 

    m _ a ng ul a rV elo ci ty += G e tI nv e r s eI n e r ti a T e n s o rW o rl d S p a c e ( ) *
    impulse ;
    cons t f l o a t maxAngularSpeed = 3 0 . 0 f ; / / 30 rad / s i s f a s t enough f o r us . But f e e l f r e e to a d j u s t .
    i f ( m _ a ng ul a rV elo ci ty . Ge tLeng thSq r ( ) > maxAngularSpeed * maxAngularSpeed ) {
    m _ a ng ul a rV elo ci ty . No rmalize ( ) ;
    m _ a ng ul a rV elo ci ty *
    = maxAngularSpeed ;
    }
}

export function ResolveContact(a, b, contact){
  let epsilon_ab = a.body.epsilon * b.body.epsilon
  let vab = _vec3.sub(a.body.V, b.body.V)
  let ImpulseJ = -(epsilon_ab + 1) * _vec3.dot(contact.normal, vab) / (a.body.invm + b.body.invm);
  let vectorImpulseJ = _vec3.mulnum(contact.normal, ImpulseJ)

  a.body.InpulseLineer(vectorImpulseJ)
  b.body.InpulseLineer(_vec3.mulnum(vectorImpulseJ, -1))


  // a.body.V = _vec3.set(0, 0, 0);
  // b.body.V = _vec3.set(0, 0, 0);
  let ta = a.body.invm / (a.body.invm + b.body.invm), tb = b.body.invm / (a.body.invm + b.body.invm);
  let ds = _vec3.sub(contact.B_WorldSpace, contact.A_WorldSpace);
  a.body.Pos = _vec3.add(a.body.Pos, _vec3.mulnum(ds, ta))
  b.body.Pos = _vec3.sub(b.body.Pos, _vec3.mulnum(ds, tb))

}

export function intersec(a, b, contact){
  let ab = _vec3.sub(b.body.Pos, a.body.Pos);
  contact.normal = _vec3.normalize(ab);
  contact.A_WorldSpace = _vec3.add(a.body.Pos, _vec3.mulnum(contact.normal, a.radius));
  contact.B_WorldSpace = _vec3.sub(b.body.Pos, _vec3.mulnum(contact.normal, b.radius));
  let radius_ab = a.radius + b.radius;
  if (_vec3.len2(ab) <= radius_ab * radius_ab){
    return true;
  }
  return false;
}



  // kinematics_of_the_fall() {
  //   this.Pos.y +=
  //     this.V.y * myTimer.globalDeltaTime -
  //     (g * myTimer.globalDeltaTime * myTimer.globalDeltaTime) / 2;

  //   this.V.y -= g * myTimer.globalDeltaTime;

  //   this.Pos.z -= this.V.z * myTimer.globalDeltaTime;

  //   this.Pos.x -= this.V.x * myTimer.globalDeltaTime;

  //   this.phi = _vec3.add(this.phi, _vec3.mulnum(this.omega, myTimer.globalDeltaTime));  
  // }

  // direct_blow(n) {
  //   let cos =
  //     (_vec3.dot(_vec3.neg(this.V), n) * _vec3.dot(_vec3.neg(this.V), n)) /
  //     (_vec3.len(this.V) * _vec3.len(this.V));
  //     if (Math.abs(_vec3.len(this.V)) < 0.5){this.V = _vec3.set(0, 0, 0)}
  //     else{
  //             this.omega = _vec3.add(this.omega,_vec3.mulnum(_vec3.neg(this.V), 0.5 / 0.4));
  //     console.log(this.omega)

  //     this.V = _vec3.mulnum(this.V, Math.sqrt(1 + (this.k * this.k - 1) * cos));
  //     if (n.x != 0){
  //         this.V.x *= -1;    
  //     }
  //     if (n.y != 0){
  //         this.V.y *= -1;    
  //     }
  //     if (n.z != 0){
  //         this.V.z *= -1;        
  //     }
  //   }
    
  // }
