// Variável para guardar o livro atual que está sendo exibido para salvar/cancelar
let livroAtual = null;

function BuscarLivro(){
    // Pega o valor digitado no input com id "input_codigo"
    const inputcodigo = document.getElementById("input_codigo").value;

    // Faz uma requisição para a API OpenLibrary usando o ISBN digitado
    fetch('https://openlibrary.org/api/books?bibkeys=ISBN:' + inputcodigo + '&format=json&jscmd=data')
    // Converte a resposta da API para JSON
    .then((response) => response.json())
    // Depois que os dados são recebidos, executa a função com os dados
    .then((dados) => {
        // Pega o objeto do livro dentro do JSON retornado pela chave ISBN:codigo
        const livro = dados['ISBN:' + inputcodigo];
        if (livro) {  // Se o livro existe no resultado

            livroAtual = livro; // guarda o livro atual para salvar/cancelar

            // Atualiza o texto do elemento com id "titulo" para mostrar o título do livro
            document.getElementById("titulo").textContent = "Título: " + livro.title;
            // Atualiza o subtítulo, ou mostra "Não informado" se não existir
            document.getElementById("subtitulo").textContent = "Subtítulo: " + (livro.subtitle || "Não informado");
            // Atualiza a sinopse, ou "Não informado" se não existir
            document.getElementById("sinopse").textContent = "Sinopse: " + (livro.notes || "Não informado");
            // Atualiza os autores, juntando os nomes separados por vírgula, ou "Não informado"
            document.getElementById("autores").textContent = "Autores: " + 
            (Array.isArray(livro.authors) ? livro.authors.map(a => a.name ).join(", ") : "Não informado");
            // Atualiza a editora, juntando nomes separados por vírgula, ou "Não informado"
            document.getElementById("editora").textContent = "Editora: " + 
            (Array.isArray(livro.publishers) ? livro.publishers.map(p => p.name).join(", ") : "Não informado");
            // Atualiza o ano de publicação
            document.getElementById("ano").textContent = "Ano de publicação: " + livro.publish_date;
            // Atualiza a quantidade de páginas, ou "Não informado"
            document.getElementById("quantidade_de_paginas").textContent = "Páginas: " + (livro.number_of_pages || "Não informado");
            // Atualiza as categorias, juntando nomes separados por vírgula, ou "Não informado"
            document.getElementById("categorias").textContent = "Categorias: " +
            (Array.isArray(livro.subjects) ? livro.subjects.map(s => s.name).join(", ") : "Não informado");

            // Exibe o container dos botões Salvar e Cancelar
            document.getElementById('acoes_livro').style.display = 'block';

        } else { // Se não encontrou o livro
            alert("Livro não encontrado!");
            limparCampos(); // Limpa a tela para nova busca
        }
    })
    // Captura erros na requisição ou processamento dos dados
    .catch((erro) => {
        alert("Erro ao buscar livro.");
        console.error(erro); // Mostra o erro no console para debug
    });
}

// Função que limpa os campos da página e esconde os botões de ação
function limparCampos() {
    livroAtual = null;  // Limpa a variável do livro atual
    // Limpa o conteúdo dos parágrafos
    document.getElementById("titulo").textContent = "";
    document.getElementById("subtitulo").textContent = "";
    document.getElementById("sinopse").textContent = "";
    document.getElementById("autores").textContent = "";
    document.getElementById("editora").textContent = "";
    document.getElementById("ano").textContent = "";
    document.getElementById("quantidade_de_paginas").textContent = "";
    document.getElementById("categorias").textContent = "";
    // Esconde o container dos botões Salvar e Cancelar
    document.getElementById('acoes_livro').style.display = "none";
    // Limpa o valor do input para novo código
    document.getElementById("input_codigo").value = "";
}

// Função para configurar os eventos da página, neste caso o botão Buscar, Salvar e Cancelar
function configurarEventos() {
    // Variável que armazena o elemento da lista onde os livros salvos serão exibidos
    const listaItens = document.getElementById('lista_itens');

    // Evento do botão Buscar chama a função BuscarLivro
    document.getElementById("botao_buscar").addEventListener("click", BuscarLivro);

    // Evento do botão Salvar: adiciona o livro atual na lista
    document.getElementById("botao_salvar").addEventListener("click", () => {
        if (!livroAtual) return;  // Se não há livro, sai da função

        // Cria um novo item da lista <li>
        const li = document.createElement('li');
        // Define o texto do item com título e ano do livro
        li.textContent = livroAtual.title + " (" + livroAtual.publish_date + ")";
        // Adiciona o item na lista na página
        listaItens.appendChild(li);

        alert("Livro salvo na lista!");
        limparCampos(); // Limpa a tela após salvar
    });

    // Evento do botão Cancelar: limpa os campos para nova busca
    document.getElementById("botao_cancelar").addEventListener("click", () => {
        limparCampos();
    });
}

// Quando a página termina de carregar, executa a configuração dos eventos
window.addEventListener("load", configurarEventos);
