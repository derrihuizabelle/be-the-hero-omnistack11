import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import cogoToast from 'cogo-toast'

import './styles.css'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

export default function Profile () {
    const history = useHistory()

    const [incidentsList, setIncidentsList] = useState([])

    const [pageTitle, setPageTitle] = useState('')

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidentsList(response.data)
            
            incidentsList.length > 0 ? setPageTitle('Casos cadastrados') 
            : setPageTitle('Você ainda não tem casos cadastrados')
        })
    }, [incidentsList])

    async function HandleDeleteIncident (id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })
            setIncidentsList(incidentsList.filter(incident => incident.id !== id))
        } catch (error) {
            cogoToast.error('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout () {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>
                
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>{pageTitle}</h1>

            <ul>
                {incidentsList.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', 
                            {style: 'currency', currency:'BRL'})
                            .format(parseFloat(incident.value))}
                        </p>

                        <button type="button" onClick={() => HandleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}