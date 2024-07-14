let symbolGraph = new Map();
let ranking = new Map();
let bool = false;

async function prepare() {
    try {
        symbolGraph = new Map();
        ranking = new Map();
        
        let response = await fetch('Empresas.json');
        
        if (!response.ok) {
            bool = false;
            throw new Error('HTTP error');
        }

        bool = true;
        
        let data = await response.json();

        // Ordenar os dados pelo valor de `value.avaliacao`
        data.sort((a, b) => b.avaliacao.localeCompare(a.avaliacao));

        data.forEach(value => {
            symbolGraph.set(value.empresa.toUpperCase().trim().replace(" ", ""), [value.porcentagem, value.img, value.tempo, value.progressao, value.ramo, value.avaliacao, value.site, value.empresa, value.salario]);
        });
        
        data.forEach(value => {
            ranking.set(value.avaliacao.toUpperCase().trim().replace(" ", ""), [value.porcentagem, value.img, value.tempo, value.progressao, value.ramo, value.empresa, value.site, value.salario]);
        });

        const atual = document.querySelector('.review-cards');
        atual.innerHTML = ''; 

        ranking.forEach((type, empresa) => {
            const reviewCard = `
                <div class="review-card">
                    <img src="${type[1]}" alt="${empresa}">
                    <h3>${type[5]}</h3>
                    <a href="${type[6]}" class="site">Site</a>
                    <p><b>Porcentagem de mulheres na empresa: </b>${type[0]}</p>
                    <p><b>Tempo médio de duração dos cargos: </b>${type[2]}</p>
                    <p><b>Expectativa de progressão de cargo: </b>${type[3]}</p>
                    <p><b>Média Salarial: </b>${type[7]}</p>
                    <p><b>Ramo: </b>${type[4]}</p>
                    <p><b>Avaliação: </b>${empresa}</p>
                </div>`;
            atual.innerHTML += reviewCard;
        });
    } catch (error) {
        bool = false;
        console.log('HTTP server not available, keeping static content');
        // Mantém o conteúdo HTML estático
    }
}

function find(NomeEmpresa) {
    if(!bool){
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
            <p><b>Porcentagem de mulheres na empresa: </b>${type[0]}</p>
            <p><b>Tempo médio de duração dos cargos: </b>${type[2]}</p>
            <p><b>Expectativa de progressão de cargo: </b>${type[3]}</p>
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
    if(!bool){
        return;
    }
    const selectedCategory = document.getElementById('category').value;
    const atual = document.querySelector('.review-cards');
    atual.innerHTML = ''; 

    ranking.forEach((type, empresa) => {
        if ((selectedCategory === "all" || type[4] === selectedCategory)) {
            const reviewCard = `
                <div class="review-card">
                    <img src="${type[1]}" alt="${empresa}">
                    <h3>${type[5]}</h3>
                    <a href="${type[6]}" class="site">Site</a>
                    <p><b>Porcentagem de mulheres na empresa: </br>${type[0]}</p>
                    <p><b>Tempo médio de duração dos cargos: </b>${type[2]}</p>
                    <p><b>Expectativa de progressão de cargo: </b>${type[3]}</p>
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
