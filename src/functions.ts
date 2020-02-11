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

export const reloadScriptTag = url => {
  const existingScriptTag = document.querySelector(`script[src="${url}"]`);
  if (existingScriptTag) existingScriptTag.remove();
  const scriptTag = document.createElement("script");
  document.body.appendChild(scriptTag);
  scriptTag.src = url;
  return scriptTag;
};
