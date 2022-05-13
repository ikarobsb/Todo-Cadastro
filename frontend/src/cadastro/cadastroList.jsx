import React from "react";
import IconButton from "../template/iconButton";

export default props => {
    const renderRows = () => {
        const list = props.list || [];
        return list.map(nome => (
            <tr className={nome} key={nome._id}>
                <td>{nome.nome}</td>
                <td>{nome.createdAt}</td>
                    <td>
                        <IconButton style='danger' icon='trash-o' 
                            onClick={() => props.handleRemove(nome)}></IconButton>
                    </td>
            </tr>
        ));
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th className='tableActions'>Data / Hora </th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}