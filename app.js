const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const {validations} = require('./security/validations');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');

// support parsing of application/ form urlencoded post data
let urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/formData',
    [
        // check('name', 'Name is required.')
        // .not().isEmpty()
        // .isAlpha().withMessage('Name must contain only letters'),

        // check('email', 'Email is required.')
        // .not().isEmpty()
        // .isEmail().withMessage('Must be a valid email'),

        // check('phone1', 'all phone fields are required')
        // .not().isEmpty()
        // .isInt().withMessage('phone field must contain numbers only')
        // .isLength({min: 3, max: 3}).withMessage('must be 3 digits'),

        // check('phone2', 'all phone fields are required')
        // .not().isEmpty()
        // .isInt().withMessage('phone field must contain numbers only')
        // .isLength({min: 3, max: 3}).withMessage('must be 3 digits'),

        // check('phone3', 'all phone fields are required')
        // .not().isEmpty()
        // .isInt().withMessage('phone field must contain numbers only')
        // .isLength({min: 4, max: 4}).withMessage('must be 4 digits')

        // check('zipCode', 'Zip Code is required')
        // .not().isEmpty()
        // .isPostalCode('US').withMessage('Not a valid zip code')
        
        check('age')
        .custom(function(age) {
            if (age !== 'No' && age !== 'Yes') {
                throw new Error('Input Validation Error');
            } else {
                return Promise.resolve({success: "Ok"})
            }
        })
    ],
    
    (request, response) => {
    // if (request.body.text === '') {
    //     return response.send("Text cannot be be empty.");
    // } else if (!request.body.text.match(validations.Alpha)) {
    //     return response.send("Text must contain only letters (A-Z a-z)");
    // }

    console.log(request.body);

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }

    response.sendStatus(200);
})

app.listen(port, () => console.log('server started'));