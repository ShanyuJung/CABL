export const calAVG = (player) => {
  if (parseInt(player.AB) > 0) {
    return (parseInt(player.H) / parseInt(player.AB)).toFixed(3);
  } else {
    return (0 / 1).toFixed(3);
  }
};

export const calOBP = (player) => {
  if (parseInt(player.AB) > 0) {
    return (
      (parseInt(player.H) +
        parseInt(player.BB) +
        parseInt(player.IBB) +
        parseInt(player.HBP)) /
      (parseInt(player.AB) +
        parseInt(player.BB) +
        parseInt(player.HBP) +
        parseInt(player.SF))
    ).toFixed(3);
  } else {
    return (0 / 1).toFixed(3);
  }
};

export const calSLG = (player) => {
  if (parseInt(player.AB) > 0) {
    return (parseInt(player.TB) / parseInt(player.AB)).toFixed(3);
  } else {
    return (0 / 1).toFixed(3);
  }
};

export const calOPS = (player) => {
  if (parseInt(player.AB) > 0) {
    return (
      parseInt(player.TB) / parseInt(player.AB) +
      (parseInt(player.H) +
        parseInt(player.BB) +
        parseInt(player.IBB) +
        parseInt(player.HBP)) /
        (parseInt(player.AB) +
          parseInt(player.BB) +
          parseInt(player.IBB) +
          parseInt(player.HBP) +
          parseInt(player.SF))
    ).toFixed(3);
  } else {
    return (0 / 1).toFixed(3);
  }
};

export const calIPx3 = (player) => {
  return Math.trunc(parseInt(player.IP)) + (parseInt(player.IP) % 10) * 3;
};

export const calERA = (player) => {
  return (
    (parseInt(player.ER) * 9) /
    ((Math.trunc(parseInt(player.IP)) * 3 + (parseInt(player.IP) % 10) * 3) / 3)
  ).toFixed(2);
};

export const calWHIP = (player) => {
  return (
    (parseInt(player.H) + parseInt(player.BB)) /
    ((Math.trunc(parseInt(player.IP)) * 3 + (parseInt(player.IP) % 10) * 3) / 3)
  ).toFixed(2);
};

export const calAVGP = (player) => {
  return (parseInt(player.H) / parseInt(player.BF)).toFixed(3);
};
