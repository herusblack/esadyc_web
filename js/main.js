// main.js - Funcionalidades generales del sitio ESADYC

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Cargar carrusel dinámicamente
    cargarCarrusel();

    // Manejar el envío del formulario de contacto
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            if (nombre && email && mensaje) {
                // Simular envío (en producción se conectaría con el backend)
                ESADYC.mostrarNotificacion('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.', 'success');
                contactForm.reset();
            } else {
                ESADYC.mostrarNotificacion('Por favor, complete todos los campos requeridos.', 'warning');
            }
        });
    }

    // Función para cargar noticias dinámicamente (placeholder)
    function cargarNoticias() {
        console.log('Cargando noticias...');
        // En producción, aquí se haría una petición fetch a la API
    }

    // Función para buscar publicaciones
    function buscarPublicaciones(termino) {
        console.log('Buscando publicaciones con término:', termino);
        // En producción, aquí se haría una petición fetch a la API
    }

    // Inicializar funcionalidades
    cargarNoticias();

    // Manejar búsqueda en tiempo real (si existe el campo de búsqueda)
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const termino = e.target.value;
            if (termino.length > 2) {
                buscarPublicaciones(termino);
            }
        });
    }

    // Smooth scroll para enlaces internos
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

    // Manejar estado activo del menú de navegación
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Función para compartir en redes sociales
    window.compartirNoticia = function(titulo, url) {
        const text = `Mira esta noticia de ESADYC: ${titulo}`;
        const shareUrl = encodeURIComponent(url || window.location.href);
        const shareText = encodeURIComponent(text);
        
        // En producción, se implementarían los enlaces de compartir específicos
        console.log('Compartir:', titulo, url);
    };

    // Manejar descargas de publicaciones
    document.querySelectorAll('a[href*="download"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const fileName = this.textContent.trim();
            console.log('Iniciando descarga de:', fileName);
            // En producción, aquí se manejaría la descarga real
        });
    });

    // Efectos hover para tarjetas
    document.querySelectorAll('.hover-shadow').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Función para cargar el carrusel dinámicamente con imágenes locales
function cargarCarrusel() {
    const carruselContainer = document.getElementById('carrusel-container');
    
    if (!carruselContainer) return;

    // Usar imágenes locales de la carpeta assets/images
    const carruselData = [
        {
            image: 'assets/img_carrusel/images_1.png',
            title: 'Investigación Avanzada',
            description: 'Nuestros científicos desarrollan proyectos innovadores en diversas áreas del conocimiento.'
        },
        {
            image: 'assets/img_carrusel/images_2.jpg',
            title: 'Infraestructura de Vanguardia',
            description: 'Contamos con laboratorios equipados con tecnología de última generación.'
        },
        {
            image: 'assets/img_carrusel/images_3.jpg',
            title: 'Cooperación Internacional',
            description: 'Trabajamos en conjunto con instituciones de todo el mundo.'
        },
        {
            image: 'assets/img_carrusel/images_4.png',
            title: 'Formación de Excelencia',
            description: 'Programas de becas y formación para jóvenes investigadores.'
        },
        {
            image: 'assets/img_carrusel/images_5.jpg',
            title: 'Divulgación Científica',
            description: 'Acercamos la ciencia a la sociedad a través de diversos programas.'
        },
        {
            image: 'assets/img_carrusel/images.jpg',
            title: 'Innovación Tecnológica',
            description: 'Desarrollamos soluciones tecnológicas para los desafíos actuales.'
        }
    ];

    // Dividir en grupos de 3 imágenes
    const grupos = [];
    for (let i = 0; i < carruselData.length; i += 3) {
        grupos.push(carruselData.slice(i, i + 3));
    }

    // Generar HTML del carrusel
    let carruselHTML = '';
    
    grupos.forEach((grupo, index) => {
        const isActive = index === 0 ? 'active' : '';
        
        carruselHTML += `
            <div class="carousel-item ${isActive}">
                <div class="row g-4 justify-content-center">
        `;
        
        grupo.forEach(item => {
            carruselHTML += `
                <div class="col-lg-3 col-md-4">
                    <div class="card h-100 border-1 shadow-lg hover-shadow transition-all">
                        <img src="${item.image}" class="card-img-top" alt="${item.title}" style="height: 100px; object-fit: cover;">
                        <div class="card-body text-center p-4">
                            <h6 class="card-title text-primary fw-bold mb-1">${item.title}</h6>
                            <p class="card-text text-muted">${item.description}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        carruselHTML += `
                </div>
            </div>
        `;
    });

    carruselContainer.innerHTML = carruselHTML;
}

// Funciones utilitarias globales
const ESADYC = {
    // Formatear fecha
    formatearFecha: function(fecha) {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-AR', opciones);
    },

    // Validar email
    validarEmail: function(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Mostrar notificación
    mostrarNotificacion: function(mensaje, tipo = 'info') {
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
        notificacion.style.zIndex = '9999';
        notificacion.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas ${tipo === 'success' ? 'fa-check-circle' : tipo === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'} me-2"></i>
                <span>${mensaje}</span>
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Agregar al documento
        document.body.appendChild(notificacion);
        
        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 5000);
    },

    // Función para actualizar el carrusel desde el admin
    actualizarCarrusel: function(nuevosDatos) {
        // En producción, esta función se llamaría desde el panel de administración
        console.log('Actualizando carrusel con nuevos datos:', nuevosDatos);
        // Aquí se implementaría la lógica para actualizar el carrusel
    }
};