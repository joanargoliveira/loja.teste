let carrinho = [];

// 1. CARREGAR PRODUTOS NA GRELHA
function desenharLoja(produtosAExibir) {
    const grelha = document.getElementById('grelha-produtos');
    grelha.innerHTML = '';

    produtosAExibir.forEach(produto => {
        const temStock = produto.stock > 0;
        const textoBotao = temStock ? "Adicionar" : "Esgotado";
        const botaoDesativado = temStock ? "" : "disabled style='background-color: #8c827d; cursor: not-allowed;'";
        const textoStock = temStock ? `Apenas ${produto.stock} disponível(eis)` : "Sem unidades disponíveis";

        grelha.innerHTML += `
            <div class="produto-card" onclick="abrirDetalhes(${produto.id}, event)">
                <div class="wrapper-imagem">
                    <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="imagem-fallback" style="display:none;">🎨 Mão na Massa</div>
                </div>
                <h3>${produto.nome}</h3>
                <p class="categoria-tag">${produto.categoria || 'Arte'}</p>
                <p class="aviso-stock">${textoStock}</p>
                <p class="preco">${produto.preco.toFixed(2)}€</p>
                <button onclick="adicionarAoCarrinho(${produto.id}); event.stopPropagation();" ${botaoDesativado}>${textoBotao}</button>
            </div>
        `;
    });
}

// 2. FILTRAR POR CATEGORIA
function filtrarProdutos(categoria) {
    if (categoria === 'Todos') {
        desenharLoja(dadosDaLoja.produtos);
    } else {
        const filtrados = dadosDaLoja.produtos.filter(p => p.categoria === categoria);
        desenharLoja(filtrados);
    }
}

// 3. ABRIR JANELA POP-UP DE DETALHES
function abrirDetalhes(id, event) {
    const produto = dadosDaLoja.produtos.find(p => p.id === id);
    if (!produto) return;

    document.getElementById('modal-nome').innerText = produto.nome;
    document.getElementById('modal-descricao').innerText = produto.descricao;
    document.getElementById('modal-preco').innerText = `${produto.preco.toFixed(2)}€`;
    
    const temStock = produto.stock > 0;
    document.getElementById('modal-stock').innerText = temStock ? `Apenas ${produto.stock} disponível(eis)` : "Sem unidades disponíveis";

    const fotoPrincipal = document.getElementById('modal-foto-principal');
    fotoPrincipal.src = produto.imagem;

    const painelMiniaturas = document.getElementById('modal-miniaturas');
    painelMiniaturas.innerHTML = `<img src="${produto.imagem}" class="miniatura ativa" onclick="mudarFotoPrincipal('${produto.imagem}', this)">`;
    
    if (produto.fotosExtra && produto.fotosExtra.length > 0) {
        produto.fotosExtra.forEach(foto => {
            painelMiniaturas.innerHTML += `<img src="${foto}" class="miniatura" onclick="mudarFotoPrincipal('${foto}', this)">`;
        });
    }

    const btnAdicionar = document.getElementById('modal-btn-adicionar');
    if (temStock) {
        btnAdicionar.innerText = "Adicionar ao Carrinho";
        btnAdicionar.disabled = false;
        btnAdicionar.style.backgroundColor = "#d37a5b";
        btnAdicionar.onclick = function() { adicionarAoCarrinho(produto.id); };
    } else {
        btnAdicionar.innerText = "Esgotado";
        btnAdicionar.disabled = true;
        btnAdicionar.style.backgroundColor = "#8c827d";
    }

    document.getElementById('janela-detalhes').style.display = 'flex';
}

function mudarFotoPrincipal(caminhoFoto, elementoClicado) {
    document.getElementById('modal-foto-principal').src = caminhoFoto;
    document.querySelectorAll('.miniatura').forEach(m => m.classList.remove('ativa'));
    elementoClicado.classList.add('ativa');
}

function fecharDetalhes(event) {
    if (event.target.id === 'janela-detalhes') {
        document.getElementById('janela-detalhes').style.display = 'none';
    }
}

// 4. ADICIONAR AO CARRINHO
function adicionarAoCarrinho(id) {
    const produtoOriginal = dadosDaLoja.produtos.find(p => p.id === id);
    if (produtoOriginal) {
        const quantidadeNoCarrinho = carrinho.filter(p => p.id === id).length;
        if (quantidadeNoCarrinho >= produtoOriginal.stock) {
            alert(`Lamento! Limite máximo de stock atingido.`);
            return;
        }
        carrinho.push(produtoOriginal);
        atualizarCarrinho();
    }
}

