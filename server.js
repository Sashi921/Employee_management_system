// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock data (replace with DB in real app)
let employees = [
  { id: 1, name: "Alice", role: "Developer", salary: 50000 },
  { id: 2, name: "Bob", role: "Manager", salary: 70000 }
];

let users = [
  { username: "admin", password: "admin123" } // sample user
];

// --- Auth Routes ---
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// --- Employee CRUD Routes ---
// Get all employees
app.get("/api/employees", (req, res) => {
  res.json(employees);
});

// Get employee by ID
app.get("/api/employees/:id", (req, res) => {
  const emp = employees.find(e => e.id === parseInt(req.params.id));
  if (emp) {
    res.json(emp);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

// Add new employee
app.post("/api/employees", (req, res) => {
  const { name, role, salary } = req.body;
  const newEmployee = {
    id: employees.length > 0 ? employees[employees.length - 1].id + 1 : 1,
    name,
    role,
    salary
  };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// Update employee
app.put("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, role, salary } = req.body;
  const empIndex = employees.findIndex(e => e.id === parseInt(id));
  if (empIndex !== -1) {
    employees[empIndex] = { id: parseInt(id), name, role, salary };
    res.json(employees[empIndex]);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

// Delete employee
app.delete("/api/employees/:id", (req, res) => {
  const empIndex = employees.findIndex(e => e.id === parseInt(req.params.id));
  if (empIndex !== -1) {
    const deleted = employees.splice(empIndex, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

// --- Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
