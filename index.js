// Importa o módulo readline-sync para capturar entradas do usuário no terminal
const readlineSync = require('readline-sync');

// Define a classe Aluno
class Aluno {
    // Construtor que inicializa o nome do aluno e uma lista vazia de matérias
    constructor(nome) {
        this.nome = nome;
        this.materias = [];
    }

    // Método para adicionar uma matéria à lista de matérias do aluno
    adicionarMateria(materia) {
        this.materias.push(materia);
    }
}

// Define a classe Materia
class Materia {
    // Construtor que inicializa o nome da matéria, uma lista vazia de notas e 0 faltas
    constructor(nome) {
        this.nome = nome;
        this.notas = [];
        this.faltas = 0;
    }

    // Método para adicionar uma nota à lista de notas da matéria
    adicionarNota(nota) {
        this.notas.push(nota);
    }

    // Método para calcular a média das notas da matéria
    calcularMedia() {
        const soma = this.notas.reduce((acc, nota) => acc + nota, 0); // Soma todas as notas
        return soma / this.notas.length; // Retorna a média das notas
    }

    // Método para adicionar faltas à matéria
    adicionarFaltas(faltas) {
        this.faltas = faltas;
    }

    // Método para verificar se o aluno está reprovado por faltas ou por média baixa
    verificarReprovacao() {
        return this.faltas > 5 || this.calcularMedia() < 5; // Reprovado se tiver mais de 5 faltas ou média menor que 5
    }
}

// Função para cadastrar um novo aluno
function cadastrarAluno() {
    const nome = readlineSync.question('Digite o nome do aluno: '); // Solicita o nome do aluno
    return new Aluno(nome); // Retorna uma nova instância de Aluno
}

// Função para cadastrar matérias
function cadastrarMaterias() {
    let materias = [];
    while (true) {
        const nomeMateria = readlineSync.question('Digite o nome da matéria (ou "sair" para parar): '); // Solicita o nome da matéria
        if (nomeMateria.toLowerCase() === 'sair') break; // Sai do loop se o usuário digitar 'sair'
        if (nomeMateria.trim() !== '') { // Verifica se o nome da matéria não está vazio
            const materia = new Materia(nomeMateria); // Cria uma nova instância de Materia
            materias.push(materia); // Adiciona a matéria à lista de matérias
        }
    }
    return materias; // Retorna a lista de matérias cadastradas
}

// Função para cadastrar notas para uma matéria
function cadastrarNotas(materia) {
    for (let i = 0; i < 3; i++) {
        const nota = readlineSync.questionFloat(`Digite a nota ${i + 1} para ${materia.nome}: `); // Solicita a nota do usuário
        materia.adicionarNota(nota); // Adiciona a nota à matéria
    }
}

// Função para cadastrar faltas para uma matéria
function cadastrarFaltas(materia) {
    const faltas = readlineSync.questionInt(`Digite o número de faltas para ${materia.nome}: `); // Solicita o número de faltas do usuário
    materia.adicionarFaltas(faltas); // Adiciona o número de faltas à matéria
}

// Função para exibir os resultados do aluno
function exibirResultados(aluno) {
    console.log(`\nResultados para o aluno ${aluno.nome}:\n`); // Exibe o nome do aluno
    aluno.materias.forEach(materia => {
        const media = materia.calcularMedia(); // Calcula a média da matéria
        const reprovado = materia.verificarReprovacao(); // Verifica se o aluno está reprovado na matéria
        console.log(`Matéria: ${materia.nome}`); // Exibe o nome da matéria
        console.log(`Média: ${media.toFixed(2)}`); // Exibe a média da matéria com duas casas decimais
        console.log(`Faltas: ${materia.faltas}`); // Exibe o número de faltas da matéria
        console.log(`Status: ${reprovado ? 'Reprovado' : 'Aprovado'}\n`); // Exibe se o aluno está aprovado ou reprovado
    });
}

// Função principal
const aluno = cadastrarAluno(); // Cadastra um novo aluno
const materias = cadastrarMaterias(); // Cadastra as matérias do aluno

if (materias.length >= 3) { // Verifica se foram cadastradas pelo menos 3 matérias
    materias.forEach(materia => {
        cadastrarNotas(materia); // Cadastra as notas para cada matéria
        cadastrarFaltas(materia); // Cadastra as faltas para cada matéria
        aluno.adicionarMateria(materia); // Adiciona a matéria à lista de matérias do aluno
    });

    exibirResultados(aluno); // Exibe os resultados do aluno
} else {
    console.log('Você precisa cadastrar pelo menos 3 matérias.'); // Mensagem de erro se não houver matérias suficientes
}