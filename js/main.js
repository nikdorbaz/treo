window.onload = function(){
    let menu = document.getElementById('nav-menu');

    menu.onclick = function(){
        this.classList.toggle('open');
    }
}
