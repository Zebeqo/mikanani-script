import clipboard from "./store";

const CopyLink = () => {
  const link = document.createElement("a");
  link.setAttribute("class", "subgroup-subscribe");
  link.append(document.createTextNode("[批量复制磁链]"));

  link.addEventListener("click", () => {
    navigator.clipboard.writeText(clipboard.join("\n"));
  });

  return link;
};

export default CopyLink;
