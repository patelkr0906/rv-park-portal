import { db } from "./firebase.js";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const sitesTableBody = document.querySelector("#sitesTable tbody");
const siteFormContainer = document.querySelector("#siteFormContainer");
const siteForm = document.querySelector("#siteForm");
const addSiteBtn = document.querySelector("#addSiteBtn");
const cancelBtn = document.querySelector("#cancelBtn");

let editingSiteId = null; // Track site being edited

/**
 * Load sites from Firestore and display them in the table.
 */
export async function loadSites() {
    sitesTableBody.innerHTML = ""; // Clear table before loading new data

    try {
        const querySnapshot = await getDocs(collection(db, "sites"));
        querySnapshot.forEach((doc) => {
            const site = doc.data();
            addSiteToTable(doc.id, site);
        });
    } catch (error) {
        console.error("Error loading sites:", error);
    }
}

/**
 * Add a site entry to the table.
 */
function addSiteToTable(id, site) {
    const row = document.createElement("tr");
    row.dataset.id = id;

    row.innerHTML = `
        <td>${site.name}</td>
        <td>${site.type}</td>
        <td>${site.status}</td>
        <td>
            <button class="editBtn" data-id="${id}">Edit</button>
            <button class="deleteBtn" data-id="${id}">Delete</button>
        </td>
    `;

    sitesTableBody.appendChild(row);
}

/**
 * Open the form to add a new site.
 */
function openAddSiteForm() {
    editingSiteId = null;
    siteForm.reset();
    document.querySelector("#formTitle").textContent = "Add New Site";
    siteFormContainer.classList.remove("hidden");
}

/**
 * Open the form to edit an existing site.
 */
function openEditSiteForm(id, site) {
    editingSiteId = id;
    document.querySelector("#siteName").value = site.name;
    document.querySelector("#siteType").value = site.type;
    document.querySelector("#siteStatus").value = site.status;
    document.querySelector("#formTitle").textContent = "Edit Site";
    siteFormContainer.classList.remove("hidden");
}

/**
 * Handle form submission for adding/editing a site.
 */
async function handleSiteFormSubmit(event) {
    event.preventDefault();

    const siteData = {
        name: document.querySelector("#siteName").value,
        type: document.querySelector("#siteType").value,
        status: document.querySelector("#siteStatus").value,
    };

    try {
        if (editingSiteId) {
            // Update existing site
            const siteRef = doc(db, "sites", editingSiteId);
            await updateDoc(siteRef, siteData);
        } else {
            // Add new site
            await addDoc(collection(db, "sites"), siteData);
        }

        siteFormContainer.classList.add("hidden");
        loadSites();
    } catch (error) {
        console.error("Error saving site:", error);
    }
}

/**
 * Delete a site from Firestore.
 */
async function deleteSite(id) {
    try {
        await deleteDoc(doc(db, "sites", id));
        loadSites(); // Refresh table
    } catch (error) {
        console.error("Error deleting site:", error);
    }
}

/**
 * Set up event listeners for form interactions.
 */
export function setupSiteForm() {
    addSiteBtn.addEventListener("click", openAddSiteForm);
    cancelBtn.addEventListener("click", () => siteFormContainer.classList.add("hidden"));
    siteForm.addEventListener("submit", handleSiteFormSubmit);

    sitesTableBody.addEventListener("click", (event) => {
        const target = event.target;
        const id = target.dataset.id;

        if (target.classList.contains("editBtn")) {
            const row = target.closest("tr");
            const site = {
                name: row.children[0].textContent,
                type: row.children[1].textContent,
                status: row.children[2].textContent,
            };
            openEditSiteForm(id, site);
        } else if (target.classList.contains("deleteBtn")) {
            if (confirm("Are you sure you want to delete this site?")) {
                deleteSite(id);
            }
        }
    });
}

// Initialize the script
document.addEventListener("DOMContentLoaded", () => {
    loadSites();
    setupSiteForm();
});
