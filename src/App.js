import React, { useState } from 'react'
import './app.css'
import { Button, Autocomplete, TextField } from '@mui/material'



//const urlCountry = 'https://restcountries.com/'
//https://restcountries.com/
//'https://restcountries.com/v2/all'


//- GET: Pegar os paises e mostrar nos autocompletes de origem e destino

//- POST: [URL_API_COTAÇÃO]
//- recuperar o elemento clicado e salvar o nome do pais abreviado no state
//- recuperar o elemento clicado e salvar a data selecionada no state
//- quando clicar no buscar: Fazer o request para api de cotação
//Contrato para API de cotação:
//{origem: "BRL",   destino: "EUA",    ida: "2022-10-01", volta: "2022-10-20"
// - Retorno da api de cotação:
// [
//     {
//         "origem": "BRL",
//         "destino": "EUA",
//         "saida": "14:00",
//         "chegada": "20:00"
//     },
//     {
//         "origem": "BRL",
//         "destino": "EUA",
//         "saida": "10:00",
//         "chegada": "22:30"
//     },
//     {
//         "origem": "BRL",
//         "destino": "EUA",
//         "saida": "20:00",
//         "chegada": "01:05"
//     }]
//   }


const App = () => {
    const url = 'https://restcountries.com/v2/all'

    const initialState = {
        pais: [],
        cotacoes: [],
        origem: '',
        destino: '',
        ida: '',
        volta: ''
    }
    const [paises, setPais] = useState(initialState)




    React.useEffect(() => {
        fetch(url)
            .then(resp => resp.json())
            .then(data => setPais({
                ...paises,
                pais: data
            }))
    }, [])


    const handleChange = (ev, newValue) => {

        const name = ev.target.name ? ev.target.name : ev.target.id.split("-")[0]

        const value = ev.target.value ? ev.target.value : newValue

        setPais({
            ...paises,
            [name]: value
        })

    }

    const getAlphaCode = (pais) => paises.pais.filter(({ name }) => name === pais)[0].alpha3Code


    const buscar = () => {
        const data = {
            origem: getAlphaCode(paises.origem),
            destino: getAlphaCode(paises.destino)
        }
        fetch("https://app-dot-fly.herokuapp.com/cotar-viagem", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(cotacao => setPais({ ...paises, cotacoes: cotacao.comments }))
    }

    console.log(paises.cotacoes)


    return (
        <main className='main'>
            <div className='fly'>
                <div className="logo">
                    <h1>.FLY</h1>
                </div>

                <div className="buttons">

                    <Autocomplete
                        disablePortal
                        options={paises.pais.map((pais) => pais.name)}
                        id="origem"
                        sx={{
                            width: 345
                        }}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} label="informe origem" />}
                        className="auto-complete"
                    />

                    <Autocomplete
                        disablePortal
                        id="destino"
                        options={paises.pais.map((pais) => pais.name)}
                        sx={{
                            width: 345
                        }}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} label="informe o destino" />}
                        className="auto-complete"
                    />
                    <input type="date" name="ida" placeholder='data ida' className='inputdata' onChange={handleChange} />

                    <input type="date" name="volta" placeholder='data volta' className='inputdata' onChange={handleChange} />
                    <Button variant="contained" onClick={buscar} className="btn" style={{ backgroundColor: '#11004E', margin: '0 auto', padding: '0.8rem 1rem', fontWeight: 700, width: 345 }}>
                        Buscar
                    </Button>
                </div>
            </div>
            {/* <div className='opcoes-voos'>
                <p className='select'>Selecionar uma opção de voo</p>

                <div className="paises">
                    <div className='opcoes-horarios'>
                        <p>Eua</p>
                        <span>saída - 22:00</span>
                    </div>
                    <div className='opcoes-horarios'>
                        <p>Eua</p>
                        <span>chegada - 10:00</span>
                    </div>
                </div> */}
                <div className='opcoes-voos'>
                <p className='select'>Selecionar uma opção de voo</p>
                {paises.cotacoes.map((cotacao) => (
                    
                        <div className="paises">
                            <div className='opcoes-horarios'>
                                <p className="pais" key={cotacao.origem}>{cotacao.origem}</p>
                                <span>saída - {cotacao.saida}</span>
                            </div>
                            <div className='opcoes-horarios'>
                                <p className='pais' key={cotacao}>{cotacao.destino}</p>
                                <span>chegada - {cotacao.chegada}</span>
                            </div>
                            {/* <p className="pais" key={cotacao.origem}>{cotacao.origem}</p>
                            <span>saída - {cotacao.saida}</span>
                            <p className='pais' key={cotacao.destino}>{cotacao.destino}</p>
                            <span>chegada - {cotacao.chegada}</span> */}
                        </div>
                   
                ))}
                </div>


        </main >
    )
}

export default App