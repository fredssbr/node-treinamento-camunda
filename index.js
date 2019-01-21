const {Client, logger, Variables} = require('camunda-external-task-client-js');

const config = { baseUrl: 'http://localhost:8080/rest/engine/default', use: logger, asyncResponseTimeout: 10000 };

const client = new Client(config);

client.subscribe('baixa-pedido', async function({task, taskService}){
    const resultado = JSON.parse(task.variables.get('resultado'));
    const valor = task.variables.get('valor');
    const mensagem = resultado.mensagem;

    console.log(`Deu baixa. Valor solicitado: ${valor}`);
    console.log(`Mensagem solicitado: ${mensagem}`);

    const processVariables = new Variables();
    processVariables.set('pedido', '1234');
    processVariables.set('itens', '32');
    processVariables.set('valor', '678');

    await taskService.complete(task, processVariables);
});

client.subscribe('analise-aprovacao', async function({task, taskService}){
    const controle = task.variables.get('controle');
    console.log(`Analise aprovação - o valor  R$${controle} será analisado.`);
    await taskService.complete(task);
});