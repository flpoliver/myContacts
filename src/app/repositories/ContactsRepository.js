const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Oliver',
    email: 'oliver@mail.com',
    phone: '11999999',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactsRepository();
