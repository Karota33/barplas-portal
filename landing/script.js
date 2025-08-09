// Validación y manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');

    // Función para mostrar mensajes de error
    function showError(input, message) {
        input.classList.add('error');
        input.classList.remove('success');
        
        // Buscar o crear mensaje de error
        let errorMsg = input.parentNode.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            input.parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
        errorMsg.classList.add('show');
    }

    // Función para mostrar estado de éxito
    function showSuccess(input) {
        input.classList.add('success');
        input.classList.remove('error');
        
        const errorMsg = input.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.classList.remove('show');
        }
    }

    // Función para validar email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para validar teléfono (formato español básico)
    function validatePhone(phone) {
        const phoneRegex = /^(\+34|0034|34)?[6-9][0-9]{8}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Validación en tiempo real
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            // Limpiar errores mientras el usuario escribe
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.classList.remove('show');
                }
            }
        });
    });

    // Función para validar un campo individual
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;

        switch(fieldName) {
            case 'nombre':
                if (value === '') {
                    showError(field, 'El nombre es obligatorio');
                    return false;
                } else if (value.length < 2) {
                    showError(field, 'El nombre debe tener al menos 2 caracteres');
                    return false;
                } else {
                    showSuccess(field);
                    return true;
                }

            case 'email':
                if (value === '') {
                    showError(field, 'El email es obligatorio');
                    return false;
                } else if (!validateEmail(value)) {
                    showError(field, 'Por favor, introduce un email válido');
                    return false;
                } else {
                    showSuccess(field);
                    return true;
                }

            case 'telefono':
                if (value === '') {
                    showError(field, 'El teléfono es obligatorio');
                    return false;
                } else if (!validatePhone(value)) {
                    showError(field, 'Por favor, introduce un teléfono válido');
                    return false;
                } else {
                    showSuccess(field);
                    return true;
                }

            case 'mensaje':
                if (value === '') {
                    showError(field, 'El mensaje es obligatorio');
                    return false;
                } else if (value.length < 10) {
                    showError(field, 'El mensaje debe tener al menos 10 caracteres');
                    return false;
                } else {
                    showSuccess(field);
                    return true;
                }

            default:
                return true;
        }
    }

    // Manejo del envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar todos los campos obligatorios
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        // Si todo está válido, proceder con el envío
        if (isValid) {
            // Cambiar el botón a estado de carga
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simular envío (en una implementación real, aquí enviarías los datos al servidor)
            setTimeout(() => {
                // Mostrar mensaje de éxito
                alert('¡Formulario enviado correctamente! Gracias por contactarnos. Nos pondremos en contacto contigo muy pronto.');
                
                // Reiniciar formulario
                form.reset();
                
                // Limpiar clases de validación
                form.querySelectorAll('input, textarea').forEach(input => {
                    input.classList.remove('success', 'error');
                });

                // Ocultar mensajes de error
                form.querySelectorAll('.error-message').forEach(msg => {
                    msg.classList.remove('show');
                });

                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Scroll suave hacia arriba
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

            }, 1500); // Simular tiempo de envío

        } else {
            // Hacer scroll al primer campo con error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                firstError.focus();
            }
        }
    });

    // Smooth scrolling para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto parallax suave en el header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (scrolled > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(0,158,64,0.95) 0%, rgba(0,117,46,0.95) 100%)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #009E40 0%, #00752e 100%)';
            header.style.backdropFilter = 'none';
        }
    });

    // Animación de entrada para los elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.benefits, .contact-section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar la página
});

// Función para manejar el menú responsive (si se quiere añadir un burger menu más adelante)
function toggleMobileMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('mobile-open');
}

// Prevenir spam en el formulario
let lastSubmitTime = 0;
const submitCooldown = 5000; // 5 segundos

function canSubmit() {
    const now = Date.now();
    if (now - lastSubmitTime < submitCooldown) {
        alert('Por favor, espera unos segundos antes de enviar otro mensaje.');
        return false;
    }
    lastSubmitTime = now;
    return true;
}