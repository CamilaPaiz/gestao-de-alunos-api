import request from "supertest";
import { expect } from "chai";
import "dotenv/config";
import { getTokenUsuario, loginUsuario } from "../helpers/loginUsuario.js";
import disciplinas from "../fixtures/disciplinas.json" assert { type: "json" };
import { api } from "../helpers/api.js";

describe("POST /api/alunos/:alunoId/trabalhos", () => {
  let tokenAluno;

  beforeEach(async () => {
   const  respostaLoginAluno = await loginUsuario(
      process.env.ALUNO_EMAIL,
      process.env.ALUNO_PASSWORD
    );
    tokenAluno = await getTokenUsuario(respostaLoginAluno);
  });

  it("aluno deve registrar um trabalho com sucesso", async () => {
    const trabalho = disciplinas[0];

    const resposta = await request(process.env.BASE_URL)
      .post(`/api/alunos/${process.env.ALUNO_ID}/trabalhos`)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${tokenAluno}`)
      .send({
        disciplinaId: trabalho.disciplinaId,
        titulo: trabalho.titulo,
        descricao: trabalho.descricao,
      });
    expect(resposta.status).to.equal(201);
    expect(resposta.body.status).to.equal("entregue");
    expect(resposta.body.titulo).to.equal("Lista de Exercícios 1");
  });
});
