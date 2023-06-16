let Pr_tru_cub_oct;

function initTruCubOct() {
  let Vs = [];
  let Vr = [];
  let col = [1, Math.sqrt(2) + 1, 2 * Math.sqrt(2) + 1];

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
              _vec3.set(0, 0, 0)
            );

            console.log(Vr[k + l * 2 + i * 6 + j * 12 + m * 24].P);
          }
        }
        col[0] *= m * 2 - 1;
        col[1] *= j * 2 - 1;
        col[2] *= i * 2 - 1;
        console.log(m * 2 - 1, j * 2 - 1, i * 2 - 1);
      }
    }
  }

  let indices = [
    // 0, 1, 2,

    // 3, 4, 5,

    /*hexagon 1*/

    42, 43, 44,

    45, 46, 47,

    45, 47, 42,

    42, 44, 47,

    /*hexagon 2*/

    30, 22, 21,

    35, 38, 37,

    30, 35, 22,

    35, 30, 37,

    /*hexagon 3*/

    32, 19, 18,

    41, 40, 33,

    33, 41, 32,

    33, 32, 18,

    /*hexagon 4*/

    20, 23, 36,

    23, 36, 39,

    23, 39, 34,

    20, 36, 31,

    /*square 1-3*/

    46, 21, 22,

    46, 45, 21,

    18, 19, 43,

    43, 42, 18,

    20, 23, 44,

    47, 44, 23,

    /*square 4-5*/

    40, 33, 9,

    9, 40, 16,

    41, 32, 17,

    8, 32, 17,

    /*square 6-7*/

    30, 37, 13,

    13, 30, 6,

    35, 38, 14,

    35, 14, 11,

    /*square 8-9*/

    36, 31, 12,

    31, 12, 7,

    34, 39, 10,

    10, 39, 15,

    /*hexagon 5*/

    13, 6, 9,

    13, 9, 16,

    16, 26, 13,

    16, 26, 29,

    /*hexagon 6*/

    34, 35, 29,

    13, 9, 16,

    16, 26, 13,

    16, 26, 29,

    24, 25, 26,

    27, 28, 29,
  ];

  for (let i = 0; i < indices.length; i++) {
    Vs[i] = vertex.create(Vr[indices[i]]);
  }
  for (let i = 0; i < indices.length; i++) {
    indices[i] = i;
  }

  //   for (let i = 0; i < indices.length / 3; i++) {
  //     prim.create_normal(Vs, i * 3);
  //   }

  let Mtl = material.MtlGetDef();
  Mtl = new material(
    _vec3.set(),
    _vec3.set(0.23125, 0.23125, 0.23125),
    _vec3.set(0.2775, 0.2775, 0.2775),
    _vec3.set(0.773911, 0.773911, 0.773911),
    96.8,
    1,
    [-1, -1, -1, -1, -1, -1, -1, -1]
  );
  Pr_tru_cub_oct = prim.create(
    Vs,
    Vs.length,
    indices,
    indices.length,
    material.add(Matlib.Jade)
  );
}

function renderTruCubOct() {
  let Worl = _matr4.mulmatr(
    _matr4.scale(_vec3.set(0.9, 0.9, 0.9)),
    _matr4.translate(_vec3.set(0, 0, 0))
  );
  prim.draw(Pr_tru_cub_oct, Worl);
}
