class ContactController {

    index(red, res){
        res.render('contact');
    }
  
}

module.exports = new ContactController;