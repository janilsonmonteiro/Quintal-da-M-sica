// Inicializa EmailJS (se você estiver usando)
emailjs.init("noFa-uJI-ed4BP1Dy");

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');

        if (hamburger.classList.contains('active')) {
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        } else {
            mobileMenu.style.maxHeight = '0';
        }
    });

    // Fecha o menu ao clicar em um link
    window.closeMenu = function () {
        hamburger.classList.remove('active');
        mobileMenu.style.maxHeight = '0';
    };
}

// Botão "Reservar Mesa" → rola para a seção de reserva
document.getElementById('reserve-btn').addEventListener('click', () => {
    document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' });
});

// Clique em cada item do menu do dia → abre a seção de reserva
document.querySelectorAll(".menu-item").forEach((e) => {
    e.addEventListener("click", function () {
        document.getElementById('reserve-btn').click();
    });
});

// Envio do formulário via mailto (versão simples)
document.getElementById('reserve-form').addEventListener('submit', e => {
    e.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        social: document.getElementById('social').value,
        people: document.getElementById('people').value,
        date: document.getElementById('date').value
    };

    // Corpo do email
    const body = `Nova reserva:\n\n` +
                 `Nome: ${data.name}\n` +
                 `Email: ${data.email}\n` +
                 `Telefone: ${data.phone}\n` +
                 `Rede social: ${data.social}\n` +
                 `Número de pessoas: ${data.people}\n` +
                 `Data/Hora: ${data.date}`;

    window.location.href = `mailto:quintaldamusica@gmail.com?subject=Reserva Quintal da Música&body=${encodeURIComponent(body)}`;

    alert('Reserva enviada! Verifique seu email.');
    e.target.reset();
});

// Envio via EmailJS (se o formulário tiver id="reservaForm")
document.getElementById("reservaForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.send("service_zj15ugo", "template_4t3a1f6", {
        res: "Quintal da musica",
        email: "websolutions2024uk@gmail.com",
        email_: document.getElementById("email").value,
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value,
        people: document.getElementById("people").value,
        message: document.getElementById("mensagem")?.value || "",
        social: document.getElementById("social").value
    })
    .then(() => {
        alert("Reserva enviada com sucesso!");
        document.getElementById("reservaForm").reset();
    })
    .catch((error) => {
        console.log("Erro ao enviar: ", error);
        alert("Ocorreu um erro ao enviar a reserva. Tente novamente.");
    });
});

// Animações ao scroll
const fadeElements = document.querySelectorAll('.fade-in, .animate-on-scroll');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));