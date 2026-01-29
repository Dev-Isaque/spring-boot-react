import { useEffect, useState } from 'react';
import { produtoVazio } from '../models/Produto';
import {
    listarProdutos,
    cadastrarProduto,
    atualizarProduto,
    removerProduto
} from '../services/produtoService';

export function useProdutos() {

    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState(produtoVazio);
    const [modoCadastro, setModoCadastro] = useState(true);

    useEffect(() => {
        listarProdutos().then(setProdutos);
    }, []);

    const selecionar = (indice) => {
        setProduto(produtos[indice]);
        setModoCadastro(false);
    };

    const limpar = () => {
        setProduto(produtoVazio);
        setModoCadastro(true);
    };

    const cadastrar = async () => {
        const retorno = await cadastrarProduto(produto);

        if (retorno.mensagem) return retorno;

        setProdutos(prev => [...prev, retorno]);
        limpar();
        return retorno;
    };

    const alterar = async () => {
        const retorno = await atualizarProduto(produto);

        if (retorno.mensagem) return retorno;

        setProdutos(prev =>
            prev.map(p => p.id === retorno.id ? retorno : p)
        );

        limpar();
        return retorno;
    };

    const remover = async () => {
        const retorno = await removerProduto(produto.id);

        setProdutos(prev =>
            prev.filter(p => p.id !== produto.id)
        );

        limpar();
        return retorno;
    };

    const aoDigitar = (e) => {
        setProduto({ ...produto, [e.target.name]: e.target.value });
    };

    return {
        produtos,
        produto,
        modoCadastro,
        selecionar,
        limpar,
        cadastrar,
        alterar,
        remover,
        aoDigitar
    };
}
