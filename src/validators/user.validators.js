import { check } from "express-validator";

const userLoginValidators = [
    check('email')
        .isEmail()
        .withMessage('email is invalid'),

    check('password')
        .isLength({ min: 3, max: 20 })
        .withMessage('password minimum length is 3 and max is 20'),
]

const userRegisterValidators = [
    check('email')
        .isEmail()
        .withMessage('email is invalid'),

    check('username')
        .isLength({ min: 3, max: 20 })
        .withMessage('username minimum length is 3 and max is 20'),

    check('password')
        .isLength({ min: 3, max: 20 })
        .withMessage('password minimum length is 3 and max is 20'),

    check('address', "address is optional")
        .optional()
];


export { userLoginValidators, userRegisterValidators };