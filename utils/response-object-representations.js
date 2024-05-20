function textRepresentation(obj) {
  let string = "";
  Object.entries(obj).forEach(([key, val]) => {
    string += `${key}: ${val}\n`;
  });
  return string;
}

function htmlRepresentation(obj) {
  let string = "";
  Object.entries(obj).forEach(([key, val]) => {
    string += `<li>${key}: ${val}</li>`;
  });
  return `<html><body><ul>${string}</ul></body></html>`;
}

module.exports = { textRepresentation, htmlRepresentation };
