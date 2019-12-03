'use strict';

window.onload = function() {
    var menu = document.getElementById('nav-menu'),
        login = document.getElementById('login'),
        modal = document.getElementById('login-modal'),
        header = document.getElementById('header'),
        logo = document.getElementById('logo'),
        arrowTop = document.getElementById('arrow-top'),
        anchorlinks = document.querySelectorAll('a[href^="#"]'),
        body = document.body;

    menu.onclick = function() {
        this.parentNode.classList.toggle('open');
    }

    login.onclick = function(e) {
        e.preventDefault();
        body.classList.add('modal-active');
    }

    arrowTop.onclick = function(){
        if (supportsNativeSmoothScroll) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            smoothScrollTo(0, 600);
        }
    }

    document.addEventListener('click', function(e) {
        var isModal = modal.contains(e.target);

        if (!isModal && e.target != login) {
            body.classList.remove('modal-active');
        }
    });

    anchorlinks.forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.getElementById(this.hash.replace('#', ''));

            console.log(target);
            if (!target) { return }

            if (supportsNativeSmoothScroll) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                smoothScrollTo(target.offsetTop, 600);
            }
        });
    });

    window.onscroll = function(e){

        if ( window.innerHeight < window.scrollY ){
            header.classList.add('fixed');
            logo.src = logo.dataset.logoblack;
            arrowTop.classList.add('show');
        } else {
            header.classList.remove('fixed');
            arrowTop.classList.remove('show');
            logo.src = logo.dataset.logowhite;
        }

    }
};