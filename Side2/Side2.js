
/*ikke all scriptet er mitt, men det meste er det, og jeg har redigert det som ikke var det*/
function grabLadder() {
    document.getElementById('stige').style.display = 'none';
    sessionStorage.setItem('harStige', 'true');
    window.location.href = 'Side2v2.html'; 
}

window.addEventListener('DOMContentLoaded', function () {
    var stige = document.getElementById('draggable-stige');
    if (!stige) return;
    if (sessionStorage.getItem('harStige') !== 'true') return;

    stige.style.display = 'block';

    var isDragging = false;
    var offsetX, offsetY;

    stige.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - stige.getBoundingClientRect().left;
        offsetY = e.clientY - stige.getBoundingClientRect().top;
        stige.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        stige.style.left = (e.clientX - offsetX) + 'px';
        stige.style.top = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', function () {
        if (!isDragging) return;
        isDragging = false;
        stige.style.cursor = 'grab';

        var dropZone = document.getElementById('fence-dropzone');
        var dropRect = dropZone.getBoundingClientRect();
        var stigeRect = stige.getBoundingClientRect();

        var overlaps =
            stigeRect.left < dropRect.right &&
            stigeRect.right > dropRect.left &&
            stigeRect.top < dropRect.bottom &&
            stigeRect.bottom > dropRect.top;

        if (overlaps) {
            sessionStorage.removeItem('harStige');
            window.location.href = '/side3/side3.html';
        }
    });
});