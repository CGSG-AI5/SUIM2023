(function () {
  'use strict';

  let _vec3$1 = class _vec3 {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    static set(x, y, z) {
      return new _vec3(x, y, z);
    }

    static add(a, b) {
      return new _vec3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    static sub(a, b) {
      return new _vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    static mulnum(a, b) {
      return new _vec3(a.x * b, a.y * b, a.z * b);
    }

    static divnum(a, b) {
      return new _vec3(a.x / b, a.y / b, a.z / b);
    }

    static neg(a) {
      return new _vec3(-a.x, -a.y, -a.z);
    }

    static dot(a, b) {
      return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    static cross(a, b) {
      return new _vec3(
        a.y * b.z - a.z * b.y,
        a.z * b.x - a.x * b.z,
        a.x * b.y - b.x * a.y
      );
    }

    static len2(a) {
      return a.x * a.x + a.y * a.y + a.z * a.z;
    }

    //  return Vec3Set(
    //     P.X * M.M[0][0] + P.Y * M.M[1][0] + P.Z * M.M[2][0] + M.M[3][0],
    //     P.X * M.M[0][1] + P.Y * M.M[1][1] + P.Z * M.M[2][1] + M.M[3][1],
    //     P.X * M.M[0][2] + P.Y * M.M[1][2] + P.Z * M.M[2][2] + M.M[3][2]

    static len(a) {
      return Math.sqrt(_vec3.len2(a));
    }

    static normalize(a) {
      return _vec3.divnum(a, _vec3.len(a));
    }

    static point_transform(a, b) {
      return new _vec3(
        a.x * b[0][0] + a.y * b[1][0] + a.z * b[2][0] + b[3][0],
        a.x * b[0][1] + a.y * b[1][1] + a.z * b[2][1] + b[3][1],
        a.x * b[0][2] + a.y * b[1][2] + a.z * b[2][2] + b[3][2]
      );
    }

    static vectort_ransform(a, b) {
      return new _vec3(
        a.x * b[0][0] + a.y * b[1][0] + a.z * b[2][0],
        a.x * b[0][1] + a.y * b[1][1] + a.z * b[2][1],
        a.x * b[0][2] + a.y * b[1][2] + a.z * b[2][2]
      );
    }
    // FLT w = V.X * M.M[0][3] + V.Y * M.M[1][3] + V.Z * M.M[2][3] + M.M[3][3];

    static mul_matr(a, b) {
      const w = a.x * b[0][3] + a.y * b[1][3] + a.z * b[2][3] + b[3][3];
      return new _vec3(
        (a * b[0][0] + a.y * b[1][0] + a.z * b[2][0] + b[3][0]) / w,
        (a * b[0][1] + a.y * b[1][1] + a.z * b[2][1] + b[3][1]) / w,
        (a * b[0][2] + a.y * b[1][2] + a.z * b[2][2] + b[3][2]) / w
      );
    }

    static vec3(a) {
      return [a.x, a.y, a.z];
    }
  };

  function D2R(degree) {
    return (degree * Math.PI) / 180;
  }

  class _matr4 {
    constructor(
      a00,
      a01,
      a02,
      a03,
      a10,
      a11,
      a12,
      a13,
      a20,
      a21,
      a22,
      a23,
      a30,
      a31,
      a32,
      a33
    ) {
      this.a = [
        [a00, a01, a02, a03],
        [a10, a11, a12, a13],
        [a20, a21, a22, a23],
        [a30, a31, a32, a33],
      ];
    }

    static identity() {
      return new _matr4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1).a;
    }
    static set(
      a00,
      a01,
      a02,
      a03,
      a10,
      a11,
      a12,
      a13,
      a20,
      a21,
      a22,
      a23,
      a30,
      a31,
      a32,
      a33
    ) {
      return new _matr4(
        a00,
        a01,
        a02,
        a03,
        a10,
        a11,
        a12,
        a13,
        a20,
        a21,
        a22,
        a23,
        a30,
        a31,
        a32,
        a33
      ).a;
    }
    static translate(a) {
      return new _matr4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, a.x, a.y, a.z, 1).a;
    }
    static scale(a) {
      return new _matr4(a.x, 0, 0, 0, 0, a.y, 0, 0, 0, 0, a.z, 0, 0, 0, 0, 1).a;
    }

    static rotateZ(degree) {
      const r = D2R(degree),
        co = Math.cos(r),
        si = Math.sin(r);
      let m = _matr4.identity();

      m[0][0] = co;
      m[1][0] = -si;
      m[0][1] = si;
      m[1][1] = co;

      return m;
    }
    static rotateX(degree) {
      const r = D2R(degree),
        co = Math.cos(r),
        si = Math.sin(r);
      let m = _matr4.identity();

      m[1][1] = co;
      m[2][1] = -si;
      m[1][2] = si;
      m[2][2] = co;

      return m;
    }

    static rotateY(degree) {
      const r = D2R(degree),
        co = Math.cos(r),
        si = Math.sin(r);
      let m = _matr4.identity();

      m[0][0] = co;
      m[2][0] = si;
      m[0][2] = -si;
      m[2][2] = co;

      return m;
    }

    static mulmatr(m1, m2) {
      let r = _matr4.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        k = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          for (r[i][j] = 0, k = 0; k < 4; k++) {
            r[i][j] += m1[i][k] * m2[k][j];
          }
        }
      }
    }

    static mulmatr(m1, m2) {
      let r = _matr4.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        k = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          for (r[i][j] = 0, k = 0; k < 4; k++) {
            r[i][j] += m1[i][k] * m2[k][j];
          }
        }
      }
      return r;
    }

    static transpose(m) {
      let r = _matr4.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          r[i][j] = m[j][i];
        }
      }
      return r;
    }

    static determ3x3(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
      return (
        a11 * a22 * a33 -
        a11 * a23 * a32 -
        a12 * a21 * a33 +
        a12 * a23 * a31 +
        a13 * a21 * a32 -
        a13 * a22 * a31
      );
    }

    static determ(m) {
      return (
        m[0][0] *
          _matr4.determ3x3(
            m[1][1],
            m[1][2],
            m[1][3],
            m[2][1],
            m[2][2],
            m[2][3],
            m[3][1],
            m[3][2],
            m[3][3]
          ) -
        m[0][1] *
          _matr4.determ3x3(
            m[1][0],
            m[1][2],
            m[1][3],
            m[2][0],
            m[2][2],
            m[2][3],
            m[3][0],
            m[3][2],
            m[3][3]
          ) +
        m[0][2] *
          _matr4.determ3x3(
            m[1][0],
            m[1][1],
            m[1][3],
            m[2][0],
            m[2][1],
            m[2][3],
            m[3][0],
            m[3][1],
            m[3][3]
          ) -
        m[0][3] *
          _matr4.determ3x3(
            m[1][0],
            m[1][1],
            m[1][2],
            m[2][0],
            m[2][1],
            m[2][2],
            m[3][0],
            m[3][1],
            m[3][2]
          )
      );
    }

    static inverse(m) {
      const det = _matr4.determ(m);
      let r = _matr4.identity();
      if (det === 0) return r;
      r[0][0] =
        _matr4.determ3x3(
          m[1][1],
          m[1][2],
          m[1][3],
          m[2][1],
          m[2][2],
          m[2][3],
          m[3][1],
          m[3][2],
          m[3][3]
        ) / det;

      r[1][0] =
        _matr4.determ3x3(
          m[1][0],
          m[1][2],
          m[1][3],
          m[2][0],
          m[2][2],
          m[2][3],
          m[3][0],
          m[3][2],
          m[3][3]
        ) / -det;
      r[2][0] =
        _matr4.determ3x3(
          m[1][0],
          m[1][1],
          m[1][3],
          m[2][0],
          m[2][1],
          m[2][3],
          m[3][0],
          m[3][1],
          m[3][3]
        ) / det;
      r[3][0] =
        _matr4.determ3x3(
          m[1][0],
          m[1][1],
          m[1][2],
          m[2][0],
          m[2][1],
          m[2][2],
          m[3][0],
          m[3][1],
          m[3][2]
        ) / -det;

      r[0][1] =
        _matr4.determ3x3(
          m[0][1],
          m[0][2],
          m[0][3],
          m[2][1],
          m[2][2],
          m[2][3],
          m[3][1],
          m[3][2],
          m[3][3]
        ) / -det;

      r[1][1] =
        _matr4.determ3x3(
          m[0][0],
          m[0][2],
          m[0][3],
          m[2][0],
          m[2][2],
          m[2][3],
          m[3][0],
          m[3][2],
          m[3][3]
        ) / det;

      r[2][1] =
        _matr4.determ3x3(
          m[0][0],
          m[0][1],
          m[0][3],
          m[2][0],
          m[2][1],
          m[2][3],
          m[3][0],
          m[3][1],
          m[3][3]
        ) / -det;
      r[3][1] =
        _matr4.determ3x3(
          m[0][0],
          m[0][1],
          m[0][2],
          m[2][0],
          m[2][1],
          m[2][2],
          m[3][0],
          m[3][1],
          m[3][2]
        ) / det;
      r[0][2] =
        _matr4.determ3x3(
          m[0][1],
          m[0][2],
          m[0][3],
          m[1][1],
          m[1][2],
          m[1][3],
          m[3][1],
          m[3][2],
          m[3][3]
        ) / det;
      r[1][2] =
        _matr4.determ3x3(
          m[0][0],
          m[0][2],
          m[0][3],
          m[1][0],
          m[1][2],
          m[1][3],
          m[3][0],
          m[3][2],
          m[3][3]
        ) / -det;
      r[2][2] =
        _matr4.determ3x3(
          m[0][0],
          m[0][1],
          m[0][3],
          m[1][0],
          m[1][1],
          m[1][3],
          m[3][0],
          m[3][1],
          m[3][3]
        ) / det;
      r[3][2] =
        _matr4.determ3x3(
          m[0][0],
          m[0][1],
          m[0][2],
          m[1][0],
          m[2][1],
          m[1][2],
          m[3][0],
          m[3][1],
          m[3][2]
        ) / -det;
      r[0][3] =
        _matr4.determ3x3(
          m[0][1],
          m[0][2],
          m[0][3],
          m[1][1],
          m[1][2],
          m[1][3],
          m[2][1],
          m[2][2],
          m[2][3]
        ) / -det;
      r[1][3] =
        _matr4.determ3x3(
          m[0][0],
          m[0][2],
          m[0][3],
          m[1][0],
          m[1][2],
          m[1][3],
          m[2][0],
          m[2][2],
          m[2][3]
        ) / det;
      r[2][3] =
        _matr4.determ3x3(
          m[0][0],
          m[0][1],
          m[0][3],
          m[1][0],
          m[1][1],
          m[1][3],
          m[2][0],
          m[2][1],
          m[2][3]
        ) / -det;
      r[3][3] =
        _matr4.determ3x3(
          m[0][0],
          m[0][1],
          m[0][2],
          m[1][0],
          m[2][1],
          m[1][2],
          m[2][0],
          m[2][1],
          m[2][2]
        ) / det;
      return r;
    }
    static frustum(l, r, b, t, n, f) {
      let m = _matr4.identity();

      m[0][0] = (2 * n) / (r - l);
      m[0][1] = 0;
      m[0][2] = 0;
      m[0][3] = 0;

      m[1][0] = 0;
      m[1][1] = (2 * n) / (t - b);
      m[1][2] = 0;
      m[1][3] = 0;

      m[2][0] = (r + l) / (r - l);
      m[2][1] = (t + b) / (t - b);
      m[2][2] = (f + n) / -(f - n);
      m[2][3] = -1;

      m[3][0] = 0;
      m[3][1] = 0;
      m[3][2] = (-2 * n * f) / (f - n);
      m[3][3] = 0;

      return m;
    }

    static toarr(m) {
      let v = [];

      for (let i = 0; i < 4; i++) {
        for (let g = 0; g < 4; g++) {
          v.push(m[i][g]);
        }
      }

      return v;
    }
  }

  let cam;

  let ProjSize = 0.1 /* Project plane fit square */,
    ProjDist = 0.1 /* Distance to project plane from viewer (near) */,
    ProjFarClip = 300; /* Distance to project far clip plane (far) */


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
      const Dir = _vec3$1.normalize(_vec3$1.sub(At, Loc)),
        Right = _vec3$1.normalize(_vec3$1.cross(Dir, Up1)),
        Up = _vec3$1.cross(Right, Dir);
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
        -_vec3$1.dot(Loc, Right),
        -_vec3$1.dot(Loc, Up),
        _vec3$1.dot(Loc, Dir),
        1
      );
    }
  }

  function CamSet(Loc, At, Up1) {
    let Up, Dir, Right;
    let MatrView = _camera.view(Loc, At, Up1);

    Up = _vec3$1.set(MatrView[0][1], MatrView[1][1], MatrView[2][1]);
    Dir = _vec3$1.set(-MatrView[0][2], -MatrView[1][2], -MatrView[2][2]);
    Right = _vec3$1.set(MatrView[0][0], MatrView[1][0], MatrView[2][0]);

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

    cam =  new _camera(
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

  const canvas = document.getElementById("glCanvas");
  let gl = canvas.getContext("webgl2");

  let program;

  function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert("!!!!!!");
    }

    return shader;
  }

  function shaderInit(vs, fs) {
    const vertexSh = loadShader(gl, gl.VERTEX_SHADER, vs);
    const fragmentSh = loadShader(gl, gl.FRAGMENT_SHADER, fs);

    program = gl.createProgram();
    gl.attachShader(program, vertexSh);
    gl.attachShader(program, fragmentSh);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      alert(gl.getProgramInfoLog(program));
    }
  }

  let Ubos = [];

  let Ubo_cell = {
    MatrWVP: "matrwvp",
    MatrW: "matrw",
    MatrWInv: "matrwinv",
    MatrVP: "matrvp",
    MatrV: "matrv",
    CamLoc: "camloc",
    CamAt: "camat",
    CamRight: "camright",
    CamUp: "camup",
    CamDir: "camdir",
    ProjDistFarTimeLocal: "projdistfartimelocal",
    TimeGlobalDeltaGlobalDeltaLocal: "timeglobal",
    ProjectSize: "projsize",
  };

  class Ubo_Matr {
    constructor(
      MatrWVP,
      MatrW,
      MatrWInv,
      MatrVP,
      MatrV,
      CamLoc,
      CamAt,
      CamRight,
      CamUp,
      CamDir,
      ProjDistFarTimeLocal,
      TimeGlobalDeltaGlobalDeltaLocal,
      ProjectSize
    ) {
      this.MatrWVP = MatrWVP;
      this.MatrW = MatrW;
      this.MatrWInv = MatrWInv;
      this.MatrVP = MatrVP;
      this.MatrV = MatrV;
      this.CamLoc = CamLoc;
      this.CamAt = CamAt;
      this.CamRight = CamRight;
      this.CamUp = CamUp;
      this.CamDir = CamDir;
      this.ProjDistFarTimeLocal = ProjDistFarTimeLocal;

      this.TimeGlobalDeltaGlobalDeltaLocal = TimeGlobalDeltaGlobalDeltaLocal;
      this.ProjectSize = ProjectSize;
    }
  }

  class UBO {
    constructor(ubo, name, uboid, Type) {
      this.ubo = ubo;
      this.name = name;
      this.uboid = uboid;

      this.Type = Type;
    }

    static add(Ubo, name) {
      let fr = gl.createBuffer();
      gl.bindBuffer(gl.UNIFORM_BUFFER, fr);
      if (name === "BaseData") {
        gl.bufferData(
          gl.UNIFORM_BUFFER,
          new Float32Array([
            ..._matr4.toarr(Ubo.MatrWVP),
            ..._matr4.toarr(Ubo.MatrW),
            ..._matr4.toarr(Ubo.MatrWInv),
            ..._matr4.toarr(Ubo.MatrVP),
            ..._matr4.toarr(Ubo.MatrV),
            ..._vec3$1.vec3(Ubo.CamLoc),
            1,
            ..._vec3$1.vec3(Ubo.CamAt),
            1,
            ..._vec3$1.vec3(Ubo.CamRight),
            1,
            ..._vec3$1.vec3(Ubo.CamUp),
            1,
            ..._vec3$1.vec3(Ubo.CamDir),
            1,
            ..._vec3$1.vec3(Ubo.ProjDistFarTimeLocal),
            1,
            ..._vec3$1.vec3(Ubo.TimeGlobalDeltaGlobalDeltaLocal),
            1,
            ..._vec3$1.vec3(Ubo.ProjectSize),
            1,
          ]),
          gl.STATIC_DRAW
        );
      }
      if (name === "Material") {
        [
          ..._vec3$1.vec3(Ubo.Ka),
          1,
          ..._vec3$1.vec3(Ubo.Kd),
          1,
          ..._vec3$1.vec3(Ubo.Ks),
          1,
          Ubo.Ph,
          Ubo.Trans,
          1,
          1,
          ...Ubo.Tex,
        ];
        gl.bufferData(
          gl.UNIFORM_BUFFER,
          new Float32Array([
            ..._vec3$1.vec3(Ubo.Ka),
            1,
            ..._vec3$1.vec3(Ubo.Kd),
            1,
            ..._vec3$1.vec3(Ubo.Ks),
            1,
            Ubo.Ph,
            Ubo.Trans,
            1,
            1,
            ...Ubo.Tex,
          ]),
          gl.STATIC_DRAW
        );
      }
      Ubos.push(new UBO(Ubo, name, fr));
      return Ubos.length - 1;
    }
    static update(id, name_cell, cell_data) {
      gl.bindBuffer(gl.UNIFORM_BUFFER, Ubos[id].uboid);
      if (Ubos[id].name === "BaseData") {
        if (name_cell == Ubo_cell.MatrWVP) {
          Ubos[id].ubo.MatrWVP = cell_data;
        } else if (name_cell == Ubo_cell.MatrW) {
          Ubos[id].ubo.MatrW = cell_data;
        } else if (name_cell == Ubo_cell.MatrWInv) {
          Ubos[id].ubo.MatrWInv = cell_data;
        } else if (name_cell == Ubo_cell.MatrVP) {
          Ubos[id].ubo.MatrVP = cell_data;
        } else if (name_cell == Ubo_cell.MatrV) {
          Ubos[id].ubo.MatrV = cell_data;
        } else if (name_cell == Ubo_cell.CamLoc) {
          Ubos[id].ubo.CamLoc = cell_data;
        } else if (name_cell == Ubo_cell.CamAt) {
          Ubos[id].ubo.CamAt = cell_data;
        } else if (name_cell == Ubo_cell.CamRight) {
          Ubos[id].ubo.CamRight = cell_data;
        } else if (name_cell == Ubo_cell.CamDir) {
          Ubos[id].ubo.CamDir = cell_data;
        } else if (name_cell == Ubo_cell.ProjDistFarTimeLocal) {
          Ubos[id].ubo.ProjDistFarTimeLocal = cell_data;
        } else if (name_cell == Ubo_cell.TimeGlobalDeltaGlobalDeltaLocal) {
          Ubos[id].ubo.TimeGlobalDeltaGlobalDeltaLocal = cell_data;
        } else if (name_cell == Ubo_cell.ProjectSize) {
          Ubos[id].ubo.ProjDistFarTimeLocal = cell_data;
        }
        let x = new Float32Array([
          ..._matr4.toarr(Ubos[id].ubo.MatrWVP),
          ..._matr4.toarr(Ubos[id].ubo.MatrW),
          ..._matr4.toarr(Ubos[id].ubo.MatrWInv),
          ..._matr4.toarr(Ubos[id].ubo.MatrVP),
          ..._matr4.toarr(Ubos[id].ubo.MatrV),
          ..._vec3$1.vec3(Ubos[id].ubo.CamLoc),
          1,
          ..._vec3$1.vec3(Ubos[id].ubo.CamAt),
          1,
          ..._vec3$1.vec3(Ubos[id].ubo.CamRight),
          1,
          ..._vec3$1.vec3(Ubos[id].ubo.CamUp),
          1,
          ..._vec3$1.vec3(Ubos[id].ubo.CamDir),
          1,
          ..._vec3$1.vec3(Ubos[id].ubo.ProjDistFarTimeLocal),
          1,
          ..._vec3$1.vec3(Ubos[id].ubo.TimeGlobalDeltaGlobalDeltaLocal),
          1,
          ..._vec3$1.vec3(Ubos[id].ubo.ProjectSize),
          1,
        ]);

        gl.bufferData(gl.UNIFORM_BUFFER, x, gl.STATIC_DRAW);
      }
    }
    static applay(id, point) {
      let blk_loc = gl.getUniformBlockIndex(program, Ubos[id].name);

      gl.uniformBlockBinding(program, blk_loc, point);

      gl.bindBufferBase(gl.UNIFORM_BUFFER, point, Ubos[id].uboid);
    }
  }

  function Timer() {
    // Timer obtain current time in seconds method
    const getTime = () => {
      const date = new Date();
      let t =
        date.getMilliseconds() / 1000.0 +
        date.getSeconds() +
        date.getMinutes() * 60;
      return t;
    };

    // Timer response method
    this.response = (tag_id = null) => {
      let t = getTime();
      // Global time
      this.globalTime = t;
      this.globalDeltaTime = t - this.oldTime;
      // Time with pause
      if (this.isPause) {
        this.localDeltaTime = 0;
        this.pauseTime += t - this.oldTime;
      } else {
        this.localDeltaTime = this.globalDeltaTime;
        this.localTime = t - this.pauseTime - this.startTime;
      }
      // FPS
      this.frameCounter++;
      if (t - this.oldTimeFPS > 3) {
        this.FPS = this.frameCounter / (t - this.oldTimeFPS);
        this.oldTimeFPS = t;
        this.frameCounter = 0;
        if (tag_id != null)
          document.getElementById(tag_id).innerHTML = this.getFPS();
      }
      this.oldTime = t;

      UBO.update(
        CamUBO,
        Ubo_cell.ProjDistFarTimeLocal,
        _vec3$1.set(cam.ProjDist, cam.ProjFarClip, this.localTime)
      );
      UBO.update(
        CamUBO,
        Ubo_cell.TimeGlobalDeltaGlobalDeltaLocal,
        _vec3$1.set(this.globalTime, this.globalDeltaTime, this.localDeltaTime)
      );
    };

    // Obtain FPS as string method
    this.getFPS = () => this.FPS.toFixed(3);

    // Fill timer global data
    this.globalTime = this.localTime = getTime();
    this.globalDeltaTime = this.localDeltaTime = 0;

    // Fill timer semi global data
    this.startTime = this.oldTime = this.oldTimeFPS = this.globalTime;
    this.frameCounter = 0;
    this.isPause = false;
    this.FPS = 30.0;
    this.pauseTime = 0;

    return this;
  } // End of 'Timer' function

  let myTimer = new Timer();

  let Material = [];

  class material {
    constructor(Name, Ka, Kd, Ks, Ph, Trans, Tex, UboNo) {
      this.Name = Name; /* Material name */

      /* Illumination coefficients */

      this.Ka = Ka;
      this.Kd = Kd;
      this.Ks = Ks;
      this.Trans = Trans;
      this.Ph = Ph;
      this.Tex = Tex;
      this.UboNo = UboNo;
    }

    static MtlGetDef() {
      return new material(
        "Default",
        _vec3$1.set(0.1, 0.1, 0.1),
        _vec3$1.set(0.9, 0.9, 0.9),
        _vec3$1.set(0.3, 0.3, 0.3),
        30,
        1,
        [-1, -1, -1, -1, -1, -1, -1, -1]
      );
    }
    static add(Mtl) {
      Mtl.UboNo = UBO.add(Mtl, "Material");
      Material.push(Mtl);
      return Material.length - 1;
    }
    static applay(MtlNo, point) {
      UBO.applay(Material[MtlNo].UboNo, point);
    }
  }

  let Matlib = {
    Black_Plastic: new material(
      "Black_Plastic",
      _vec3$1.set(0.0, 0.0, 0.0),
      _vec3$1.set(0.01, 0.01, 0.01),
      _vec3$1.set(0.5, 0.5, 0.5),
      32,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Brass: new material(
      "Brass",
      _vec3$1.set(0.329412, 0.223529, 0.027451),
      _vec3$1.set(0.780392, 0.568627, 0.113725),
      _vec3$1.set(0.992157, 0.941176, 0.807843),
      27.8974,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Bronze: new material(
      "Bronze",
      _vec3$1.set(0.2125, 0.1275, 0.054),
      _vec3$1.set(0.714, 0.4284, 0.18144),
      _vec3$1.set(0.393548, 0.271906, 0.166721),
      25.6,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Chrome: new material(
      "Chrome",
      _vec3$1.set(0.25, 0.25, 0.25),
      _vec3$1.set(0.4, 0.4, 0.4),
      _vec3$1.set(0.774597, 0.774597, 0.774597),
      76.8,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Copper: new material(
      "Copper",
      _vec3$1.set(0.19125, 0.0735, 0.0225),
      _vec3$1.set(0.7038, 0.27048, 0.0828),
      _vec3$1.set(0.256777, 0.137622, 0.086014),
      12.8,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Gold: new material(
      "Gold",
      _vec3$1.set(0.24725, 0.1995, 0.0745),
      _vec3$1.set(0.75164, 0.60648, 0.22648),
      _vec3$1.set(0.628281, 0.555802, 0.366065),
      51.2,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Peweter: new material(
      "Peweter",
      _vec3$1.set(0.10588, 0.058824, 0.113725),
      _vec3$1.set(0.427451, 0.470588, 0.541176),
      _vec3$1.set(0.3333, 0.3333, 0.521569),
      9.84615,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Silver: new material(
      "Silver",
      _vec3$1.set(0.19225, 0.19225, 0.19225),
      _vec3$1.set(0.50754, 0.50754, 0.50754),
      _vec3$1.set(0.508273, 0.508273, 0.508273),
      51.2,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Polished_Silver: new material(
      "Polished_Silver",
      _vec3$1.set(0.23125, 0.23125, 0.23125),
      _vec3$1.set(0.2775, 0.2775, 0.2775),
      _vec3$1.set(0.773911, 0.773911, 0.773911),
      89.6,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Turquoise: new material(
      "Turquoise",
      _vec3$1.set(0.1, 0.18725, 0.1745),
      _vec3$1.set(0.396, 0.74151, 0.69102),
      _vec3$1.set(0.297254, 0.30829, 0.306678),
      12.8,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Ruby: new material(
      "Ruby",
      _vec3$1.set(0.1745, 0.01175, 0.01175),
      _vec3$1.set(0.61424, 0.04136, 0.04136),
      _vec3$1.set(0.727811, 0.626959, 0.626959),
      76.8,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Polished_Gold: new material(
      "Polished_Gold",
      _vec3$1.set(0.24725, 0.2245, 0.0645),
      _vec3$1.set(0.34615, 0.3143, 0.0903),
      _vec3$1.set(0.797357, 0.723991, 0.208006),
      83.2,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Polished_Bronze: new material(
      "Polished_Bronze",
      _vec3$1.set(0.25, 0.148, 0.06475),
      _vec3$1.set(0.4, 0.2368, 0.1036),
      _vec3$1.set(0.774597, 0.458561, 0.200621),
      76.8,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Polished_Copper: new material(
      "Polished_Copper",
      _vec3$1.set(0.2295, 0.08825, 0.0275),
      _vec3$1.set(0.5508, 0.2118, 0.066),
      _vec3$1.set(0.580594, 0.223257, 0.0695701),
      51.2,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Jade: new material(
      "Jade",
      _vec3$1.set(0.135, 0.2225, 0.1575),
      _vec3$1.set(0.135, 0.2225, 0.1575),
      _vec3$1.set(0.316228, 0.316228, 0.316228),
      12.8,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Obsidian: new material(
      "Obsidian",
      _vec3$1.set(0.05375, 0.05, 0.06625),
      _vec3$1.set(0.18275, 0.17, 0.22525),
      _vec3$1.set(0.332741, 0.328634, 0.346435),
      38.4,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Pearl: new material(
      "Pearl",
      _vec3$1.set(0.25, 0.20725, 0.20725),
      _vec3$1.set(1.0, 0.829, 0.829),
      _vec3$1.set(0.296648, 0.296648, 0.296648),
      11.264,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Emerald: new material(
      "Emerald",
      _vec3$1.set(0.0215, 0.1745, 0.0215),
      _vec3$1.set(0.07568, 0.61424, 0.07568),
      _vec3$1.set(0.633, 0.727811, 0.633),
      76.8,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
    Black_Rubber: new material(
      "Black_Rubber",
      _vec3$1.set(0.02, 0.02, 0.02),
      _vec3$1.set(0.01, 0.01, 0.01),
      _vec3$1.set(0.4, 0.4, 0.4),
      10.0,
      1,
      [-1, -1, -1, -1, -1, -1, -1, -1]
    ),
  };

  class vertex {
    constructor(P, C, N) {
      this.P = P;
      this.C = C;
      this.N = N;
    }
    static vert2arr(a) {
      return [a.P.x, a.P.y, a.P.z, a.C.x, a.C.y, a.C.z, a.N.x, a.N.y, a.N.z];
    }

    static create(a) {
      return new vertex(a.P, a.C, a.N);
    }
  }

  class prim {
    constructor(VA, VBuf, IBuf, NumOfElements, Trans, MtlNo) {
      this.VA = VA;
      this.VBuf = VBuf;
      this.IBuf = IBuf;
      this.NumOfElements = NumOfElements;
      this.Trans = Trans;
      this.MtlNo = MtlNo;
    }
    static create(Vert, NumofVert, Ind, NumofInd, MtlNo) {
      let primVertexArray = gl.createVertexArray();
      gl.bindVertexArray(primVertexArray);

      let primVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, primVertexBuffer);

      let pos = [];
      for (let i = 0; i < NumofVert; i++) {
        pos = pos.concat(vertex.vert2arr(Vert[i]));
      }
      pos = new Float32Array(pos);

      gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);

      let primIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, primIndexBuffer);

      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(Ind),
        gl.STATIC_DRAW
      );

      let Fsize = pos.BYTES_PER_ELEMENT;
      let posLoc = gl.getAttribLocation(program, "in_pos");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, Fsize * 9, 0);

      let posCol = gl.getAttribLocation(program, "in_color");
      if (posCol != -1) {
        gl.vertexAttribPointer(posCol, 3, gl.FLOAT, false, Fsize * 9, Fsize * 3);
        gl.enableVertexAttribArray(posCol);
      }

      let posNorm = gl.getAttribLocation(program, "in_normal");

      if (posNorm != -1) {
        gl.vertexAttribPointer(posNorm, 3, gl.FLOAT, false, Fsize * 9, Fsize * 6);
        gl.enableVertexAttribArray(posNorm);
      }

      return new prim(
        primVertexArray,
        primVertexBuffer,
        primIndexBuffer,
        NumofInd,
        _matr4.identity(),
        MtlNo
      );
    }

    static draw(Pr, World) {
      let w = _matr4.mulmatr(Pr.Trans, World);
      let winv = _matr4.transpose(_matr4.inverse(w));
      let WVP = _matr4.mulmatr(w, cam.MatrVP);

      gl.useProgram(program);

      gl.bindVertexArray(Pr.VA);

      UBO.update(CamUBO, Ubo_cell.MatrWVP, WVP);
      UBO.update(CamUBO, Ubo_cell.MatrW, w);
      UBO.update(CamUBO, Ubo_cell.MatrWInv, winv);
      UBO.applay(CamUBO, 0);
      material.applay(Pr.MtlNo, 1);

      gl.drawElements(
        gl.TRIANGLES, // TRIANGLES, TRIANGLE_STRIP
        Pr.NumOfElements, //Pr.NumOfElements
        gl.UNSIGNED_SHORT,
        Pr.IBuf
      );
    }

    static create_normal(a, i) {
      a[i].N = _vec3.normalize(
        _vec3.cross(_vec3.sub(a[i + 2].P, a[i].P), _vec3.sub(a[i + 1].P, a[i].P))
      );
      a[i + 1].N = _vec3.normalize(
        _vec3.cross(
          _vec3.sub(a[i].P, a[i + 1].P),
          _vec3.sub(a[i + 2].P, a[i + 1].P)
        )
      );
      a[i + 2].N = _vec3.normalize(
        _vec3.cross(
          _vec3.sub(a[i + 1].P, a[i + 2].P),
          _vec3.sub(a[i].P, a[i + 2].P)
        )
      );

      console.log(i + ":" + a[i].N.x + "," + a[i].N.y + "," + a[i].N.z);
    }
  }

  let kf = [];

  class InPut {
    constructor(Md, MouseClick, Wheel, Keys) {
      this.Keys = Keys;
      this.Mdx = Md[0];
      this.Mdy = Md[1];
      this.MouseClickLeft = MouseClick[0];
      this.MouseClickRight = MouseClick[1];
      this.MouseWheel = Wheel;
    }

    response(Md, MC, Wheel, K) {
      this.Keys = K;
      this.Mdx = Md[0];
      this.Mdy = Md[1];
      this.MouseClickLeft = MC[0];
      this.MouseClickRight = MC[1];
      this.MouseWheel = Wheel;
    }
  } // End of 'Input' function

  let myInput = new InPut([0, 0], [0, 0], kf.fill(0, 0, 255));

  let Pr_cube;

  function initCube() {
    let Vrts = [];
    Vrts[0] = new vertex(
      _vec3$1.set(-1, 1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 0, 1)
    );
    Vrts[1] = new vertex(
      _vec3$1.set(-1, -1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 0, 1)
    );
    Vrts[2] = new vertex(
      _vec3$1.set(1, 1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 0, 1)
    );
    Vrts[3] = new vertex(
      _vec3$1.set(1, -1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 0, 1)
    );

    Vrts[4] = new vertex(
      _vec3$1.set(-1, 1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(-1, 0, 0)
    );
    Vrts[5] = new vertex(
      _vec3$1.set(-1, -1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(-1, 0, 0)
    );
    Vrts[6] = new vertex(
      _vec3$1.set(-1, 1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(-1, 0, 0)
    );
    Vrts[7] = new vertex(
      _vec3$1.set(-1, -1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(-1, 0, 0)
    );

    Vrts[8] = new vertex(
      _vec3$1.set(-1, 1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 0, -1)
    );
    Vrts[9] = new vertex(
      _vec3$1.set(-1, -1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 0, -1)
    );
    Vrts[10] = new vertex(
      _vec3$1.set(1, 1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 0, -1)
    );
    Vrts[11] = new vertex(
      _vec3$1.set(1, -1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 0, -1)
    );

    Vrts[12] = new vertex(
      _vec3$1.set(1, 1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(1, 0, 0)
    );
    Vrts[13] = new vertex(
      _vec3$1.set(1, -1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(1, 0, 0)
    );
    Vrts[14] = new vertex(
      _vec3$1.set(1, 1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(1, 0, 0)
    );
    Vrts[15] = new vertex(
      _vec3$1.set(1, -1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(1, 0, 0)
    );

    Vrts[16] = new vertex(
      _vec3$1.set(-1, 1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 1, 0)
    );
    Vrts[17] = new vertex(
      _vec3$1.set(1, 1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 1, 0)
    );
    Vrts[18] = new vertex(
      _vec3$1.set(-1, 1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 1, 0)
    );
    Vrts[19] = new vertex(
      _vec3$1.set(1, 1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, 1, 0)
    );

    Vrts[20] = new vertex(
      _vec3$1.set(-1, -1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, -1, 0)
    );
    Vrts[21] = new vertex(
      _vec3$1.set(1, -1, 1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, -1, 0)
    );
    Vrts[22] = new vertex(
      _vec3$1.set(-1, -1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, -1, 0)
    );
    Vrts[23] = new vertex(
      _vec3$1.set(1, -1, -1),
      _vec3$1.set(0.47, 0.3, 0.27),
      _vec3$1.set(0, -1, 0)
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
    Pr_cube = prim.create(
      Vrts,
      Vrts.length,
      indices,
      indices.length,
      material.add(Matlib.Obsidian)
    );
  }

  function renderCube() {
    let Worl = _matr4.mulmatr(
      _matr4.scale(_vec3$1.set(0.7, 0.7, 0.7)),
      _matr4.translate(_vec3$1.set(0, 0, 0))
    );

    prim.draw(Pr_cube, Worl);
  }

  function initCam() {
    CamSet(_vec3$1.set(0, 0, 10), _vec3$1.set(0, 0, 0), _vec3$1.set(0, 1, 0));
  }

  function renderCam() {
    let Dist = _vec3$1.len(_vec3$1.sub(cam.At, cam.Loc));
    let cosT, sinT, cosP, sinP, plen, Azimuth, Elevator;
    let Wp, Hp, sx, sy;
    let dv;

    Wp = Hp = cam.ProjSize;
    cosT = (cam.Loc.y - cam.At.y) / Dist;
    sinT = Math.sqrt(1 - cosT * cosT);

    plen = Dist * sinT;
    cosP = (cam.Loc.z - cam.At.z) / plen;
    sinP = (cam.Loc.x - cam.At.x) / plen;

    Azimuth = (Math.atan2(sinP, cosP) / Math.PI) * 180;
    Elevator = (Math.atan2(sinT, cosT) / Math.PI) * 180;

    Azimuth +=
      myTimer.globalDeltaTime * 1.5 * (-5 * myInput.MouseClickLeft * myInput.Mdx);
    Elevator +=
      myTimer.globalDeltaTime * 1.5 * (-5 * myInput.MouseClickLeft * myInput.Mdy);

    if (Elevator < 0.08) Elevator = 0.08;
    else if (Elevator > 178.9) Elevator = 178.9;

    Dist += myTimer.globalDeltaTime * (2 * myInput.MouseWheel);

    if (Dist < 0.1) Dist = 0.1;
    if (myInput.MouseClickRight) {
      sx = (((myInput.Mdx * Wp) / 1200) * Dist) / -cam.ProjDist;
      sy = (((myInput.Mdy * Hp) / 1200) * Dist) / cam.ProjDist;

      dv = _vec3$1.add(_vec3$1.mulnum(cam.Right, sx), _vec3$1.mulnum(cam.Up, sy));

      cam.At = _vec3$1.add(cam.At, dv);
      cam.Loc = _vec3$1.add(cam.Loc, dv);
    }
      CamSet(
        _vec3$1.point_transform(
          _vec3$1.set(0, Dist, 0),
          _matr4.mulmatr(
            _matr4.mulmatr(_matr4.rotateX(Elevator), _matr4.rotateY(Azimuth)),
            _matr4.translate(cam.At)
          )
        ),
        cam.At,
        _vec3$1.set(0, 1, 0)
      );

      UBO.update(CamUBO, Ubo_cell.MatrVP, cam.MatrVP);
      UBO.update(CamUBO, Ubo_cell.MatrV, cam.MatrView);
      UBO.update(CamUBO, Ubo_cell.CamLoc, cam.Loc);
      UBO.update(CamUBO, Ubo_cell.CamAt, cam.At);
      UBO.update(CamUBO, Ubo_cell.CamRight, cam.Right);
      UBO.update(CamUBO, Ubo_cell.CamUp, cam.Up);
      UBO.update(CamUBO, Ubo_cell.CamDir, cam.Dir);
    //   if (Ani->Keys[VK_SHIFT] && Ani->KeysClick['P'])
    //     Ani->IsPause = !Ani->IsPause;
  }

  let CamUBO;

  function rndInit(vs, fs) {
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
      _vec3$1.set(cam.ProjDist, cam.ProjFarClip, myTimer.localTime),
      _vec3$1.set(
        myTimer.globalTime,
        myTimer.globalDeltaTime,
        myTimer.localDeltaTime
      ),
      _vec3$1.set(cam.ProjSize, 1, 1)
    );

    CamUBO = UBO.add(U, "BaseData");

    shaderInit(vs, fs);
    
    //initTetr();
    initCube();
    //initHex();
    // initIso();
    // initTruTetr();
    // initCubOct();
    // initTruCub();
    // initTruOct();
    // initDod();
    // initRhom();
    //initTruCubOct();
  }

  function render() {
    gl.clearColor(0.28, 0.47, 0.8, 1);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    renderCam();
    //renderTetr();
    //renderHex();
    renderCube();
    // renderIso();
    // renderDod();
    // renderTruTetr();
    // renderCubOct();
    // renderTruCub();
    // renderTruOct();
    // renderRhom();
    //renderTruCubOct();
  }

  let names = ["../bin/frag.glsl", "../bin/vert.glsl"];
  let Md = [0, 0],
    MouseClick = [0, 0],
    Wheel = 0,
    Keys = [];
  Keys.fill(0, 0, 255);

  Promise.all(names.map((u) => fetch(u)))
    .then((responses) => Promise.all(responses.map((res) => res.text())))
    .then((texts) => {
      rndInit(texts[1], texts[0]);
      const draw = () => {
        //
        window.addEventListener("mousedown", (e) => {
          if (e.button == 0) {
            MouseClick[0] = 1;
          }
          if (e.button == 2) {
            MouseClick[1] = 1;
          }
        });

        window.addEventListener("mouseup", (e) => {
          if (e.button == 0) {
            MouseClick[0] = 0;
          }
          if (e.button == 2) {
            MouseClick[1] = 0;
          }
        });

        window.addEventListener("mousemove", (e) => {
          Md[0] = e.movementX;
          Md[1] = e.movementY;
        });

        window.addEventListener("keydown", (e) => {
          Keys[e.keyCode] = 1;
        });

        window.addEventListener("keyup", (e) => {
          Keys[e.keyCode] = 0;
        });

        window.addEventListener("wheel", (e) => {
          Wheel = e.deltaY;
        });

        myTimer.response();
        myInput.response(Md, MouseClick, Wheel, Keys);
        render();
        Wheel = 0;
        window.requestAnimationFrame(draw);

      };
      draw();
    });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21hdGgvbWF0aHZlYzMuanMiLCIuLi9zcmMvbWF0aC9tYXRobWF0NC5qcyIsIi4uL3NyYy9tYXRoL21hdGhjYW0uanMiLCIuLi9zcmMvcm5kL3JuZGRhdGEuanMiLCIuLi9zcmMvcm5kL3Jlcy9zaGFkZXIuanMiLCIuLi9zcmMvcm5kL3Jlcy91Ym8uanMiLCIuLi9zcmMvdGltZXIuanMiLCIuLi9zcmMvcm5kL3Jlcy9tYXRlcmlhbC5qcyIsIi4uL3NyYy9ybmQvcHJpbS5qcyIsIi4uL3NyYy9pbnB1dC5qcyIsIi4uL3NyYy91bml0cy91X2N1YmUuanMiLCIuLi9zcmMvdW5pdHMvdV9jb250cm9sLmpzIiwiLi4vc3JjL3JuZC9ybmRiYXNlLmpzIiwiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIF92ZWMzIHtcclxuICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICAgIHRoaXMueiA9IHo7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2V0KHgsIHksIHopIHtcclxuICAgIHJldHVybiBuZXcgX3ZlYzMoeCwgeSwgeik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkKGEsIGIpIHtcclxuICAgIHJldHVybiBuZXcgX3ZlYzMoYS54ICsgYi54LCBhLnkgKyBiLnksIGEueiArIGIueik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3ViKGEsIGIpIHtcclxuICAgIHJldHVybiBuZXcgX3ZlYzMoYS54IC0gYi54LCBhLnkgLSBiLnksIGEueiAtIGIueik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbXVsbnVtKGEsIGIpIHtcclxuICAgIHJldHVybiBuZXcgX3ZlYzMoYS54ICogYiwgYS55ICogYiwgYS56ICogYik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGl2bnVtKGEsIGIpIHtcclxuICAgIHJldHVybiBuZXcgX3ZlYzMoYS54IC8gYiwgYS55IC8gYiwgYS56IC8gYik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbmVnKGEpIHtcclxuICAgIHJldHVybiBuZXcgX3ZlYzMoLWEueCwgLWEueSwgLWEueik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZG90KGEsIGIpIHtcclxuICAgIHJldHVybiBhLnggKiBiLnggKyBhLnkgKiBiLnkgKyBhLnogKiBiLno7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3Jvc3MoYSwgYikge1xyXG4gICAgcmV0dXJuIG5ldyBfdmVjMyhcclxuICAgICAgYS55ICogYi56IC0gYS56ICogYi55LFxyXG4gICAgICBhLnogKiBiLnggLSBhLnggKiBiLnosXHJcbiAgICAgIGEueCAqIGIueSAtIGIueCAqIGEueVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBsZW4yKGEpIHtcclxuICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLno7XHJcbiAgfVxyXG5cclxuICAvLyAgcmV0dXJuIFZlYzNTZXQoXHJcbiAgLy8gICAgIFAuWCAqIE0uTVswXVswXSArIFAuWSAqIE0uTVsxXVswXSArIFAuWiAqIE0uTVsyXVswXSArIE0uTVszXVswXSxcclxuICAvLyAgICAgUC5YICogTS5NWzBdWzFdICsgUC5ZICogTS5NWzFdWzFdICsgUC5aICogTS5NWzJdWzFdICsgTS5NWzNdWzFdLFxyXG4gIC8vICAgICBQLlggKiBNLk1bMF1bMl0gKyBQLlkgKiBNLk1bMV1bMl0gKyBQLlogKiBNLk1bMl1bMl0gKyBNLk1bM11bMl1cclxuXHJcbiAgc3RhdGljIGxlbihhKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KF92ZWMzLmxlbjIoYSkpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIG5vcm1hbGl6ZShhKSB7XHJcbiAgICByZXR1cm4gX3ZlYzMuZGl2bnVtKGEsIF92ZWMzLmxlbihhKSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcG9pbnRfdHJhbnNmb3JtKGEsIGIpIHtcclxuICAgIHJldHVybiBuZXcgX3ZlYzMoXHJcbiAgICAgIGEueCAqIGJbMF1bMF0gKyBhLnkgKiBiWzFdWzBdICsgYS56ICogYlsyXVswXSArIGJbM11bMF0sXHJcbiAgICAgIGEueCAqIGJbMF1bMV0gKyBhLnkgKiBiWzFdWzFdICsgYS56ICogYlsyXVsxXSArIGJbM11bMV0sXHJcbiAgICAgIGEueCAqIGJbMF1bMl0gKyBhLnkgKiBiWzFdWzJdICsgYS56ICogYlsyXVsyXSArIGJbM11bMl1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdmVjdG9ydF9yYW5zZm9ybShhLCBiKSB7XHJcbiAgICByZXR1cm4gbmV3IF92ZWMzKFxyXG4gICAgICBhLnggKiBiWzBdWzBdICsgYS55ICogYlsxXVswXSArIGEueiAqIGJbMl1bMF0sXHJcbiAgICAgIGEueCAqIGJbMF1bMV0gKyBhLnkgKiBiWzFdWzFdICsgYS56ICogYlsyXVsxXSxcclxuICAgICAgYS54ICogYlswXVsyXSArIGEueSAqIGJbMV1bMl0gKyBhLnogKiBiWzJdWzJdXHJcbiAgICApO1xyXG4gIH1cclxuICAvLyBGTFQgdyA9IFYuWCAqIE0uTVswXVszXSArIFYuWSAqIE0uTVsxXVszXSArIFYuWiAqIE0uTVsyXVszXSArIE0uTVszXVszXTtcclxuXHJcbiAgc3RhdGljIG11bF9tYXRyKGEsIGIpIHtcclxuICAgIGNvbnN0IHcgPSBhLnggKiBiWzBdWzNdICsgYS55ICogYlsxXVszXSArIGEueiAqIGJbMl1bM10gKyBiWzNdWzNdO1xyXG4gICAgcmV0dXJuIG5ldyBfdmVjMyhcclxuICAgICAgKGEgKiBiWzBdWzBdICsgYS55ICogYlsxXVswXSArIGEueiAqIGJbMl1bMF0gKyBiWzNdWzBdKSAvIHcsXHJcbiAgICAgIChhICogYlswXVsxXSArIGEueSAqIGJbMV1bMV0gKyBhLnogKiBiWzJdWzFdICsgYlszXVsxXSkgLyB3LFxyXG4gICAgICAoYSAqIGJbMF1bMl0gKyBhLnkgKiBiWzFdWzJdICsgYS56ICogYlsyXVsyXSArIGJbM11bMl0pIC8gd1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB2ZWMzKGEpIHtcclxuICAgIHJldHVybiBbYS54LCBhLnksIGEuel07XHJcbiAgfVxyXG59XHJcbiIsImZ1bmN0aW9uIEQyUihkZWdyZWUpIHtcclxuICByZXR1cm4gKGRlZ3JlZSAqIE1hdGguUEkpIC8gMTgwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgX21hdHI0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGEwMCxcclxuICAgIGEwMSxcclxuICAgIGEwMixcclxuICAgIGEwMyxcclxuICAgIGExMCxcclxuICAgIGExMSxcclxuICAgIGExMixcclxuICAgIGExMyxcclxuICAgIGEyMCxcclxuICAgIGEyMSxcclxuICAgIGEyMixcclxuICAgIGEyMyxcclxuICAgIGEzMCxcclxuICAgIGEzMSxcclxuICAgIGEzMixcclxuICAgIGEzM1xyXG4gICkge1xyXG4gICAgdGhpcy5hID0gW1xyXG4gICAgICBbYTAwLCBhMDEsIGEwMiwgYTAzXSxcclxuICAgICAgW2ExMCwgYTExLCBhMTIsIGExM10sXHJcbiAgICAgIFthMjAsIGEyMSwgYTIyLCBhMjNdLFxyXG4gICAgICBbYTMwLCBhMzEsIGEzMiwgYTMzXSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaWRlbnRpdHkoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9tYXRyNCgxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxKS5hO1xyXG4gIH1cclxuICBzdGF0aWMgc2V0KFxyXG4gICAgYTAwLFxyXG4gICAgYTAxLFxyXG4gICAgYTAyLFxyXG4gICAgYTAzLFxyXG4gICAgYTEwLFxyXG4gICAgYTExLFxyXG4gICAgYTEyLFxyXG4gICAgYTEzLFxyXG4gICAgYTIwLFxyXG4gICAgYTIxLFxyXG4gICAgYTIyLFxyXG4gICAgYTIzLFxyXG4gICAgYTMwLFxyXG4gICAgYTMxLFxyXG4gICAgYTMyLFxyXG4gICAgYTMzXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gbmV3IF9tYXRyNChcclxuICAgICAgYTAwLFxyXG4gICAgICBhMDEsXHJcbiAgICAgIGEwMixcclxuICAgICAgYTAzLFxyXG4gICAgICBhMTAsXHJcbiAgICAgIGExMSxcclxuICAgICAgYTEyLFxyXG4gICAgICBhMTMsXHJcbiAgICAgIGEyMCxcclxuICAgICAgYTIxLFxyXG4gICAgICBhMjIsXHJcbiAgICAgIGEyMyxcclxuICAgICAgYTMwLFxyXG4gICAgICBhMzEsXHJcbiAgICAgIGEzMixcclxuICAgICAgYTMzXHJcbiAgICApLmE7XHJcbiAgfVxyXG4gIHN0YXRpYyB0cmFuc2xhdGUoYSkge1xyXG4gICAgcmV0dXJuIG5ldyBfbWF0cjQoMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgYS54LCBhLnksIGEueiwgMSkuYTtcclxuICB9XHJcbiAgc3RhdGljIHNjYWxlKGEpIHtcclxuICAgIHJldHVybiBuZXcgX21hdHI0KGEueCwgMCwgMCwgMCwgMCwgYS55LCAwLCAwLCAwLCAwLCBhLnosIDAsIDAsIDAsIDAsIDEpLmE7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcm90YXRlWihkZWdyZWUpIHtcclxuICAgIGNvbnN0IHIgPSBEMlIoZGVncmVlKSxcclxuICAgICAgY28gPSBNYXRoLmNvcyhyKSxcclxuICAgICAgc2kgPSBNYXRoLnNpbihyKTtcclxuICAgIGxldCBtID0gX21hdHI0LmlkZW50aXR5KCk7XHJcblxyXG4gICAgbVswXVswXSA9IGNvO1xyXG4gICAgbVsxXVswXSA9IC1zaTtcclxuICAgIG1bMF1bMV0gPSBzaTtcclxuICAgIG1bMV1bMV0gPSBjbztcclxuXHJcbiAgICByZXR1cm4gbTtcclxuICB9XHJcbiAgc3RhdGljIHJvdGF0ZVgoZGVncmVlKSB7XHJcbiAgICBjb25zdCByID0gRDJSKGRlZ3JlZSksXHJcbiAgICAgIGNvID0gTWF0aC5jb3MociksXHJcbiAgICAgIHNpID0gTWF0aC5zaW4ocik7XHJcbiAgICBsZXQgbSA9IF9tYXRyNC5pZGVudGl0eSgpO1xyXG5cclxuICAgIG1bMV1bMV0gPSBjbztcclxuICAgIG1bMl1bMV0gPSAtc2k7XHJcbiAgICBtWzFdWzJdID0gc2k7XHJcbiAgICBtWzJdWzJdID0gY287XHJcblxyXG4gICAgcmV0dXJuIG07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcm90YXRlWShkZWdyZWUpIHtcclxuICAgIGNvbnN0IHIgPSBEMlIoZGVncmVlKSxcclxuICAgICAgY28gPSBNYXRoLmNvcyhyKSxcclxuICAgICAgc2kgPSBNYXRoLnNpbihyKTtcclxuICAgIGxldCBtID0gX21hdHI0LmlkZW50aXR5KCk7XHJcblxyXG4gICAgbVswXVswXSA9IGNvO1xyXG4gICAgbVsyXVswXSA9IHNpO1xyXG4gICAgbVswXVsyXSA9IC1zaTtcclxuICAgIG1bMl1bMl0gPSBjbztcclxuXHJcbiAgICByZXR1cm4gbTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBtdWxtYXRyKG0xLCBtMikge1xyXG4gICAgbGV0IHIgPSBfbWF0cjQuc2V0KDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDApLFxyXG4gICAgICBrID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgZm9yIChyW2ldW2pdID0gMCwgayA9IDA7IGsgPCA0OyBrKyspIHtcclxuICAgICAgICAgIHJbaV1bal0gKz0gbTFbaV1ba10gKiBtMltrXVtqXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBtdWxtYXRyKG0xLCBtMikge1xyXG4gICAgbGV0IHIgPSBfbWF0cjQuc2V0KDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDApLFxyXG4gICAgICBrID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgZm9yIChyW2ldW2pdID0gMCwgayA9IDA7IGsgPCA0OyBrKyspIHtcclxuICAgICAgICAgIHJbaV1bal0gKz0gbTFbaV1ba10gKiBtMltrXVtqXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHRyYW5zcG9zZShtKSB7XHJcbiAgICBsZXQgciA9IF9tYXRyNC5zZXQoMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgIHJbaV1bal0gPSBtW2pdW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkZXRlcm0zeDMoYTExLCBhMTIsIGExMywgYTIxLCBhMjIsIGEyMywgYTMxLCBhMzIsIGEzMykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgYTExICogYTIyICogYTMzIC1cclxuICAgICAgYTExICogYTIzICogYTMyIC1cclxuICAgICAgYTEyICogYTIxICogYTMzICtcclxuICAgICAgYTEyICogYTIzICogYTMxICtcclxuICAgICAgYTEzICogYTIxICogYTMyIC1cclxuICAgICAgYTEzICogYTIyICogYTMxXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRldGVybShtKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBtWzBdWzBdICpcclxuICAgICAgICBfbWF0cjQuZGV0ZXJtM3gzKFxyXG4gICAgICAgICAgbVsxXVsxXSxcclxuICAgICAgICAgIG1bMV1bMl0sXHJcbiAgICAgICAgICBtWzFdWzNdLFxyXG4gICAgICAgICAgbVsyXVsxXSxcclxuICAgICAgICAgIG1bMl1bMl0sXHJcbiAgICAgICAgICBtWzJdWzNdLFxyXG4gICAgICAgICAgbVszXVsxXSxcclxuICAgICAgICAgIG1bM11bMl0sXHJcbiAgICAgICAgICBtWzNdWzNdXHJcbiAgICAgICAgKSAtXHJcbiAgICAgIG1bMF1bMV0gKlxyXG4gICAgICAgIF9tYXRyNC5kZXRlcm0zeDMoXHJcbiAgICAgICAgICBtWzFdWzBdLFxyXG4gICAgICAgICAgbVsxXVsyXSxcclxuICAgICAgICAgIG1bMV1bM10sXHJcbiAgICAgICAgICBtWzJdWzBdLFxyXG4gICAgICAgICAgbVsyXVsyXSxcclxuICAgICAgICAgIG1bMl1bM10sXHJcbiAgICAgICAgICBtWzNdWzBdLFxyXG4gICAgICAgICAgbVszXVsyXSxcclxuICAgICAgICAgIG1bM11bM11cclxuICAgICAgICApICtcclxuICAgICAgbVswXVsyXSAqXHJcbiAgICAgICAgX21hdHI0LmRldGVybTN4MyhcclxuICAgICAgICAgIG1bMV1bMF0sXHJcbiAgICAgICAgICBtWzFdWzFdLFxyXG4gICAgICAgICAgbVsxXVszXSxcclxuICAgICAgICAgIG1bMl1bMF0sXHJcbiAgICAgICAgICBtWzJdWzFdLFxyXG4gICAgICAgICAgbVsyXVszXSxcclxuICAgICAgICAgIG1bM11bMF0sXHJcbiAgICAgICAgICBtWzNdWzFdLFxyXG4gICAgICAgICAgbVszXVszXVxyXG4gICAgICAgICkgLVxyXG4gICAgICBtWzBdWzNdICpcclxuICAgICAgICBfbWF0cjQuZGV0ZXJtM3gzKFxyXG4gICAgICAgICAgbVsxXVswXSxcclxuICAgICAgICAgIG1bMV1bMV0sXHJcbiAgICAgICAgICBtWzFdWzJdLFxyXG4gICAgICAgICAgbVsyXVswXSxcclxuICAgICAgICAgIG1bMl1bMV0sXHJcbiAgICAgICAgICBtWzJdWzJdLFxyXG4gICAgICAgICAgbVszXVswXSxcclxuICAgICAgICAgIG1bM11bMV0sXHJcbiAgICAgICAgICBtWzNdWzJdXHJcbiAgICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpbnZlcnNlKG0pIHtcclxuICAgIGNvbnN0IGRldCA9IF9tYXRyNC5kZXRlcm0obSk7XHJcbiAgICBsZXQgciA9IF9tYXRyNC5pZGVudGl0eSgpO1xyXG4gICAgaWYgKGRldCA9PT0gMCkgcmV0dXJuIHI7XHJcbiAgICByWzBdWzBdID1cclxuICAgICAgX21hdHI0LmRldGVybTN4MyhcclxuICAgICAgICBtWzFdWzFdLFxyXG4gICAgICAgIG1bMV1bMl0sXHJcbiAgICAgICAgbVsxXVszXSxcclxuICAgICAgICBtWzJdWzFdLFxyXG4gICAgICAgIG1bMl1bMl0sXHJcbiAgICAgICAgbVsyXVszXSxcclxuICAgICAgICBtWzNdWzFdLFxyXG4gICAgICAgIG1bM11bMl0sXHJcbiAgICAgICAgbVszXVszXVxyXG4gICAgICApIC8gZGV0O1xyXG5cclxuICAgIHJbMV1bMF0gPVxyXG4gICAgICBfbWF0cjQuZGV0ZXJtM3gzKFxyXG4gICAgICAgIG1bMV1bMF0sXHJcbiAgICAgICAgbVsxXVsyXSxcclxuICAgICAgICBtWzFdWzNdLFxyXG4gICAgICAgIG1bMl1bMF0sXHJcbiAgICAgICAgbVsyXVsyXSxcclxuICAgICAgICBtWzJdWzNdLFxyXG4gICAgICAgIG1bM11bMF0sXHJcbiAgICAgICAgbVszXVsyXSxcclxuICAgICAgICBtWzNdWzNdXHJcbiAgICAgICkgLyAtZGV0O1xyXG4gICAgclsyXVswXSA9XHJcbiAgICAgIF9tYXRyNC5kZXRlcm0zeDMoXHJcbiAgICAgICAgbVsxXVswXSxcclxuICAgICAgICBtWzFdWzFdLFxyXG4gICAgICAgIG1bMV1bM10sXHJcbiAgICAgICAgbVsyXVswXSxcclxuICAgICAgICBtWzJdWzFdLFxyXG4gICAgICAgIG1bMl1bM10sXHJcbiAgICAgICAgbVszXVswXSxcclxuICAgICAgICBtWzNdWzFdLFxyXG4gICAgICAgIG1bM11bM11cclxuICAgICAgKSAvIGRldDtcclxuICAgIHJbM11bMF0gPVxyXG4gICAgICBfbWF0cjQuZGV0ZXJtM3gzKFxyXG4gICAgICAgIG1bMV1bMF0sXHJcbiAgICAgICAgbVsxXVsxXSxcclxuICAgICAgICBtWzFdWzJdLFxyXG4gICAgICAgIG1bMl1bMF0sXHJcbiAgICAgICAgbVsyXVsxXSxcclxuICAgICAgICBtWzJdWzJdLFxyXG4gICAgICAgIG1bM11bMF0sXHJcbiAgICAgICAgbVszXVsxXSxcclxuICAgICAgICBtWzNdWzJdXHJcbiAgICAgICkgLyAtZGV0O1xyXG5cclxuICAgIHJbMF1bMV0gPVxyXG4gICAgICBfbWF0cjQuZGV0ZXJtM3gzKFxyXG4gICAgICAgIG1bMF1bMV0sXHJcbiAgICAgICAgbVswXVsyXSxcclxuICAgICAgICBtWzBdWzNdLFxyXG4gICAgICAgIG1bMl1bMV0sXHJcbiAgICAgICAgbVsyXVsyXSxcclxuICAgICAgICBtWzJdWzNdLFxyXG4gICAgICAgIG1bM11bMV0sXHJcbiAgICAgICAgbVszXVsyXSxcclxuICAgICAgICBtWzNdWzNdXHJcbiAgICAgICkgLyAtZGV0O1xyXG5cclxuICAgIHJbMV1bMV0gPVxyXG4gICAgICBfbWF0cjQuZGV0ZXJtM3gzKFxyXG4gICAgICAgIG1bMF1bMF0sXHJcbiAgICAgICAgbVswXVsyXSxcclxuICAgICAgICBtWzBdWzNdLFxyXG4gICAgICAgIG1bMl1bMF0sXHJcbiAgICAgICAgbVsyXVsyXSxcclxuICAgICAgICBtWzJdWzNdLFxyXG4gICAgICAgIG1bM11bMF0sXHJcbiAgICAgICAgbVszXVsyXSxcclxuICAgICAgICBtWzNdWzNdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgclsyXVsxXSA9XHJcbiAgICAgIF9tYXRyNC5kZXRlcm0zeDMoXHJcbiAgICAgICAgbVswXVswXSxcclxuICAgICAgICBtWzBdWzFdLFxyXG4gICAgICAgIG1bMF1bM10sXHJcbiAgICAgICAgbVsyXVswXSxcclxuICAgICAgICBtWzJdWzFdLFxyXG4gICAgICAgIG1bMl1bM10sXHJcbiAgICAgICAgbVszXVswXSxcclxuICAgICAgICBtWzNdWzFdLFxyXG4gICAgICAgIG1bM11bM11cclxuICAgICAgKSAvIC1kZXQ7XHJcbiAgICByWzNdWzFdID1cclxuICAgICAgX21hdHI0LmRldGVybTN4MyhcclxuICAgICAgICBtWzBdWzBdLFxyXG4gICAgICAgIG1bMF1bMV0sXHJcbiAgICAgICAgbVswXVsyXSxcclxuICAgICAgICBtWzJdWzBdLFxyXG4gICAgICAgIG1bMl1bMV0sXHJcbiAgICAgICAgbVsyXVsyXSxcclxuICAgICAgICBtWzNdWzBdLFxyXG4gICAgICAgIG1bM11bMV0sXHJcbiAgICAgICAgbVszXVsyXVxyXG4gICAgICApIC8gZGV0O1xyXG4gICAgclswXVsyXSA9XHJcbiAgICAgIF9tYXRyNC5kZXRlcm0zeDMoXHJcbiAgICAgICAgbVswXVsxXSxcclxuICAgICAgICBtWzBdWzJdLFxyXG4gICAgICAgIG1bMF1bM10sXHJcbiAgICAgICAgbVsxXVsxXSxcclxuICAgICAgICBtWzFdWzJdLFxyXG4gICAgICAgIG1bMV1bM10sXHJcbiAgICAgICAgbVszXVsxXSxcclxuICAgICAgICBtWzNdWzJdLFxyXG4gICAgICAgIG1bM11bM11cclxuICAgICAgKSAvIGRldDtcclxuICAgIHJbMV1bMl0gPVxyXG4gICAgICBfbWF0cjQuZGV0ZXJtM3gzKFxyXG4gICAgICAgIG1bMF1bMF0sXHJcbiAgICAgICAgbVswXVsyXSxcclxuICAgICAgICBtWzBdWzNdLFxyXG4gICAgICAgIG1bMV1bMF0sXHJcbiAgICAgICAgbVsxXVsyXSxcclxuICAgICAgICBtWzFdWzNdLFxyXG4gICAgICAgIG1bM11bMF0sXHJcbiAgICAgICAgbVszXVsyXSxcclxuICAgICAgICBtWzNdWzNdXHJcbiAgICAgICkgLyAtZGV0O1xyXG4gICAgclsyXVsyXSA9XHJcbiAgICAgIF9tYXRyNC5kZXRlcm0zeDMoXHJcbiAgICAgICAgbVswXVswXSxcclxuICAgICAgICBtWzBdWzFdLFxyXG4gICAgICAgIG1bMF1bM10sXHJcbiAgICAgICAgbVsxXVswXSxcclxuICAgICAgICBtWzFdWzFdLFxyXG4gICAgICAgIG1bMV1bM10sXHJcbiAgICAgICAgbVszXVswXSxcclxuICAgICAgICBtWzNdWzFdLFxyXG4gICAgICAgIG1bM11bM11cclxuICAgICAgKSAvIGRldDtcclxuICAgIHJbM11bMl0gPVxyXG4gICAgICBfbWF0cjQuZGV0ZXJtM3gzKFxyXG4gICAgICAgIG1bMF1bMF0sXHJcbiAgICAgICAgbVswXVsxXSxcclxuICAgICAgICBtWzBdWzJdLFxyXG4gICAgICAgIG1bMV1bMF0sXHJcbiAgICAgICAgbVsyXVsxXSxcclxuICAgICAgICBtWzFdWzJdLFxyXG4gICAgICAgIG1bM11bMF0sXHJcbiAgICAgICAgbVszXVsxXSxcclxuICAgICAgICBtWzNdWzJdXHJcbiAgICAgICkgLyAtZGV0O1xyXG4gICAgclswXVszXSA9XHJcbiAgICAgIF9tYXRyNC5kZXRlcm0zeDMoXHJcbiAgICAgICAgbVswXVsxXSxcclxuICAgICAgICBtWzBdWzJdLFxyXG4gICAgICAgIG1bMF1bM10sXHJcbiAgICAgICAgbVsxXVsxXSxcclxuICAgICAgICBtWzFdWzJdLFxyXG4gICAgICAgIG1bMV1bM10sXHJcbiAgICAgICAgbVsyXVsxXSxcclxuICAgICAgICBtWzJdWzJdLFxyXG4gICAgICAgIG1bMl1bM11cclxuICAgICAgKSAvIC1kZXQ7XHJcbiAgICByWzFdWzNdID1cclxuICAgICAgX21hdHI0LmRldGVybTN4MyhcclxuICAgICAgICBtWzBdWzBdLFxyXG4gICAgICAgIG1bMF1bMl0sXHJcbiAgICAgICAgbVswXVszXSxcclxuICAgICAgICBtWzFdWzBdLFxyXG4gICAgICAgIG1bMV1bMl0sXHJcbiAgICAgICAgbVsxXVszXSxcclxuICAgICAgICBtWzJdWzBdLFxyXG4gICAgICAgIG1bMl1bMl0sXHJcbiAgICAgICAgbVsyXVszXVxyXG4gICAgICApIC8gZGV0O1xyXG4gICAgclsyXVszXSA9XHJcbiAgICAgIF9tYXRyNC5kZXRlcm0zeDMoXHJcbiAgICAgICAgbVswXVswXSxcclxuICAgICAgICBtWzBdWzFdLFxyXG4gICAgICAgIG1bMF1bM10sXHJcbiAgICAgICAgbVsxXVswXSxcclxuICAgICAgICBtWzFdWzFdLFxyXG4gICAgICAgIG1bMV1bM10sXHJcbiAgICAgICAgbVsyXVswXSxcclxuICAgICAgICBtWzJdWzFdLFxyXG4gICAgICAgIG1bMl1bM11cclxuICAgICAgKSAvIC1kZXQ7XHJcbiAgICByWzNdWzNdID1cclxuICAgICAgX21hdHI0LmRldGVybTN4MyhcclxuICAgICAgICBtWzBdWzBdLFxyXG4gICAgICAgIG1bMF1bMV0sXHJcbiAgICAgICAgbVswXVsyXSxcclxuICAgICAgICBtWzFdWzBdLFxyXG4gICAgICAgIG1bMl1bMV0sXHJcbiAgICAgICAgbVsxXVsyXSxcclxuICAgICAgICBtWzJdWzBdLFxyXG4gICAgICAgIG1bMl1bMV0sXHJcbiAgICAgICAgbVsyXVsyXVxyXG4gICAgICApIC8gZGV0O1xyXG4gICAgcmV0dXJuIHI7XHJcbiAgfVxyXG4gIHN0YXRpYyBmcnVzdHVtKGwsIHIsIGIsIHQsIG4sIGYpIHtcclxuICAgIGxldCBtID0gX21hdHI0LmlkZW50aXR5KCk7XHJcblxyXG4gICAgbVswXVswXSA9ICgyICogbikgLyAociAtIGwpO1xyXG4gICAgbVswXVsxXSA9IDA7XHJcbiAgICBtWzBdWzJdID0gMDtcclxuICAgIG1bMF1bM10gPSAwO1xyXG5cclxuICAgIG1bMV1bMF0gPSAwO1xyXG4gICAgbVsxXVsxXSA9ICgyICogbikgLyAodCAtIGIpO1xyXG4gICAgbVsxXVsyXSA9IDA7XHJcbiAgICBtWzFdWzNdID0gMDtcclxuXHJcbiAgICBtWzJdWzBdID0gKHIgKyBsKSAvIChyIC0gbCk7XHJcbiAgICBtWzJdWzFdID0gKHQgKyBiKSAvICh0IC0gYik7XHJcbiAgICBtWzJdWzJdID0gKGYgKyBuKSAvIC0oZiAtIG4pO1xyXG4gICAgbVsyXVszXSA9IC0xO1xyXG5cclxuICAgIG1bM11bMF0gPSAwO1xyXG4gICAgbVszXVsxXSA9IDA7XHJcbiAgICBtWzNdWzJdID0gKC0yICogbiAqIGYpIC8gKGYgLSBuKTtcclxuICAgIG1bM11bM10gPSAwO1xyXG5cclxuICAgIHJldHVybiBtO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHRvYXJyKG0pIHtcclxuICAgIGxldCB2ID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgZm9yIChsZXQgZyA9IDA7IGcgPCA0OyBnKyspIHtcclxuICAgICAgICB2LnB1c2gobVtpXVtnXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdjtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgX3ZlYzMgfSBmcm9tIFwiLi9tYXRodmVjMy5qc1wiO1xyXG5pbXBvcnQgeyBfbWF0cjQgfSBmcm9tIFwiLi9tYXRobWF0NC5qc1wiO1xyXG5leHBvcnQgbGV0IGNhbTtcclxuXHJcbmxldCBQcm9qU2l6ZSA9IDAuMSAvKiBQcm9qZWN0IHBsYW5lIGZpdCBzcXVhcmUgKi8sXHJcbiAgUHJvakRpc3QgPSAwLjEgLyogRGlzdGFuY2UgdG8gcHJvamVjdCBwbGFuZSBmcm9tIHZpZXdlciAobmVhcikgKi8sXHJcbiAgUHJvakZhckNsaXAgPSAzMDA7IC8qIERpc3RhbmNlIHRvIHByb2plY3QgZmFyIGNsaXAgcGxhbmUgKGZhcikgKi9cclxuXHJcblxyXG5jbGFzcyBfY2FtZXJhIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIFByb2pTaXplLFxyXG4gICAgUHJvakRpc3QsXHJcbiAgICBQcm9qRmFyQ2xpcCxcclxuICAgIE1hdHJWUCxcclxuICAgIE1hdHJWaWV3LFxyXG4gICAgTWF0clByb2osXHJcbiAgICBMb2MsXHJcbiAgICBBdCxcclxuICAgIERpcixcclxuICAgIFVwLFxyXG4gICAgUmlnaHRcclxuICApIHtcclxuICAgIHRoaXMuUHJvalNpemUgPSBQcm9qU2l6ZTtcclxuICAgIHRoaXMuUHJvakRpc3QgPSBQcm9qRGlzdDtcclxuICAgIHRoaXMuUHJvakZhckNsaXAgPSBQcm9qRmFyQ2xpcDtcclxuICAgIHRoaXMuTWF0clZQID0gTWF0clZQO1xyXG4gICAgdGhpcy5NYXRyVmlldyA9IE1hdHJWaWV3O1xyXG4gICAgdGhpcy5NYXRyUHJvaiA9IE1hdHJQcm9qO1xyXG4gICAgdGhpcy5Mb2MgPSBMb2M7XHJcbiAgICB0aGlzLkF0ID0gQXQ7XHJcbiAgICB0aGlzLkRpciA9IERpcjtcclxuICAgIHRoaXMuVXAgPSBVcDtcclxuICAgIHRoaXMuUmlnaHQgPSBSaWdodDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB2aWV3KExvYywgQXQsIFVwMSkge1xyXG4gICAgY29uc3QgRGlyID0gX3ZlYzMubm9ybWFsaXplKF92ZWMzLnN1YihBdCwgTG9jKSksXHJcbiAgICAgIFJpZ2h0ID0gX3ZlYzMubm9ybWFsaXplKF92ZWMzLmNyb3NzKERpciwgVXAxKSksXHJcbiAgICAgIFVwID0gX3ZlYzMuY3Jvc3MoUmlnaHQsIERpcik7XHJcbiAgICByZXR1cm4gX21hdHI0LnNldChcclxuICAgICAgUmlnaHQueCxcclxuICAgICAgVXAueCxcclxuICAgICAgLURpci54LFxyXG4gICAgICAwLFxyXG4gICAgICBSaWdodC55LFxyXG4gICAgICBVcC55LFxyXG5cclxuICAgICAgLURpci55LFxyXG4gICAgICAwLFxyXG4gICAgICBSaWdodC56LFxyXG4gICAgICBVcC56LFxyXG4gICAgICAtRGlyLnosXHJcbiAgICAgIDAsXHJcbiAgICAgIC1fdmVjMy5kb3QoTG9jLCBSaWdodCksXHJcbiAgICAgIC1fdmVjMy5kb3QoTG9jLCBVcCksXHJcbiAgICAgIF92ZWMzLmRvdChMb2MsIERpciksXHJcbiAgICAgIDFcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ2FtU2V0KExvYywgQXQsIFVwMSkge1xyXG4gIGxldCBVcCwgRGlyLCBSaWdodDtcclxuICBgYDtcclxuICBsZXQgRnJhbWVXID0gMTIwMCxcclxuICAgIEZyYW1lSCA9IDEyMDA7XHJcbiAgbGV0IE1hdHJWaWV3ID0gX2NhbWVyYS52aWV3KExvYywgQXQsIFVwMSk7XHJcblxyXG4gIFVwID0gX3ZlYzMuc2V0KE1hdHJWaWV3WzBdWzFdLCBNYXRyVmlld1sxXVsxXSwgTWF0clZpZXdbMl1bMV0pO1xyXG4gIERpciA9IF92ZWMzLnNldCgtTWF0clZpZXdbMF1bMl0sIC1NYXRyVmlld1sxXVsyXSwgLU1hdHJWaWV3WzJdWzJdKTtcclxuICBSaWdodCA9IF92ZWMzLnNldChNYXRyVmlld1swXVswXSwgTWF0clZpZXdbMV1bMF0sIE1hdHJWaWV3WzJdWzBdKTtcclxuXHJcbiAgY29uc3QgcnggPSBQcm9qU2l6ZSxcclxuICAgIHJ5ID0gUHJvalNpemU7XHJcblxyXG4gIGxldCBNYXRyUHJvaiA9IF9tYXRyNC5mcnVzdHVtKFxyXG4gICAgICAtcnggLyAyLFxyXG4gICAgICByeCAvIDIsXHJcbiAgICAgIC1yeSAvIDIsXHJcbiAgICAgIHJ5IC8gMixcclxuXHJcbiAgICAgIFByb2pEaXN0LFxyXG4gICAgICBQcm9qRmFyQ2xpcFxyXG4gICAgKSxcclxuICAgIE1hdHJWUCA9IF9tYXRyNC5tdWxtYXRyKE1hdHJWaWV3LCBNYXRyUHJvaik7XHJcblxyXG4gIGNhbSA9ICBuZXcgX2NhbWVyYShcclxuICAgIFByb2pTaXplLFxyXG4gICAgUHJvakRpc3QsXHJcbiAgICBQcm9qRmFyQ2xpcCxcclxuICAgIE1hdHJWUCxcclxuICAgIE1hdHJWaWV3LFxyXG4gICAgTWF0clByb2osXHJcbiAgICBMb2MsXHJcbiAgICBBdCxcclxuICAgIERpcixcclxuICAgIFVwLFxyXG4gICAgUmlnaHRcclxuICApO1xyXG59XHJcbiIsImxldCBJc0NvbnRyb2wgPSBmYWxzZTtcclxubGV0IElzTEJ1dHRvbiA9IGZhbHNlO1xyXG5sZXQgSXNSQnV0dG9uID0gZmFsc2U7XHJcbmxldCBNZHggPSAwLFxyXG4gIE1keSA9IDAsXHJcbiAgTWR6ID0gMDtcclxuXHJcblxyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsQ2FudmFzXCIpO1xyXG5leHBvcnQgbGV0IGdsID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7IGdsIH0gZnJvbSBcIi4uL3JuZGRhdGEuanNcIjtcclxuXHJcbmV4cG9ydCBsZXQgcHJvZ3JhbVxyXG5cclxuZnVuY3Rpb24gbG9hZFNoYWRlcihnbCwgdHlwZSwgc291cmNlKSB7XHJcbiAgY29uc3Qgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xyXG4gIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XHJcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG5cclxuICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgYWxlcnQoXCIhISEhISFcIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc2hhZGVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hhZGVySW5pdCh2cywgZnMpIHtcclxuICBjb25zdCB2ZXJ0ZXhTaCA9IGxvYWRTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHZzKTtcclxuICBjb25zdCBmcmFnbWVudFNoID0gbG9hZFNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmcyk7XHJcblxyXG4gIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoKTtcclxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaCk7XHJcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XHJcblxyXG4gIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcclxuICAgIGFsZXJ0KGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZ2wgfSBmcm9tIFwiLi4vcm5kZGF0YS5qc1wiO1xyXG5pbXBvcnQgeyBfbWF0cjQgfSBmcm9tIFwiLi4vLi4vbWF0aC9tYXRobWF0NC5qc1wiO1xyXG5pbXBvcnQgeyBfdmVjMyB9IGZyb20gXCIuLi8uLi9tYXRoL21hdGh2ZWMzLmpzXCI7XHJcbmltcG9ydCB7IHByb2dyYW0gfSBmcm9tIFwiLi9zaGFkZXIuanNcIjtcclxuZXhwb3J0IGxldCBVYm9zID0gW107XHJcblxyXG5leHBvcnQgbGV0IFVib19jZWxsID0ge1xyXG4gIE1hdHJXVlA6IFwibWF0cnd2cFwiLFxyXG4gIE1hdHJXOiBcIm1hdHJ3XCIsXHJcbiAgTWF0cldJbnY6IFwibWF0cndpbnZcIixcclxuICBNYXRyVlA6IFwibWF0cnZwXCIsXHJcbiAgTWF0clY6IFwibWF0cnZcIixcclxuICBDYW1Mb2M6IFwiY2FtbG9jXCIsXHJcbiAgQ2FtQXQ6IFwiY2FtYXRcIixcclxuICBDYW1SaWdodDogXCJjYW1yaWdodFwiLFxyXG4gIENhbVVwOiBcImNhbXVwXCIsXHJcbiAgQ2FtRGlyOiBcImNhbWRpclwiLFxyXG4gIFByb2pEaXN0RmFyVGltZUxvY2FsOiBcInByb2pkaXN0ZmFydGltZWxvY2FsXCIsXHJcbiAgVGltZUdsb2JhbERlbHRhR2xvYmFsRGVsdGFMb2NhbDogXCJ0aW1lZ2xvYmFsXCIsXHJcbiAgUHJvamVjdFNpemU6IFwicHJvanNpemVcIixcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBVYm9fTWF0ciB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBNYXRyV1ZQLFxyXG4gICAgTWF0clcsXHJcbiAgICBNYXRyV0ludixcclxuICAgIE1hdHJWUCxcclxuICAgIE1hdHJWLFxyXG4gICAgQ2FtTG9jLFxyXG4gICAgQ2FtQXQsXHJcbiAgICBDYW1SaWdodCxcclxuICAgIENhbVVwLFxyXG4gICAgQ2FtRGlyLFxyXG4gICAgUHJvakRpc3RGYXJUaW1lTG9jYWwsXHJcbiAgICBUaW1lR2xvYmFsRGVsdGFHbG9iYWxEZWx0YUxvY2FsLFxyXG4gICAgUHJvamVjdFNpemVcclxuICApIHtcclxuICAgIHRoaXMuTWF0cldWUCA9IE1hdHJXVlA7XHJcbiAgICB0aGlzLk1hdHJXID0gTWF0clc7XHJcbiAgICB0aGlzLk1hdHJXSW52ID0gTWF0cldJbnY7XHJcbiAgICB0aGlzLk1hdHJWUCA9IE1hdHJWUDtcclxuICAgIHRoaXMuTWF0clYgPSBNYXRyVjtcclxuICAgIHRoaXMuQ2FtTG9jID0gQ2FtTG9jO1xyXG4gICAgdGhpcy5DYW1BdCA9IENhbUF0O1xyXG4gICAgdGhpcy5DYW1SaWdodCA9IENhbVJpZ2h0O1xyXG4gICAgdGhpcy5DYW1VcCA9IENhbVVwO1xyXG4gICAgdGhpcy5DYW1EaXIgPSBDYW1EaXI7XHJcbiAgICB0aGlzLlByb2pEaXN0RmFyVGltZUxvY2FsID0gUHJvakRpc3RGYXJUaW1lTG9jYWw7XHJcblxyXG4gICAgdGhpcy5UaW1lR2xvYmFsRGVsdGFHbG9iYWxEZWx0YUxvY2FsID0gVGltZUdsb2JhbERlbHRhR2xvYmFsRGVsdGFMb2NhbDtcclxuICAgIHRoaXMuUHJvamVjdFNpemUgPSBQcm9qZWN0U2l6ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVQk8ge1xyXG4gIGNvbnN0cnVjdG9yKHVibywgbmFtZSwgdWJvaWQsIFR5cGUpIHtcclxuICAgIHRoaXMudWJvID0gdWJvO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMudWJvaWQgPSB1Ym9pZDtcclxuXHJcbiAgICB0aGlzLlR5cGUgPSBUeXBlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFkZChVYm8sIG5hbWUpIHtcclxuICAgIGxldCBmciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5VTklGT1JNX0JVRkZFUiwgZnIpO1xyXG4gICAgaWYgKG5hbWUgPT09IFwiQmFzZURhdGFcIikge1xyXG4gICAgICBnbC5idWZmZXJEYXRhKFxyXG4gICAgICAgIGdsLlVOSUZPUk1fQlVGRkVSLFxyXG4gICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW1xyXG4gICAgICAgICAgLi4uX21hdHI0LnRvYXJyKFViby5NYXRyV1ZQKSxcclxuICAgICAgICAgIC4uLl9tYXRyNC50b2FycihVYm8uTWF0clcpLFxyXG4gICAgICAgICAgLi4uX21hdHI0LnRvYXJyKFViby5NYXRyV0ludiksXHJcbiAgICAgICAgICAuLi5fbWF0cjQudG9hcnIoVWJvLk1hdHJWUCksXHJcbiAgICAgICAgICAuLi5fbWF0cjQudG9hcnIoVWJvLk1hdHJWKSxcclxuICAgICAgICAgIC4uLl92ZWMzLnZlYzMoVWJvLkNhbUxvYyksXHJcbiAgICAgICAgICAxLFxyXG4gICAgICAgICAgLi4uX3ZlYzMudmVjMyhVYm8uQ2FtQXQpLFxyXG4gICAgICAgICAgMSxcclxuICAgICAgICAgIC4uLl92ZWMzLnZlYzMoVWJvLkNhbVJpZ2h0KSxcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICAuLi5fdmVjMy52ZWMzKFViby5DYW1VcCksXHJcbiAgICAgICAgICAxLFxyXG4gICAgICAgICAgLi4uX3ZlYzMudmVjMyhVYm8uQ2FtRGlyKSxcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICAuLi5fdmVjMy52ZWMzKFViby5Qcm9qRGlzdEZhclRpbWVMb2NhbCksXHJcbiAgICAgICAgICAxLFxyXG4gICAgICAgICAgLi4uX3ZlYzMudmVjMyhVYm8uVGltZUdsb2JhbERlbHRhR2xvYmFsRGVsdGFMb2NhbCksXHJcbiAgICAgICAgICAxLFxyXG4gICAgICAgICAgLi4uX3ZlYzMudmVjMyhVYm8uUHJvamVjdFNpemUpLFxyXG4gICAgICAgICAgMSxcclxuICAgICAgICBdKSxcclxuICAgICAgICBnbC5TVEFUSUNfRFJBV1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKG5hbWUgPT09IFwiTWF0ZXJpYWxcIikge1xyXG4gICAgICBsZXQgeCA9IFtcclxuICAgICAgICAuLi5fdmVjMy52ZWMzKFViby5LYSksXHJcbiAgICAgICAgMSxcclxuICAgICAgICAuLi5fdmVjMy52ZWMzKFViby5LZCksXHJcbiAgICAgICAgMSxcclxuICAgICAgICAuLi5fdmVjMy52ZWMzKFViby5LcyksXHJcbiAgICAgICAgMSxcclxuICAgICAgICBVYm8uUGgsXHJcbiAgICAgICAgVWJvLlRyYW5zLFxyXG4gICAgICAgIDEsXHJcbiAgICAgICAgMSxcclxuICAgICAgICAuLi5VYm8uVGV4LFxyXG4gICAgICBdO1xyXG4gICAgICBnbC5idWZmZXJEYXRhKFxyXG4gICAgICAgIGdsLlVOSUZPUk1fQlVGRkVSLFxyXG4gICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW1xyXG4gICAgICAgICAgLi4uX3ZlYzMudmVjMyhVYm8uS2EpLFxyXG4gICAgICAgICAgMSxcclxuICAgICAgICAgIC4uLl92ZWMzLnZlYzMoVWJvLktkKSxcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICAuLi5fdmVjMy52ZWMzKFViby5LcyksXHJcbiAgICAgICAgICAxLFxyXG4gICAgICAgICAgVWJvLlBoLFxyXG4gICAgICAgICAgVWJvLlRyYW5zLFxyXG4gICAgICAgICAgMSxcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICAuLi5VYm8uVGV4LFxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIGdsLlNUQVRJQ19EUkFXXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBVYm9zLnB1c2gobmV3IFVCTyhVYm8sIG5hbWUsIGZyKSk7XHJcbiAgICByZXR1cm4gVWJvcy5sZW5ndGggLSAxO1xyXG4gIH1cclxuICBzdGF0aWMgdXBkYXRlKGlkLCBuYW1lX2NlbGwsIGNlbGxfZGF0YSkge1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5VTklGT1JNX0JVRkZFUiwgVWJvc1tpZF0udWJvaWQpO1xyXG4gICAgaWYgKFVib3NbaWRdLm5hbWUgPT09IFwiQmFzZURhdGFcIikge1xyXG4gICAgICBpZiAobmFtZV9jZWxsID09IFVib19jZWxsLk1hdHJXVlApIHtcclxuICAgICAgICBVYm9zW2lkXS51Ym8uTWF0cldWUCA9IGNlbGxfZGF0YTtcclxuICAgICAgfSBlbHNlIGlmIChuYW1lX2NlbGwgPT0gVWJvX2NlbGwuTWF0clcpIHtcclxuICAgICAgICBVYm9zW2lkXS51Ym8uTWF0clcgPSBjZWxsX2RhdGE7XHJcbiAgICAgIH0gZWxzZSBpZiAobmFtZV9jZWxsID09IFVib19jZWxsLk1hdHJXSW52KSB7XHJcbiAgICAgICAgVWJvc1tpZF0udWJvLk1hdHJXSW52ID0gY2VsbF9kYXRhO1xyXG4gICAgICB9IGVsc2UgaWYgKG5hbWVfY2VsbCA9PSBVYm9fY2VsbC5NYXRyVlApIHtcclxuICAgICAgICBVYm9zW2lkXS51Ym8uTWF0clZQID0gY2VsbF9kYXRhO1xyXG4gICAgICB9IGVsc2UgaWYgKG5hbWVfY2VsbCA9PSBVYm9fY2VsbC5NYXRyVikge1xyXG4gICAgICAgIFVib3NbaWRdLnViby5NYXRyViA9IGNlbGxfZGF0YTtcclxuICAgICAgfSBlbHNlIGlmIChuYW1lX2NlbGwgPT0gVWJvX2NlbGwuQ2FtTG9jKSB7XHJcbiAgICAgICAgVWJvc1tpZF0udWJvLkNhbUxvYyA9IGNlbGxfZGF0YTtcclxuICAgICAgfSBlbHNlIGlmIChuYW1lX2NlbGwgPT0gVWJvX2NlbGwuQ2FtQXQpIHtcclxuICAgICAgICBVYm9zW2lkXS51Ym8uQ2FtQXQgPSBjZWxsX2RhdGE7XHJcbiAgICAgIH0gZWxzZSBpZiAobmFtZV9jZWxsID09IFVib19jZWxsLkNhbVJpZ2h0KSB7XHJcbiAgICAgICAgVWJvc1tpZF0udWJvLkNhbVJpZ2h0ID0gY2VsbF9kYXRhO1xyXG4gICAgICB9IGVsc2UgaWYgKG5hbWVfY2VsbCA9PSBVYm9fY2VsbC5DYW1EaXIpIHtcclxuICAgICAgICBVYm9zW2lkXS51Ym8uQ2FtRGlyID0gY2VsbF9kYXRhO1xyXG4gICAgICB9IGVsc2UgaWYgKG5hbWVfY2VsbCA9PSBVYm9fY2VsbC5Qcm9qRGlzdEZhclRpbWVMb2NhbCkge1xyXG4gICAgICAgIFVib3NbaWRdLnViby5Qcm9qRGlzdEZhclRpbWVMb2NhbCA9IGNlbGxfZGF0YTtcclxuICAgICAgfSBlbHNlIGlmIChuYW1lX2NlbGwgPT0gVWJvX2NlbGwuVGltZUdsb2JhbERlbHRhR2xvYmFsRGVsdGFMb2NhbCkge1xyXG4gICAgICAgIFVib3NbaWRdLnViby5UaW1lR2xvYmFsRGVsdGFHbG9iYWxEZWx0YUxvY2FsID0gY2VsbF9kYXRhO1xyXG4gICAgICB9IGVsc2UgaWYgKG5hbWVfY2VsbCA9PSBVYm9fY2VsbC5Qcm9qZWN0U2l6ZSkge1xyXG4gICAgICAgIFVib3NbaWRdLnViby5Qcm9qRGlzdEZhclRpbWVMb2NhbCA9IGNlbGxfZGF0YTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgeCA9IG5ldyBGbG9hdDMyQXJyYXkoW1xyXG4gICAgICAgIC4uLl9tYXRyNC50b2FycihVYm9zW2lkXS51Ym8uTWF0cldWUCksXHJcbiAgICAgICAgLi4uX21hdHI0LnRvYXJyKFVib3NbaWRdLnViby5NYXRyVyksXHJcbiAgICAgICAgLi4uX21hdHI0LnRvYXJyKFVib3NbaWRdLnViby5NYXRyV0ludiksXHJcbiAgICAgICAgLi4uX21hdHI0LnRvYXJyKFVib3NbaWRdLnViby5NYXRyVlApLFxyXG4gICAgICAgIC4uLl9tYXRyNC50b2FycihVYm9zW2lkXS51Ym8uTWF0clYpLFxyXG4gICAgICAgIC4uLl92ZWMzLnZlYzMoVWJvc1tpZF0udWJvLkNhbUxvYyksXHJcbiAgICAgICAgMSxcclxuICAgICAgICAuLi5fdmVjMy52ZWMzKFVib3NbaWRdLnViby5DYW1BdCksXHJcbiAgICAgICAgMSxcclxuICAgICAgICAuLi5fdmVjMy52ZWMzKFVib3NbaWRdLnViby5DYW1SaWdodCksXHJcbiAgICAgICAgMSxcclxuICAgICAgICAuLi5fdmVjMy52ZWMzKFVib3NbaWRdLnViby5DYW1VcCksXHJcbiAgICAgICAgMSxcclxuICAgICAgICAuLi5fdmVjMy52ZWMzKFVib3NbaWRdLnViby5DYW1EaXIpLFxyXG4gICAgICAgIDEsXHJcbiAgICAgICAgLi4uX3ZlYzMudmVjMyhVYm9zW2lkXS51Ym8uUHJvakRpc3RGYXJUaW1lTG9jYWwpLFxyXG4gICAgICAgIDEsXHJcbiAgICAgICAgLi4uX3ZlYzMudmVjMyhVYm9zW2lkXS51Ym8uVGltZUdsb2JhbERlbHRhR2xvYmFsRGVsdGFMb2NhbCksXHJcbiAgICAgICAgMSxcclxuICAgICAgICAuLi5fdmVjMy52ZWMzKFVib3NbaWRdLnViby5Qcm9qZWN0U2l6ZSksXHJcbiAgICAgICAgMSxcclxuICAgICAgXSk7XHJcblxyXG4gICAgICBnbC5idWZmZXJEYXRhKGdsLlVOSUZPUk1fQlVGRkVSLCB4LCBnbC5TVEFUSUNfRFJBVyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHN0YXRpYyBhcHBsYXkoaWQsIHBvaW50KSB7XHJcbiAgICBsZXQgYmxrX2xvYyA9IGdsLmdldFVuaWZvcm1CbG9ja0luZGV4KHByb2dyYW0sIFVib3NbaWRdLm5hbWUpO1xyXG5cclxuICAgIGdsLnVuaWZvcm1CbG9ja0JpbmRpbmcocHJvZ3JhbSwgYmxrX2xvYywgcG9pbnQpO1xyXG5cclxuICAgIGdsLmJpbmRCdWZmZXJCYXNlKGdsLlVOSUZPUk1fQlVGRkVSLCBwb2ludCwgVWJvc1tpZF0udWJvaWQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBVQk8sIFVib19jZWxsIH0gZnJvbSBcIi4vcm5kL3Jlcy91Ym8uanNcIjtcclxuaW1wb3J0IHsgY2FtIH0gZnJvbSBcIi4vbWF0aC9tYXRoY2FtLmpzXCI7XHJcbmltcG9ydCB7IF92ZWMzIH0gZnJvbSBcIi4vbWF0aC9tYXRodmVjMy5qc1wiO1xyXG5pbXBvcnQgeyBDYW1VQk8gfSBmcm9tIFwiLi9ybmQvcm5kYmFzZS5qc1wiO1xyXG5cclxuZnVuY3Rpb24gVGltZXIoKSB7XHJcbiAgLy8gVGltZXIgb2J0YWluIGN1cnJlbnQgdGltZSBpbiBzZWNvbmRzIG1ldGhvZFxyXG4gIGNvbnN0IGdldFRpbWUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGxldCB0ID1cclxuICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwMDAuMCArXHJcbiAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcclxuICAgICAgZGF0ZS5nZXRNaW51dGVzKCkgKiA2MDtcclxuICAgIHJldHVybiB0O1xyXG4gIH07XHJcblxyXG4gIC8vIFRpbWVyIHJlc3BvbnNlIG1ldGhvZFxyXG4gIHRoaXMucmVzcG9uc2UgPSAodGFnX2lkID0gbnVsbCkgPT4ge1xyXG4gICAgbGV0IHQgPSBnZXRUaW1lKCk7XHJcbiAgICAvLyBHbG9iYWwgdGltZVxyXG4gICAgdGhpcy5nbG9iYWxUaW1lID0gdDtcclxuICAgIHRoaXMuZ2xvYmFsRGVsdGFUaW1lID0gdCAtIHRoaXMub2xkVGltZTtcclxuICAgIC8vIFRpbWUgd2l0aCBwYXVzZVxyXG4gICAgaWYgKHRoaXMuaXNQYXVzZSkge1xyXG4gICAgICB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcclxuICAgICAgdGhpcy5wYXVzZVRpbWUgKz0gdCAtIHRoaXMub2xkVGltZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9jYWxEZWx0YVRpbWUgPSB0aGlzLmdsb2JhbERlbHRhVGltZTtcclxuICAgICAgdGhpcy5sb2NhbFRpbWUgPSB0IC0gdGhpcy5wYXVzZVRpbWUgLSB0aGlzLnN0YXJ0VGltZTtcclxuICAgIH1cclxuICAgIC8vIEZQU1xyXG4gICAgdGhpcy5mcmFtZUNvdW50ZXIrKztcclxuICAgIGlmICh0IC0gdGhpcy5vbGRUaW1lRlBTID4gMykge1xyXG4gICAgICB0aGlzLkZQUyA9IHRoaXMuZnJhbWVDb3VudGVyIC8gKHQgLSB0aGlzLm9sZFRpbWVGUFMpO1xyXG4gICAgICB0aGlzLm9sZFRpbWVGUFMgPSB0O1xyXG4gICAgICB0aGlzLmZyYW1lQ291bnRlciA9IDA7XHJcbiAgICAgIGlmICh0YWdfaWQgIT0gbnVsbClcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWdfaWQpLmlubmVySFRNTCA9IHRoaXMuZ2V0RlBTKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9sZFRpbWUgPSB0O1xyXG5cclxuICAgIFVCTy51cGRhdGUoXHJcbiAgICAgIENhbVVCTyxcclxuICAgICAgVWJvX2NlbGwuUHJvakRpc3RGYXJUaW1lTG9jYWwsXHJcbiAgICAgIF92ZWMzLnNldChjYW0uUHJvakRpc3QsIGNhbS5Qcm9qRmFyQ2xpcCwgdGhpcy5sb2NhbFRpbWUpXHJcbiAgICApO1xyXG4gICAgVUJPLnVwZGF0ZShcclxuICAgICAgQ2FtVUJPLFxyXG4gICAgICBVYm9fY2VsbC5UaW1lR2xvYmFsRGVsdGFHbG9iYWxEZWx0YUxvY2FsLFxyXG4gICAgICBfdmVjMy5zZXQodGhpcy5nbG9iYWxUaW1lLCB0aGlzLmdsb2JhbERlbHRhVGltZSwgdGhpcy5sb2NhbERlbHRhVGltZSlcclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgLy8gT2J0YWluIEZQUyBhcyBzdHJpbmcgbWV0aG9kXHJcbiAgdGhpcy5nZXRGUFMgPSAoKSA9PiB0aGlzLkZQUy50b0ZpeGVkKDMpO1xyXG5cclxuICAvLyBGaWxsIHRpbWVyIGdsb2JhbCBkYXRhXHJcbiAgdGhpcy5nbG9iYWxUaW1lID0gdGhpcy5sb2NhbFRpbWUgPSBnZXRUaW1lKCk7XHJcbiAgdGhpcy5nbG9iYWxEZWx0YVRpbWUgPSB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcclxuXHJcbiAgLy8gRmlsbCB0aW1lciBzZW1pIGdsb2JhbCBkYXRhXHJcbiAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLm9sZFRpbWUgPSB0aGlzLm9sZFRpbWVGUFMgPSB0aGlzLmdsb2JhbFRpbWU7XHJcbiAgdGhpcy5mcmFtZUNvdW50ZXIgPSAwO1xyXG4gIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gIHRoaXMuRlBTID0gMzAuMDtcclxuICB0aGlzLnBhdXNlVGltZSA9IDA7XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59IC8vIEVuZCBvZiAnVGltZXInIGZ1bmN0aW9uXHJcblxyXG5leHBvcnQgbGV0IG15VGltZXIgPSBuZXcgVGltZXIoKTtcclxuIiwiaW1wb3J0IHsgVUJPIH0gZnJvbSBcIi4vdWJvLmpzXCI7XHJcbmltcG9ydCB7IF92ZWMzIH0gZnJvbSBcIi4uLy4uL21hdGgvbWF0aHZlYzMuanNcIjtcclxuXHJcbmxldCBNYXRlcmlhbCA9IFtdO1xyXG5cclxuZXhwb3J0IGNsYXNzIG1hdGVyaWFsIHtcclxuICBjb25zdHJ1Y3RvcihOYW1lLCBLYSwgS2QsIEtzLCBQaCwgVHJhbnMsIFRleCwgVWJvTm8pIHtcclxuICAgIHRoaXMuTmFtZSA9IE5hbWU7IC8qIE1hdGVyaWFsIG5hbWUgKi9cclxuXHJcbiAgICAvKiBJbGx1bWluYXRpb24gY29lZmZpY2llbnRzICovXHJcblxyXG4gICAgdGhpcy5LYSA9IEthO1xyXG4gICAgdGhpcy5LZCA9IEtkO1xyXG4gICAgdGhpcy5LcyA9IEtzO1xyXG4gICAgdGhpcy5UcmFucyA9IFRyYW5zO1xyXG4gICAgdGhpcy5QaCA9IFBoO1xyXG4gICAgdGhpcy5UZXggPSBUZXg7XHJcbiAgICB0aGlzLlVib05vID0gVWJvTm87XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgTXRsR2V0RGVmKCkge1xyXG4gICAgcmV0dXJuIG5ldyBtYXRlcmlhbChcclxuICAgICAgXCJEZWZhdWx0XCIsXHJcbiAgICAgIF92ZWMzLnNldCgwLjEsIDAuMSwgMC4xKSxcclxuICAgICAgX3ZlYzMuc2V0KDAuOSwgMC45LCAwLjkpLFxyXG4gICAgICBfdmVjMy5zZXQoMC4zLCAwLjMsIDAuMyksXHJcbiAgICAgIDMwLFxyXG4gICAgICAxLFxyXG4gICAgICBbLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xXVxyXG4gICAgKTtcclxuICB9XHJcbiAgc3RhdGljIGFkZChNdGwpIHtcclxuICAgIE10bC5VYm9ObyA9IFVCTy5hZGQoTXRsLCBcIk1hdGVyaWFsXCIpO1xyXG4gICAgTWF0ZXJpYWwucHVzaChNdGwpO1xyXG4gICAgcmV0dXJuIE1hdGVyaWFsLmxlbmd0aCAtIDE7XHJcbiAgfVxyXG4gIHN0YXRpYyBhcHBsYXkoTXRsTm8sIHBvaW50KSB7XHJcbiAgICBVQk8uYXBwbGF5KE1hdGVyaWFsW010bE5vXS5VYm9ObywgcG9pbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBNYXRsaWIgPSB7XHJcbiAgQmxhY2tfUGxhc3RpYzogbmV3IG1hdGVyaWFsKFxyXG4gICAgXCJCbGFja19QbGFzdGljXCIsXHJcbiAgICBfdmVjMy5zZXQoMC4wLCAwLjAsIDAuMCksXHJcbiAgICBfdmVjMy5zZXQoMC4wMSwgMC4wMSwgMC4wMSksXHJcbiAgICBfdmVjMy5zZXQoMC41LCAwLjUsIDAuNSksXHJcbiAgICAzMixcclxuICAgIDEsXHJcbiAgICBbLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xXVxyXG4gICksXHJcbiAgQnJhc3M6IG5ldyBtYXRlcmlhbChcclxuICAgIFwiQnJhc3NcIixcclxuICAgIF92ZWMzLnNldCgwLjMyOTQxMiwgMC4yMjM1MjksIDAuMDI3NDUxKSxcclxuICAgIF92ZWMzLnNldCgwLjc4MDM5MiwgMC41Njg2MjcsIDAuMTEzNzI1KSxcclxuICAgIF92ZWMzLnNldCgwLjk5MjE1NywgMC45NDExNzYsIDAuODA3ODQzKSxcclxuICAgIDI3Ljg5NzQsXHJcbiAgICAxLFxyXG4gICAgWy0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMV1cclxuICApLFxyXG4gIEJyb256ZTogbmV3IG1hdGVyaWFsKFxyXG4gICAgXCJCcm9uemVcIixcclxuICAgIF92ZWMzLnNldCgwLjIxMjUsIDAuMTI3NSwgMC4wNTQpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNzE0LCAwLjQyODQsIDAuMTgxNDQpLFxyXG4gICAgX3ZlYzMuc2V0KDAuMzkzNTQ4LCAwLjI3MTkwNiwgMC4xNjY3MjEpLFxyXG4gICAgMjUuNixcclxuICAgIDEsXHJcbiAgICBbLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xXVxyXG4gICksXHJcbiAgQ2hyb21lOiBuZXcgbWF0ZXJpYWwoXHJcbiAgICBcIkNocm9tZVwiLFxyXG4gICAgX3ZlYzMuc2V0KDAuMjUsIDAuMjUsIDAuMjUpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNCwgMC40LCAwLjQpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNzc0NTk3LCAwLjc3NDU5NywgMC43NzQ1OTcpLFxyXG4gICAgNzYuOCxcclxuICAgIDEsXHJcbiAgICBbLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xXVxyXG4gICksXHJcbiAgQ29wcGVyOiBuZXcgbWF0ZXJpYWwoXHJcbiAgICBcIkNvcHBlclwiLFxyXG4gICAgX3ZlYzMuc2V0KDAuMTkxMjUsIDAuMDczNSwgMC4wMjI1KSxcclxuICAgIF92ZWMzLnNldCgwLjcwMzgsIDAuMjcwNDgsIDAuMDgyOCksXHJcbiAgICBfdmVjMy5zZXQoMC4yNTY3NzcsIDAuMTM3NjIyLCAwLjA4NjAxNCksXHJcbiAgICAxMi44LFxyXG4gICAgMSxcclxuICAgIFstMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTFdXHJcbiAgKSxcclxuICBHb2xkOiBuZXcgbWF0ZXJpYWwoXHJcbiAgICBcIkdvbGRcIixcclxuICAgIF92ZWMzLnNldCgwLjI0NzI1LCAwLjE5OTUsIDAuMDc0NSksXHJcbiAgICBfdmVjMy5zZXQoMC43NTE2NCwgMC42MDY0OCwgMC4yMjY0OCksXHJcbiAgICBfdmVjMy5zZXQoMC42MjgyODEsIDAuNTU1ODAyLCAwLjM2NjA2NSksXHJcbiAgICA1MS4yLFxyXG4gICAgMSxcclxuICAgIFstMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTFdXHJcbiAgKSxcclxuICBQZXdldGVyOiBuZXcgbWF0ZXJpYWwoXHJcbiAgICBcIlBld2V0ZXJcIixcclxuICAgIF92ZWMzLnNldCgwLjEwNTg4LCAwLjA1ODgyNCwgMC4xMTM3MjUpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNDI3NDUxLCAwLjQ3MDU4OCwgMC41NDExNzYpLFxyXG4gICAgX3ZlYzMuc2V0KDAuMzMzMywgMC4zMzMzLCAwLjUyMTU2OSksXHJcbiAgICA5Ljg0NjE1LFxyXG4gICAgMSxcclxuICAgIFstMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTFdXHJcbiAgKSxcclxuICBTaWx2ZXI6IG5ldyBtYXRlcmlhbChcclxuICAgIFwiU2lsdmVyXCIsXHJcbiAgICBfdmVjMy5zZXQoMC4xOTIyNSwgMC4xOTIyNSwgMC4xOTIyNSksXHJcbiAgICBfdmVjMy5zZXQoMC41MDc1NCwgMC41MDc1NCwgMC41MDc1NCksXHJcbiAgICBfdmVjMy5zZXQoMC41MDgyNzMsIDAuNTA4MjczLCAwLjUwODI3MyksXHJcbiAgICA1MS4yLFxyXG4gICAgMSxcclxuICAgIFstMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTFdXHJcbiAgKSxcclxuICBQb2xpc2hlZF9TaWx2ZXI6IG5ldyBtYXRlcmlhbChcclxuICAgIFwiUG9saXNoZWRfU2lsdmVyXCIsXHJcbiAgICBfdmVjMy5zZXQoMC4yMzEyNSwgMC4yMzEyNSwgMC4yMzEyNSksXHJcbiAgICBfdmVjMy5zZXQoMC4yNzc1LCAwLjI3NzUsIDAuMjc3NSksXHJcbiAgICBfdmVjMy5zZXQoMC43NzM5MTEsIDAuNzczOTExLCAwLjc3MzkxMSksXHJcbiAgICA4OS42LFxyXG4gICAgMSxcclxuICAgIFstMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTFdXHJcbiAgKSxcclxuICBUdXJxdW9pc2U6IG5ldyBtYXRlcmlhbChcclxuICAgIFwiVHVycXVvaXNlXCIsXHJcbiAgICBfdmVjMy5zZXQoMC4xLCAwLjE4NzI1LCAwLjE3NDUpLFxyXG4gICAgX3ZlYzMuc2V0KDAuMzk2LCAwLjc0MTUxLCAwLjY5MTAyKSxcclxuICAgIF92ZWMzLnNldCgwLjI5NzI1NCwgMC4zMDgyOSwgMC4zMDY2NzgpLFxyXG4gICAgMTIuOCxcclxuICAgIDEsXHJcbiAgICBbLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xXVxyXG4gICksXHJcbiAgUnVieTogbmV3IG1hdGVyaWFsKFxyXG4gICAgXCJSdWJ5XCIsXHJcbiAgICBfdmVjMy5zZXQoMC4xNzQ1LCAwLjAxMTc1LCAwLjAxMTc1KSxcclxuICAgIF92ZWMzLnNldCgwLjYxNDI0LCAwLjA0MTM2LCAwLjA0MTM2KSxcclxuICAgIF92ZWMzLnNldCgwLjcyNzgxMSwgMC42MjY5NTksIDAuNjI2OTU5KSxcclxuICAgIDc2LjgsXHJcbiAgICAxLFxyXG4gICAgWy0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMV1cclxuICApLFxyXG4gIFBvbGlzaGVkX0dvbGQ6IG5ldyBtYXRlcmlhbChcclxuICAgIFwiUG9saXNoZWRfR29sZFwiLFxyXG4gICAgX3ZlYzMuc2V0KDAuMjQ3MjUsIDAuMjI0NSwgMC4wNjQ1KSxcclxuICAgIF92ZWMzLnNldCgwLjM0NjE1LCAwLjMxNDMsIDAuMDkwMyksXHJcbiAgICBfdmVjMy5zZXQoMC43OTczNTcsIDAuNzIzOTkxLCAwLjIwODAwNiksXHJcbiAgICA4My4yLFxyXG4gICAgMSxcclxuICAgIFstMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTFdXHJcbiAgKSxcclxuICBQb2xpc2hlZF9Ccm9uemU6IG5ldyBtYXRlcmlhbChcclxuICAgIFwiUG9saXNoZWRfQnJvbnplXCIsXHJcbiAgICBfdmVjMy5zZXQoMC4yNSwgMC4xNDgsIDAuMDY0NzUpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNCwgMC4yMzY4LCAwLjEwMzYpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNzc0NTk3LCAwLjQ1ODU2MSwgMC4yMDA2MjEpLFxyXG4gICAgNzYuOCxcclxuICAgIDEsXHJcbiAgICBbLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xXVxyXG4gICksXHJcbiAgUG9saXNoZWRfQ29wcGVyOiBuZXcgbWF0ZXJpYWwoXHJcbiAgICBcIlBvbGlzaGVkX0NvcHBlclwiLFxyXG4gICAgX3ZlYzMuc2V0KDAuMjI5NSwgMC4wODgyNSwgMC4wMjc1KSxcclxuICAgIF92ZWMzLnNldCgwLjU1MDgsIDAuMjExOCwgMC4wNjYpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNTgwNTk0LCAwLjIyMzI1NywgMC4wNjk1NzAxKSxcclxuICAgIDUxLjIsXHJcbiAgICAxLFxyXG4gICAgWy0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMV1cclxuICApLFxyXG4gIEphZGU6IG5ldyBtYXRlcmlhbChcclxuICAgIFwiSmFkZVwiLFxyXG4gICAgX3ZlYzMuc2V0KDAuMTM1LCAwLjIyMjUsIDAuMTU3NSksXHJcbiAgICBfdmVjMy5zZXQoMC4xMzUsIDAuMjIyNSwgMC4xNTc1KSxcclxuICAgIF92ZWMzLnNldCgwLjMxNjIyOCwgMC4zMTYyMjgsIDAuMzE2MjI4KSxcclxuICAgIDEyLjgsXHJcbiAgICAxLFxyXG4gICAgWy0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMV1cclxuICApLFxyXG4gIE9ic2lkaWFuOiBuZXcgbWF0ZXJpYWwoXHJcbiAgICBcIk9ic2lkaWFuXCIsXHJcbiAgICBfdmVjMy5zZXQoMC4wNTM3NSwgMC4wNSwgMC4wNjYyNSksXHJcbiAgICBfdmVjMy5zZXQoMC4xODI3NSwgMC4xNywgMC4yMjUyNSksXHJcbiAgICBfdmVjMy5zZXQoMC4zMzI3NDEsIDAuMzI4NjM0LCAwLjM0NjQzNSksXHJcbiAgICAzOC40LFxyXG4gICAgMSxcclxuICAgIFstMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTFdXHJcbiAgKSxcclxuICBQZWFybDogbmV3IG1hdGVyaWFsKFxyXG4gICAgXCJQZWFybFwiLFxyXG4gICAgX3ZlYzMuc2V0KDAuMjUsIDAuMjA3MjUsIDAuMjA3MjUpLFxyXG4gICAgX3ZlYzMuc2V0KDEuMCwgMC44MjksIDAuODI5KSxcclxuICAgIF92ZWMzLnNldCgwLjI5NjY0OCwgMC4yOTY2NDgsIDAuMjk2NjQ4KSxcclxuICAgIDExLjI2NCxcclxuICAgIDEsXHJcbiAgICBbLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xXVxyXG4gICksXHJcbiAgRW1lcmFsZDogbmV3IG1hdGVyaWFsKFxyXG4gICAgXCJFbWVyYWxkXCIsXHJcbiAgICBfdmVjMy5zZXQoMC4wMjE1LCAwLjE3NDUsIDAuMDIxNSksXHJcbiAgICBfdmVjMy5zZXQoMC4wNzU2OCwgMC42MTQyNCwgMC4wNzU2OCksXHJcbiAgICBfdmVjMy5zZXQoMC42MzMsIDAuNzI3ODExLCAwLjYzMyksXHJcbiAgICA3Ni44LFxyXG4gICAgMSxcclxuICAgIFstMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTFdXHJcbiAgKSxcclxuICBCbGFja19SdWJiZXI6IG5ldyBtYXRlcmlhbChcclxuICAgIFwiQmxhY2tfUnViYmVyXCIsXHJcbiAgICBfdmVjMy5zZXQoMC4wMiwgMC4wMiwgMC4wMiksXHJcbiAgICBfdmVjMy5zZXQoMC4wMSwgMC4wMSwgMC4wMSksXHJcbiAgICBfdmVjMy5zZXQoMC40LCAwLjQsIDAuNCksXHJcbiAgICAxMC4wLFxyXG4gICAgMSxcclxuICAgIFstMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTFdXHJcbiAgKSxcclxufTtcclxuIiwiaW1wb3J0IHsgVUJPIH0gZnJvbSBcIi4vcmVzL3Viby5qc1wiO1xyXG5pbXBvcnQgeyBnbCB9IGZyb20gXCIuL3JuZGRhdGEuanNcIjtcclxuaW1wb3J0IHsgcHJvZ3JhbSB9IGZyb20gXCIuL3Jlcy9zaGFkZXIuanNcIjtcclxuaW1wb3J0IHsgX21hdHI0IH0gZnJvbSBcIi4uL21hdGgvbWF0aG1hdDQuanNcIjtcclxuaW1wb3J0IHsgY2FtIH0gZnJvbSBcIi4uL21hdGgvbWF0aGNhbS5qc1wiO1xyXG5pbXBvcnQgeyBDYW1VQk8gfSBmcm9tIFwiLi9ybmRiYXNlLmpzXCI7XHJcbmltcG9ydCB7IFVib19jZWxsIH0gZnJvbSBcIi4vcmVzL3Viby5qc1wiO1xyXG5pbXBvcnQgeyBtYXRlcmlhbCB9IGZyb20gXCIuL3Jlcy9tYXRlcmlhbC5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHZlcnRleCB7XHJcbiAgY29uc3RydWN0b3IoUCwgQywgTikge1xyXG4gICAgdGhpcy5QID0gUDtcclxuICAgIHRoaXMuQyA9IEM7XHJcbiAgICB0aGlzLk4gPSBOO1xyXG4gIH1cclxuICBzdGF0aWMgdmVydDJhcnIoYSkge1xyXG4gICAgcmV0dXJuIFthLlAueCwgYS5QLnksIGEuUC56LCBhLkMueCwgYS5DLnksIGEuQy56LCBhLk4ueCwgYS5OLnksIGEuTi56XTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGUoYSkge1xyXG4gICAgcmV0dXJuIG5ldyB2ZXJ0ZXgoYS5QLCBhLkMsIGEuTik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgcHJpbSB7XHJcbiAgY29uc3RydWN0b3IoVkEsIFZCdWYsIElCdWYsIE51bU9mRWxlbWVudHMsIFRyYW5zLCBNdGxObykge1xyXG4gICAgdGhpcy5WQSA9IFZBO1xyXG4gICAgdGhpcy5WQnVmID0gVkJ1ZjtcclxuICAgIHRoaXMuSUJ1ZiA9IElCdWY7XHJcbiAgICB0aGlzLk51bU9mRWxlbWVudHMgPSBOdW1PZkVsZW1lbnRzO1xyXG4gICAgdGhpcy5UcmFucyA9IFRyYW5zO1xyXG4gICAgdGhpcy5NdGxObyA9IE10bE5vO1xyXG4gIH1cclxuICBzdGF0aWMgY3JlYXRlKFZlcnQsIE51bW9mVmVydCwgSW5kLCBOdW1vZkluZCwgTXRsTm8pIHtcclxuICAgIGxldCBwcmltVmVydGV4QXJyYXkgPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgZ2wuYmluZFZlcnRleEFycmF5KHByaW1WZXJ0ZXhBcnJheSk7XHJcblxyXG4gICAgbGV0IHByaW1WZXJ0ZXhCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBwcmltVmVydGV4QnVmZmVyKTtcclxuXHJcbiAgICBsZXQgcG9zID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE51bW9mVmVydDsgaSsrKSB7XHJcbiAgICAgIHBvcyA9IHBvcy5jb25jYXQodmVydGV4LnZlcnQyYXJyKFZlcnRbaV0pKTtcclxuICAgIH1cclxuICAgIHBvcyA9IG5ldyBGbG9hdDMyQXJyYXkocG9zKTtcclxuXHJcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgcG9zLCBnbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgbGV0IHByaW1JbmRleEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgcHJpbUluZGV4QnVmZmVyKTtcclxuXHJcbiAgICBnbC5idWZmZXJEYXRhKFxyXG4gICAgICBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUixcclxuICAgICAgbmV3IFVpbnQxNkFycmF5KEluZCksXHJcbiAgICAgIGdsLlNUQVRJQ19EUkFXXHJcbiAgICApO1xyXG5cclxuICAgIGxldCBGc2l6ZSA9IHBvcy5CWVRFU19QRVJfRUxFTUVOVDtcclxuICAgIGxldCBwb3NMb2MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImluX3Bvc1wiKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc0xvYyk7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc0xvYywgMywgZ2wuRkxPQVQsIGZhbHNlLCBGc2l6ZSAqIDksIDApO1xyXG5cclxuICAgIGxldCBwb3NDb2wgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImluX2NvbG9yXCIpO1xyXG4gICAgaWYgKHBvc0NvbCAhPSAtMSkge1xyXG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc0NvbCwgMywgZ2wuRkxPQVQsIGZhbHNlLCBGc2l6ZSAqIDksIEZzaXplICogMyk7XHJcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc0NvbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBvc05vcm0gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImluX25vcm1hbFwiKTtcclxuXHJcbiAgICBpZiAocG9zTm9ybSAhPSAtMSkge1xyXG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc05vcm0sIDMsIGdsLkZMT0FULCBmYWxzZSwgRnNpemUgKiA5LCBGc2l6ZSAqIDYpO1xyXG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NOb3JtKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IHByaW0oXHJcbiAgICAgIHByaW1WZXJ0ZXhBcnJheSxcclxuICAgICAgcHJpbVZlcnRleEJ1ZmZlcixcclxuICAgICAgcHJpbUluZGV4QnVmZmVyLFxyXG4gICAgICBOdW1vZkluZCxcclxuICAgICAgX21hdHI0LmlkZW50aXR5KCksXHJcbiAgICAgIE10bE5vXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRyYXcoUHIsIFdvcmxkKSB7XHJcbiAgICBsZXQgdyA9IF9tYXRyNC5tdWxtYXRyKFByLlRyYW5zLCBXb3JsZCk7XHJcbiAgICBsZXQgd2ludiA9IF9tYXRyNC50cmFuc3Bvc2UoX21hdHI0LmludmVyc2UodykpO1xyXG4gICAgbGV0IFdWUCA9IF9tYXRyNC5tdWxtYXRyKHcsIGNhbS5NYXRyVlApO1xyXG5cclxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XHJcblxyXG4gICAgZ2wuYmluZFZlcnRleEFycmF5KFByLlZBKTtcclxuXHJcbiAgICBVQk8udXBkYXRlKENhbVVCTywgVWJvX2NlbGwuTWF0cldWUCwgV1ZQKTtcclxuICAgIFVCTy51cGRhdGUoQ2FtVUJPLCBVYm9fY2VsbC5NYXRyVywgdyk7XHJcbiAgICBVQk8udXBkYXRlKENhbVVCTywgVWJvX2NlbGwuTWF0cldJbnYsIHdpbnYpO1xyXG4gICAgVUJPLmFwcGxheShDYW1VQk8sIDApO1xyXG4gICAgbWF0ZXJpYWwuYXBwbGF5KFByLk10bE5vLCAxKTtcclxuXHJcbiAgICBnbC5kcmF3RWxlbWVudHMoXHJcbiAgICAgIGdsLlRSSUFOR0xFUywgLy8gVFJJQU5HTEVTLCBUUklBTkdMRV9TVFJJUFxyXG4gICAgICBQci5OdW1PZkVsZW1lbnRzLCAvL1ByLk51bU9mRWxlbWVudHNcclxuICAgICAgZ2wuVU5TSUdORURfU0hPUlQsXHJcbiAgICAgIFByLklCdWZcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlX25vcm1hbChhLCBpKSB7XHJcbiAgICBhW2ldLk4gPSBfdmVjMy5ub3JtYWxpemUoXHJcbiAgICAgIF92ZWMzLmNyb3NzKF92ZWMzLnN1YihhW2kgKyAyXS5QLCBhW2ldLlApLCBfdmVjMy5zdWIoYVtpICsgMV0uUCwgYVtpXS5QKSlcclxuICAgICk7XHJcbiAgICBhW2kgKyAxXS5OID0gX3ZlYzMubm9ybWFsaXplKFxyXG4gICAgICBfdmVjMy5jcm9zcyhcclxuICAgICAgICBfdmVjMy5zdWIoYVtpXS5QLCBhW2kgKyAxXS5QKSxcclxuICAgICAgICBfdmVjMy5zdWIoYVtpICsgMl0uUCwgYVtpICsgMV0uUClcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIGFbaSArIDJdLk4gPSBfdmVjMy5ub3JtYWxpemUoXHJcbiAgICAgIF92ZWMzLmNyb3NzKFxyXG4gICAgICAgIF92ZWMzLnN1YihhW2kgKyAxXS5QLCBhW2kgKyAyXS5QKSxcclxuICAgICAgICBfdmVjMy5zdWIoYVtpXS5QLCBhW2kgKyAyXS5QKVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGkgKyBcIjpcIiArIGFbaV0uTi54ICsgXCIsXCIgKyBhW2ldLk4ueSArIFwiLFwiICsgYVtpXS5OLnopO1xyXG4gIH1cclxufVxyXG4iLCJsZXQga2YgPSBbXTtcclxuXHJcbmNsYXNzIEluUHV0IHtcclxuICBjb25zdHJ1Y3RvcihNZCwgTW91c2VDbGljaywgV2hlZWwsIEtleXMpIHtcclxuICAgIHRoaXMuS2V5cyA9IEtleXM7XHJcbiAgICB0aGlzLk1keCA9IE1kWzBdO1xyXG4gICAgdGhpcy5NZHkgPSBNZFsxXTtcclxuICAgIHRoaXMuTW91c2VDbGlja0xlZnQgPSBNb3VzZUNsaWNrWzBdO1xyXG4gICAgdGhpcy5Nb3VzZUNsaWNrUmlnaHQgPSBNb3VzZUNsaWNrWzFdO1xyXG4gICAgdGhpcy5Nb3VzZVdoZWVsID0gV2hlZWw7XHJcbiAgfVxyXG5cclxuICByZXNwb25zZShNZCwgTUMsIFdoZWVsLCBLKSB7XHJcbiAgICB0aGlzLktleXMgPSBLO1xyXG4gICAgdGhpcy5NZHggPSBNZFswXTtcclxuICAgIHRoaXMuTWR5ID0gTWRbMV07XHJcbiAgICB0aGlzLk1vdXNlQ2xpY2tMZWZ0ID0gTUNbMF07XHJcbiAgICB0aGlzLk1vdXNlQ2xpY2tSaWdodCA9IE1DWzFdO1xyXG4gICAgdGhpcy5Nb3VzZVdoZWVsID0gV2hlZWw7XHJcbiAgfVxyXG59IC8vIEVuZCBvZiAnSW5wdXQnIGZ1bmN0aW9uXHJcblxyXG5leHBvcnQgbGV0IG15SW5wdXQgPSBuZXcgSW5QdXQoWzAsIDBdLCBbMCwgMF0sIGtmLmZpbGwoMCwgMCwgMjU1KSk7XHJcbiIsImltcG9ydCB7IHByaW0sIHZlcnRleCB9IGZyb20gXCIuLi9ybmQvcHJpbS5qc1wiO1xyXG5pbXBvcnQgeyBfdmVjMyB9IGZyb20gXCIuLi9tYXRoL21hdGh2ZWMzLmpzXCI7XHJcbmltcG9ydCB7IG1hdGVyaWFsLCBNYXRsaWIgfSBmcm9tIFwiLi4vcm5kL3Jlcy9tYXRlcmlhbC5qc1wiO1xyXG5pbXBvcnQgeyBfbWF0cjQgfSBmcm9tIFwiLi4vbWF0aC9tYXRobWF0NC5qc1wiO1xyXG5pbXBvcnQgeyBteUlucHV0IH0gZnJvbSBcIi4uL2lucHV0LmpzXCI7XHJcbmxldCBQcl9jdWJlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDdWJlKCkge1xyXG4gIGxldCBWcnRzID0gW107XHJcbiAgVnJ0c1swXSA9IG5ldyB2ZXJ0ZXgoXHJcbiAgICBfdmVjMy5zZXQoLTEsIDEsIDEpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNDcsIDAuMywgMC4yNyksXHJcbiAgICBfdmVjMy5zZXQoMCwgMCwgMSlcclxuICApO1xyXG4gIFZydHNbMV0gPSBuZXcgdmVydGV4KFxyXG4gICAgX3ZlYzMuc2V0KC0xLCAtMSwgMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgwLCAwLCAxKVxyXG4gICk7XHJcbiAgVnJ0c1syXSA9IG5ldyB2ZXJ0ZXgoXHJcbiAgICBfdmVjMy5zZXQoMSwgMSwgMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgwLCAwLCAxKVxyXG4gICk7XHJcbiAgVnJ0c1szXSA9IG5ldyB2ZXJ0ZXgoXHJcbiAgICBfdmVjMy5zZXQoMSwgLTEsIDEpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNDcsIDAuMywgMC4yNyksXHJcbiAgICBfdmVjMy5zZXQoMCwgMCwgMSlcclxuICApO1xyXG5cclxuICBWcnRzWzRdID0gbmV3IHZlcnRleChcclxuICAgIF92ZWMzLnNldCgtMSwgMSwgMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgtMSwgMCwgMClcclxuICApO1xyXG4gIFZydHNbNV0gPSBuZXcgdmVydGV4KFxyXG4gICAgX3ZlYzMuc2V0KC0xLCAtMSwgMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgtMSwgMCwgMClcclxuICApO1xyXG4gIFZydHNbNl0gPSBuZXcgdmVydGV4KFxyXG4gICAgX3ZlYzMuc2V0KC0xLCAxLCAtMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgtMSwgMCwgMClcclxuICApO1xyXG4gIFZydHNbN10gPSBuZXcgdmVydGV4KFxyXG4gICAgX3ZlYzMuc2V0KC0xLCAtMSwgLTEpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNDcsIDAuMywgMC4yNyksXHJcbiAgICBfdmVjMy5zZXQoLTEsIDAsIDApXHJcbiAgKTtcclxuXHJcbiAgVnJ0c1s4XSA9IG5ldyB2ZXJ0ZXgoXHJcbiAgICBfdmVjMy5zZXQoLTEsIDEsIC0xKSxcclxuICAgIF92ZWMzLnNldCgwLjQ3LCAwLjMsIDAuMjcpLFxyXG4gICAgX3ZlYzMuc2V0KDAsIDAsIC0xKVxyXG4gICk7XHJcbiAgVnJ0c1s5XSA9IG5ldyB2ZXJ0ZXgoXHJcbiAgICBfdmVjMy5zZXQoLTEsIC0xLCAtMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgwLCAwLCAtMSlcclxuICApO1xyXG4gIFZydHNbMTBdID0gbmV3IHZlcnRleChcclxuICAgIF92ZWMzLnNldCgxLCAxLCAtMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgwLCAwLCAtMSlcclxuICApO1xyXG4gIFZydHNbMTFdID0gbmV3IHZlcnRleChcclxuICAgIF92ZWMzLnNldCgxLCAtMSwgLTEpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNDcsIDAuMywgMC4yNyksXHJcbiAgICBfdmVjMy5zZXQoMCwgMCwgLTEpXHJcbiAgKTtcclxuXHJcbiAgVnJ0c1sxMl0gPSBuZXcgdmVydGV4KFxyXG4gICAgX3ZlYzMuc2V0KDEsIDEsIDEpLFxyXG4gICAgX3ZlYzMuc2V0KDAuNDcsIDAuMywgMC4yNyksXHJcbiAgICBfdmVjMy5zZXQoMSwgMCwgMClcclxuICApO1xyXG4gIFZydHNbMTNdID0gbmV3IHZlcnRleChcclxuICAgIF92ZWMzLnNldCgxLCAtMSwgMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgxLCAwLCAwKVxyXG4gICk7XHJcbiAgVnJ0c1sxNF0gPSBuZXcgdmVydGV4KFxyXG4gICAgX3ZlYzMuc2V0KDEsIDEsIC0xKSxcclxuICAgIF92ZWMzLnNldCgwLjQ3LCAwLjMsIDAuMjcpLFxyXG4gICAgX3ZlYzMuc2V0KDEsIDAsIDApXHJcbiAgKTtcclxuICBWcnRzWzE1XSA9IG5ldyB2ZXJ0ZXgoXHJcbiAgICBfdmVjMy5zZXQoMSwgLTEsIC0xKSxcclxuICAgIF92ZWMzLnNldCgwLjQ3LCAwLjMsIDAuMjcpLFxyXG4gICAgX3ZlYzMuc2V0KDEsIDAsIDApXHJcbiAgKTtcclxuXHJcbiAgVnJ0c1sxNl0gPSBuZXcgdmVydGV4KFxyXG4gICAgX3ZlYzMuc2V0KC0xLCAxLCAxKSxcclxuICAgIF92ZWMzLnNldCgwLjQ3LCAwLjMsIDAuMjcpLFxyXG4gICAgX3ZlYzMuc2V0KDAsIDEsIDApXHJcbiAgKTtcclxuICBWcnRzWzE3XSA9IG5ldyB2ZXJ0ZXgoXHJcbiAgICBfdmVjMy5zZXQoMSwgMSwgMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgwLCAxLCAwKVxyXG4gICk7XHJcbiAgVnJ0c1sxOF0gPSBuZXcgdmVydGV4KFxyXG4gICAgX3ZlYzMuc2V0KC0xLCAxLCAtMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgwLCAxLCAwKVxyXG4gICk7XHJcbiAgVnJ0c1sxOV0gPSBuZXcgdmVydGV4KFxyXG4gICAgX3ZlYzMuc2V0KDEsIDEsIC0xKSxcclxuICAgIF92ZWMzLnNldCgwLjQ3LCAwLjMsIDAuMjcpLFxyXG4gICAgX3ZlYzMuc2V0KDAsIDEsIDApXHJcbiAgKTtcclxuXHJcbiAgVnJ0c1syMF0gPSBuZXcgdmVydGV4KFxyXG4gICAgX3ZlYzMuc2V0KC0xLCAtMSwgMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgwLCAtMSwgMClcclxuICApO1xyXG4gIFZydHNbMjFdID0gbmV3IHZlcnRleChcclxuICAgIF92ZWMzLnNldCgxLCAtMSwgMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgwLCAtMSwgMClcclxuICApO1xyXG4gIFZydHNbMjJdID0gbmV3IHZlcnRleChcclxuICAgIF92ZWMzLnNldCgtMSwgLTEsIC0xKSxcclxuICAgIF92ZWMzLnNldCgwLjQ3LCAwLjMsIDAuMjcpLFxyXG4gICAgX3ZlYzMuc2V0KDAsIC0xLCAwKVxyXG4gICk7XHJcbiAgVnJ0c1syM10gPSBuZXcgdmVydGV4KFxyXG4gICAgX3ZlYzMuc2V0KDEsIC0xLCAtMSksXHJcbiAgICBfdmVjMy5zZXQoMC40NywgMC4zLCAwLjI3KSxcclxuICAgIF92ZWMzLnNldCgwLCAtMSwgMClcclxuICApO1xyXG5cclxuICBsZXQgaW5kaWNlcyA9IFtcclxuICAgIDAsIDEsIDIsXHJcblxyXG4gICAgMiwgMywgMSxcclxuXHJcbiAgICA0LCA1LCA2LFxyXG5cclxuICAgIDUsIDYsIDcsXHJcblxyXG4gICAgOCwgOSwgMTAsXHJcblxyXG4gICAgMTAsIDksIDExLFxyXG5cclxuICAgIDEyLCAxMywgMTQsXHJcblxyXG4gICAgMTMsIDE0LCAxNSxcclxuXHJcbiAgICAxMiwgMTMsIDE0LFxyXG5cclxuICAgIDE2LCAxNywgMTgsXHJcblxyXG4gICAgMTcsIDE4LCAxOSxcclxuXHJcbiAgICAyMCwgMjEsIDIyLFxyXG5cclxuICAgIDIxLCAyMiwgMjMsXHJcbiAgXTtcclxuICBsZXQgTXRsID0gbWF0ZXJpYWwuTXRsR2V0RGVmKCk7XHJcbiAgTXRsID0gbmV3IG1hdGVyaWFsKFxyXG4gICAgX3ZlYzMuc2V0KCksXHJcbiAgICBfdmVjMy5zZXQoMC4yMzEyNSwgMC4yMzEyNSwgMC4yMzEyNSksXHJcbiAgICBfdmVjMy5zZXQoMC4yNzc1LCAwLjI3NzUsIDAuMjc3NSksXHJcbiAgICBfdmVjMy5zZXQoMC43NzM5MTEsIDAuNzczOTExLCAwLjc3MzkxMSksXHJcbiAgICA5LjgsXHJcbiAgICAxLFxyXG4gICAgWy0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMV1cclxuICApO1xyXG4gIFByX2N1YmUgPSBwcmltLmNyZWF0ZShcclxuICAgIFZydHMsXHJcbiAgICBWcnRzLmxlbmd0aCxcclxuICAgIGluZGljZXMsXHJcbiAgICBpbmRpY2VzLmxlbmd0aCxcclxuICAgIG1hdGVyaWFsLmFkZChNYXRsaWIuT2JzaWRpYW4pXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckN1YmUoKSB7XHJcbiAgbGV0IFdvcmwgPSBfbWF0cjQubXVsbWF0cihcclxuICAgIF9tYXRyNC5zY2FsZShfdmVjMy5zZXQoMC43LCAwLjcsIDAuNykpLFxyXG4gICAgX21hdHI0LnRyYW5zbGF0ZShfdmVjMy5zZXQoMCwgMCwgMCkpXHJcbiAgKTtcclxuXHJcbiAgcHJpbS5kcmF3KFByX2N1YmUsIFdvcmwpO1xyXG59XHJcbiIsImltcG9ydCB7IENhbVNldCwgY2FtIH0gZnJvbSBcIi4uL21hdGgvbWF0aGNhbS5qc1wiO1xyXG5pbXBvcnQgeyBfdmVjMyB9IGZyb20gXCIuLi9tYXRoL21hdGh2ZWMzLmpzXCI7XHJcbmltcG9ydCB7IF9tYXRyNCB9IGZyb20gXCIuLi9tYXRoL21hdGhtYXQ0LmpzXCI7XHJcbmltcG9ydCB7IG15SW5wdXQgfSBmcm9tIFwiLi4vaW5wdXQuanNcIjtcclxuaW1wb3J0IHsgbXlUaW1lciB9IGZyb20gXCIuLi90aW1lci5qc1wiO1xyXG5pbXBvcnQgeyBVQk8sIFVib19jZWxsIH0gZnJvbSBcIi4uL3JuZC9yZXMvdWJvLmpzXCI7XHJcbmltcG9ydCB7IENhbVVCTyB9IGZyb20gXCIuLi9ybmQvcm5kYmFzZS5qc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDYW0oKSB7XHJcbiAgQ2FtU2V0KF92ZWMzLnNldCgwLCAwLCAxMCksIF92ZWMzLnNldCgwLCAwLCAwKSwgX3ZlYzMuc2V0KDAsIDEsIDApKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckNhbSgpIHtcclxuICBsZXQgRGlzdCA9IF92ZWMzLmxlbihfdmVjMy5zdWIoY2FtLkF0LCBjYW0uTG9jKSk7XHJcbiAgbGV0IGNvc1QsIHNpblQsIGNvc1AsIHNpblAsIHBsZW4sIEF6aW11dGgsIEVsZXZhdG9yO1xyXG4gIGxldCBXcCwgSHAsIHN4LCBzeTtcclxuICBsZXQgZHY7XHJcblxyXG4gIFdwID0gSHAgPSBjYW0uUHJvalNpemU7XHJcbiAgY29zVCA9IChjYW0uTG9jLnkgLSBjYW0uQXQueSkgLyBEaXN0O1xyXG4gIHNpblQgPSBNYXRoLnNxcnQoMSAtIGNvc1QgKiBjb3NUKTtcclxuXHJcbiAgcGxlbiA9IERpc3QgKiBzaW5UO1xyXG4gIGNvc1AgPSAoY2FtLkxvYy56IC0gY2FtLkF0LnopIC8gcGxlbjtcclxuICBzaW5QID0gKGNhbS5Mb2MueCAtIGNhbS5BdC54KSAvIHBsZW47XHJcblxyXG4gIEF6aW11dGggPSAoTWF0aC5hdGFuMihzaW5QLCBjb3NQKSAvIE1hdGguUEkpICogMTgwO1xyXG4gIEVsZXZhdG9yID0gKE1hdGguYXRhbjIoc2luVCwgY29zVCkgLyBNYXRoLlBJKSAqIDE4MDtcclxuXHJcbiAgQXppbXV0aCArPVxyXG4gICAgbXlUaW1lci5nbG9iYWxEZWx0YVRpbWUgKiAxLjUgKiAoLTUgKiBteUlucHV0Lk1vdXNlQ2xpY2tMZWZ0ICogbXlJbnB1dC5NZHgpO1xyXG4gIEVsZXZhdG9yICs9XHJcbiAgICBteVRpbWVyLmdsb2JhbERlbHRhVGltZSAqIDEuNSAqICgtNSAqIG15SW5wdXQuTW91c2VDbGlja0xlZnQgKiBteUlucHV0Lk1keSk7XHJcblxyXG4gIGlmIChFbGV2YXRvciA8IDAuMDgpIEVsZXZhdG9yID0gMC4wODtcclxuICBlbHNlIGlmIChFbGV2YXRvciA+IDE3OC45KSBFbGV2YXRvciA9IDE3OC45O1xyXG5cclxuICBEaXN0ICs9IG15VGltZXIuZ2xvYmFsRGVsdGFUaW1lICogKDIgKiBteUlucHV0Lk1vdXNlV2hlZWwpO1xyXG5cclxuICBpZiAoRGlzdCA8IDAuMSkgRGlzdCA9IDAuMTtcclxuICBpZiAobXlJbnB1dC5Nb3VzZUNsaWNrUmlnaHQpIHtcclxuICAgIHN4ID0gKCgobXlJbnB1dC5NZHggKiBXcCkgLyAxMjAwKSAqIERpc3QpIC8gLWNhbS5Qcm9qRGlzdDtcclxuICAgIHN5ID0gKCgobXlJbnB1dC5NZHkgKiBIcCkgLyAxMjAwKSAqIERpc3QpIC8gY2FtLlByb2pEaXN0O1xyXG5cclxuICAgIGR2ID0gX3ZlYzMuYWRkKF92ZWMzLm11bG51bShjYW0uUmlnaHQsIHN4KSwgX3ZlYzMubXVsbnVtKGNhbS5VcCwgc3kpKTtcclxuXHJcbiAgICBjYW0uQXQgPSBfdmVjMy5hZGQoY2FtLkF0LCBkdik7XHJcbiAgICBjYW0uTG9jID0gX3ZlYzMuYWRkKGNhbS5Mb2MsIGR2KTtcclxuICB9XHJcbiAgICBDYW1TZXQoXHJcbiAgICAgIF92ZWMzLnBvaW50X3RyYW5zZm9ybShcclxuICAgICAgICBfdmVjMy5zZXQoMCwgRGlzdCwgMCksXHJcbiAgICAgICAgX21hdHI0Lm11bG1hdHIoXHJcbiAgICAgICAgICBfbWF0cjQubXVsbWF0cihfbWF0cjQucm90YXRlWChFbGV2YXRvciksIF9tYXRyNC5yb3RhdGVZKEF6aW11dGgpKSxcclxuICAgICAgICAgIF9tYXRyNC50cmFuc2xhdGUoY2FtLkF0KVxyXG4gICAgICAgIClcclxuICAgICAgKSxcclxuICAgICAgY2FtLkF0LFxyXG4gICAgICBfdmVjMy5zZXQoMCwgMSwgMClcclxuICAgICk7XHJcblxyXG4gICAgVUJPLnVwZGF0ZShDYW1VQk8sIFVib19jZWxsLk1hdHJWUCwgY2FtLk1hdHJWUCk7XHJcbiAgICBVQk8udXBkYXRlKENhbVVCTywgVWJvX2NlbGwuTWF0clYsIGNhbS5NYXRyVmlldyk7XHJcbiAgICBVQk8udXBkYXRlKENhbVVCTywgVWJvX2NlbGwuQ2FtTG9jLCBjYW0uTG9jKTtcclxuICAgIFVCTy51cGRhdGUoQ2FtVUJPLCBVYm9fY2VsbC5DYW1BdCwgY2FtLkF0KTtcclxuICAgIFVCTy51cGRhdGUoQ2FtVUJPLCBVYm9fY2VsbC5DYW1SaWdodCwgY2FtLlJpZ2h0KTtcclxuICAgIFVCTy51cGRhdGUoQ2FtVUJPLCBVYm9fY2VsbC5DYW1VcCwgY2FtLlVwKTtcclxuICAgIFVCTy51cGRhdGUoQ2FtVUJPLCBVYm9fY2VsbC5DYW1EaXIsIGNhbS5EaXIpO1xyXG4gIC8vICAgaWYgKEFuaS0+S2V5c1tWS19TSElGVF0gJiYgQW5pLT5LZXlzQ2xpY2tbJ1AnXSlcclxuICAvLyAgICAgQW5pLT5Jc1BhdXNlID0gIUFuaS0+SXNQYXVzZTtcclxufVxyXG4iLCJpbXBvcnQgeyBDYW1TZXQsIGNhbSB9IGZyb20gXCIuLi9tYXRoL21hdGhjYW0uanNcIjtcclxuaW1wb3J0IHsgZ2wgfSBmcm9tIFwiLi9ybmRkYXRhLmpzXCI7XHJcbmltcG9ydCB7IF92ZWMzIH0gZnJvbSBcIi4uL21hdGgvbWF0aHZlYzMuanNcIjtcclxuaW1wb3J0IHsgX21hdHI0IH0gZnJvbSBcIi4uL21hdGgvbWF0aG1hdDQuanNcIjtcclxuaW1wb3J0IHsgVUJPLCBVYm9fTWF0ciB9IGZyb20gXCIuL3Jlcy91Ym8uanNcIjtcclxuaW1wb3J0IHsgbXlUaW1lciB9IGZyb20gXCIuLi90aW1lci5qc1wiO1xyXG5pbXBvcnQgeyBzaGFkZXJJbml0IH0gZnJvbSBcIi4vcmVzL3NoYWRlci5qc1wiO1xyXG5pbXBvcnQgeyBpbml0Q3ViZSwgcmVuZGVyQ3ViZSB9IGZyb20gXCIuLi91bml0cy91X2N1YmUuanNcIjtcclxuaW1wb3J0IHsgaW5pdENhbSwgcmVuZGVyQ2FtIH0gZnJvbSBcIi4uL3VuaXRzL3VfY29udHJvbC5qc1wiO1xyXG5leHBvcnQgbGV0IENhbVVCTztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBybmRJbml0KHZzLCBmcykge1xyXG4gIGdsLmNsZWFyQ29sb3IoMC4yOCwgMC40NywgMC44LCAxKTtcclxuXHJcbiAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xyXG4gIGdsLmRlcHRoRnVuYyhnbC5MRVFVQUwpO1xyXG4gIGdsLmNsZWFyKGdsLkRFUFRIX0JVRkZFUl9CSVQgfCBnbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuXHJcbiAgaW5pdENhbSgpO1xyXG4gIC8vQ2FtU2V0KF92ZWMzLnNldCgwLCAwLCAxMCksIF92ZWMzLnNldCgwLCAwLCAwKSwgX3ZlYzMuc2V0KDAsIDEsIDApKTtcclxuICBsZXQgV29ybGQgPSBfbWF0cjQuaWRlbnRpdHkoKTtcclxuICBsZXQgdyA9IF9tYXRyNC5tdWxtYXRyKF9tYXRyNC5pZGVudGl0eSgpLCBXb3JsZCk7XHJcbiAgbGV0IHdpbnYgPSBfbWF0cjQudHJhbnNwb3NlKF9tYXRyNC5pbnZlcnNlKHcpKTtcclxuICBsZXQgV1ZQID0gX21hdHI0Lm11bG1hdHIodywgY2FtLk1hdHJWUCk7XHJcblxyXG4gIGxldCBVID0gbmV3IFVib19NYXRyKFxyXG4gICAgV1ZQLFxyXG4gICAgdyxcclxuICAgIHdpbnYsXHJcbiAgICBjYW0uTWF0clZQLFxyXG4gICAgY2FtLk1hdHJWaWV3LFxyXG4gICAgY2FtLkxvYyxcclxuICAgIGNhbS5BdCxcclxuICAgIGNhbS5SaWdodCxcclxuICAgIGNhbS5VcCxcclxuICAgIGNhbS5EaXIsXHJcbiAgICBfdmVjMy5zZXQoY2FtLlByb2pEaXN0LCBjYW0uUHJvakZhckNsaXAsIG15VGltZXIubG9jYWxUaW1lKSxcclxuICAgIF92ZWMzLnNldChcclxuICAgICAgbXlUaW1lci5nbG9iYWxUaW1lLFxyXG4gICAgICBteVRpbWVyLmdsb2JhbERlbHRhVGltZSxcclxuICAgICAgbXlUaW1lci5sb2NhbERlbHRhVGltZVxyXG4gICAgKSxcclxuICAgIF92ZWMzLnNldChjYW0uUHJvalNpemUsIDEsIDEpXHJcbiAgKTtcclxuXHJcbiAgQ2FtVUJPID0gVUJPLmFkZChVLCBcIkJhc2VEYXRhXCIpO1xyXG5cclxuICBzaGFkZXJJbml0KHZzLCBmcyk7XHJcbiAgXHJcbiAgLy9pbml0VGV0cigpO1xyXG4gIGluaXRDdWJlKCk7XHJcbiAgLy9pbml0SGV4KCk7XHJcbiAgLy8gaW5pdElzbygpO1xyXG4gIC8vIGluaXRUcnVUZXRyKCk7XHJcbiAgLy8gaW5pdEN1Yk9jdCgpO1xyXG4gIC8vIGluaXRUcnVDdWIoKTtcclxuICAvLyBpbml0VHJ1T2N0KCk7XHJcbiAgLy8gaW5pdERvZCgpO1xyXG4gIC8vIGluaXRSaG9tKCk7XHJcbiAgLy9pbml0VHJ1Q3ViT2N0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgZ2wuY2xlYXJDb2xvcigwLjI4LCAwLjQ3LCAwLjgsIDEpO1xyXG4gIGdsLmNsZWFyKGdsLkRFUFRIX0JVRkZFUl9CSVQgfCBnbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuXHJcbiAgcmVuZGVyQ2FtKCk7XHJcbiAgLy9yZW5kZXJUZXRyKCk7XHJcbiAgLy9yZW5kZXJIZXgoKTtcclxuICByZW5kZXJDdWJlKCk7XHJcbiAgLy8gcmVuZGVySXNvKCk7XHJcbiAgLy8gcmVuZGVyRG9kKCk7XHJcbiAgLy8gcmVuZGVyVHJ1VGV0cigpO1xyXG4gIC8vIHJlbmRlckN1Yk9jdCgpO1xyXG4gIC8vIHJlbmRlclRydUN1YigpO1xyXG4gIC8vIHJlbmRlclRydU9jdCgpO1xyXG4gIC8vIHJlbmRlclJob20oKTtcclxuICAvL3JlbmRlclRydUN1Yk9jdCgpO1xyXG59XHJcbiIsImltcG9ydCB7IHJuZEluaXQsIHJlbmRlciB9IGZyb20gXCIuL3JuZC9ybmRiYXNlLmpzXCI7XHJcbmltcG9ydCB7IG15VGltZXIgfSBmcm9tIFwiLi90aW1lci5qc1wiO1xyXG5pbXBvcnQgeyBteUlucHV0IH0gZnJvbSBcIi4vaW5wdXQuanNcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZldGNoU2hhZGVyKHNoYWRlclVSTCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHNoYWRlclVSTCk7XHJcbiAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2UudGU7XHJcbiAgICB4dCgpO1xyXG4gICAgY29uc29sZS5sb2codGV4dCk7XHJcbiAgICByZXR1cm4gdGV4dDtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICBhcnJheShlcnIpO1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgbmFtZXMgPSBbXCIuLi9iaW4vZnJhZy5nbHNsXCIsIFwiLi4vYmluL3ZlcnQuZ2xzbFwiXTtcclxubGV0IE1kID0gWzAsIDBdLFxyXG4gIE1vdXNlQ2xpY2sgPSBbMCwgMF0sXHJcbiAgV2hlZWwgPSAwLFxyXG4gIEtleXMgPSBbXTtcclxuS2V5cy5maWxsKDAsIDAsIDI1NSk7XHJcblxyXG5Qcm9taXNlLmFsbChuYW1lcy5tYXAoKHUpID0+IGZldGNoKHUpKSlcclxuICAudGhlbigocmVzcG9uc2VzKSA9PiBQcm9taXNlLmFsbChyZXNwb25zZXMubWFwKChyZXMpID0+IHJlcy50ZXh0KCkpKSlcclxuICAudGhlbigodGV4dHMpID0+IHtcclxuICAgIHJuZEluaXQodGV4dHNbMV0sIHRleHRzWzBdKTtcclxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XHJcbiAgICAgIC8vXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUuYnV0dG9uID09IDApIHtcclxuICAgICAgICAgIE1vdXNlQ2xpY2tbMF0gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS5idXR0b24gPT0gMikge1xyXG4gICAgICAgICAgTW91c2VDbGlja1sxXSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLmJ1dHRvbiA9PSAwKSB7XHJcbiAgICAgICAgICBNb3VzZUNsaWNrWzBdID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUuYnV0dG9uID09IDIpIHtcclxuICAgICAgICAgIE1vdXNlQ2xpY2tbMV0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIE1kWzBdID0gZS5tb3ZlbWVudFg7XHJcbiAgICAgICAgTWRbMV0gPSBlLm1vdmVtZW50WTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcclxuICAgICAgICBLZXlzW2Uua2V5Q29kZV0gPSAxO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcclxuICAgICAgICBLZXlzW2Uua2V5Q29kZV0gPSAwO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGUpID0+IHtcclxuICAgICAgICBXaGVlbCA9IGUuZGVsdGFZO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG15VGltZXIucmVzcG9uc2UoKTtcclxuICAgICAgbXlJbnB1dC5yZXNwb25zZShNZCwgTW91c2VDbGljaywgV2hlZWwsIEtleXMpO1xyXG4gICAgICByZW5kZXIoKTtcclxuICAgICAgV2hlZWwgPSAwO1xyXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xyXG5cclxuICAgIH07XHJcbiAgICBkcmF3KCk7XHJcbiAgfSk7XHJcbiJdLCJuYW1lcyI6WyJfdmVjMyJdLCJtYXBwaW5ncyI6Ijs7O2dCQUFPLE1BQU0sS0FBSyxDQUFDO0VBQ25CLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3ZCLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDZixJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2YsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNmLEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDdEIsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDOUIsR0FBRztBQUNIO0VBQ0EsRUFBRSxP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QUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEMsR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLFNBQVMsQ0FBQyxDQUFDLEVBQUU7RUFDdEIsSUFBSSxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6QyxHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDL0IsSUFBSSxPQUFPLElBQUksS0FBSztFQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxLQUFLLENBQUM7RUFDTixHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNoQyxJQUFJLE9BQU8sSUFBSSxLQUFLO0VBQ3BCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ25ELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ25ELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ25ELEtBQUssQ0FBQztFQUNOLEdBQUc7RUFDSDtBQUNBO0VBQ0EsRUFBRSxPQUFPLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3hCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RFLElBQUksT0FBTyxJQUFJLEtBQUs7RUFDcEIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7RUFDakUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7RUFDakUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7RUFDakUsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDakIsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzQixHQUFHO0VBQ0g7O0VDekZBLFNBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRTtFQUNyQixFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUM7RUFDbEMsQ0FBQztBQUNEO0VBQ08sTUFBTSxNQUFNLENBQUM7RUFDcEIsRUFBRSxXQUFXO0VBQ2IsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSTtFQUNKLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRztFQUNiLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7RUFDMUIsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztFQUMxQixNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0VBQzFCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7RUFDMUIsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLFFBQVEsR0FBRztFQUNwQixJQUFJLE9BQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hFLEdBQUc7RUFDSCxFQUFFLE9BQU8sR0FBRztFQUNaLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUksR0FBRztFQUNQLElBQUk7RUFDSixJQUFJLE9BQU8sSUFBSSxNQUFNO0VBQ3JCLE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULE1BQU0sR0FBRztFQUNULEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDUixHQUFHO0VBQ0gsRUFBRSxPQUFPLFNBQVMsQ0FBQyxDQUFDLEVBQUU7RUFDdEIsSUFBSSxPQUFPLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMs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QUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDdkUsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ2hDLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNsQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUIsT0FBTztFQUNQLEtBQUs7RUFDTCxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtFQUNoRSxJQUFJO0VBQ0osTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTTtFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxNQUFNLENBQUMsQ0FBQyxFQUFFO0VBQ25CLElBQUk7RUFDSixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixRQUFRLE1BQU0sQ0FBQyxTQUFTO0VBQ3hCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFNBQVM7RUFDVCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixRQUFRLE1BQU0sQ0FBQyxTQUFTO0VBQ3hCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFNBQVM7RUFDVCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixRQUFRLE1BQU0sQ0FBQyxTQUFTO0VBQ3hCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFNBQVM7RUFDVCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixRQUFRLE1BQU0sQ0FBQyxTQUFTO0VBQ3hCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFNBQVM7RUFDVCxNQUFNO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLE9BQU8sQ0FBQyxDQUFDLEVBQUU7RUFDcEIsSUFBSSxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pDLElBQUksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0VBQzlCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0VBQzVCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNYLE1BQU0sTUFBTSxDQUFDLFNBQVM7RUFDdEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ1gsTUFBTSxNQUFNLENBQUMsU0FBUztFQUN0QixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUM7RUFDZixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDWCxNQUFNLE1BQU0sQ0FBQyxTQUFTO0VBQ3RCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE9BQU8sR0FBRyxHQUFHLENBQUM7RUFDZCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDWCxNQUFNLE1BQU0sQ0FBQyxTQUFTO0VBQ3RCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUNmO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ1gsTUFBTSxNQUFNLENBQUMsU0FBUztFQUN0QixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDZjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNYLE1BQU0sTUFBTSxDQUFDLFNBQVM7RUFDdEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ1gsTUFBTSxNQUFNLENBQUMsU0FBUztFQUN0QixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUM7RUFDZixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDWCxNQUFNLE1BQU0sQ0FBQyxTQUFTO0VBQ3RCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE9BQU8sR0FBRyxHQUFHLENBQUM7RUFDZCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDWCxNQUFNLE1BQU0sQ0FBQyxTQUFTO0VBQ3RCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE9BQU8sR0FBRyxHQUFHLENBQUM7RUFDZCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDWCxNQUFNLE1BQU0sQ0FBQyxTQUFTO0VBQ3RCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQztFQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNYLE1BQU0sTUFBTSxDQUFDLFNBQVM7RUFDdEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsT0FBTyxHQUFHLEdBQUcsQ0FBQztFQUNkLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNYLE1BQU0sTUFBTSxDQUFDLFNBQVM7RUFDdEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDO0VBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ1gsTUFBTSxNQUFNLENBQUMsU0FBUztFQUN0QixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUM7RUFDZixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDWCxNQUFNLE1BQU0sQ0FBQyxTQUFTO0VBQ3RCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE9BQU8sR0FBRyxHQUFHLENBQUM7RUFDZCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDWCxNQUFNLE1BQU0sQ0FBQyxTQUFTO0VBQ3RCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQztFQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNYLE1BQU0sTUFBTSxDQUFDLFNBQVM7RUFDdEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsT0FBTyxHQUFHLEdBQUcsQ0FBQztFQUNkLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0gsRUFBRSxPQUFPLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNuQyxJQUFJLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUM5QjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2hCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNoQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDaEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDaEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNqQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNoQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDaEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNyQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEI7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VB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QUNBLE9BQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztFQUM1QixNQUFNLENBQUNBLE9BQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztFQUN6QixNQUFNQSxPQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7RUFDekIsTUFBTSxDQUFDO0VBQ1AsS0FBSyxDQUFDO0VBQ04sR0FBRztFQUNILENBQUM7QUFDRDtFQUNPLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0VBQ3JDLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQztFQUlyQixFQUFFLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM1QztFQUNBLEVBQUUsRUFBRSxHQUFHQSxPQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakUsRUFBRSxHQUFHLEdBQUdBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNyRSxFQUFFLEtBQUssR0FBR0EsT0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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LFNBQVMsRUFBRSxTQUFTLEVBQUU7RUFDMUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JELElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtFQUN0QyxNQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7RUFDekMsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7RUFDekMsT0FBTyxNQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7RUFDOUMsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7RUFDdkMsT0FBTyxNQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7RUFDakQsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7RUFDMUMsT0FBTyxNQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7RUFDL0MsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7RUFDeEMsT0FBTyxNQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7RUFDOUMsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7RUFDdkMsT0FBTyxNQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7RUFDL0MsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7RUFDeEMsT0FBTyxNQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7RUFDOUMsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7RUFDdkMsT0FBTyxNQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7RUFDakQsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7RUFDMUMsT0FBTyxNQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7RUFDL0MsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7RUFDeEMsT0FBTyxNQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtFQUM3RCxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxDQUFDO0VBQ3RELE9BQU8sTUFBTSxJQUFJLFNBQVMsSUFBSSxRQUFRLENBQUMsK0JBQStCLEVBQUU7RUFDeEUsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLCtCQUErQixHQUFHLFNBQVMsQ0FBQztFQUNqRSxPQUFPLE1BQU0sSUFBSSxTQUFTLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTtFQUNwRCxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxDQUFDO0VBQ3RELE9BQU87RUFDUCxNQUFNLElBQUksQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDO0VBQy9CLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0VBQzdDLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0VBQzNDLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBQzlDLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0VBQzVDLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0VBQzNDLFFBQVEsR0FBR0EsT0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztFQUMxQyxRQUFRLENBQUM7RUFDVCxRQUFRLEdBQUdBLE9BQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7RUFDekMsUUFBUSxDQUFDO0VBQ1QsUUFBUSxHQUFHQSxPQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBQzVDLFFBQVEsQ0FBQztFQUNULFFBQVEsR0FBR0EsT0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztFQUN6QyxRQUFRLENBQUM7RUFDVCxRQUFRLEdBQUdBLE9BQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7RUFDMUMsUUFBUSxDQUFDO0VBQ1QsUUFBUSxHQUFHQSxPQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7RUFDeEQsUUFBUSxDQUFDO0VBQ1QsUUFBUSxHQUFHQSxPQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsK0JBQStC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QUFDO0VBQ3BDLEdBQUc7RUFDSCxFQUFFLEtBQUssRUFBRSxJQUFJLFFBQVE7RUFDckIsSUFBSSxPQUFPO0VBQ1gsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztFQUMzQyxJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0VBQzNDLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7RUFDM0MsSUFBSSxPQUFPO0VBQ1gsSUFBSSxDQUFDO0VBQ0wsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLEdBQUc7RUFDSCxFQUFFLE1BQU0sRUFBRSxJQUFJLFFBQVE7RUFDdEIsSUFBSSxRQUFRO0VBQ1osSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztFQUNwQyxJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO0VBQ3JDLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7RUFDM0MsSUFBSSxJQUFJO0VBQ1IsSUFBSSxDQUFDO0VBQ0wsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLEdBQUc7RUFDSCxFQUFFLE1BQU0sRUFBRSxJQUFJLFFBQVE7RUFDdEIsSUFBSSxRQUFRO0VBQ1osSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztFQUMvQixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0VBQzVCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7RUFDM0MsSUFBSSxJQUFJO0VBQ1IsSUFBSSxDQUFDO0VBQ0wsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLEdBQUc7RUFDSCxFQUFFLE1BQU0sRUFBRSxJQUFJLFFBQVE7RUFDdEIsSUFBSSxRQUFRO0VBQ1osSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztFQUN0QyxJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0VBQ3RDLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7RUFDM0MsSUFBSSxJQUFJO0VBQ1IsSUFBSSxDQUFDO0VBQ0wsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLEdBQUc7RUFDSCxFQUFFLElBQUksRUFBRSxJQUFJLFFBQVE7RUFDcEIsSUFBSSxNQUFNO0VBQ1YsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztFQUN0QyxJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFP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QyxHQUFHO0VBQ0gsRUFBRSxlQUFlLEVBQUUsSUFBSSxRQUFRO0VBQy9CLElBQUksaUJBQWlCO0VBQ3JCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7RUFDbkMsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztFQUNsQyxJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0VBQzNDLElBQUksSUFBSTtFQUNSLElBQUksQ0FBQztFQUNMLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNwQyxHQUFHO0VBQ0gsRUFBRSxlQUFlLEVBQUUsSUFBSSxRQUFRO0VBQy9CLElBQUksaUJBQWlCO0VBQ3JCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7RUFDdEMsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztFQUNwQyxJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO0VBQzVDLElBQUksSUFBSTtFQUNSLElBQUksQ0FBQztFQUNMLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNwQyxHQUFHO0VBQ0gsRUFBRSxJQUFJLEVBQUUsSUFBSSxRQUFRO0VBQ3BCLElBQUksTUFBTTtFQUNWLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7RUFDcEMsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztFQUNwQyxJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0VBQzNDLElBQUksSUFBSTtFQUNSLElBQUksQ0FBQztFQUNMLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNwQyxHQUFHO0VBQ0gsRUFBRSxRQUFRLEVBQUUsSUFBSSxRQUFRO0VBQ3hCLElBQUksVUFBVTtFQUNkLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7RUFDckMsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztFQUNyQyxJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0VBQzNDLElBQUksSUFBSTtFQUNSLElBQUksQ0FBQztFQUNMLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNwQyxHQUFHO0VBQ0gsRUFBRSxLQUFLLEVBQUUsSUFBSSxRQUFRO0VBQ3JCLElBQUksT0FBTztFQUNYLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7RUFDckMsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztFQUNoQyxJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0VBQzNDLElBQUksTUFBTTtFQUNWLElBQUksQ0FBQztFQUNMLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNwQyxHQUFHO0VBQ0gsRUFBRSxPQUFPLEVBQUUsSUFBSSxRQUFRO0VBQ3ZCLElBQUksU0FBUztFQUNiLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7RUFDckMsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztFQUN4QyxJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDO0VBQ3JDLElBQUksSUFBSTtFQUNSLElBQUksQ0FBQztFQUNMLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNwQyxHQUFHO0VBQ0gsRUFBRSxZQUFZLEVBQUUsSUFBSSxRQUFRO0VBQzVCLElBQUksY0FBYztFQUNsQixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0VBQy9CLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7RUFDL0IsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztFQUM1QixJQUFJLElBQUk7RUFDUixJQUFJLENBQUM7RUFDTCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDcEMsR0FBRztFQUNILENBQUM7O0VDNU1NLE1BQU0sTUFBTSxDQUFDO0VBQ3BCLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3ZCLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDZixJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2YsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNmLEdBQUc7RUFDSCxFQUFFLE9BQU8sUUFBUSxDQUFDLENBQUMsRUFBRTtFQUNyQixJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNFLEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxNQUFNLENBQUMsQ0FBQyxFQUFFO0VBQ25CLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JDLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7RUFDTyxNQUFNLElB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QUFDO0FBQ0Q7RUFDTyxJQUFJLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7O0VDakJsRSxJQUFJLE9BQU8sQ0FBQztBQUNaO0VBQ08sU0FBUyxRQUFRLEdBQUc7RUFDM0IsRUFBRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7RUFDaEIsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxNQUFNO0VBQ3RCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN2QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQzlCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDdEIsR0FBRyxDQUFDO0VBQ0osRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxNQUFNO0VBQ3RCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3hCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7RUFDOUIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN0QixHQUFHLENBQUM7RUFDSixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU07RUFDdEIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN0QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQzlCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDdEIsR0FBRyxDQUFDO0VBQ0osRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxNQUFNO0VBQ3RCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN2QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQzlCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDdEIsR0FBRyxDQUFDO0FBQ0o7RUFDQSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU07RUFDdEIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3ZCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7RUFDOUIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3ZCLEdBQUcsQ0FBQztFQUNKLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTTtFQUN0QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN4QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQzlCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN2QixHQUFHLENBQUM7RUFDSixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU07RUFDdEIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDeEIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztFQUM5QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDdkIsR0FBRyxDQUFDO0VBQ0osRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxNQUFNO0VBQ3RCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDekIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztFQUM5QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDdkIsR0FBRyxDQUFDO0FBQ0o7RUFDQSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU07RUFDdEIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDeEIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztFQUM5QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDdkIsR0FBRyxDQUFDO0VBQ0osRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxNQUFNO0VBQ3RCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDekIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztFQUM5QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDdkIsR0FBRyxDQUFDO0VBQ0osRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxNQUFNO0VBQ3ZCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUN2QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQzlCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUN2QixHQUFHLENBQUM7RUFDSixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLE1BQU07RUFDdkIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDeEIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztFQUM5QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDdkIsR0FBRyxDQUFDO0FBQ0o7RUFDQSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLE1BQU07RUFDdkIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN0QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQzlCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDdEIsR0FBRyxDQUFDO0VBQ0osRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxNQUFNO0VBQ3ZCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN2QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQzlCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDdEIsR0FBRyxDQUFDO0VBQ0osRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxNQUFNO0VBQ3ZCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUN2QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQzlCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDdEIsR0FBRyxDQUFDO0VBQ0osRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxNQUFNO0VBQ3ZCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3hCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7RUFDOUIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN0QixHQUFHLENBQUM7QUFDSjtFQUNBLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksTUFBTTtFQUN2QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDdkIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztFQUM5QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3RCLEdBQUcsQ0FBQztFQUNKLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksTUFBTTtFQUN2QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3RCLElBQUlBLE9BQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7RUFDOUIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN0QixHQUFHLENBQUM7RUFDSixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLE1BQU07RUFDdkIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDeEIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztFQUM5QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3RCLEdBQUcsQ0FBQztFQUNKLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksTUFBTTtFQUN2QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDdkIsSUFBSUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztFQUM5QixJQUFJQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3RCLEdBQUcsQ0FBQztBQUNKO0VBQ0EsRUFBRSxJ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LFNBQVMsVUFBVSxHQUFHO0VBQzdCLEVBQUUsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU87RUFDM0IsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDQSxPQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDMUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDeEMsR0FBRyxDQUFDO0FBQ0o7RUFDQSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQzNCOztFQ3BMTyxTQUFTLE9BQU8sR0FBRztFQUMxQixFQUFFLE1BQU0sQ0FBQ0EsT0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFQSxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVBLE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RFLENBQUM7QUFDRDtFQUNPLFNBQVMsU0FBUyxHQUFHO0VBQzVCLEVBQUUsSUFBSSxJQUFJLEdBQUdBLE9BQUssQ0FBQyxHQUFHLENBQUNBLE9BQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNuRCxFQUFFLElBQUksSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0VBQ3RELEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDckIsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUNUO0VBQ0EsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFDekIsRUFBRSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7RUFDdkMsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BDO0VBQ0EsRUFBRSxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztFQUNyQixFQUFFLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztFQUN2QyxFQUFFLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUN2QztFQUNBLEVBQUUsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUM7RUFDckQsRUFBRSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQztBQUN0RDtFQUNBLEVBQUUsT0FBTztFQUNULElBQUksT0FBTyxDQUFDLGVBQWUsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDaEYsRUFBRSxRQUFRO0VBQ1YsSUFBSSxPQUFPLENBQUMsZUFBZSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoRjtFQUNBLEVBQUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUM7RUFDdkMsT0FBTyxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQUUsUUFBUSxHQUFHLEtBQUssQ0FBQztBQUM5QztFQUNBLEVBQUUsSUFBSSxJQUFJLE9BQU8sQ0FBQyxlQUFlLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3RDtFQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHLENBQUM7RUFDN0IsRUFBRSxJQUFJLE9BQU8sQ0FBQyxlQUFlLEVBQUU7RUFDL0IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFDOUQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDO0FBQzdEO0VBQ0EsSUFBSSxFQUFFLEdBQUdBLE9BQUssQ0FBQyxHQUFHLENBQUNBLE9BQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRUEsT0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUU7RUFDQSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEdBQUdBLE9BQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztFQUNuQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUdBLE9BQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztFQUNyQyxHQUFHO0VBQ0gsSUFBSSxNQUFNO0VBQ1YsTUFBTUEsT0FBSyxDQUFDLGVBQWU7RUFDM0IsUUFBUUEsT0FBSyxDQUFDLEdBQUcsQ0FBQyxD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
