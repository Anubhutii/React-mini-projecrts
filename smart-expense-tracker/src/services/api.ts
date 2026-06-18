const BASE_URL =
  "https://expense-tracker-backend-61ru.onrender.com/api/expenses";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// GET
export const getExpenses = async () => {
  const res = await fetch(BASE_URL, {
    headers: getHeaders(),
  });
  return res.json();
};

// POST
export const addExpense = async (data: { title: string; amount: number; category: string; subCategory: string; date?: string; }) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

// PUT (Update)
export const updateExpense = async (id: string, data: { title: string; amount: number; category: string; subCategory: string; date?: string; }) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

// DELETE
export const deleteExpense = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.json();
};

