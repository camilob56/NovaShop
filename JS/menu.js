
const closeMenu = document.querySelector('#closeMenu');

const aside = document.querySelector('aside');


btnMenu.addEventListener('click', () => {
    aside.classList.add('aside-visible');
})

closeMenu.addEventListener('click', () => {
    aside.classList.remove('aside-visible');
})

btnsCategorias.forEach(boton => boton.addEventListener('click', () => {
    aside.classList.remove('aside-visible');
}))