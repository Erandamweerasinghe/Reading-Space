const path = require('path');

module.exports = (req,res) => {
    res.render(path.resolve(__dirname,'..','views','about'),
     { title : 'About'});
};