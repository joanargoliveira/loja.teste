// PAINEL DE GESTÃO DO ATELIÊ DA JO
const dadosDaLoja = {
    nomeLoja: "O Ateliê da Jo",
    logoUrl: "imagens/logo.png",
    
    // CONFIGURAÇÃO DE PORTES GRÁTIS
    // Como tens o quadro da rã a 300€, mantivemos os portes grátis ativos a partir de 45€ (ou podes aumentar se quiseres)
    portesGratisApartirDe: 45.00, 

    produtos: [
        {
            id: 1,
            nome: "Quadro Abelhão e Flor Branca",
            categoria: "Quadros",
            preco: 80.00,
            imagem: "imagens/quadroabelhao.jpeg",
            fotosExtra: ["imagens/quadro1-detalhe1.jpg"],
            descricao: "Pintura original feita à mão com tinta acrílica sobre tela. Destaca-se pelo olhar minucioso e pela textura realista do pelo do abelhão em pleno voo, contrastando com a suavidade e delicadeza de uma flor branca em fundo escuro. Assinado pela artista. Peça única e exclusiva.",
            stock: 1,
            portes: 7.95 // CTT Encomenda Nacional (Caixa média/grande)
        },
        {
            id: 2,
            nome: "Porta-chaves Alien",
            categoria: "Porta-chaves",
            preco: 5.00,
            imagem: "imagens/portachavesalien.jpeg",
            fotosExtra: [],
            descricao: "Porta-chaves artesanal em porcelana fria, revestido com verniz. Preço por unidade.",
            stock: 10,
            portes: 3.45 // O TEU CUSTO REAL: Envelope Almofadado Registado
        },
        {
            id: 3,
            nome: "Lata Monstro Coca-Cola",
            categoria: "Latas Monstro",
            preco: 12.00,
            imagem: "imagens/lata1.jpeg",
            fotosExtra: ["imagens/lata2.jpeg","imagens/lata3.jpeg"],
            descricao: "Lata decorativa reciclada e pintada à mão.",
            stock: 5,
            portes: 4.85 // CTT Encomenda/Caixa Pequena (até 500g devido ao volume da lata)
        },
        {
            id: 4,
            nome: "Porta-chaves Raposa",
            categoria: "Porta-chaves",
            preco: 5.00,
            imagem: "imagens/portachavesraposa.jpeg",
            fotosExtra: [],
            descricao: "Porta-chaves artesanal em porcelana fria, revestido com verniz. Preço por unidade.",
            stock: 10,
            portes: 3.45 // O TEU CUSTO REAL: Envelope Almofadado Registado
        },
        {
            id: 5,
            nome: "Porta-chaves Palestina",
            categoria: "Porta-chaves",
            preco: 5.00,
            imagem: "imagens/portachavespalestina.jpeg",
            fotosExtra: [],
            descricao: "Porta-chaves artesanal em porcelana fria, revestido com verniz. Preço por unidade.",
            stock: 10,
            portes: 3.45 // O TEU CUSTO REAL: Envelope Almofadado Registado
        },
        {
            id: 6,
            nome: "Quadro Rã Arborícola em Espiral Dourada",
            categoria: "Quadros", 
            preco: 300.00, 
            imagem: "imagens/quadrora.jpeg", 
            fotosExtra: [],
            descricao: "Pintura original feita à mão com tinta acrílica sobre tela. Destaca-se pelo olhar hiper-realista e detalhado da rã arborícola, contrastando com um fundo dinâmico em espiral com pinceladas douradas e verdes vibrantes. Assinado pela artista. Peça única e exclusiva.",
            stock: 1,
            portes: 16.50 // CTT Formato Grande/Transportadora (Devido aos 60x90cm)
        },
        {
            id: 7, 
            nome: "Quadro Homem-Aranha Arte Pop Urbana",
            categoria: "Quadros",
            preco: 100.00, 
            imagem: "imagens/spiderman.jpeg", 
            fotosExtra: [],
            descricao: "Pintura original feita à mão com tinta acrílica sobre tela. Destaca-se pelo contraste marcante do fato do Homem-Aranha com um fundo abstrato e dinâmico repleto de texturas urbanas in tons de azul e roxo. Assinado pela artista. Peça única e exclusiva.",
            stock: 1,
            portes: 7.95 // CTT Encomenda Nacional
        },
        {
            id: 8,
            nome: "Quadro 'Kiko is Hot' Pop Art & Diversidade", // Título atualizado com o nome real!
            categoria: "Quadros",
            preco: 250.00, // Ajusta o preço de acordo com o tamanho real desta tela
            imagem: "imagens/kiko.jpeg", 
            fotosExtra: [],
            // DESCRIÇÃO ATUALIZADA E FOCADA NA PERSONALIDADE:
            descricao: "Pintura original feita à mão com tinta acrílica sobre tela. Apresenta um retrato realista a preto e branco do criador de conteúdo digital português 'Kiko is Hot', envolvido num fundo vibrante em estilo pop art/graffiti com símbolos de diversidade e orgulho LGBTQIA+. Assinado pela artista. Peça única e exclusiva.",
            stock: 1,
            portes: 9.50 
        }
    ]
};
