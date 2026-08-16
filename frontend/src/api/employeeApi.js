import axios from 'axios'

const API = 'http://localhost:8080/api/employees'

export const getEmployees = (search = '') =>
  axios.get(API, { params: search ? { search } : {} })

export const createEmployee = (employee) =>
  axios.post(API, employee)

export const updateEmployee = (id, employee) =>
  axios.put(`${API}/${id}`, employee)

export const deleteEmployee = (id) =>
  axios.delete(`${API}/${id}`)