// 5. ATUALIZAR VALORES DO CARRINHO E CALCULAR PORTES AUTOMÁTICOS
function atualizarCarrinho() {
    const painelItens = document.getElementById('itens-carrinho');
    painelItens.innerHTML = '';
    let subtotal = 0;
    let maiorCustoPortes = 0;

    carrinho.forEach((item, index) => {
        subtotal += item.preco;
        
        // Descobre qual o porte configurado para o produto (ou assume o padrão se faltar)
        let custoPortesArtigo = 3.45;
        if (item.portes !== undefined) {
            custoPortesArtigo = item.portes;
        } else {
            const cat = item.categoria ? item.categoria.toLowerCase() : "";
            if (cat.includes("lata")) custoPortesArtigo = 4.85;
            if (cat.includes("quadr")) custoPortesArtigo = 7.95;
        }

        if (custoPortesArtigo > maiorCustoPortes) {
            maiorCustoPortes = custoPortesArtigo;
        }

        painelItens.innerHTML += `
            <div class="item-no-carrinho">
                <span>${item.nome}</span>
                <span>${item.preco.toFixed(2)}€</span>
                <button onclick="removerDoCarrinho(${index})">❌</button>
            </div>
        `;
    });

    let valorPortesFinal = 0;
    const linhaPortesElemento = document.getElementById('linha-portes');
    const limiteGratis = dadosDaLoja.portesGratisApartirDe || 45.00;

    if (carrinho.length > 0) {
        if (subtotal >= limiteGratis) {
            valorPortesFinal = 0;
            if (linhaPortesElemento) {
                linhaPortesElemento.innerHTML = `Portes de Envio: <strong style="color: #27ae60;">GRÁTIS</strong>`;
            }
        } else {
            valorPortesFinal = maiorCustoPortes;
            if (linhaPortesElemento) {
                linhaPortesElemento.innerHTML = `Portes de Envio: <span>${valorPortesFinal.toFixed(2)}€</span>`;
            }
        }
    } else {
        if (linhaPortesElemento) {
            linhaPortesElemento.innerHTML = `Portes de Envio: <span>0.00€</span>`;
        }
    }

    let totalFinal = subtotal + valorPortesFinal;

    // Atualiza os textos no ecrã com segurança para evitar erros
    const subtotalEl = document.getElementById('preco-subtotal');
    const totalEl = document.getElementById('preco-total');
    
    if (subtotalEl) subtotalEl.innerText = subtotal.toFixed(2);
    if (totalEl) totalEl.innerText = totalFinal.toFixed(2);
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// 6. PROCESSAR PAGAMENTO (SIMULAÇÃO)
function processarPagamento(event) {
    event.preventDefault();
    if (carrinho.length === 0) {
        alert("O seu carrinho está vazio!");
        return;
    }
    const metodo = document.getElementById('metodo-pagamento').value;
    
    let subtotalSeguro = carrinho.reduce((sum, item) => sum + item.preco, 0);
    let maiorPorteSeguro = carrinho.reduce((max, item) => {
        let p = item.portes !== undefined ? item.portes : 3.45;
        return p > max ? p : max;
    }, 0);
    
    const limiteGratis = dadosDaLoja.portesGratisApartirDe || 45.00;
    let portesSeguros = (subtotalSeguro >= limiteGratis) ? 0 : maiorPorteSeguro;
    let totalSeguro = subtotalSeguro + portesSeguros;

    alert(`Pagamento Automático Solicitado!\n\nSubtotal: ${subtotalSeguro.toFixed(2)}€\nPortes CTT: ${portesSeguros === 0 ? "Grátis" : portesSeguros.toFixed(2) + "€"}\nTotal Cobrado: ${totalSeguro.toFixed(2)}€\nMétodo: ${metodo.toUpperCase()}`);

    carrinho.forEach(itemComprado => {
        const produtoNaLoja = dadosDaLoja.produtos.find(p => p.id === itemComprado.id);
        if (produtoNaLoja && produtoNaLoja.stock > 0) {
            produtoNaLoja.stock--;
        }
    });

    carrinho = [];
    atualizarCarrinho();
    desenharLoja(dadosDaLoja.produtos);
    document.getElementById('janela-detalhes').style.display = 'none';
    document.getElementById('form-checkout').reset();
}

// Inicializar a aplicação
if (document.getElementById('titulo-loja')) {
    document.getElementById('titulo-loja').innerText = dadosDaLoja.nomeLoja;
}
desenharLoja(dadosDaLoja.produtos);
