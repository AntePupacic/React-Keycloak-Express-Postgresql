const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'keycloak',
    host: 'localhost',
    database: 'fesb_db',
    password: 'password',
    port: 5432,
})


const getUserCoursesByUsername = (req, res) => {
    const username = req.params.username;

    pool.query('SELECT Predmeti.naziv_predmeta, Predmeti.ects, Profesori.ime, Profesori.prezime, Tip_kolegija.tip FROM (((((Upisani_predmeti INNER JOIN Studenti ON Upisani_predmeti.student_id = Studenti.id) INNER JOIN Nositelj_kolegija ON Upisani_predmeti.nositelj_kolegija_id = Nositelj_kolegija.id) INNER JOIN Profesori ON Nositelj_kolegija.profesor_id = Profesori.id ) INNER JOIN Predmeti ON Nositelj_kolegija.predmet_id = Predmeti.id ) INNER JOIN Tip_kolegija ON Predmeti.tip_id = Tip_kolegija.id) WHERE Studenti.email = $1', [username], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
        console.log(results.rows)
    })
}

const getUserGradesByUsername = (req, res) => {
    const username = req.params.username;

    pool.query('SELECT Predmeti.naziv_predmeta, Predmeti.ects, Profesori.ime, Profesori.prezime, Tip_kolegija.tip, Ocjene.ocjena FROM ((((((Ocjene INNER JOIN Upisani_predmeti ON Ocjene.upisani_predmeti_id = Upisani_predmeti.id) INNER JOIN Studenti ON Upisani_predmeti.student_id = Studenti.id) INNER JOIN Nositelj_kolegija ON Upisani_predmeti.nositelj_kolegija_id = Nositelj_kolegija.id ) INNER JOIN Profesori ON Nositelj_kolegija.profesor_id = Profesori.id) INNER JOIN Predmeti ON Nositelj_kolegija.predmet_id = Predmeti.id) INNER JOIN Tip_kolegija ON Predmeti.tip_id = Tip_kolegija.id) WHERE Studenti.email = $1', [username], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
        console.log(results.rows)
    })
}

const getAdminCoursesByUsername = (req, res) => {
    const username = req.params.username;

    pool.query('SELECT Predmeti.naziv_predmeta, Predmeti.ects, Tip_kolegija.tip FROM (((Nositelj_kolegija INNER JOIN Predmeti ON Nositelj_kolegija.predmet_id = Predmeti.id) INNER JOIN Profesori ON Nositelj_kolegija.profesor_id = Profesori.id) INNER JOIN Tip_kolegija ON Predmeti.tip_id = Tip_kolegija.id) WHERE Profesori.email = $1', [username], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
        console.log(results.rows)
    })
}

const getAdminStudentsByUsername = (req, res) => {
    const username = req.params.username;

    pool.query('SELECT Ocjene.upisani_predmeti_id, Predmeti.naziv_predmeta, Studenti.ime, Studenti.prezime, Studenti.email, Studenti.maticni_broj, Ocjene.ocjena FROM ((((((Ocjene INNER JOIN Upisani_predmeti ON Ocjene.upisani_predmeti_id = Upisani_predmeti.id) INNER JOIN Studenti ON Upisani_predmeti.student_id = Studenti.id) INNER JOIN Nositelj_kolegija ON Upisani_predmeti.nositelj_kolegija_id = Nositelj_kolegija.id) INNER JOIN Profesori ON Nositelj_kolegija.profesor_id = Profesori.id) INNER JOIN Predmeti ON Nositelj_kolegija.predmet_id = Predmeti.id) INNER JOIN Tip_kolegija ON Predmeti.tip_id = Tip_kolegija.id) WHERE Profesori.email = $1', [username], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
        console.log(results.rows)
    })
}

const updateStudentGrade = (req, res) => {
    const id = req.params.id;
    const { grade } = req.body.grade;

    pool.query('UPDATE ocjene SET ocjena = $1 WHERE upisani_predmeti_id = $2',
        [grade, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`Student grade modified with ID: ${id}`)
            console.log(results);
        })
}


module.exports = {
    getUserCoursesByUsername,
    getUserGradesByUsername,
    getAdminCoursesByUsername,
    getAdminStudentsByUsername,
    updateStudentGrade
}