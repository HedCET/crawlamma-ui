export const getRenderedWidth = (html = "") => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  div.style.position = "absolute";
  div.style.visibility = "hidden";
  div.innerHTML = html;
  const width = div.clientWidth;
  document.body.removeChild(div);
  return width;
};
