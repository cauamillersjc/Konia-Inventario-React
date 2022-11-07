import React, { useState, useEffect } from 'react'
import { Container, DivRight } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import { IItem } from '../../types/item'
import { createItem, listItems } from '../../services/itemService'
import { IResponse } from '../../types/response'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import Swal from 'sweetalert2'

export default function Home() {

    const [items, setItems] = useState<IItem[]>([]);

    useEffect(() => {
        loadItems();
    }, []);

    // Função que carrega os itens cadastrados na API
    let loadItems = async () => {
        let response = await listItems() as IResponse;

        if (response.status === 200) {
            let loadedItems = response.data as IItem[];

            loadedItems.forEach((item: IItem) => {
                item.created_at = moment(item.created_at).format('DD/MM/YYYY HH:mm:ss');
            })

            setItems(loadedItems);
        }
    }

    // Função que dispara o modal ao clicar no botão de "Adicionar item"
    let addItemModal = () => {
        Swal.fire({
            title: 'Adicionar item',
            input: 'text',
            inputLabel: 'Nome do item',
            inputPlaceholder: 'Digite o nome do item',
            showCancelButton: true,
            confirmButtonText: 'Adicionar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) return 'Por favor digite o nome do item!'
                else return null
            },
        }).then((result) => {
            if (result.value) {
                addItem(result.value);
            }
        });
    }

    // Após digitar um nome no modal e clicar no botão "adicionar" essa função chama a Service que por sua vez chama a API 
    let addItem = async (name: string) => {
        let item = {} as IItem;
        item.name = name;
        let response = await createItem(item) as IResponse;

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                text: 'Item cadastrado com sucesso!',
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Um erro inesperado aconteceu! Tente novamente.',
            })
        }

        loadItems();
    }

    // Definição das colunas no componente de Data Table
    const columns = [
        {
            name: 'ID',
            selector: (row: { id: any }) => row.id,
            width: '10%',
        },
        {
            name: 'Nome',
            selector: (row: { name: any }) => row.name,
            width: '55%',
        },
        {
            name: 'Data de criação',
            selector: (row: { created_at: any }) => row.created_at,
            width: '35%',
        },
    ];

    // Estilização do componente de Data Table
    const tableStyle = {
        headCells: {
            style: {
                justifyContent: 'center',
                backgroundColor: '#0057A8',
                color: '#FFF',
                fontSize: '22px',
                borderLeft: '1px solid #FFF',
                borderRight: '1px solid #FFF',
            },
        },
        cells: {
            style: {
                backgroundColor: '#DDD',
                justifyContent: 'center',
                border: '1px solid #FFF',
            },
        },
        rows: {
            style: {
                '&:not(:last-of-type)': {
                    borderBottom: 'none',
                },
            }
        },
        headRow: {
            style: {
                borderBottom: 'none',
            }
        },
    };

    return (
        <>
            <Container className='mt-4'>
                <h1>
                    Itens do inventário
                </h1>
            </Container>

            <Container className='mt-5'>
                <DivRight>
                    <button
                        className='btn rounded-pill'
                        style={{ backgroundColor: '#0057A8', color: '#FFF' }}
                        onClick={addItemModal}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className='me-2'
                        />
                        Novo item
                    </button>
                </DivRight>
            </Container>

            <Container className='mt-2'>
                <DataTable
                    data={items}
                    columns={columns}
                    defaultSortFieldId='ID'
                    customStyles={tableStyle}
                    noDataComponent='Não existem itens cadastrados'
                />
            </Container>
        </>
    )
}