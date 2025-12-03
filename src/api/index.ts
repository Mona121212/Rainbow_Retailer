import axios from "axios";
import type { User } from "../context/AuthContext";

const API_URL = "http://localhost:3001";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export const login = async (
  username: string,
  password: string
): Promise<User | null> => {
  try {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    
    console.log("Attempting login:", { username: trimmedUsername });
    
    const response = await axios.get<User[]>(`${API_URL}/users`);
    console.log("Users fetched:", response.data.length);
    
    const user = response.data.find(
      (u) => u.username.trim() === trimmedUsername && u.password.trim() === trimmedPassword
    );
    
    if (user) {
      console.log("Login successful:", user.username);
    } else {
      console.log("Login failed: No matching user found");
      console.log("Available users:", response.data.map(u => u.username));
    }
    
    return user || null;
  } catch (error: unknown) {
    console.error("Login failed:", error);
    if (axios.isAxiosError(error)) {
      if (error.request && !error.response) {
        console.error("No response from server. Make sure JSON Server is running on http://localhost:3001");
      } else if (error.response) {
        console.error("Server responded with error:", error.response.status, error.response.data);
      }
    }
    return null;
  }
};

export const getProducts = async (): Promise<Product[] | null> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch products ", error);
    return null;
  }
};

export const deleteProducts = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/products/${id}`);
  } catch (error) {
    console.log("Failed to delete product", error);
  }
};
