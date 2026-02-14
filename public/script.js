console.log("script.js chargé ");

const usersList = document.getElementById("usersList");
const form = document.getElementById("userForm");
const nomInput = document.getElementById("nomInput");
const prenomInput = document.getElementById("prenomInput");
const countBadge = document.getElementById("countBadge");
const emailInput = document.getElementById("emailInput");


async function loadUsers() {
  try {
    const res = await fetch("/api/users");
    const users = await res.json();

    // compteur
    if (countBadge) {
      countBadge.textContent = String(users.length);
    } else {
      console.error("Element #countBadge introuvable dans le HTML");
    }

    // liste
    usersList.innerHTML = "";
    for (const u of users) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      const span = document.createElement("span");
      span.textContent = `${u.nom} ${u.prenom}`;

      const btn = document.createElement("button");
      btn.className = "btn btn-sm btn-danger";
      btn.textContent = "X";

      btn.addEventListener("click", async () => {
        const r = await fetch("/api/users/" + u.id, { method: "DELETE" });
        if (r.ok) loadUsers();
      });

      li.appendChild(span);
      li.appendChild(btn);
      usersList.appendChild(li);
    }
  } catch (err) {
    console.error("Erreur GET /api/users :", err);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = nomInput.value.trim();
  const prenom = prenomInput.value.trim();
  if (!nom || !prenom) return;

  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom }),
    });

    if (!res.ok) return;

    nomInput.value = "";
    prenomInput.value = "";
    loadUsers();
  } catch (err) {
    console.error("Erreur POST :", err);
  }
});














form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = {
    nom: nomInput.value,
    prenom: prenomInput.value,
    email: emailInput.value
  };
  
  await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  loadUsers();
});




loadUsers();
