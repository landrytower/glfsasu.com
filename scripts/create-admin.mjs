/**
 * One-time script: create an admin user and set admin custom claim.
 * Run with: node scripts/create-admin.mjs
 */
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Uses Application Default Credentials (gcloud auth application-default login)
initializeApp({ projectId: "lipanda-60aa3" });

const auth = getAuth();

const EMAIL = "bobiyatch@gmail.com";
const PASSWORD = "123456";

async function main() {
  let user;
  try {
    user = await auth.getUserByEmail(EMAIL);
    console.log("User already exists:", user.uid);
  } catch {
    user = await auth.createUser({
      email: EMAIL,
      password: PASSWORD,
      displayName: "Admin Lipanda",
    });
    console.log("Created user:", user.uid);
  }

  await auth.setCustomUserClaims(user.uid, { admin: true });
  console.log("Admin claim set for", EMAIL);
}

main().catch(console.error);
