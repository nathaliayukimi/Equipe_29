let symbolGraph = new Map();
let ranking = new Map();
let bool = false;

function prepare() {
    symbolGraph = new Map();
    ranking = new Map();
    bool = true;

    const cards = document.querySelectorAll('.review-card');
    const data = [];

    cards.forEach(card => {
        const empresa = card.querySelector('h3').textContent.toUpperCase().trim().replace(" ", "");
        const porcentagem = card.querySelector('p:nth-of-type(1)').textContent.split(': ')[1];
        const img = card.querySelector('img').src;
        const tempo = card.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
        const progressao = card.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];
        const ramo = card.querySelector('p:nth-of-type(5)').textContent.split(': ')[1];
        const avaliacao = card.querySelector('p:nth-of-type(6)').textContent.split(': ')[1];
        const site = card.querySelector('a.site').href;
        const salario = card.querySelector('p:nth-of-type(4)').textContent.split(': ')[1];
        
        const empresaData = {
            empresa, porcentagem, img, tempo, progressao, ramo, avaliacao, site, salario
        };
        data.push(empresaData);
    });

    // Ordenar os dados pelo valor de `avaliacao`
    data.sort((a, b) => parseFloat(b.avaliacao) - parseFloat(a.avaliacao));

    data.forEach(value => {
        symbolGraph.set(value.empresa, [value.porcentagem, value.img, value.tempo, value.progressao, value.ramo, value.avaliacao, value.site, value.empresa, value.salario]);
    });
    
    data.forEach(value => {
        ranking.set(value.avaliacao, [value.porcentagem, value.img, value.tempo, value.progressao, value.ramo, value.empresa, value.site, value.salario]);
    });

    const atual = document.querySelector('.review-cards');
    atual.innerHTML = ''; 

    ranking.forEach((type, empresa) => {
        const reviewCard = `
            <div class="review-card">
                <img src="${type[1]}" alt="${empresa}">
                <h3>${type[5]}</h3>
                <a href="${type[6]}" class="site">Site</a>
                <p><b>% de mulheres: </b>${type[0]}</p>
                <p><b>Tempo médio no cargo: </b>${type[2]}</p>
                <p><b>Expectativa de progressão de carreira: </b>${type[3]}</p>
                <p><b>Média Salarial: </b>${type[7]}</p>
                <p><b>Ramo: </b>${type[4]}</p>
                <p><b>Avaliação: </b>${empresa}</p>
            </div>`;
        atual.innerHTML += reviewCard;
    });
}

function find(NomeEmpresa) {
    if (!bool) {
        return;
    }
    let type = symbolGraph.get(NomeEmpresa);

    if (!type) {
        alert('Empresa não encontrada :(');
        return;
    }

    const atual = document.querySelector('.review-cards');
    atual.innerHTML = ''; 

    atual.innerHTML = `
        <div class="review-card">
            <img src="${type[1]}" alt="${NomeEmpresa}">
            <h3>${type[7]}</h3>
            <a href="${type[6]}" class="site">Site</a>
            <p><b>% de mulheres: </b>${type[0]}</p>
            <p><b>Tempo médio no cargo: </b>${type[2]}</p>
            <p><b>Expectativa de progressão de carreira: </b>${type[3]}</p>
            <p><b>Média Salarial: </b>${type[8]}</p>
            <p><b>Ramo: </b>${type[4]}</p>
            <p><b>Avaliação: </b>${type[5]}</p>
        </div>`; 
}

function checkEnter(event) {
    if (event.key === "Enter" && bool) {
        let NomeEmpresa = document.querySelector(".busca").value.toUpperCase().trim().replace(" ", "");
        find(NomeEmpresa);
    }
}

function applyFilters() {
    if (!bool) {
        return;
    }
    const selectedCategory = document.getElementById('category').value;
    const atual = document.querySelector('.review-cards');
    atual.innerHTML = ''; 

    ranking.forEach((type, empresa) => {
        if (selectedCategory === "all" || type[4] === selectedCategory) {
            const reviewCard = `
                <div class="review-card">
                    <img src="${type[1]}" alt="${empresa}">
                    <h3>${type[5]}</h3>
                    <a href="${type[6]}" class="site">Site</a>
                    <p><b>% de mulheres: </b>${type[0]}</p>
                    <p><b>Tempo médio no cargo: </b>${type[2]}</p>
                    <p><b>Expectativa de progressão de carreira: </b>${type[3]}</p>
                    <p><b>Média Salarial: </b>${type[7]}</p>
                    <p><b>Ramo: </b>${type[4]}</p>
                    <p><b>Avaliação: </b>${empresa}</p>
                </div>`;
            atual.innerHTML += reviewCard;
        }
    });
}

window.onload = function() {
    prepare();
    var input = document.querySelector('.search-bar .busca');
    input.addEventListener('keydown', checkEnter);
    input.value = "";  // Adicione esta linha para limpar o input
    var value = "all";
    document.getElementById('category').value = value;
}

document.querySelector(".submit").addEventListener("click", function(event){
    event.preventDefault();
    let NomeEmpresa = document.querySelector(".busca").value.toUpperCase().trim().replace(" ", "");
    find(NomeEmpresa);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const selectElements = document.querySelectorAll('#category, #rating');

    selectElements.forEach(selectElement => {
        selectElement.addEventListener('change', applyFilters);
    });
});
