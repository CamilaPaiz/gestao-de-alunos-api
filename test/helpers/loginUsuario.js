import { api } from './api.js';

export async function loginUsuario(emailUser, passUser) {
    const loginResposta = await api()
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({ 
            email: emailUser, 
            senha: passUser
        });

    return loginResposta;
}

export async function getTokenUsuario(loginResposta) {
    return loginResposta.body.token;
}
