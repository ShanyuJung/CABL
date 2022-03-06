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
