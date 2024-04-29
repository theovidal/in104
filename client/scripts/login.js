async function loginFront() {
    
    const form = {
        email: document.querySelector("#email"),
        password: document.querySelector("#pwd"),
    };
    
    
    // TODO : éventuellement try/catch pour gestion d'erreur du fetch en lui-même
    const response = await fetch("/login", {
        method: "POST",
        body:   JSON.stringify({
            email: form.email.value,
            password: form.password.value,
        })
    });
    
    // Vérification
    if (response.ok){
        const data = await response.json();
        //TODO : gérer la connexion, rediriger vers les pages appropriées
    }
    else{
        alert("Mauvais identifiant ou mot de passe");
        //TODO : éventuellement un affichage dynamique sur la page ?
    }

}