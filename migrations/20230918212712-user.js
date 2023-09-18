const fs = require('fs').promises;

module.exports = {
  async up(db) {


    const json = await fs.readFile('./data/app.user.json', 'utf8')
    const data = JSON.parse(json)
    const UsersData = data.map(item => ({
      email: item.email,
      userName:item.userName,
      password: item.password,

    }))


    if(db.collection('User').findOne !== null) {
      db.collection('User').drop()
          .then(() => {
            console.log('User collection dropped')
          }).catch(err => {
        console.error(err.message)
      })
    }

      return db.createCollection('User', {
        validator: {
          $jsonSchema: {
            bsonType: 'object', required: ['_id', 'email', 'userName', 'password'], properties: {
              _id: {
                bsonType: 'objectId'
              }, email: {
                bsonType: 'string'
              }, userName: {
                bsonType: 'string'
              }, password: {
                bsonType: 'string'
              }
            }
          }
        }
      }).then(async () => {
        const User = await db.collection('User')
        User.insertMany(UsersData)
        console.log('UsersData')
        console.log(UsersData)



      })
    },
  async down(db) {
    return db.collection('User').drop()
        .then(() => {
          db.dropDatabase()
          console.log('User collection dropped')
        }).catch(err => {
          console.error(err.message)
        })
  }
};
