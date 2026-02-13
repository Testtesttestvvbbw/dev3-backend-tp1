const usersList = document.getElementById("usersList");
const form = document.getElementById("userForm");
const nomInput = document.getElementById("nomInput");
const prenomInput = document.getElementById("prenomInput");

async function loadUsers() {
  const res = await fetch("/api/users");
  const users = await res.json();

  usersList.innerHTML = "";

  for (const u of users) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const span = document.createElement("span");
    span.textContent = u.nom + " " + u.prenom;

    const btn = document.createElement("button");
    btn.className = "btn btn-sm btn-danger";
    btn.textContent = "X";

    btn.addEventListener("click", async () => {
      const res = await fetch("/api/users/" + u.id, {
        method: "DELETE"
      });

      if (res.ok) {
        loadUsers();
      }
    });

    li.appendChild(span);
    li.appendChild(btn);
    usersList.appendChild(li);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = nomInput.value.trim();
  const prenom = prenomInput.value.trim();

  if (!nom || !prenom) return;

  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, prenom })
  });

  if (res.ok) {
    nomInput.value = "";
    prenomInput.value = "";
    loadUsers();
  }
});

loadUsers();
