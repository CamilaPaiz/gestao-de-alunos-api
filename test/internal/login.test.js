import request from "supertest";
import { expect } from "chai";
import app from "../../src/app.js";
import "dotenv/config";
import { loginUsuario } from "../helpers/loginUsuario.js";

describe("POST /api/auth/login", () => {
  it("admin - deve retornar 200 e um token quando o admin informar e-mail e senha corretos", async () => {
    const resposta = await loginUsuario(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.have.property("token");
    expect(resposta.body.token).to.be.a("string");
  });

  it("admin - deve retornar 401 quando a senha informada for inválida", async () => {
    const resposta = await loginUsuario(process.env.ADMIN_EMAIL, "senha-incorreta");

    expect(resposta.status).to.equal(401);
    expect(resposta.body.error).to.equal("E-mail ou senha inválidos.");
  });

  it("aluno - deve retornar 200 e um token quando o aluno informar e-mail e senha corretos", async () => {
    const resposta = await loginUsuario(process.env.ALUNO_EMAIL, process.env.ALUNO_PASSWORD);

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.have.property("token");
    expect(resposta.body.token).to.be.a("string");
  });
  it("aluno - deve retornar 401 quando a senha informada for inválida", async () => {
    const resposta = await loginUsuario(process.env.ALUNO_EMAIL, "senha-incorreta");

    expect(resposta.status).to.equal(401);
    expect(resposta.body.error).to.equal("E-mail ou senha inválidos.");
  });
});
