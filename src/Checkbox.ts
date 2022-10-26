import clipboard from "./store";

const Checkbox = (magnetLink: string) => {
  const wrapper = document.createElement("span");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("data-magnet-link", magnetLink);

  // @ts-ignore
  input.checked = clipboard.includes(input.dataset["magnetLink"]);

  input.addEventListener("change", (e) => {
    // @ts-ignore
    const magnetlink = e.target.dataset["magnetLink"];
    // @ts-ignore
    e.target.checked
      ? clipboard.push(magnetlink)
      : clipboard.splice(
          clipboard.findIndex((value) => value === magnetlink),
          1
        );
    console.log(clipboard);
  });

  wrapper.append(input);

  return wrapper;
};

export default Checkbox;
