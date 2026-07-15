#!/usr/bin/env node
import crypto from "node:crypto";
const password = process.argv[2];
if (!password) { console.error("Uso: node scripts/hash-admin-password.mjs 'password'"); process.exit(1); }
const salt = crypto.randomBytes(16);
crypto.scrypt(password, salt, 32, (error, key) => {
  if (error) throw error;
  console.log(`scrypt$${salt.toString("hex")}$${key.toString("hex")}`);
});
