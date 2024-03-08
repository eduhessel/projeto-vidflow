const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos(){
    try{
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();

            videos.forEach((video) => {
                if(video.categoria == "") {
                    throw new Error('Algum dos vídeos da API não tem categoria')
                }
                console.log("Sucesso: " + "Vídeos carregados com sucesso!");
                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
                `;
            })
    } catch(error) {
        console.error("Erro: " + `${error}`)
        containerVideos.innerHTML = `
        <p>Houve um erro ao carregar os vídeos.</p>
        `
    } finally {
        console.log("Carregamento: " + "Concluído");
    }
}

buscarEMostrarVideos();