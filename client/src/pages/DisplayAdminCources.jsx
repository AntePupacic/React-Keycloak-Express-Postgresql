import React from 'react';

function DisplayAdminCources(props) {
    const displayAdminCources = (props) => {
        const { data } = props;

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
                            <td>{admin.ects}</td>
                            <td>{admin.tip}</td>
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
            {displayAdminCources(props)}
        </>
    )
}

export default DisplayAdminCources;