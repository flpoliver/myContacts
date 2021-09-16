const { v4 } = require('uuid');

const db = require('../../database');

let contacts = [
  {
    id: v4(),
    name: 'Oliver',
    email: 'oliver@mail.com',
    phone: '11999999',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Felipe',
    email: 'felipe@mail.com',
    phone: '11999999',
    category_id: v4(),
  },
];

class ContactsRepository {
  async findAll(orderBy) {
    const direction = orderBy === 'desc' ? 'desc' : 'asc';
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);

    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts SET
      name = $1,
      email = $2,
      phone = $3,
      category_id = $4
      WHERE id = $5
      RETURNING *;
    `, [name, email, phone, category_id, id]);

    return row;

    /*
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    }); */
  }

  async create({
    name, email, phone, category_id,
  }) {
    // Implementação de query para evitar erros e ataques de SQL INJECTION
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }
}

module.exports = new ContactsRepository();
