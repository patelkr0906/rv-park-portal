import { db, auth } from "./firebase.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

/**
 * Load settings from Firestore and populate the form fields.
 */
export async function loadSettings() {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("No authenticated user found.");
            return;
        }

        const settingsRef = doc(db, "settings", "appSettings");
        const settingsSnap = await getDoc(settingsRef);

        if (settingsSnap.exists()) {
            const settings = settingsSnap.data();
            document.getElementById("businessName").value = settings.businessName || "";
            document.getElementById("currency").value = settings.currency || "";
            document.getElementById("timezone").value = settings.timezone || "";
            document.getElementById("theme").value = settings.theme || "light";
        } else {
            console.log("No settings found. Using default values.");
        }
    } catch (error) {
        console.error("Error loading settings:", error);
    }
}

/**
 * Save settings to Firestore when the user submits the form.
 */
export async function saveSettings() {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("No authenticated user found.");
            return;
        }

        const settingsData = {
            businessName: document.getElementById("businessName").value,
            currency: document.getElementById("currency").value,
            timezone: document.getElementById("timezone").value,
            theme: document.getElementById("theme").value
        };

        await setDoc(doc(db, "settings", "appSettings"), settingsData);
        alert("Settings saved successfully!");
    } catch (error) {
        console.error("Error saving settings:", error);
        alert("Failed to save settings.");
    }
}
