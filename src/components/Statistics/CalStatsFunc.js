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
  return parseInt(player.IP) * 3 + (Number(player.IP) % 1).toFixed(2) * 10;
};

export const calERA = (player) => {
  return (
    (parseInt(player.ER) * 9) /
    ((parseInt(player.IP) * 3 + (Number(player.IP) % 1).toFixed(2) * 10) / 3)
  ).toFixed(2);
};

export const calWHIP = (player) => {
  return (
    (parseInt(player.H) + parseInt(player.BB)) /
    ((parseInt(player.IP) * 3 + (Number(player.IP) % 1).toFixed(2) * 10) / 3)
  ).toFixed(2);
};

// export const calAVGP = (player) => {
//   return (
//     parseInt(player.H) /
//     (parseInt(player.BF) -
//       parseInt(player.BB) -
//       parseInt(player.IBB) -
//       parseInt(player.HBP))
//   ).toFixed(3);
// };

export const csvJSON = (csv) => {
  const rowSeparator = "\r\n";
  const columnSeparator = ",";
  let lines = csv.split(rowSeparator);
  let result = [];
  let headers = lines[0].split(columnSeparator);
  lines.splice(0, 1);
  for (let line of lines) {
    let columns = line.split(columnSeparator);
    let row = {};
    for (let header of headers) {
      row[header] = columns[headers.indexOf(header)];
    }
    result.push(row);
  }
  return JSON.stringify(result);
};

export const calPTC = (team) => {
  return (
    parseInt(team.Win) /
    (parseInt(team.Win) + parseInt(team.Lose) + parseInt(team.Tie))
  ).toFixed(3);
};

// export const calOPSPlus = (player, avgOPS) => {
//   return parseInt(player.onBasePlusSlugging) / parseInt(avgOPS);
// };
