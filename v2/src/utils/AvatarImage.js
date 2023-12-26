import React from "react";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function generateAvatar(name) {
  const text = `${name?.split(" ")[0][0].toUpperCase()}${name
    ?.split(" ")[1][0]
    .toUpperCase()}`;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 50;
  canvas.height = 50;

  //Draw Background color
  context.fillStyle = stringToColor(text);
  context.fillRect(0, 0, canvas.width, canvas.height);

  //Draw text
  context.font = "bold 1.5em Assistant";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL("image/png");
}

function AvatarImage({ name }) {
  return (
    <span>
      <img
        src={generateAvatar(name)}
        alt="Avatar"
        style={{ borderRadius: "50%" }}
        id="avatar"
      />
    </span>
  );
}

export default AvatarImage;
