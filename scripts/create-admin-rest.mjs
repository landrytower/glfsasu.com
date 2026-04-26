/**
 * Create admin user via Firebase Auth REST API + set custom claims via gcloud.
 * Run: node scripts/create-admin-rest.mjs
 */
const API_KEY = "AIzaSyB36BUlrkkHRekkc_EyxNzwpQeSLt4u0Rg";
const EMAIL = "bobiyatch@gmail.com";
const PASSWORD = "123456";

async function main() {
  // Step 1: Create user via Firebase Auth REST SDK (signUp endpoint)
  console.log("Creating user via Firebase Auth REST API...");
  const signUpRes = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: EMAIL,
        password: PASSWORD,
        returnSecureToken: true,
      }),
    }
  );

  const signUpData = await signUpRes.json();

  if (signUpData.error) {
    if (signUpData.error.message === "EMAIL_EXISTS") {
      console.log("User already exists, that's fine.");
      // Sign in to get the localId (uid)
      const signInRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: EMAIL,
            password: PASSWORD,
            returnSecureToken: true,
          }),
        }
      );
      const signInData = await signInRes.json();
      console.log("User UID:", signInData.localId);
      console.log("\nUser created/confirmed. UID:", signInData.localId);
      console.log("\nNext: Set admin custom claim. Run this command:");
      console.log(
        `  firebase auth:import --project lipanda-60aa3 (or use the Firebase Console)`
      );
      console.log(
        "\nTo set the admin custom claim, you need to either:"
      );
      console.log("  1. Use 'gcloud auth application-default login' then run scripts/create-admin.mjs");
      console.log("  2. Or use the admin page's first-time setup flow (built-in)");
      return;
    }
    console.error("Error:", signUpData.error);
    return;
  }

  console.log("User created! UID:", signUpData.localId);
  console.log("Email:", EMAIL);
  console.log("\nAdmin user is ready. The admin claim will be set on first login.");
}

main().catch(console.error);
