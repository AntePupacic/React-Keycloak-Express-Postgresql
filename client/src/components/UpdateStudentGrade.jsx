import React, { Component } from 'react';
import axios from '../axios/AxiosInstance';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
class UpdateStudentGrade extends Component {

    state = {
        grade: 'nije upisana',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const grade = {
            grade: this.state.grade
        }

        axios.put(`/admin/students/${this.props.selectedStudent.upisani_predmeti_id}`, {
            grade
        }).then((res) => {
            console.log(res.data);
            window.location = "/students" //This line of code will redirect you once the submission is succeed

        }).catch((err) => {
            console.log(err);
        })
    }

    handleChange = (e) => {
        this.setState({ grade: e.target.value });
    }


    render() {
        return (
            (!(Object.entries(this.props.selectedStudent).length === 0)) && (<div className='mt-3'>
                <h3>Uredi studentu ocjenu</h3>
                <p> Naziv predmeta: {this.props.selectedStudent.naziv_predmeta} </p>
                <p> Student: {this.props.selectedStudent.ime[0].toUpperCase() + this.props.selectedStudent.ime.slice(1)} {this.props.selectedStudent.prezime[0].toUpperCase() + this.props.selectedStudent.prezime.slice(1)}</p>
                <p> Email: {this.props.selectedStudent.email} </p>
                <p> Matični broj: {this.props.selectedStudent.maticni_broj}</p>
                <Form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <Form.Group className="mb-3">
                            <div >
                                <Form.Label htmlFor="gradeSelect" >Ocjena:</Form.Label>
                                <Form.Select onChange={this.handleChange} id="gradeSelect">
                                    <option>nije upisana</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Select>
                            </div>
                        </Form.Group>
                        <Button type="submit">Pošalji</Button>
                    </fieldset>
                </Form>

            </div>)
        )
    }
}

export default UpdateStudentGrade