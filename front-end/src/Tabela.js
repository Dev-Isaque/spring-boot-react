function Tabela({ vetor, selecionar }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Marca</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

                {
                    vetor.map((produto, indice) => (
                        <tr key={indice}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.marca}</td>
                            <td><button className="btn btn-success" onClick={() => selecionar(indice)}>Selecionar</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    )
}

export default Tabela;