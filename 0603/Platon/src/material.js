let Material = []

class material
{
  constructor(Name, Ka, Kd, Ks, Ph, Trans, Tex, UboNo)
  {
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

  static MtlGetDef(){

    return new material("Default", _vec3.set(0.1, 0.1, 0.1), _vec3.set(0.9, 0.9, 0.9) , _vec3.set(0.3, 0.3, 0.3), 30, 1 , [-1, -1, -1, -1, -1, -1, -1, -1]);
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
