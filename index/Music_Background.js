document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('background-music');
    audio.volume = 1.0; // Ajusta el volumen (0.0 a 1.0)
});

function PlayAudio() {
    document.getElementById("Music_Background").play();
    showModal();
    // Remove the onclick event from the body to prevent multiple modal popups
    document.body.onclick = null;
}

function StopAudio() {
    document.getElementById("Music_Background").pause();
    document.getElementById("Music_Background").currentTime = 0; // Reset audio to the beginning
    closeModal();
}

function showModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
