console.log("script.js chargé ✅");

const usersList = document.getElementById("usersList");
const form = document.getElementById("userForm");
const nomInput = document.getElementById("nomInput");
const prenomInput = document.getElementById("prenomInput");


async function loadUsers() {
  try {
    const res = await fetch("/api/users");
    const users = await res.json();

    usersList.innerHTML = "";

    for (const u of users) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${u.nom} ${u.prenom}`;
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

    if (!res.ok) {
      console.error("Erreur POST /api/users");
      return;
    }


    nomInput.value = "";
    prenomInput.value = "";

  
    await loadUsers();
  } catch (err) {
    console.error("Erreur POST :", err);
  }
});


loadUsers();
