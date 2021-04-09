function random( max, min = 0 ){
    const num = max - min
    return Math.ceil(Math.random() * num) + min
}

const $getElById = (id) => document.getElementById(id);
const $getElBySelector = (selector) => document.querySelector(selector)
const $getElBySelectorAll = (selector) => document.querySelectorAll(selector)

function createEl( tag, classNamne, text ) {
    const $el = document.createElement( tag )
    classNamne && $el.classList.add( classNamne )
    if ( text ) { $el.innerText = text }
    return $el
}

export { createEl, random, $getElById, $getElBySelector, $getElBySelectorAll }