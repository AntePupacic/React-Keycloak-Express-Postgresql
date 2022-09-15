import React, { useEffect, useState } from 'react';
import axios from '../axios/AxiosInstance';
import DisplayCources from '../pages/DisplayCources';
import Table from 'react-bootstrap/Table';

function GetUserCources(props) {

    const [data, getData] = useState('');

    useEffect(() => {
        getUserCources();
    }, []);

    async function getUserCources() {
        await axios.get(`/users/data/${props.keycloak.tokenParsed.preferred_username}`)
            .then((response) => {
                const data = response.data;
                getData(data);
            })
            .catch(error => console.error(error));
    }

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Naziv predmeta</th>
                    <th>ECTS</th>
                    <th>Nositelj kolegija</th>
                    <th>Tip</th>
                </tr>
            </thead>
            <tbody>
                <DisplayCources data={data} />
            </tbody>
        </Table>
    )
}

export default GetUserCources;
