import { useEffect, useState } from 'react'
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from './api/employeeApi'

const emptyForm = {
  name: '',
  email: '',
  department: '',
  salary: ''
}

function App() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const loadEmployees = async () => {
    try {
      const response = await getEmployees(search)
      setEmployees(response.data)
      setError('')
    } catch {
      setError('Unable to connect to backend.')
    }
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        salary: form.salary ? Number(form.salary) : null
      }

      if (editingId) {
        await updateEmployee(editingId, payload)
      } else {
        await createEmployee(payload)
      }

      setForm(emptyForm)
      setEditingId(null)
      await loadEmployees()
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed.')
    }
  }

  const editEmployee = (employee) => {
    setEditingId(employee.id)
    setForm({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: employee.salary ?? ''
    })
  }

  const removeEmployee = async (id) => {
    if (!window.confirm('Delete this employee?')) return
    await deleteEmployee(id)
    await loadEmployees()
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="card form">
        <h2>{editingId ? 'Update Employee' : 'Add Employee'}</h2>

        <input
          name="name"
          placeholder="Employee name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <input
          name="salary"
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <div className="buttons">
          <button type="submit">
            {editingId ? 'Update' : 'Add Employee'}
          </button>
          {editingId && (
            <button type="button" className="secondary" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="card">
        <div className="search-row">
          <input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadEmployees()}
          />
          <button onClick={loadEmployees}>Search</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.salary ?? '-'}</td>
                <td>
                  <button onClick={() => editEmployee(employee)}>Edit</button>
                  <button
                    className="danger"
                    onClick={() => removeEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && <p>No employees found.</p>}
      </div>
    </div>
  )
}

export default App
