class _camera {
  constructor(
    ProjSize,
    ProjDist,
    ProjFarClip,
    MatrVP,
    MatrView,
    MatrProj,
    Loc,
    At,
    Dir,
    Up,
    Right
  ) {
    this.ProjSize = ProjSize;
    this.ProjDist = ProjDist;
    this.ProjFarClip = ProjFarClip;
    this.MatrVP = MatrVP;
    this.MatrView = MatrView;
    this.MatrProj = MatrProj;
    this.Loc = Loc;
    this.At = At;
    this.Dir = Dir;
    this.Up = Up;
    this.Right = Right;
  }

  static view(Loc, At, Up1) {
    const Dir = _vec3.normalize(_vec3.sub(At, Loc)),
      Right = _vec3.normalize(_vec3.cross(Dir, Up1)),
      Up = _vec3.cross(Right, Dir);
    return _matr4.set(
      Right.x,
      Up.x,
      -Dir.x,
      0,
      Right.y,
      Up.y,
      -Dir.y,
      0,
      Right.z,
      Up.z,
      -Dir.z,
      0,
      _vec3.dot(Loc, Right),
      -_vec3.dot(Loc, Up),
      _vec3.dot(Loc, Dir),
      1
    );
  }
}

function CamSet() {
  let Loc = _vec3.set(0, 0, 10),
    At = _vec3.set(0, 0, 0),
    Up = _vec3.set(0, 1, 0),
    Dir = _vec3.set(0, 0, 0),
    Right = _vec3.set(0, 0, 0);
  let ProjDist = 0.1,
    ProjSize = 0.1,
    ProjFarClip = 300,
    FrameW = 1000,
    FrameH = 1000;
  let MatrView = _camera.view(Loc, At, Up);

  Up.x = MatrView[0][1];
  Up.y = MatrView[1][1];
  Up.z = MatrView[2][1];

  Dir.x = -MatrView[0][2];
  Dir.y = -MatrView[1][2];
  Dir.z = -MatrView[2][2];

  Right.x = MatrView[0][0];
  Right.y = MatrView[1][0];
  Right.z = MatrView[2][0];

  const rx = ProjSize,
    ry = ProjSize;

  let MatrProj = _matr4.frustum(
      -rx / 2,
      rx / 2,
      -ry / 2,
      ry / 2,
      ProjDist,
      ProjFarClip
    ),
    MatrVP = _matr4.mulmatr(MatrView, MatrProj);

  return new _camera(
    ProjSize,
    ProjDist,
    ProjFarClip,
    MatrVP,
    MatrView,
    MatrProj,
    Loc,
    At,
    Dir,
    Up,
    Right
  );
}
