const {model, categoryEnum} = require('../models/event');

//checking if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        next();
    }
    else{
        req.flash('error', 'You are already logged in');
        return res.redirect('/users/profile');
    }
}

exports.isLoggedIn = (req, res, next)=>{
    if(req.session.user){
        next();
    }
    else{
        req.flash('error', 'You need to log in first');
        return res.redirect('/users/login');
    }
}


exports.isAuthor = (req,res,next)=>{
    let id = req.params.id;

    model.findById(id)
    .then(event=>{
        if(event){
            if(event.host==req.session.user)
            {
                return next();
            }
            else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }
        else{
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err))
}

exports.notAuthor = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(event => {
        if(event){
            if(event.host == req.session.user){
                let err = new Error("Cannot RSVP your own event with id: " + id);
                err.status = 401;
                return next(err);
            }
            else{
                return next();
            }
        }
        else{
            let err = new Error("Cannot find event with id: " + id);
            err.status = 401;
            return next(err);
        }
    })
    .catch(err => next(err));
}