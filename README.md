# QUIZ-DO-MILHAO

Trata-se de um Quiz de perguntas e respostas composto por um total de 10 perguntas com 4 alternativas cada. 
Quando o jogador insere seu nome na caixa conforme solicitado e clica em salvar, o mesmo fica salvo ao lado do avatar no canto superior direito da tela. 
O jogador tem 15 segundos para responder cada pergunta. Caso ultrapasse esse limite, o jogo pula para a próxima pergunta.
O jogador terá 2 opções de ajuda que podem ser utilizada por no máximo duas vezes em cada partida. 
- Pular pergunta. 
- Autocorreção. 
Ao selecionar a resposta, o jogador recebe um feedback descrevendo se acertou ou errou a alternativa. 
É possível ver seu progresso no jogo por meio de uma barra de progresso na parte superior da tela de perguntas, que mostra também a posição da pergunta atual e quantas perguntas ainda restam para finalizar o jogo. 
Na tela de perguntas o jogador também terá disponível 1 botão de Reiniciar o jogo e 1 botão de Desistir. 
No final do jogo é possível verificar sua porcentagem de acertos. 

OBS: conforme proposto, as perguntas foram colocadas em um arquivo separado (JSON) e para que as mesmas rodassem de forma adequada durante o jogo foi necessário utilizar os seguintes códigos no git bash: 

node -v

npm install -g http-server

http server

E após a utilização desses códigos o link: http://localhost:8080 foi copiado e colado no browser. 

Foram realizados 2 testes com sucesso, porém as perguntas pararam de carregar mesmo fazendo o passo a passo descrito acima, e o layout do jogo também começou a sofre alterações.  
Por isso, deixei comentado os códigos relacionados ao JSON e mantive as perguntas no arquivo JS para que o jogo carregasse com as perguntas. 


