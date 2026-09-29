import request from "supertest";
import "dotenv/config";

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

export function api() {
  return request(BASE_URL);
}
