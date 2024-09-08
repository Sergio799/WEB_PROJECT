const {body} = require('express-validator');
const { validationResult} = require('express-validator');
const {model, categoryEnum} = require("../models/event");
const { DateTime } = require('luxon');


exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};
exports.validateSignUp = [body('firstName', 'First name is required').notEmpty().trim().escape(),
body('lastName', 'Last name is required').notEmpty().trim().escape(),
body('email','Email is not valid').isEmail().trim().escape().normalizeEmail(), 
body('password' ,'Password must be atleast 8 characters and atmost 64 characters long ').isLength({min:8,max :64})]


exports.validateLogIn = [body('email', 'Email is not valid').isEmail().trim().escape().normalizeEmail(),
body('password' ,'Password must be atleast 8 characters and atmost 64 characters long ').isLength({min:8,max :64})]


exports.validateResult  = (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error =>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }
    else{
        return next();
    }

}

exports.validateEvent = [
    body('title', 'Title is required').notEmpty().trim().escape(),
    body('category').custom((value, { req }) => {
        // Check if category is empty
        if (!value) {
            throw new Error('Category is required');
        } else {
            // Check if the category is valid
            if (!categoryEnum.includes(value)) {
                throw new Error('Category can only be ' + categoryEnum.toString() + " or Other");
            }
        }
        return true;
    }).trim().escape(),
    body('details','Details is required').isLength({min: 10}).trim().escape(),
    body('location', 'Location cannot be empty').notEmpty().trim().escape(),
    body('start_date_time').custom((value, { req }) => {
        if (!value) {
            throw new Error('Start date time is required');
        } else {
            const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
            if (!dateTimeRegex.test(value)) {
                throw new Error('The format of Start date must be YYYY-MM-DDThh:mm:ssTZD');
            } else {
                const startDate = DateTime.fromISO(value);
                if (startDate <= DateTime.now()) {
                    throw new Error('Start date must be after today');
                }
            }
        }
        return true;
    }).trim().escape(),
    body('end_date_time').custom((value, { req }) => {
        if (!value) {
            throw new Error('End date time is required');
        } else {
            const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
            if (!dateTimeRegex.test(value)) {
                throw new Error('The format of End date must be YYYY-MM-DDThh:mm:ssTZD');
            } 
            else 
            {
                const endDate = DateTime.fromISO(value);
                if (endDate <= DateTime.now()) {
                    throw new Error('End date must be after today');
                }
            }
        }
        return true;
    }).trim().escape(),
    body('img', 'Image is required').trim().escape()
]

exports.validateRsvp = [
    body('status').custom((value, {req}) => {
        let rsvpValues = ["Yes", "No", "Maybe"]
        if(!value){
            throw new Error('RSVP cannot be empty');
        } else {
            if (!rsvpValues.includes(value)) {
                throw new Error('RSVP can only be ' + rsvpValues.toString());
            }
        }
        return true;
    }).trim().escape()
]