const AUTH_URL = "https://expense-tracker-backend-61ru.onrender.com/api/auth";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }
  
  return res.json();
};

export const registerUser = async (name: string, email: string, password: string) => {
  const res = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed");
  }
  
  return res.json();
};

export const loginGoogle = async (credential: string) => {
  const res = await fetch(`${AUTH_URL}/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credential }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Google Login failed");
  }
  
  return res.json();
};

export const updateProfile = async (name: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${AUTH_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ name }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update profile");
  }
  
  return res.json();
};
