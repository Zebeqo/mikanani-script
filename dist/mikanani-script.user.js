// ==UserScript==
// @name            蜜柑计划|mikanani|Mikan Project|批量复制磁力链接
// @name:zh         蜜柑计划|mikanani|Mikan Project|批量复制磁力链接
// @name:en         mikanani|Mikan Project|Multi-selector
// @namespace       https://github.com/Zebeqo/
// @version         1.0.1
// @author          Zebeqo
// @description     为详情页，如 https://mikanani.me/Home/Bangumi/2841，提供复选框用于批量复制磁力链接
// @description:zh  为详情页，如 https://mikanani.me/Home/Bangumi/2841，提供复选框用于批量复制磁力链接
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
  const SelectAll = () => {
    const select = document.createElement("a");
    select.setAttribute("class", "subgroup-subscribe");
    select.append(document.createTextNode("[\u5168\u9009]"));
    select.setAttribute("style", "float: right;");
    select.addEventListener("click", () => {
      let parent = select;
      while (parent.nodeName.toLowerCase() !== "table") {
        parent = parent.parentNode;
      }
      const checkboxs = parent.querySelectorAll("input[type=checkbox]");
      checkboxs.forEach((checkbox) => {
        checkbox.checked = true;
        const magnetlink = checkbox.dataset["magnetLink"];
        if (!clipboard.includes(magnetlink)) {
          clipboard.push(magnetlink);
        }
      });
    });
    return select;
  };
  const UnselectAll = () => {
    const select = document.createElement("a");
    select.setAttribute("class", "subgroup-subscribe");
    select.append(document.createTextNode("[\u53D6\u6D88\u5168\u9009]"));
    select.setAttribute("style", "float: right;");
    select.addEventListener("click", () => {
      let parent = select;
      while (parent.nodeName.toLowerCase() !== "table") {
        parent = parent.parentNode;
      }
      const checkboxs = parent.querySelectorAll("input[type=checkbox]");
      checkboxs.forEach((checkbox) => {
        checkbox.checked = false;
        const magnetlink = checkbox.dataset["magnetLink"];
        if (clipboard.includes(magnetlink)) {
          clipboard.splice(
            clipboard.findIndex((value) => value === magnetlink),
            1
          );
        }
      });
    });
    return select;
  };
  const ReverseSelect = () => {
    const select = document.createElement("a");
    select.setAttribute("class", "subgroup-subscribe");
    select.append(document.createTextNode("[\u53CD\u9009]"));
    select.setAttribute("style", "float: right;");
    select.addEventListener("click", () => {
      let parent = select;
      while (parent.nodeName.toLowerCase() !== "table") {
        parent = parent.parentNode;
      }
      const checkboxs = parent.querySelectorAll("input[type=checkbox]");
      checkboxs.forEach((checkbox) => {
        checkbox.checked = !checkbox.checked;
        const magnetlink = checkbox.dataset["magnetLink"];
        if (clipboard.includes(magnetlink)) {
          clipboard.splice(
            clipboard.findIndex((value) => value === magnetlink),
            1
          );
        } else {
          clipboard.push(magnetlink);
        }
      });
    });
    return select;
  };
  const Select = { SelectAll, UnselectAll, ReverseSelect };
  const origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    this.addEventListener("loadend", function() {
      addCheckbox();
      addCopyLink();
      addSelect();
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
  const addSelect = () => {
    document.querySelectorAll('th[width="70%"]').forEach((head) => {
      if (head.childElementCount === 1) {
        head.insertAdjacentText("beforeend", " ");
        head.insertAdjacentElement("beforeend", Select.SelectAll());
        head.insertAdjacentText("beforeend", " ");
        head.insertAdjacentElement("beforeend", Select.UnselectAll());
        head.insertAdjacentText("beforeend", " ");
        head.insertAdjacentElement("beforeend", Select.ReverseSelect());
      }
    });
  };
  addCheckbox();
  addCopyLink();
  addSelect();
})();
