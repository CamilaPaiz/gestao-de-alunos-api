import request from "supertest";
import { expect } from "chai";
import "dotenv/config";
import { getTokenUsuario,loginUsuario } from "../helpers/loginUsuario.js";
import alunos from "../fixtures/usuarios.json" assert { type: "json" };

describe("POST /api/admin/alunos", () => {
  let tokenAdmin;

  beforeEach(async () => {
   const respostaLoginAdmin =
      await loginUsuario(
        process.env.ADMIN_EMAIL,
        process.env.ADMIN_PASSWORD,
    );
    tokenAdmin = await getTokenUsuario(respostaLoginAdmin);
  });
  

  it("deve cadastrar alunos com dados válidos", async () => {
    const suffix = Date.now();

    for (const aluno of alunos) {
      const payload = {
        nome: aluno.nome,
        email: `${aluno.emailBase}.${suffix}@example.com`,
        matricula: `${aluno.matriculaBase}${suffix}`,
        senha: aluno.senha,
      };

      const resposta = await request(process.env.BASE_URL)
        .post("/api/admin/alunos")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send(payload);

      expect(resposta.status).to.equal(201);
      expect(resposta.body.role).to.equal("aluno");
      expect(resposta.body.email[0]).to.equal(payload.email[0]);
    }
  });

  it("deve retornar 409 quando o e-mail do aluno já estiver cadastrado", async () => {
    const resposta = await request(process.env.BASE_URL)
      .post("/api/admin/alunos")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        nome: "Ana Souza",
        email: "ana.souza@example.com",
        matricula: "2024001",
        senha: "123457",
      });

    expect(resposta.status).to.equal(409);
    expect(resposta.body.error).to.equal(
      "Já existe um aluno cadastrado com essa matrícula ou e-mail.",
    );
  });
});
