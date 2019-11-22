window.onload = function() {
    let menu = document.getElementById('nav-menu'),
        login = document.getElementById('login'),
        modal = document.getElementById('login-modal'),
        anchorlinks = document.querySelectorAll('a[href^="#"]'),
        body = document.body;

    menu.onclick = function(e) {
        this.classList.toggle('open');
    }

    login.onclick = function(e) {
        e.preventDefault();
        body.classList.add('modal-active');
    }

    document.addEventListener('click', function(e) {
        let isModal = modal.contains(e.target);

        if (!isModal && e.target != login) {
            body.classList.remove('modal-active');
        }
    });

    anchorlinks.forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            let target = document.getElementById(this.hash.replace('#', ''));

            if (!target) { return }

            if (window.clipboardData || navigator.userAgent.search(/YaBrowser/) >= 0) {
                window.scrollTo(0, target.offsetTop);
            } else {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}