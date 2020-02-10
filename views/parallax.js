function parallax(event) {
    this.querySelectorAll('.layer').forEach(layer =>{
        layer.style.transform = `translate(-${event.clientX/50}px,-${event.clientY/30}px `
    })
}

document.addEventListener('mousemove', parallax);

