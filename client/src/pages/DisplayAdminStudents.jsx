import React from 'react';
import edit from '../assets/edit.png';

function DisplayAdminStudents(props) {
    const displayAdminStudents = (props) => {
        const { data, setSelectedStudent } = props;

        if (data == null) {
            return false;
        }

        if (data.length > 0) {
            return (
                data.map((admin, index) => {
                    return (
                        <tr className="admin" key={index}>
                            <td>{index}</td>
                            <td>{admin.naziv_predmeta}</td>
                            <td>{admin.ime[0].toUpperCase() + admin.ime.slice(1)} {admin.prezime[0].toUpperCase() + admin.prezime.slice(1)}</td>
                            <td>{admin.email}</td>
                            <td>{admin.maticni_broj}</td>
                            <td>{admin.ocjena}</td>
                            <td><img onClick={() => setSelectedStudent(admin)} src={edit} alt='Edit' style={{ width: '15px', margin: 'auto', display: 'block' }} /></td>
                        </tr>
                    )
                })
            )
        } else {
            return (<>Data not found!</>)
        }
    }
    return (
        <>
            {displayAdminStudents(props)}
        </>
    )
}

export default DisplayAdminStudents;