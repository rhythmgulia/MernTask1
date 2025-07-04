const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true 
},
  phone: { 
    type: Number, 
    default: 0 

},
  password: {
    type: String,
    required: true
},
  createdAt: { 
    type: Date, 
    default: Date.now 
}
});

module.exports = mongoose.model('User', userSchema);
