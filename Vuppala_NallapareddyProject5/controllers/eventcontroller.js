const {model, categoryEnum} = require('../models/event');
const fs = require("fs");
const User = require("../models/user");
const Rsvp = require("../models/rsvp");

function getUniqueCategories(events){
    let categories = categoryEnum;
    for(let event in events){
        let category = events[event].category;
        if(!categories.includes(category)){
            categories.push(category)
            model.schema.path('category').enumValues.push(category);
        }
    }
}

exports.index =  (req, res, next) => {
    let id = req.session.user;
    Promise.all([User.findById(id), model.find()])
        .then(results => {
            const [user, events] = results
            getUniqueCategories(events);
            let categories = categoryEnum;
            res.render('./event/events', {events, categories, user});
        })
        .catch(err => {next(err)});
}

exports.new =  (req, res, next) => {
    let id = req.session.user;
    Promise.all([User.findById(id), model.find()])
        .then(results => {
            const [user, events] = results
            getUniqueCategories(events);
            let categories = categoryEnum;
            res.render('./event/newEvent', {categories, user});
        })
        .catch(err => next(err));
}

exports.create = (req, res, next) => {
    let newEvent = req.body;
    newEvent.host = req.session.user;
    if(newEvent.category == "Other"){
        let newCategory = req.body.newCategoryInput;
        newEvent.category = newCategory
        categoryEnum.push(newCategory);
        delete newEvent["newCategoryInput"];
        model.schema.path('category').enumValues.push(newCategory);
    }
    let image = req.file;
    if (image) {
        fs.readFile(image.path, (err, data) => {
            if (err) {
                return next(err);
            }
            newEvent.img = data;
            let event = new model(newEvent);
            event.save()
                .then(event => {
                    res.redirect('/events');
                })
                .catch(err => {
                    if(err.name === "ValidationError"){
                        err.status = 400;
                    }
                    next(err)
                });
        });
    }
    else{
        let event = new model(newEvent);
        event.save()
            .then(event => {
                res.redirect('/events');
            })
            .catch(err => {
                if(err.name === "ValidationError"){
                    err.status = 400;
                }
                next(err)
            });
    }
}

exports.show = (req, res, next) => {
    let id = req.params.id;
    let user = req.session.user;
    Promise.all([User.findById(user), model.findById({_id: id}).populate("host", "firstName lastName"), Rsvp.find({event: id})])
        .then(result => {
            let [user, event, rsvp] = result;
            if(event){
                let image = Buffer.from(event.img).toString('base64');
                let rsvps = 0;
                for(let ele in rsvp){
                    if(rsvp[ele].status == "Yes"){
                        rsvps += 1
                    }
                }
                res.render('./event/show', {event, image, user, rsvps});
            }
            else{
                let err = new Error("Cannot find event with id "+ id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}

exports.edit = (req, res, next) => {
    let id = req.params.id;
    Promise.all([User.findById(req.session.user), model.findById(id)])
        .then(result => {
            let [user, event] = result;
            if (event) {
                res.render('./event/edit', { event, categories: categoryEnum, user });
            } else {
                let err = new Error("Cannot find event with id " + id);
                err.status = 404;
                return next(err);
            }
        })
        .catch(err => next(err));
}

exports.update = (req, res, next) => {
    let id = req.params.id;
    let newEvent = req.body;
    let image = req.file;
    if(image === undefined){
        newEvent.img = "";
    }
    else{
        newEvent.img = fs.readFileSync(image.path);
    }
    if (newEvent.category === "Other") {
        let newCategory = newEvent.newCategoryInput;
        categoryEnum.push(newCategory);
        newEvent.category = newCategory;
        delete newEvent["newCategoryInput"];
        model.schema.path('category').enumValues.push(newCategory);
    }
    model.findByIdAndUpdate(id, newEvent, {useFindAndModify: false, runValidators: true})
        .then(event => {
            if(event){
                res.redirect('/events/' + id);
            }
            else{
                let err = new Error("Cannot find event with id "+ id);
                err.status = 404;
                return next(err);
            }
        })
        .catch(err => {
            if(err.name === "ValidationError"){
                err.status = 400;
            }
            next(err)
        });
}

exports.delete = (req, res, next) => {
    let id = req.params.id;
    model.findByIdAndDelete(id, {useFindAndModify: false})
        .then(event => {
            if(event){
                Rsvp.deleteMany({event: id})
                .then(result => {
                    res.redirect('/events');
                })
                .catch(err => next(err));
            }
            else{
                let err = new Error("Cannot find event with id "+ id);
                err.status = 404;
                return next(err);
            }
        })
        .catch(err => next(err));
}

exports.rsvp = (req, res, next) => {
    let eventId = req.params.id;
    let user = req.session.user;
    Rsvp.findOne({user: user, event: eventId})
    .then(rsvp => {
        if(rsvp){
            rsvp.status = req.body.status;
            Rsvp.findByIdAndUpdate(rsvp.id, rsvp, {useFindAndModify: false, runValidators: true})
            .then(eventRsvp => {
                req.flash('Success', 'Event RSVP status has been modified');
                res.redirect("/user/profile");
            })
            .catch(err => console.log(err))
        } else {
            let newRsvp = new Rsvp();
            newRsvp.status = req.body.status;
            newRsvp.user = user;
            newRsvp.event = eventId;
            newRsvp.save()
            .then(result => {
                req.flash('Success', 'Event added to RSVP');
                res.redirect("/user/profile");
            })
            .catch(err => next(err))
        }
    })
    .catch(err => next(err))
}