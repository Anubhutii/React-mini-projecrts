const BASE_URL = "http://localhost:5000/api/expenses";

// GET
export const getExpenses = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// POST
export const addExpense = async (data: { title: string; amount: number; category: string; subCategory: string; date?: string; }) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// PUT (Update)
export const updateExpense = async (id: string, data: { title: string; amount: number; category: string; subCategory: string; date?: string; }) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// DELETE
export const deleteExpense = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

