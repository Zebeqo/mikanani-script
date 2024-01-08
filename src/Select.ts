import clipboard from "./store";

const SelectAll = () => {
	const select = document.createElement("a");
	select.setAttribute("class", "subgroup-subscribe");
	select.append(document.createTextNode("[全选]"));
    select.setAttribute("style", "float: right;");
	select.addEventListener("click", () => {
		// Find parent table
		let parent = select;
		while (parent.nodeName.toLowerCase() !== "table") {
			parent = parent.parentNode as HTMLAnchorElement;
		}

		// Select all checkbox
		const checkboxs = parent.querySelectorAll("input[type=checkbox]");
		checkboxs.forEach((checkbox) => {
			// @ts-ignore
			checkbox.checked = true;
			// @ts-ignore
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
	select.append(document.createTextNode("[取消全选]"));
	select.setAttribute("style", "float: right;");
	select.addEventListener("click", () => {
		// Find parent table
		let parent = select;
		while (parent.nodeName.toLowerCase() !== "table") {
			parent = parent.parentNode as HTMLAnchorElement;
		}

		// Select all checkbox
		const checkboxs = parent.querySelectorAll("input[type=checkbox]");
		checkboxs.forEach((checkbox) => {
			// @ts-ignore
			checkbox.checked = false;
			// @ts-ignore
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
	select.append(document.createTextNode("[反选]"));
	select.setAttribute("style", "float: right;");
	select.addEventListener("click", () => {
		// Find parent table
		let parent = select;
		while (parent.nodeName.toLowerCase() !== "table") {
			parent = parent.parentNode as HTMLAnchorElement;
		}

		// Select all checkbox
		const checkboxs = parent.querySelectorAll("input[type=checkbox]");
		checkboxs.forEach((checkbox) => {
			// @ts-ignore
			checkbox.checked = !checkbox.checked;
			// @ts-ignore
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

export default { SelectAll, UnselectAll, ReverseSelect };
