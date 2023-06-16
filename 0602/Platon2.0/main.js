function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("!!!!!!");
  }

  return shader;
}

function ToArr(m) {
  let v = [];

  for (let i = 0; i < 4; i++) {
    for (let g = 0; g < 4; g++) {
      v.push(m[i][g]);
    }
  }

  return v;
}

async function fetchShader(shaderURL) {
  try {
    const response = await fetch(shaderURL);
    const text = await response.text();
    return text;
  } catch (err) {
    console.log(err);
    array(err);
    return 0;
  }
}

let IsPressMouse = false;
const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl2");

fetchShader("./vert.glsl").then((text) => {
  console.log(text);
});

gl.clearColor(0.28, 0.47, 0.8, 1);

gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

let cam = CamSet();

const vs = `#version 300 es
      in highp vec4 in_pos;
      precision highp float;
      uniform highp float time;

      uniform frameBuffer
      {
        mat4 WVP;
      };


      out vec3 color;
      void main()
      {
        gl_Position = WVP * in_pos;
        color = vec3(sin(time) * sin(time), cos(time) * cos(time), cos(time) * sin(time) * cos(time) * sin(time));
      }
`;

const fs = `#version 300 es
    out highp vec4 o_color;
    in highp vec3 color;
    
    uniform highp float  x0, y0, x1, y1;
    uniform highp float mouseX, mouseY;
     

    void main() {
       o_color =  vec4(color.xyz, 1);
    }
`;
// //w = MatrMulMatr(Pr->Trans, World),
// winv = MatrTranspose(MatrInverse(w)),
// wvp = MatrMulMatr(w, AI5_RndMatrVP);

let World = _matr4.identity();
let w = _matr4.mulmatr(_matr4.identity(), World);
let winv = _matr4.transpose(_matr4.inverse(w));
let WVP = _matr4.mulmatr(w, cam.MatrVP);

const vertexSh = loadShader(gl, gl.VERTEX_SHADER, vs);
const fragmentSh = loadShader(gl, gl.FRAGMENT_SHADER, fs);

const program = gl.createProgram();
gl.attachShader(program, vertexSh);
gl.attachShader(program, fragmentSh);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  alert(gl.getProgramInfoLog(program));
}

let StartTime = -1 /* Start program time */,
  FPSTime = 0,
  FrameCount = 0,
  IsPause = false,
  FPS = 30,
  SyncTime;

function Timer() {
  let t;

  t = Date.now();
  if (StartTime == -1) {
    StartTime = FPSTime = t;
  }
  SyncTime = (t - StartTime) / 1000.0;
  FrameCount++;
  if (t - FPSTime > 3 * 1000.0) {
    FPS = FrameCount / ((t - FPSTime) / 1000.0);
    FPSTime = t;
    FrameCount = 0;
  }
}
let x0 = -2.0,
  x1 = 2.0,
  y0 = -2.0,
  y1 = 2.0;

let mouseX, mouseY;
const posLoc = gl.getAttribLocation(program, "in_pos");
const unifomLoc = gl.getUniformLocation(program, "time");
const unifomLoc1 = gl.getUniformLocation(program, "x0");
const unifomLoc2 = gl.getUniformLocation(program, "y0");
const unifomLoc3 = gl.getUniformLocation(program, "x1");
const unifomLoc4 = gl.getUniformLocation(program, "y1");
const unifomMouseLocX = gl.getUniformLocation(program, "mouseX");
const unifomMouseLocY = gl.getUniformLocation(program, "mouseY");

const posBuf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
const pos = [-1, 1, 0, 1, -1, -1, 0, 1, 1, 1, 0, 1, 1, -1, 0, 1];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);

gl.vertexAttribPointer(posLoc, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posLoc);

let frameBuffer = gl.createBuffer();
gl.bindBuffer(gl.UNIFORM_BUFFER, frameBuffer);
gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(ToArr(WVP)), gl.STATIC_DRAW);

gl.useProgram(program);
let v = _matr4.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

const draw = () => {
  gl.clearColor(0.28, 0.47, 0.8, 1);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  if (!IsPause) Timer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.vertexAttribPointer(posLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(posLoc);
  gl.useProgram(program);
  gl.uniform1f(unifomLoc, SyncTime);
  gl.uniform1f(unifomLoc1, x0);
  gl.uniform1f(unifomLoc2, y0);
  gl.uniform1f(unifomLoc3, x1);
  gl.uniform1f(unifomLoc4, y1);
  gl.uniform1f(unifomMouseLocX, mouseX);
  gl.uniform1f(unifomMouseLocY, mouseY);

  gl.bufferData(
    gl.UNIFORM_BUFFER,
    new Float32Array(ToArr(WVP)),
    gl.STATIC_DRAW
  );

  World = _matr4.mulmatr(
    _matr4.rotateY(SyncTime * 20),
    _matr4.translate(_vec3.set(0, 0, -1))
  );
  w = _matr4.mulmatr(_matr4.identity(), World);
  winv = _matr4.transpose(_matr4.inverse(w));
  WVP = _matr4.mulmatr(w, cam.MatrVP);

  let blk_loc = gl.getUniformBlockIndex(program, "frameBuffer");

  gl.uniformBlockBinding(program, blk_loc, 0);

  gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, frameBuffer);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  window.requestAnimationFrame(draw);
};
draw();
