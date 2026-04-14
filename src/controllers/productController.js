let products = [
    { id: 1, name: "Gaming Mouse", price: 25.99, category: "Accessories" },
    { id: 2, name: "Mechanical Keyboard", price: 89.49, category: "Hardware" },
    { id: 3, name: "Monitor 4K", price: 349.00, category: "Hardware" }
];

// Saare products dikhane ke liye
exports.getProducts = (req, res) => {
    res.json(products);
};

// Naya product add karne ke liye
exports.createProduct = (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name || "New Item",
        price: req.body.price || 0,
        category: req.body.category || "General"
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};