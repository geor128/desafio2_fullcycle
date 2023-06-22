FROM node:18


RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.7.0

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

USER node

WORKDIR /app

# aqui alterei a versão da imagem do node pois a 15 está com muitos erros, veja que deixei apenas a instalação do Dockerize e abaixo estou definindo o usuario como node, que no caso tem o mesmo ID do meu usuário local e então terei permissão para executar qualquer comando dentro do container node pois os ids são compativeis.

# da forma como estava ele criava o container como user root e isso é um problema pois quem cria a node_modules interna no container (root) tem mais permissão que o usuário da nossa máquina e isso gera um erro de permissão.

# outro ponto é que coloquei o npm install dentro do seu arquivo "docker-entrypoint.sh" com isso o npm install será executado em execução de container e não mais no build da imagem.