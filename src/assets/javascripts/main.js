const path = require('path');
const style = require('../stylesheets/style.css');

// Lê o arquivo JSON e separa o array de dados
fileJson = new XMLHttpRequest();
fileJson.open("GET", "fazenda.json", false);
fileJson.send();
var texto = JSON.parse(fileJson.responseText);
const ranking = texto.data;

// Calcula os likes e dislikes e ordena o array
function compareLikesDislikes(order='asc') {
    return function(a, b) {

        let varA;
        let varB;
        
        if(!a.hasOwnProperty('positive') || !a.hasOwnProperty('negative')) {
            varA = 0;
        } else {
            varA = 100 * parseInt(a['positive'])/(parseInt(a['positive']) + parseInt(a['negative']));
            a.like = Math.round(varA);
            a.dislike = Math.round(100 - varA);
        }
        
        if (!b.hasOwnProperty('positive') || !b.hasOwnProperty('negative')) {
            varB = 0;
        } else {
            varB = 100 * parseInt(b['positive'])/(parseInt(b['positive']) + parseInt(b['negative']));
            b.like = Math.round(varB);
            b.dislike = Math.round(100 - varB);
        }

        let comparacao = 0;

        if (varA > varB) {
            comparacao = 1;
        } else if (varA < varB) {
            comparacao = -1;
        }

        return (
            order == 'desc' ? (comparacao * -1) : comparacao
        );
    };
}

// Função para adicionar os artigos na página
function artigo() {
    let lista = document.getElementById('ranking');

    for (let i = 0; i < ranking.length; i++) {
        let artigo = document.createElement('article');

        artigo.setAttribute('id', ranking[i].__id);
        artigo.setAttribute('class', 'main');

        artigo.innerHTML = '<figure class="avatar"><span class="numberText">' + (i+1) + '</span> <img class="circle" src="' + ranking[i].picture + '" alt="Foto da(o) participante"> </figure><section class="descricao"><h1>' + ranking[i].name + '</h1><p>' + ranking[i].description + '</p></section><span class="mostra" ><table><thead><tr><th>Gostam</th><th>Não Gostam</th></tr></thead><tbody><tr><td>' + ranking[i].like + '%</td><td>' + ranking[i].dislike + '%</td></tr></tbody></table></span>';

        //artigo.textContent = "Nome: " + ranking[i].name + "</br> Desc: " + ranking[i].description + "Likes: " + ranking[i].like;
        lista.insertAdjacentElement('beforeend', artigo);
    }
}

/** Chama a função para calcular os likes e ordenar o ranking */
ranking.sort(compareLikesDislikes('desc'));

/** Chama função para criar os artigos no ranking */
artigo();

function calculaRanking(elemento) {
    let gostam = Math.round((parseInt(elemento.positive) * 100)/(parseInt(elemento.positive) + parseInt(elemento.negative)));

    elemento.like = gostam;
    elemento.dislike = 100 - gostam;
    debugger;
    console.log(gostam);
}
