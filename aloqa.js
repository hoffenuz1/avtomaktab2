document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const resultMessage = document.getElementById('resultMessage');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const ism = form.querySelector('[name="ism"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const xabar = form.querySelector('[name="xabar"]').value.trim();

        // Validatsiya: bo'sh maydonlarni tekshirish
        if (!ism || !email || !xabar) {
            resultMessage.textContent = 'Iltimos, barcha maydonlarni to‘ldiring.';
            resultMessage.style.color = 'red';
            return;
        }

        // Email formatini oddiy tekshirish
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            resultMessage.textContent = 'Iltimos, to‘g‘ri email manzil kiriting.';
            resultMessage.style.color = 'red';
            return;
        }

        const data = { ism, email, xabar };

        fetch('https://fbpaezxcpykwdfowypqw.supabase.co/rest/v1/aloqa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicGFlenhjcHlrd2Rmb3d5cHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTY0NTYsImV4cCI6MjA2MzY3MjQ1Nn0.aFeFK0jvaDoQbPyA2a3qFQu0KFEp4hGPU39n6z8Hhsk',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicGFlenhjcHlrd2Rmb3d5cHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTY0NTYsImV4cCI6MjA2MzY3MjQ1Nn0.aFeFK0jvaDoQbPyA2a3qFQu0KFEp4hGPU39n6z8Hhsk',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                resultMessage.textContent = 'Xabaringiz muvaffaqiyatli yuborildi!';
                resultMessage.style.color = 'green';
                form.reset();
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Xatolik yuz berdi.');
                });
            }
        })
        .catch(error => {
            console.error('Xatolik:', error);
            resultMessage.textContent = 'Xatolik yuz berdi: ' + error.message;
            resultMessage.style.color = 'red';
        });
    });
});
