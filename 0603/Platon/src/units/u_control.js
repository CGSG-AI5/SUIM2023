function initCam() {
  cam = CamSet(_vec3.set(0, 0, 10), _vec3.set(0, 0, 0), _vec3.set(0, 1, 0));
}

function renderCam() {
  let Dist = _vec3.len(_vec3.sub(cam.At, cam.Loc));
  let cosT, sinT, cosP, sinP, plen, Azimuth, Elevator;
  let Wp, Hp, sx, sy;
  let dv;

  if (1 == 1) {
    Wp = Hp = ProjSize;
    cosT = (cam.Loc.y - cam.At.y) / Dist;
    sinT = Math.sqrt(1 - cosT * cosT);

    plen = Dist * sinT;
    cosP = (cam.Loc.z - cam.At.z) / plen;
    sinP = (cam.Loc.x - cam.At.x) / plen;

    Azimuth = (Math.atan2(sinP, cosP) / Math.PI) * 180;
    Elevator = (Math.atan2(sinT, cosT) / Math.PI) * 180;

    Azimuth += myTimer.globalDeltaTime * 1.5 * (-5 * IsLButton * Mdx);
    Elevator += myTimer.globalDeltaTime * 1.5 * (-5 * IsLButton * Mdy);

    if (Elevator < 0.08) Elevator = 0.08;
    else if (Elevator > 178.9) Elevator = 178.9;

    Dist += myTimer.globalDeltaTime * (2 * Mdz);
    Mdz = 0;

    if (Dist < 0.1) Dist = 0.1;
    if (IsRButton) {
      sx = (((Mdx * Wp) / 1200) * Dist) / -ProjDist;
      sy = (((Mdy * Hp) / 1200) * Dist) / ProjDist;

      dv = _vec3.add(_vec3.mulnum(cam.Right, sx), _vec3.mulnum(cam.Up, sy));

      cam.At = _vec3.add(cam.At, dv);
      cam.Loc = _vec3.add(cam.Loc, dv);
    }

    //console.log(Dist);

    Mdx = 0;
    Mdy = 0;
    cam = CamSet(
      _vec3.point_transform(
        _vec3.set(0, Dist, 0),
        _matr4.mulmatr(
          _matr4.mulmatr(_matr4.rotateX(Elevator), _matr4.rotateY(Azimuth)),
          _matr4.translate(cam.At)
        )
      ),
      cam.At,
      _vec3.set(0, 1, 0)
    );

    UBO.update(CamUBO, Ubo_cell.MatrVP, cam.MatrVP);
    UBO.update(CamUBO, Ubo_cell.MatrV, cam.MatrView);
    UBO.update(CamUBO, Ubo_cell.CamLoc, cam.Loc);
    UBO.update(CamUBO, Ubo_cell.CamAt, cam.At);
    UBO.update(CamUBO, Ubo_cell.CamRight, cam.Right);
    UBO.update(CamUBO, Ubo_cell.CamUp, cam.Up);
    UBO.update(CamUBO, Ubo_cell.CamDir, cam.Dir);
  }
  //   if (Ani->Keys[VK_SHIFT] && Ani->KeysClick['P'])
  //     Ani->IsPause = !Ani->IsPause;
}
