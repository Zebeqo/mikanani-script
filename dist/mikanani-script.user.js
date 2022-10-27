// ==UserScript==
// @name            蜜柑计划|mikanani|Mikan Project|批量复制磁力链接
// @name:en         mikanani|Mikan Project|Multi-selector
// @name:zh         蜜柑计划|mikanani|Mikan Project|批量复制磁力链接
// @namespace       https://github.com/Zebeqo/
// @version         1.0.0
// @author          Zebeqo
// @description     为详情页，如https://mikanani.me/Home/Bangumi/2841，提供复选框批量复制磁力链接功能
// @description:en  For detail pages, such as https://mikanani.me/Home/Bangumi/2841, provide checkboxes to batch copy magnet links.
// @icon            https://mikanani.me/images/favicon.ico
// @supportURL      https://github.com/Zebeqo/mikanani-script/issues
// @downloadURL     https://raw.githubusercontent.com/Zebeqo/mikanani-script/master/dist/mikanani-script.user.js
// @updateURL       https://raw.githubusercontent.com/Zebeqo/mikanani-script/master/dist/mikanani-script.user.js
// @match           https://mikanani.me/Home/Bangumi/*
// ==/UserScript==

(function() {
  "use strict";
  const clipboard = [];
  const Checkbox = (magnetLink) => {
    const wrapper = document.createElement("span");
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("data-magnet-link", magnetLink);
    input.checked = clipboard.includes(input.dataset["magnetLink"]);
    input.addEventListener("change", (e) => {
      const magnetlink = e.target.dataset["magnetLink"];
      e.target.checked ? clipboard.push(magnetlink) : clipboard.splice(
        clipboard.findIndex((value) => value === magnetlink),
        1
      );
      console.log(clipboard);
    });
    wrapper.append(input);
    return wrapper;
  };
  const CopyLink = () => {
    const link = document.createElement("a");
    link.setAttribute("class", "subgroup-subscribe");
    link.append(document.createTextNode("[\u6279\u91CF\u590D\u5236\u78C1\u94FE]"));
    link.addEventListener("click", () => {
      navigator.clipboard.writeText(clipboard.join("\n"));
    });
    return link;
  };
  const origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    this.addEventListener("loadend", function() {
      addCheckbox();
      addCopyLink();
    });
    origOpen.apply(this, arguments);
  };
  const addCheckbox = () => {
    const heads = document.querySelectorAll(".magnet-link-wrap");
    heads.forEach((head) => {
      head.previousSibling || head.insertAdjacentElement(
        "beforebegin",
        Checkbox(head.nextElementSibling.dataset["clipboardText"])
      );
    });
  };
  const addCopyLink = () => {
    document.querySelectorAll('th[width="70%"]').forEach((head) => {
      if (!head.childElementCount) {
        head.insertAdjacentText("beforeend", " ");
        head.insertAdjacentElement("beforeend", CopyLink());
      }
    });
  };
  addCheckbox();
  addCopyLink();
})();
