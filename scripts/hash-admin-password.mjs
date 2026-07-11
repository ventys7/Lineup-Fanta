import crypto from "node:crypto";
import process from "node:process";

const password = process.argv.slice(2).join(" ");
if (!password) {
  console.error('Uso: node scripts/hash-admin-password.mjs "PASSWORD"');
  process.exit(1);
}

const salt = crypto.randomBytes(16);
crypto.scrypt(password, salt, 32, (error, derivedKey) => {
  if (error) throw error;
  console.log(`scrypt$${salt.toString("hex")}$${derivedKey.toString("hex")}`);
});
