import React, { useEffect, useState } from 'react';
import axios from '../axios/AxiosInstance';
import DisplayGrades from '../pages/DisplayGrades';
import Table from 'react-bootstrap/Table';

function GetUserGrades(props) {

    const [data, getData] = useState('');

    useEffect(() => {
        getUserData();
    }, []);

    async function getUserData() {
        await axios.get(`/users/grade/${props.keycloak.tokenParsed.preferred_username}`)
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
                    <th>Ocjena</th>
                </tr>
            </thead>
            <tbody>
                <DisplayGrades data={data} />
            </tbody>
        </Table>
    )
}

export default GetUserGrades
