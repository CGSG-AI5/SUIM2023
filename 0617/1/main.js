let window = {
    a: 0,
}

Object.defineProperty(window, "gl", {
  get: () => {
    if (this._gl == null || this._gl == undefined) {
      this._gl = "c";
    }
    return this._gl;
  },
  set: (val) => {
    this._gl = val;
  },
});

console.log(window.gl);
