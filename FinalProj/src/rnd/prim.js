import { UBO } from "./res/ubo.js";
import { gl } from "./rnddata.js";
import { shad } from "./res/shader.js";
import { _matr4 } from "../math/mathmat4.js";
import { _vec3 } from "../math/mathvec3.js";
import { cam } from "../math/mathcam.js";
import { CamUBO } from "./rndbase.js";
import { Ubo_cell } from "./res/ubo.js";
import { material } from "./res/material.js";
import { Material } from "./res/material.js";

export class vertex {
  constructor(P, C, N, T) {
    this.P = P;
    this.C = C;
    this.N = N;
    this.T = T;
  }
  static vert2arr(a) {
    return [a.P.x, a.P.y, a.P.z, a.C.x, a.C.y, a.C.z, a.N.x, a.N.y, a.N.z, a.T.x, a.T.y];
  }

  static create(a) {
    return new vertex(a.P, a.C, a.N);
  }
}

let id;
let id1;

let unifomTex;

export class prim {
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

    unifomTex = gl.getUniformLocation(Material[MtlNo].ShdNo, "tex");

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
    let posLoc = gl.getAttribLocation(Material[MtlNo].ShdNo, "in_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, Fsize * 11, 0);

    let posCol = gl.getAttribLocation(Material[MtlNo].ShdNo, "in_color");
    if (posCol != -1) {
      gl.vertexAttribPointer(posCol, 3, gl.FLOAT, false, Fsize * 11, Fsize * 3);
      gl.enableVertexAttribArray(posCol);
    }

    let posNorm = gl.getAttribLocation(Material[MtlNo].ShdNo, "in_normal");

    if (posNorm != -1) {
      gl.vertexAttribPointer(posNorm, 3, gl.FLOAT, false, Fsize * 11, Fsize * 6);
      gl.enableVertexAttribArray(posNorm);
    }

    let posTexCoord = gl.getAttribLocation(Material[MtlNo].ShdNo, "in_texcoord");

    if (posTexCoord != -1) {
      gl.vertexAttribPointer(posTexCoord, 2, gl.FLOAT, false, Fsize * 11, Fsize * 9);
      gl.enableVertexAttribArray(posTexCoord);
    }

    id = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, id);
    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0,
    //               gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
    
    const img = new Image();
    img.src = "bin/image/cgsg.png";
    img.onload = () => {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
                    gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                                                  gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    id1 = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, id1);

    const img1 = new Image();
    img1.src = "bin/image/scelet.png";
    img1.onload = () => {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
                    gl.RGBA, gl.UNSIGNED_BYTE, img1);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                                                  gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

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

    gl.useProgram(Material[Pr.MtlNo].ShdNo);

    gl.bindVertexArray(Pr.VA);

    UBO.update(CamUBO, Ubo_cell.MatrWVP, WVP);
    UBO.update(CamUBO, Ubo_cell.MatrW, w);
    UBO.update(CamUBO, Ubo_cell.MatrWInv, winv);
    UBO.applay(CamUBO, 0, Material[Pr.MtlNo].ShdNo);
    material.applay(Pr.MtlNo, 1);
    

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, id);
    gl.uniform1i(unifomTex, 0);

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

    // console.log(i + ":" + a[i].N.x + "," + a[i].N.y + "," + a[i].N.z);
  }
}
