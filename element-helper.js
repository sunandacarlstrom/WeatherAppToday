// Skapar en eller flera funktioner som i sin tur kan skapa element på ett smidigt sätt och kan användas under applikationens uppbyggnad
const createHTMLElement = (element, classes, text) => {
    const HTMLElement = document.createElement(element);

    if (classes != "" && classes != undefined) {
        const classesArray = classes.split(" ");

        classesArray.forEach((cssClass) => {
            HTMLElement.classList.add(cssClass);
        });
    }

    if (text != undefined) {
        const HTMLText = document.createTextNode(text);
        HTMLElement.appendChild(HTMLText);
    }

    return HTMLElement;
};

export default createHTMLElement;
