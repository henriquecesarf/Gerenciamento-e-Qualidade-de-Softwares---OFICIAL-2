describe('Testes de API de Matrículas', () => {
  const headers = { 'X-API-KEY': Cypress.env('apiKey') };
  const baseUrl = 'http://localhost:8080/v1/matriculas/';

  it('Consulta dados de uma matrícula atravez do número da matricula', () => {
    const matricula = 4653421;

    cy.request({
      method: 'GET',
      url: `${baseUrl}${matricula}`, 
      headers: headers
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', "4653421");
      expect(response.body).to.have.property('courseName');
      expect(response.body).to.have.property('tuition');
      expect(response.body.tuition).to.have.property('amount');
      expect(response.body.tuition).to.have.property('formattedAmount');
      expect(response.body.tuition).to.have.property('dueDate');
      expect(response.body.tuition).to.have.property('status');
      expect(response.body).to.have.property('student');
      expect(response.body.student).to.have.property('firstName');
      expect(response.body.student).to.have.property('lastName');
      expect(response.body.student).to.have.property('birthDate');
      expect(response.body.student).to.have.property('cpf');
    });
  });

  it('Deve retornar uma mensagem de erro para a consulta de uma matrícula com pagamento em atraso', () => {
    const matriculaAtrasada = 5566778;

    cy.request({
      method: 'GET',
      url: `${baseUrl}${matriculaAtrasada}`,
      headers: headers,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(409);
      expect(response.body.mensagem).to.eq('A matrícula informada possui débitos em aberto. Não é possível obter dados da mesma até a quitação!');
    });
  });

  it('Consulta dados de matrícula de aluno bolsista 100%', () => {
    const matricula = 7890123;

    cy.request({
      method: 'GET',
      url: `${baseUrl}${matricula}`, 
      headers: headers
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', "7890123");
      expect(response.body.tuition.status).to.eq("BOLSISTA_100");
      expect(response.body.tuition.status).to.not.eq('BOLSISTA_50');
      expect(response.body.tuition.amount).to.eq(0);
      expect(response.body.tuition.dueDate).to.eq(null);
      expect(response.body.tuition.formattedAmount).to.eq("R$ 0.00");
    });
  });
  it('Consulta dados de matrícula de aluno bolsista 50%', () => {
    cy.request({
      method: 'GET',
      url: '/v1/matriculas/1113499',
      headers: headers
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id',"1113499");
      expect(response.body.courseName).to.exist;
      expect(response.body.tuition).to.exist;
      expect(response.body.student).to.exist;
      
      expect(response.body.tuition.status).to.not.eq('BOLSISTA_50');
    });
  });
  it('Consulta dados de matrícula de um aluno com todas as mensalidades quitadas', () => {
    const matricula = 1122334; 
    
    cy.request({
      method: 'GET',
      url: `/v1/matriculas/${matricula}`,
      headers: headers
    }).then((response) => {
      expect(response.status).to.eq(200); 
      expect(response.body).to.have.property('id', "1122334");
      expect(response.body).to.have.property('courseName'); 
      expect(response.body).to.have.property('tuition'); 
      
      expect(response.body.tuition).to.have.property('status', 'CONTRATO_QUITADO');
      
      expect(response.body.tuition.dueDate).to.be.null;
    });
  });
  it('Deve retornar uma mensagem de erro ao consultar uma matrícula excluída', () => {
    const matricula = 4653499
    cy.request({
      method: 'GET',
      url:`${baseUrl}${matricula}`,
      headers: headers,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.mensagem).to.eq('A matrícula informada foi excluída de nossa base de dados!');
    });
  });
  it('Consulta dados de uma matrícula inválida', () => {
    const matriculaInvalida = 'XPTO123';

    cy.request({
      method: 'GET',
      url: `/v1/matriculas/${matriculaInvalida}`,
      headers: headers,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.mensagem).to.eq('A matrícula informada não parece ser válida!');
    });
  });
});
