document.addEventListener("DOMContentLoaded", function() {
    const text = document.getElementById("welcome-text");
    const strText = text.textContent;
    const splitText = strText.split("");
    text.textContent = "";

    let char = 0;
    function typeWriter() {
        if (char < splitText.length) {
            text.innerHTML += splitText[char];
            char++;
            setTimeout(typeWriter, 100);
        }
    }
    typeWriter();

    const cards = document.querySelectorAll('.services__card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = 1;
        }, index * 300);
    });
});