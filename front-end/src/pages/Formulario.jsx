function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar }) {
    return (
        <form>
            <input type='text' onChange={eventoTeclado} name='nome' placeholder='Nome' className='form-control' value={obj.nome} />
            <input type='text' onChange={eventoTeclado} name='marca' placeholder='Marca' className='form-control' value={obj.marca} />

            {
                botao ?
                    <input type='Button' onClick={cadastrar} value='Cadastrar' className='btn btn-primary' />
                    :
                    <div>
                        <input type='Button' onClick={() => alterar()} value='Alterar' className='btn btn-warning' />
                        <input type='Button' onClick={() => remover()} value='Remover' className='btn btn-danger' />
                        <input type='Button' onClick={() => cancelar()} value='Cancelar' className='btn btn-secondary' />
                    </div>
            }
        </form>
    )
}

export default Formulario;