import React from 'react'
import Serial from '../../interfaces/Serial';
import User from '../../interfaces/User';
import { Filter } from './Filter';
import { SerialItem } from './SerialNode';
import '../../styles/MainPage/SerialsList.scss'
import axios from 'axios';

export const SerialsList: React.FC<{
    user: User | null,
    setSerials: any,
    setSerialsCopy: any,
    serials: Serial[], serialsCopy: Serial[], setSelectedSerial: any, setActiveCard: any, setCurrentUser: any, setSearchTerm: any, searchTerm: string
}>
    = ({ user, setSerials, setSerialsCopy, serialsCopy, setSelectedSerial, setActiveCard, setCurrentUser, setSearchTerm }) => {

        React.useEffect(() => {
            axios("https://api.tvmaze.com/shows?status=Running").then((res) => {

                let test2: Serial[] = res.data.map((serial: any) => {
                    let filteredSummary = serial.summary.replaceAll('<p>', '');
                    filteredSummary = filteredSummary.replaceAll('</p>', '');
                    filteredSummary = filteredSummary.replaceAll('<b>', '');
                    filteredSummary = filteredSummary.replaceAll('</b>', '');

                    let convertedSerial = {
                        name: serial.name,
                        summary: filteredSummary,
                        image: serial.image.medium,
                        status: serial.status,
                        genres: serial.genres.join(', '),
                        rating: serial.rating.average,
                        premiered: serial.premiered,
                        bigImg: serial.image.original,
                        airdate: undefined
                    }

                    if (serial._links.nextepisode !== undefined) {
                        axios(serial._links.nextepisode.href).then((res) => convertedSerial.airdate = res.data.airdate)
                    }

                    return convertedSerial
                })

                setSerials(test2)
                setSerialsCopy(test2)
            })
        }, [])

        return (
            <div className='SerialsList'>
                <Filter onChange={setSearchTerm} />
                {serialsCopy.map((serial, index) => (<SerialItem key={index + 1} user={user} serial={serial} setSelectedSerial={setSelectedSerial} setActiveCard={setActiveCard} setCurrentUser={setCurrentUser} />))}
            </div>
        )
    }