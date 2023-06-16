class vertex {
  constructor(P, T, N, C) {
    this.P = P;
    this.T = T;
    this.N = N;
    this.C = C;
  }
}

class prim {
  constructor(VA, VBuf, IBuf, NumOfElements, Trans, Shdno) {
    (this.VA = VA),
      (this.VBuf = VBuf),
      (this.IBuf = IBuf),
      (this.NumOfElements = NumOfElements);
    this.Trans = Trans;
    this.Shdno = Shdno;
  }

  static create() {}
}
