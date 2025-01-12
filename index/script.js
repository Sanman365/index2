
let currentPage = 1;
const maxPages = 20;  // Puedes ajustar esto según tus necesidades

function updatePagination() {
    document.querySelectorAll('.pagination a').forEach((a, index) => {
        if (index > 0 && index < 6) { // Solo actualiza los enlaces visibles (5 números de página y 2 flechas)
            let page = currentPage - 3 + index;
            if (page > 0 && page <= maxPages) {
                a.textContent = page;
                a.style.display = "inline-block";
                a.classList.toggle('active', page === currentPage);
                a.href = `#${page}`;  // Actualiza el href para la navegación visual
            } else {
                a.style.display = "none";
            }
        }
    });
    document.getElementById('prev').classList.toggle('disabled', currentPage <= 1);
    document.getElementById('next').classList.toggle('disabled', currentPage >= maxPages);
}

function goToPage(page) {
    if (page > 0 && page <= maxPages) {
        currentPage = page;
        updatePagination();
    }
}

function changePage(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < maxPages) {
        currentPage++;
    }
    updatePagination();
}

updatePagination();

const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section");


btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRight())

setInterval(() => {
    moveToRight()
}, 3000);


let operacion = 0,
    counter = 0,
    widthImg = 100 / sliderSection.length;

function moveToRight() {
    if (counter >= sliderSection.length-1) {
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    counter++;
    operacion = operacion + widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease 3.5s"
    
}  

function moveToLeft() {
    counter--;
    if (counter < 0 ) {
        counter = sliderSection.length-1;
        operacion = widthImg * (sliderSection.length-1)
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    operacion = operacion - widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease 3.5s"
    
    
}   