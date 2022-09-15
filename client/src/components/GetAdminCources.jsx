import React, { useEffect, useState } from 'react';
import axios from '../axios/AxiosInstance';
import DisplayAdminCources from '../pages/DisplayAdminCources';
import Table from 'react-bootstrap/Table';

function GetAdminCources(props) {

    const [data, getData] = useState('');

    useEffect(() => {
        getAdminCources();
    }, []);

    async function getAdminCources() {
        await axios.get(`/admin/data/${props.keycloak.tokenParsed.preferred_username}`)
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
                    <th>Tip</th>
                </tr>
            </thead>
            <tbody>
                <DisplayAdminCources data={data} />
            </tbody>
        </Table>
    )
}

export default GetAdminCources;
