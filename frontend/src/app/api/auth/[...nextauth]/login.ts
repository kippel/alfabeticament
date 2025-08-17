import axios from "axios";

interface TokenResponse {
  access_token: string;
  token_type: string;
}

export async  function login(username: string, password: string): Promise<TokenResponse | null> {
  try {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log(`${backendUrl}/auth/login`);
    const res = await axios.post<TokenResponse>(`${backendUrl}/auth/login`, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return res.data; // { access_token, token_type }
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
}