document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            alert("Connexion réussie !");
            window.location.href = '/index.html'; // Redirige après connexion
        } else {
            const error = await response.text();
            document.getElementById('loginError').style.display = 'block';
            document.getElementById('loginError').innerText = error;
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('loginError').innerText = "Erreur serveur. Veuillez réessayer plus tard.";
    }
});
