// Sample initial data
let products = [
    { id: 1, name: "Sample Laptop", price: 1200 },
    { id: 2, name: "Gaming Mouse", price: 50 }
];

// 1. Saare products bhejne ke liye
exports.getProducts = (req, res) => {
    res.json(products);
};

// 2. Naya product save karne ke liye
exports.createProduct = (req, res) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ message: "Name and Price are required!" });
    }

    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        name: name,
        price: parseFloat(price)
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
};