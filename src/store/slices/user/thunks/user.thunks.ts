import { createAsyncThunk } from "@reduxjs/toolkit";

export const authenticateUser = createAsyncThunk<string>(
  "user/authenticate",
  async () => {
    try {
      const user = {
        email: "tytu@gmail.com",
        password: "Komputer12.",
      };

      const resp = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const respAuth = await resp.json();
      console.log(respAuth);
      return respAuth;
    } catch (e) {
      console.log(e);
    }
  }
);
