const usuarios = {
  "abc-123": "user1",
};

module.exports.autorizar = function (event, context, callback) {
  // sempre enviar o token no header da requisição para identificar o usuário
  const token = event.authorizationToken;

  const usuario = usuarios[token];

  if (!usuario) {
    //API Gateway conhece o Unauthorized e vai retornar o erro correto
    callback("Unauthorized");
  } else {
    const politicAcesso = {
      principalId: usuario,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "arn:aws:execute-api:us-east-2:156412017075:0y4cx4tk2e/*/GET/pacientes",
          },
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "arn:aws:execute-api:us-east-2:156412017075:0y4cx4tk2e/*/DELETE/pacientes/*",
          }
        ],
      },
      context: {
          username: usuario,
          role: 'member'
      }
    };
    callback(null, politicAcesso)
  }
};
