'use strict';

window.onload = function() {
    var menu = document.getElementById('nav-menu'),
        login = document.getElementById('login'),
        modal = document.getElementById('login-modal'),
        header = document.getElementById('header'),
        logo = document.getElementById('logo'),
        arrowTop = document.getElementById('arrow-top'),
        anchorlinks = document.querySelectorAll('a[href^="#"]'),
        body = document.body,
        form = body.querySelector('.contact-form');

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

            if (!target) {
                window.location.href = window.location.origin + this.getAttribute('href');
                return;
            }

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

    if (form !== null){
        var formSubmit = form.querySelector('button[type="submit"]');
        formSubmit.onclick = function (e) {
            if (!e.target.closest('form').checkValidity()) {
                return;
            }

            e.preventDefault();

            var url = '/send.php',
                method = 'post',
                formGroups = form.querySelectorAll('.form-group'),
                messageDiv = form.querySelector('.message'),
                commentGroup = formGroups[formGroups.length-1],
                formData = new FormData(form),
                xhr = new XMLHttpRequest(),
                successText = 'Ihre Nachricht wurde erfolgreich verschickt.',
                errorText = 'Bitte korrigieren Sie Ihre Angaben.';

            if (messageDiv !== null){
                messageDiv.remove();
            }

            xhr.open(method, url);

            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        createMessage(successText, 'success', commentGroup);
                    } else if (xhr.status === 400) {
                        createMessage(errorText, 'error', commentGroup);
                    }
                }
            };
            xhr.send(formData);
        }

        var packageSelect = form.querySelector('[name=package]');
        packageSelect.onchange = function (e) {
            var storageSelect = form.querySelector('.col-md-6:nth-child(6)');
            if (e.target.value === 'Enterprise') {
                storageSelect.style.display = 'block';
            } else {
                storageSelect.style.display = 'none';
            }
        }
    }

    function createMessage(message, status, parent) {
        var statusDiv = document.createElement('div');

        statusDiv.classList.add('message', status);
        statusDiv.innerHTML = message;
        parent.appendChild(statusDiv);
    }
};
