exports.index =  (req, res) => {
    res.render('index');
}

exports.about =  (req, res) => {
    res.render('./main/about');
}

exports.contact =  (req, res) => {
    res.render('./main/contact');
}

