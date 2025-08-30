
const API_URL = 'http://localhost:5000/api/employees';

const form = document.getElementById('employee-form');
const tableBody = document.getElementById('employee-table-body');

async function fetchEmployees() {
  const res = await fetch(API_URL);
  const data = await res.json();

  renderTable(data);
}

function renderTable(employees) {
  tableBody.innerHTML = '';
  employees.forEach(emp => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.position}</td>
      <td>
        <button onclick="editEmployee(${emp.id})">Edit</button>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('employee-id').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const position = document.getElementById('position').value;

  const payload = { name, email, position };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  form.reset();
  document.getElementById('employee-id').value = '';
  fetchEmployees();
});

window.editEmployee = async (id) => {
  const res = await fetch(`${API_URL}`);
  const employees = await res.json();
  const employee = employees.find(emp => emp.id === id);
  document.getElementById('employee-id').value = employee.id;
  document.getElementById('name').value = employee.name;
  document.getElementById('email').value = employee.email;
  document.getElementById('position').value = employee.position;
};

window.deleteEmployee = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchEmployees();
};

fetchEmployees();
