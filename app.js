const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- DATA STORE (Jo aapne bola tha ke data enter ho) ---
let inventory = [
    { id: 1, name: "Laptop", price: "150000" },
    { id: 2, name: "Wireless Mouse", price: "2500" }
];

// --- BACKEND ROUTES ---
app.get('/api/products', (req, res) => {
    res.json(inventory);
});

app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    if (name && price) {
        const newProduct = { id: inventory.length + 1, name, price };
        inventory.push(newProduct);
        res.status(201).json(newProduct);
    } else {
        res.status(400).json({ error: "Details missing" });
    }
});

// --- FRONTEND UI (Modern Design) ---
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>StockPro Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-slate-900 text-white p-10 font-sans">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-bold mb-10 text-blue-500 underline decoration-blue-800">📦 Inventory Control Center</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
                    <h2 class="text-xl font-bold mb-6">Add New Product</h2>
                    <input id="n" type="text" placeholder="Item Name" class="w-full bg-slate-700 p-3 rounded-xl mb-4 outline-none focus:ring-2 ring-blue-500">
                    <input id="p" type="number" placeholder="Price (PKR)" class="w-full bg-slate-700 p-3 rounded-xl mb-6 outline-none">
                    <button onclick="save()" class="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition-all transform active:scale-95">➕ Save to Database</button>
                </div>

                <div class="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
                    <h2 class="text-xl font-bold mb-6 text-slate-400">Live Stock List</h2>
                    <div id="list" class="space-y-4"></div>
                </div>
            </div>
        </div>

        <script>
            async function load() {
                const r = await fetch('/api/products');
                const data = await r.json();
                document.getElementById('list').innerHTML = data.map(i => \`
                    <div class="flex justify-between items-center bg-slate-700/50 p-4 rounded-2xl border border-slate-600">
                        <span><b class="text-lg">\${i.name}</b><br><small class="text-slate-400">UID: #\${i.id}</small></span>
                        <span class="text-green-400 font-mono text-xl">Rs. \${i.price}</span>
                    </div>
                \`).reverse().join('');
            }

            async function save() {
                const name = document.getElementById('n').value;
                const price = document.getElementById('p').value;
                if(!name || !price) return alert("Please enter both!");

                await fetch('/api/products', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ name, price })
                });

                document.getElementById('n').value = '';
                document.getElementById('p').value = '';
                load();
            }
            load();
        </script>
    </body>
    </html>
    `);
});

// --- SERVER START (Clean Syntax) ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log("✅ SYSTEM ONLINE: http://localhost:" + PORT);
    console.log("-----------------------------------------");
});