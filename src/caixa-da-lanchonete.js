class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    const { valorTotal, erroMensagem } = this.processarItens(itens);

    if (erroMensagem) return erroMensagem;

    return this.verificarDesconto(metodoDePagamento, valorTotal);
  }

  verificarDesconto(metodoDePagamento, valorTotal) {
    const formasDePagamentoValidas = ["debito", "credito", "dinheiro"];

    if (!formasDePagamentoValidas.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (metodoDePagamento === "dinheiro") {
      valorTotal *= 0.95;
    } else if (metodoDePagamento === "credito") {
      valorTotal *= 1.03;
    }

    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }

  processarItens(itens) {
    const itensExtra = ["chantily,cafe", "queijo,sanduiche"];
    let valorTotal = 0;
    for (const itemQuantidade of itens) {
      const [itemCodigo, quantidade] = itemQuantidade.split(",");
      const item = this.cardapio[itemCodigo];

      if (quantidade <= 0) {
        return { valorTotal, erroMensagem: "Quantidade inválida!" };
      }

      if (!item) {
        return { valorTotal, erroMensagem: "Item inválido!" };
      }

      let isExtraInvalido = false;
      itensExtra.forEach((itemExtra) => {
        const [extra, principal] = itemExtra.split(",");
        if (
          itemCodigo === extra &&
          !itens.some((item) => item.startsWith(principal))
        ) {
          isExtraInvalido = true;
        }
      });

      if (isExtraInvalido) {
        return {
          valorTotal,
          erroMensagem: "Item extra não pode ser pedido sem o principal",
        };
      }

      valorTotal += item.valor * quantidade;
    }

    return { valorTotal, erroMensagem: "" };
  }
}

export { CaixaDaLanchonete };
