import axios from "axios";
import type { User } from "../context/AuthContext";

const API_URL = "http://localhost:3001";

export interface Product {
  id: string;
  name: string;
  price: number;
}

// login user
export const login = async (
  username: string,
  password: string
): Promise<User | null> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`, {
      params: { username, password },
    });
    return response.data[0] || null;
  } catch (error) {
    console.log("Login failed: ", error);
    return null;
  }
};

// fetch products

export const getProducts = async (
 
): Promise< Product[] | null> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/product`, {
      
    });
      return response.data;
  } catch (error) {
    console.log("Failed to fetch products ", error);
    return null;
  }
};

// delete product


export const deleteProducts = async (id: string
 
): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/product/${id}`
      
    );
      
  } catch (error) {
    console.log("Failed to delete product", error);
    
  }
};
