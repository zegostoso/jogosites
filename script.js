const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd0c6cf3b81msh6b833c92b728499p1d237fjsn7203e793019d',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

let pesquisou = 0;


let carregou = 4;
// Define o elemento pai antes de chamar a função setarValores()
const divPai = document.querySelector('.jogos');

// Chama a função setarValores() passando o elemento pai como parâmetro
setarValores(divPai);

function setarValores(pai) {
    fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
	.then(response => response.json())
	.then(response => {
    const divs = pai.querySelectorAll('.selecao');
    for (let i = 0; i < divs.length; i++) {
      const divAtual = divs[i];
      const titles = response.map(game => game.title);
        const photos = response.map(game => game.thumbnail);
        const description = response.map(game => game.short_description);
        const url = response.map(game => game.game_url);
        const genre = response.map(game => game.genre);
      divAtual.querySelector('.nomedojogo').textContent = titles[i];
      divAtual.querySelector('.fotodojogo').src = photos[i];
      divAtual.querySelector('.descricao').textContent = description[i];
      divAtual.querySelector('.jogobutton').href = url[i];
      divAtual.querySelector('.genero').textContent = `Genre: ${genre[i]}`;
    }})
	.catch(err => console.error(err));  
  }


document.querySelector('.loadmore').addEventListener('click',carregarapi);

function carregarapi(){
    fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
	.then(response => response.json())
	.then(response => {
		const titles = response.map(game => game.title);
        const photos = response.map(game => game.thumbnail);
        const description = response.map(game => game.short_description);
        const url = response.map(game => game.game_url);
        const genre = response.map(game => game.genre);
        criarapi(titles,photos,description,url,genre);
	})
	.catch(err => console.error(err));  
}

function criarapi(titles,photos,description,url,genre){
    const divPai = document.querySelector('.jogos');
    const divOriginal = divPai.querySelector('.selecao');
    if(pesquisou === 0){
      for (let i = 0; i < 4; i++) {
        const novaDiv = divOriginal.cloneNode(true);
        novaDiv.querySelector('.nomedojogo').textContent = titles[carregou];
        novaDiv.querySelector('.fotodojogo').src = photos[carregou];
        novaDiv.querySelector('.descricao').textContent = description[carregou];
        novaDiv.querySelector('.jogobutton').href = url[carregou];
        novaDiv.querySelector('.genero').textContent = `Genre: ${genre[carregou]}`;
        carregou++;    
        divPai.appendChild(novaDiv);
      }
      return;
    }
    
}
function criarapipesquisa(titles,photos,description,url,genre){
  const divPai = document.querySelector('.jogos');
    const divOriginal = divPai.querySelector('.selecao');
  if(pesquisou === 1){
    const novaDiv = divOriginal.cloneNode(true);
    novaDiv.querySelector('.nomedojogo').textContent = titles;
    novaDiv.querySelector('.fotodojogo').src = photos;
    novaDiv.querySelector('.descricao').textContent = description;
    novaDiv.querySelector('.jogobutton').href = url;
    novaDiv.querySelector('.genero').textContent = `Genre: ${genre}`;
    divPai.appendChild(novaDiv);
    pesquisou = 0;
    return ;
}
}


document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const gamename = document.querySelector('.searcher').value;
  fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
	.then((response) => response.json())
    .then((games) => {
      const matchingGames = games.filter((game) =>
        game.title.toLowerCase().includes(gamename.toLowerCase())
      );

      if (matchingGames.length > 0) {
        const titles = matchingGames.map((game) => game.title);
        const photos =  matchingGames.map((game) => game.thumbnail);
        const description = matchingGames.map((game) => game.short_description);
        const url = matchingGames.map((game) => game.game_url);
        const genre = matchingGames.map((game) => game.genre);
        pesquisou = 1;
        criarapipesquisa(titles,photos,description,url,genre);
        console.log('Jogos encontrados:', matchingGames.map((game) => game.title));
      } else {
        console.log('Nenhum jogo encontrado com o nome', gamename);
        return;
      }
    })
    .catch((error) => {
      console.error('Ocorreu um erro:', error);
    });
	});