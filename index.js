function BuscarLivro(){
    const inputcodigo = document.getElementById("input_codigo").value;



fetch('https://openlibrary.org/api/books?bibkeys=ISBN:' + inputcodigo + '&format=json&jscmd=data')
.then((response) => response.json())
.then((dados) => {
   const livro = dados['ISBN:' + inputcodigo];
    if (livro) { 

         document.getElementById("titulo").textContent = "Título: " + livro.title;
         document.getElementById("subtitulo").textContent = "Subtítulo: " + (livro.subtitle || "Não informado");
         document.getElementById("sinopse").textContent = "Sinopse: " + (livro.notes || "Não informado");
         document.getElementById("autores").textContent = "Autores: " + 
         (Array.isArray(livro.authors) ? livro.authors.map(a => a.name ).join(", ") : "Não informado");
         document.getElementById("editora").textContent = "Editora: " + 
         (Array.isArray(livro.publishers) ? livro.publishers.map(p => p.name).join(", ") : "Não informado");
         document.getElementById("ano").textContent = "Ano de publicação: " + livro.publish_date;
         document.getElementById("quantidade_de_paginas").textContent = "Páginas: " + (livro.number_of_pages || "Não informado");
         document.getElementById("categorias").textContent = "Categorias: " +
         (Array.isArray(livro.subjects) ? livro.subjects.map(s => s.name).join(", ") : "Não informado");

    }else{
        alert("Livro não encontrado!")
    }
})

 .catch((erro) => {
      alert("Erro ao buscar livro.");
      console.error(erro);
    });

}

// Configura o evento de clique no botão para buscar o livro
function configurarEventos() {
  document.getElementById("botao_buscar").addEventListener("click", BuscarLivro);
}

// Quando a página carregar, configura os eventos
window.addEventListener("load", configurarEventos);