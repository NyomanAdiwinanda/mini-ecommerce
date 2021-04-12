const request = require('supertest');
const app = require('../app.js');

// SUCCESS CASE
describe('testing /users/adminlogin (SUCCESS CASE)', () => {
  // email dan password benar
  describe('correct email and password', () => {
    it('It should return status 200 and admin user data', (done) => {
      const body = {
        email: 'admin@mail.com',
        password: '1234',
      };
      request(app)
        .post('/users/login')
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(200);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('email');
          expect(res.body).toHaveProperty('role');

          expect(res.body.role).toEqual('admin');

          expect(typeof res.body.id).toEqual('number');
          expect(typeof res.body.email).toEqual('string');
          expect(typeof res.body.role).toEqual('string');

          done();
        });
    });
  });
});

/* ---------------------------------------- */

// FAILED CASE
describe('testing /users/adminlogin (FAILED CASE)', () => {
  // email ada, password salah
  describe('correct email but wrong password', () => {
    it('It should return 400 and error message', (done) => {
      const body = {
        email: 'admin@email.com',
        password: '123456',
      };
      request(app)
        .post('/users/login')
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(400);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(typeof res.body.msg).toEqual('string');
          expect(res.body.msg).toEqual('Invalid Email or Password');

          done();
        });
    });
  });

  // email tidak ada di db
  describe('email not found in db', () => {
    it('It should return 400 and error message', (done) => {
      const body = {
        email: 'adminadmin@email.com',
        password: '1234',
      };
      request(app)
        .post('/users/login')
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(400);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(typeof res.body.msg).toEqual('string');
          expect(res.body.msg).toEqual('Invalid Email or Password');

          done();
        });
    });
  });

  // tidak memasukkan email dan password
  describe('empty input email and input password', () => {
    it('It should return 400 and error message', (done) => {
      const body = {
        email: '',
        password: '',
      };
      request(app)
        .post('/users/login')
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(400);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(typeof res.body.msg).toEqual('string');
          expect(res.body.msg).toEqual('Invalid Email or Password');

          done();
        });
    });
  });
});
