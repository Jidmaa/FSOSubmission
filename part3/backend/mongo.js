const mongoose = require ('mongoose')
if (process.argv.length < 3) {
    console.log('please include a password : npm mongo.js <password>')
    process.exit(1)
}
const password = process.argv[2];
const url = `mongodb+srv://Jidma:${password}@cluster0.fo7rl.mongodb.net/<dbname>?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema ( {
    id : Number, 
    name : String, 
    number : String, 
})

const Person = mongoose.model ('Person', personSchema);
if (process.argv.length > 4) {
const person = new Person ({
   
    name : process.argv[3],
    number : process.argv[4],
})
person.save().then(result => {
    console.log(`added ${person.name} number : ${person.number} to the phonebook`);
    mongoose.connection.close();
})
}
else {
    Person.find({}).then(result => {
        console.log('phonebook : ')
        result.forEach(person => {console.log(`${person.name} ${person.number}`)})
        mongoose.connection.close();  
    
        
    })
}
