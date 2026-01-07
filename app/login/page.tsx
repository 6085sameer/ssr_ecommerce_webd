"use client";

export default function LoginPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <form
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "white",
        }}
        onSubmit={async (e) => {
          e.preventDefault();

          const form = e.currentTarget;
          const email = (form.elements.namedItem(
            "email"
          ) as HTMLInputElement).value;
          const password = (form.elements.namedItem(
            "password"
          ) as HTMLInputElement).value;

          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
             window.location.href = "/dashboard";
          } else {
            alert("Invalid credentials");
          }
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          Admin Login
        </h2>

        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="admin@demo.com"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
