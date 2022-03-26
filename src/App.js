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
    const [paisesOrigem, setPaisOrigem] = useState([])

    const data = new Date()
    console.log(data)


    React.useEffect(() => {
        fetch(url)
            .then(resp => resp.json())
            .then(data => setPaisOrigem(data))
    }, [paisesOrigem])


    function handleChange({ target }) {
        const pais = target.innerText
    }

    return (
        <main className='main'>

            <div className="logo">
                <h1>.FLY</h1>

            </div>

            <div className="buttons">

                <Autocomplete
                    disablePortal
                    id="controllable-states-demo"
                    options={paisesOrigem.map((pais) => pais.name)}
                    sx={{
                        width: 345
                    }}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} label="informe origem" />}
                    className="auto-complete"
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={paisesOrigem.map((pais) => pais.name)}
                    sx={{
                        width: 345
                    }}
                    renderInput={(params) => <TextField {...params} label="informe o destino" />}
                    className="auto-complete"
                />


                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={{ data }}
                    sx={{ width: 345 }}
                    renderInput={(params) => <TextField {...params} label="data ida" />}
                    className="auto-complete"
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[{ label: 'The Shawshank Redemption', year: 1994 }]}
                    sx={{ width: 345 }}
                    renderInput={(params) => <TextField {...params} label="data volta" />}
                    className="auto-complete"
                />
                <Button variant="contained" className="btn" style={{ backgroundColor: '#11004E', margin: '0 auto', padding: '0.5rem 1rem' }}>Buscar</Button>

            </div>
            <h2>Selecionar uma opção de voo</h2>
        </main>
    )
}

export default App