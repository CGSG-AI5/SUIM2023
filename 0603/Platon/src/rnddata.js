let program = 0;
let cam, gl, CamUBO;
let IsControl = false;
let IsLButton = false;
let IsRButton = false;
let Mdx = 0,
  Mdy = 0,
  Mdz = 0;

let ProjSize = 0.1 /* Project plane fit square */,
  ProjDist = 0.1 /* Distance to project plane from viewer (near) */,
  ProjFarClip = 300; /* Distance to project far clip plane (far) */
