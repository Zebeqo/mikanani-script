// @ts-ignore isolatedModules
import Checkbox from "./Checkbox";
import CopyLink from "./CopyLink";

// https://stackoverflow.com/a/27363569
const origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function () {
  this.addEventListener("loadend", function () {
    // re-add checkbox and copyLink after show more action
    addCheckbox();
    addCopyLink();
  });
  // @ts-ignore
  origOpen.apply(this, arguments);
};

const addCheckbox = () => {
  const heads = document.querySelectorAll(".magnet-link-wrap");
  heads.forEach((head) => {
    head.previousSibling ||
      head.insertAdjacentElement(
        "beforebegin",
        // @ts-ignore
        Checkbox(head.nextElementSibling.dataset["clipboardText"])
      );
  });
};

const addCopyLink = () => {
  document.querySelectorAll('th[width="70%"]').forEach((head) => {
    if (!head.childElementCount) {
      // add padding
      head.insertAdjacentText("beforeend", " ");

      head.insertAdjacentElement("beforeend", CopyLink());
    }
  });
};

addCheckbox();
addCopyLink();
