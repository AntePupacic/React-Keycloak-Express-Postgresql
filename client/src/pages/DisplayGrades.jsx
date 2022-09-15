import React from 'react';

function DisplayGrades(props) {
    const displayGrades = (props) => {
        const { data } = props;

        if (data == null) {
            return false;
        }

        if (data.length > 0) {
            return (
                data.map((user, index) => {
                    return (
                        <tr className="user" key={index}>
                            <td>{index}</td>
                            <td>{user.naziv_predmeta}</td>
                            <td>{user.ects}</td>
                            <td>{user.ime[0].toUpperCase() + user.ime.slice(1)} {user.prezime[0].toUpperCase() + user.prezime.slice(1)}</td>
                            <td>{user.tip}</td>
                            <td>{user.ocjena}</td>
                        </tr>
                    )
                })
            )
        } else {
            return (<> Data not found!</>)
        }
    }
    return (
        <>
            {displayGrades(props)}
        </>
    )
}

export default DisplayGrades;