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

const createHTMLElementImage = (classes, url, alt) => {
    const image = document.createElement("img");
    image.classList.add(classes);
    image.src = url;
    image.alt = alt;

    return image;
};

export { createHTMLElement, createHTMLElementImage };
