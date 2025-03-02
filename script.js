// Import Firebase modules (Firebase v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8dXLkSxci4m81P8zF9HZfLJkIN24XD7Y",
    authDomain: "rv-park-portal.firebaseapp.com",
    projectId: "rv-park-portal",
    storageBucket: "rv-park-portal.firebasestorage.app",
    messagingSenderId: "1026865868698",
    appId: "1:1026865868698:web:b1a3e3729a5ff5625e5423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication State Change
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("portalContainer").style.display = "block";
        document.getElementById("loginContainer").style.display = "none";
        loadInventory();
    } else {
        document.getElementById("portalContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
    }
});

// Logout Function
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
});

// Load Inventory Items
async function loadInventory() {
    const inventoryList = document.getElementById("inventoryList");
    inventoryList.innerHTML = "";
    
    onSnapshot(collection(db, "inventory"), (snapshot) => {
        inventoryList.innerHTML = "";
        snapshot.forEach((doc) => {
            const item = doc.data();
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.barcode}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td class="${item.stock <= item.lowStockThreshold ? 'low-stock' : ''}">${item.stock}</td>
                <td>
                    <button onclick="editItem('${doc.id}', '${item.name}', '${item.category}', '${item.barcode}', ${item.price}, ${item.stock})">Edit</button>
                    <button onclick="deleteItem('${doc.id}')">Delete</button>
                </td>
            `;
            inventoryList.appendChild(row);
        });
    });
}

// Save or Update Inventory Item
document.getElementById("saveItem").addEventListener("click", async () => {
    const id = document.getElementById("itemId").value;
    const name = document.getElementById("itemName").value;
    const category = document.getElementById("itemCategory").value;
    const barcode = document.getElementById("itemBarcode").value;
    const price = parseFloat(document.getElementById("itemPrice").value);
    const stock = parseInt(document.getElementById("itemStock").value);
    const lowStockThreshold = parseInt(document.getElementById("lowStockThreshold").value);
    
    const itemData = { name, category, barcode, price, stock, lowStockThreshold };
    
    if (id) {
        await updateDoc(doc(db, "inventory", id), itemData);
        alert("Item updated successfully!");
    } else {
        await addDoc(collection(db, "inventory"), itemData);
        alert("Item added successfully!");
    }
    document.getElementById("inventoryForm").reset();
});

// Edit Inventory Item
function editItem(id, name, category, barcode, price, stock) {
    document.getElementById("itemId").value = id;
    document.getElementById("itemName").value = name;
    document.getElementById("itemCategory").value = category;
    document.getElementById("itemBarcode").value = barcode;
    document.getElementById("itemPrice").value = price;
    document.getElementById("itemStock").value = stock;
}

// Delete Inventory Item
async function deleteItem(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        await deleteDoc(doc(db, "inventory", id));
        alert("Item deleted successfully!");
    }
}
