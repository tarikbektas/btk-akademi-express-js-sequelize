var baslikElementi = document.querySelector('.baslik');
baslikElementi.style.color = 'blue';

document.getElementById('yonlendirmeButonu').addEventListener('click', function() {
    window.location.href = 'http://www.google.com'; // Burada yönlendirilmek istediğiniz adresi belirtin
});
