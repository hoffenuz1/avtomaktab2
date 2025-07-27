document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("testForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const ism = document.getElementById("ism").value.trim();
        const yosh = parseInt(document.getElementById("yosh").value);
        const guruh = document.getElementById("guruh").value.trim();
        const tel = document.getElementById("oqituvchi_id").value.trim();

        const response = await fetch("https://fbpaezxcpykwdfowypqw.supabase.co/rest/v1/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicGFlenhjcHlrd2Rmb3d5cHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTY0NTYsImV4cCI6MjA2MzY3MjQ1Nn0.aFeFK0jvaDoQbPyA2a3qFQu0KFEp4hGPU39n6z8Hhsk",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicGFlenhjcHlrd2Rmb3d5cHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTY0NTYsImV4cCI6MjA2MzY3MjQ1Nn0.aFeFK0jvaDoQbPyA2a3qFQu0KFEp4hGPU39n6z8Hhsk",
                "Prefer": "return=representation"
            },
            body: JSON.stringify({
                ism: ism,
                yosh: yosh,
                guruh: guruh,
                oqituvchi_id: tel
            })
        });

        const resultMessage = document.getElementById("resultMessage");

        if (response.ok) {
            resultMessage.textContent = "✅ Ma'lumot muvaffaqiyatli yuborildi!";
            resultMessage.className = "alert alert-success";
        } else {
            const error = await response.json();
            resultMessage.textContent = "❌ Xatolik: " + JSON.stringify(error);
            resultMessage.className = "alert alert-danger";
        }

        resultMessage.style.display = "block";
        resultMessage.style.transform = "translateX(-50%) translateY(0)";

        // Xabarni 3 sekunddan so‘ng yashirish
        setTimeout(() => {
            resultMessage.style.transform = "translateX(-50%) translateY(-100%)";
            setTimeout(() => {
                resultMessage.style.display = "none";
            }, 300);
        }, 3000);
    });
});
