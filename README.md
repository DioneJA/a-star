# Algoritmo A* (A-Star) - Explicação e Exemplo

Este projeto demonstra o funcionamento do algoritmo A* (A-Star), uma técnica popular para encontrar o caminho mais curto entre dois pontos em um gráfico. A página inclui uma explicação teórica sobre o algoritmo, sua comparação com o algoritmo de Dijkstra, e um exemplo interativo do A* em ação.

## O que é o A*?

O A* é um algoritmo de busca de caminho amplamente utilizado em problemas de navegação, como em jogos, sistemas de roteamento e robótica. Ele é uma melhoria do algoritmo de Dijkstra, utilizando uma heurística para estimar o custo do caminho até o destino, o que o torna mais eficiente.

### Como funciona o A*?

O algoritmo A* combina a busca de menor custo (como o algoritmo de Dijkstra) com uma função heurística que estima o custo restante até o destino. Ele usa uma tabela de custos acumulados para explorar caminhos promissores e encontrar o caminho mais curto de forma mais eficiente.

### Comparação com o algoritmo de Dijkstra

- **Dijkstra**: Explora todos os caminhos possíveis em um gráfico para encontrar o menor custo, sem qualquer heurística. É eficaz, mas pode ser lento, especialmente em grandes gráficos.
- **A* (A-Star)**: Utiliza uma heurística para estimar a distância até o destino, o que permite ao algoritmo focar em caminhos promissores, tornando-o mais rápido que o Dijkstra, especialmente em gráficos grandes.

## Funcionalidade

Este projeto inclui uma simulação interativa do algoritmo A*. O usuário pode interagir com a grade para:
- Definir o ponto de partida
- Definir o ponto de destino
- Adicionar barreiras
- Visualizar o caminho mais curto calculado pelo A*

## Como usar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/DioneJA/a-star.git
    ```

2. **Instale as dependências: Certifique-se de ter o Node.js e o yarn instalados. Depois, no diretório do projeto, execute**:
   ```bash
    yarn
    ```

3. **Execute o projeto: Inicie um servidor de desenvolvimento local com**:
   ```bash
    yarn dev
    ```

4. **Interaja com o exemplo**:
- Clique na grade para definir os pontos de partida e destino.

## Tecnologias Utilizadas
- Vue.js: Framework JavaScript para a construção da interface de usuário interativa.
- CSS: Estilos para uma aparência limpa e responsiva.
- JavaScript: Lógica do algoritmo A* e manipulação de eventos.
- i18n: Chaves de tradução (pt-br e en-us).
- Mdi Icons: Icones utilizados no projeto.
- Tailwinds CSS e sass: Estilização do projeto.
- Eslint e Prettier: Formatação e padrão do código.
- Vuex: Gerenciamento de estado de código.
- Vue Country Flag: Bandeiras para identificação de linguagem.

## Contato
Se você tiver alguma dúvida ou sugestão, entre em contato comigo:
- Email: brunoalves2017@gmail.com
- GitHub: Dioneja

## Autor

Feito com ❤️ por [Bruno Dionísio Alves](https://github.com/DioneJA).