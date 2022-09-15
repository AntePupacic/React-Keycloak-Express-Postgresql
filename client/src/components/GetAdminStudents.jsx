import React, { useEffect, useState } from 'react';
import axios from '../axios/AxiosInstance';
import DisplayAdminStudents from '../pages/DisplayAdminStudents';
import Table from 'react-bootstrap/Table';
import UpdateStudentGrade from './UpdateStudentGrade';

function GetAdminStudents(props) {
    const [selectedStudent, setSelectedStudent] = useState('');
    const [data, getData] = useState('');

    useEffect(() => {
        getAdminStudents();
    }, []);

    async function getAdminStudents() {
        await axios.get(`/admin/students/${props.keycloak.tokenParsed.preferred_username}`)
            .then((response) => {
                const data = response.data;
                getData(data);
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Naziv predmeta</th>
                        <th>Student</th>
                        <th>Email</th>
                        <th>Maticni broj</th>
                        <th>Ocjena</th>
                    </tr>
                </thead>
                <tbody>
                    <DisplayAdminStudents setSelectedStudent={setSelectedStudent} data={data} />
                </tbody>
            </Table>
            <div>
                <UpdateStudentGrade selectedStudent={selectedStudent} />
            </div>
        </div>
    )
}

export default GetAdminStudents;