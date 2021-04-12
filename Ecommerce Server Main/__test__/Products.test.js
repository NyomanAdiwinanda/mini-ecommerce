const request = require('supertest');
const app = require('../app.js');
const {
  generateTokenAdmin,
  generateTokenCustomer,
} = require('../helpers/jwt.js');

// SUCCESS CASE
describe('testing /products (SUCCESS CASE)', () => {
  let access_token;
  let id;

  beforeAll(() => {
    access_token = generateTokenAdmin({
      id: 1,
      email: 'admin@mail.com',
      role: 'admin',
    });
  });

  // POST Success
  describe('success POST request', () => {
    it('It should return status 201 and newly created product data', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: 500000,
        stock: 10,
      };
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(201);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('image_url');
          expect(res.body).toHaveProperty('price');
          expect(res.body).toHaveProperty('stock');

          expect(typeof res.body.id).toEqual('number');
          expect(typeof res.body.name).toEqual('string');
          expect(typeof res.body.image_url).toEqual('string');
          expect(typeof res.body.price).toEqual('number');
          expect(typeof res.body.stock).toEqual('number');

          expect(res.body.name).toEqual(body.name);
          expect(res.body.image_url).toEqual(body.image_url);
          expect(res.body.price).toEqual(body.price);
          expect(res.body.stock).toEqual(body.stock);

          id = res.body.id;

          done();
        });
    });
  });

  // GET Success
  describe('success GET request', () => {
    it('It should return response with status 200', (done) => {
      request(app)
        .get('/products')
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(200);
          expect(Array.isArray(res.body)).toEqual(true);

          res.body.forEach((element) => {
            expect(element).toHaveProperty('id');
            expect(element).toHaveProperty('name');
            expect(element).toHaveProperty('image_url');
            expect(element).toHaveProperty('price');
            expect(element).toHaveProperty('stock');

            expect(typeof element.id).toEqual('number');
            expect(typeof element.name).toEqual('string');
            expect(typeof element.image_url).toEqual('string');
            expect(typeof element.price).toEqual('number');
            expect(typeof element.stock).toEqual('number');
          });

          done();
        });
    });
  });

  // PUT success
  describe('success PUT request', () => {
    it('It should return response with status 200', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: 500000,
        stock: 5,
      };
      request(app)
        .put(`/products/${id}`)
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(200);
          expect(Array.isArray(res.body)).toEqual(true);
          expect(Array.isArray(res.body[1])).toEqual(true);

          expect(typeof res.body[0]).toEqual('number');

          res.body[1].forEach((element) => {
            expect(element).toHaveProperty('id');
            expect(element).toHaveProperty('name');
            expect(element).toHaveProperty('image_url');
            expect(element).toHaveProperty('price');
            expect(element).toHaveProperty('stock');

            expect(typeof element.id).toEqual('number');
            expect(typeof element.name).toEqual('string');
            expect(typeof element.image_url).toEqual('string');
            expect(typeof element.price).toEqual('number');
            expect(typeof element.stock).toEqual('number');
          });

          done();
        });
    });
  });

  // DELETE Success
  describe('success DELETE request', () => {
    it('It should return response with status 200', (done) => {
      request(app)
        .delete(`/products/${id}`)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(200);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(typeof res.body.msg).toEqual('string');

          expect(res.body.msg).toEqual('Product deleted');

          done();
        });
    });
  });
});

/* ---------------------------------------- */

// FAILED CASE CREATE PRODUCT
describe('testing /products (FAILED CREATE PRODUCT)', () => {
  describe('no access_token', () => {
    it('It should return status 401', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: 500000,
        stock: 10,
      };
      request(app)
        .post('/products')
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(401);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(typeof res.body.msg).toEqual('string');

          expect(res.body.msg).toEqual('Invalid token');

          done();
        });
    });
  });

  describe('has access_token but not admin', () => {
    let access_token;

    beforeAll(() => {
      access_token = generateTokenCustomer({
        id: 1,
        email: 'customer@mail.com',
        role: 'customer',
      });
    });

    it('It should return status 401', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: 500000,
        stock: 10,
      };
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(401);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(typeof res.body.msg).toEqual('string');

          expect(res.body.msg).toEqual('Invalid token');

          done();
        });
    });
  });

  describe('not inputing required field', () => {
    let access_token;

    beforeAll(() => {
      access_token = generateTokenAdmin({
        id: 1,
        email: 'admin@mail.com',
        role: 'admin',
      });
    });

    it('it should return status 400', (done) => {
      const body = {
        name: '',
        image_url: '',
        price: null,
        stock: null,
      };
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(400);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(Array.isArray(res.body.msg)).toEqual(true);

          done();
        });
    });
  });

  describe('stock has minus value input', () => {
    let access_token;

    beforeAll(() => {
      access_token = generateTokenAdmin({
        id: 1,
        email: 'admin@mail.com',
        role: 'admin',
      });
    });

    it('it should return status 400', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: 500000,
        stock: -1,
      };
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(400);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(Array.isArray(res.body.msg)).toEqual(true);

          expect(res.body.msg[0]).toEqual(
            'Input stock should not be a negative value'
          );

          done();
        });
    });
  });

  describe('price has minus value input', () => {
    let access_token;

    beforeAll(() => {
      access_token = generateTokenAdmin({
        id: 1,
        email: 'admin@mail.com',
        role: 'admin',
      });
    });

    it('it should return status 400', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: -500000,
        stock: 5,
      };
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(400);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(Array.isArray(res.body.msg)).toEqual(true);

          expect(res.body.msg[0]).toEqual(
            'Input price should not be a negative value'
          );

          done();
        });
    });
  });

  describe('wrong datatype input (for example stock has datatype string input)', () => {
    let access_token;

    beforeAll(() => {
      access_token = generateTokenAdmin({
        id: 1,
        email: 'admin@mail.com',
        role: 'admin',
      });
    });

    it('it should return status 400', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: 500000,
        stock: 'string input',
      };
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(400);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(Array.isArray(res.body.msg)).toEqual(true);

          expect(res.body.msg[0]).toEqual(
            'Input stock should be a number integer value'
          );

          done();
        });
    });
  });
});

/* ---------------------------------------- */

// FAILED CASE UPDATE PRODUCT
describe('testing /products/:id (FAILED UPDATE PRODUCT)', () => {
  let access_token;
  let id;

  beforeAll(() => {
    access_token = generateTokenAdmin({
      id: 1,
      email: 'admin@mail.com',
      role: 'admin',
    });
    const body = {
      name: 'kemeja flannel uniqlo',
      image_url:
        'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
      price: 500000,
      stock: 10,
    };
    it('', (done) => {
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          id = res.body.id;

          done();
        });
    });
  });

  describe('no access_token', () => {
    it('It should return status 401', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: 500000,
        stock: 5,
      };
      request(app)
        .put(`/products/${id}`)
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(401);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(typeof res.body.msg).toEqual('string');

          expect(res.body.msg).toEqual('Invalid token');

          done();
        });
    });
  });

  describe('has access_token but not admin', () => {
    it('It should return status 401', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: 500000,
        stock: 5,
      };
      request(app)
        .put(`/products/${id}`)
        .send(body)
        .set(
          'access_token',
          generateTokenCustomer({
            id: 1,
            email: 'customer@mail.com',
            role: 'customer',
          })
        )
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(401);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(typeof res.body.msg).toEqual('string');

          expect(res.body.msg).toEqual('Invalid token');

          done();
        });
    });
  });

  describe('stock has minus value input', () => {
    it('It should return status 500', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: 500000,
        stock: -1,
      };
      request(app)
        .put(`/products/${id}`)
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(500);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          done();
        });
    });
  });

  describe('wrong datatype input (for example stock has datatype string input)', () => {
    it('it should return status 500', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: 500000,
        stock: 'string input',
      };
      request(app)
        .post(`/products/${id}`)
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(500);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          done();
        });
    });
  });

  describe('price has minus value input', () => {
    it('it should return status 500', (done) => {
      const body = {
        name: 'kemeja flannel uniqlo',
        image_url:
          'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
        price: -500000,
        stock: 5,
      };
      request(app)
        .post(`/products/${id}`)
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(500);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          done();
        });
    });
  });
});

/* ---------------------------------------- */

// FAILED CASE DELETE PRODUCT
describe('testing /products/:id (FAILED DELETE PRODUCT)', () => {
  let access_token;
  let id;

  beforeAll(() => {
    access_token = generateTokenAdmin({
      id: 1,
      email: 'admin@mail.com',
      role: 'admin',
    });
    const body = {
      name: 'kemeja flannel uniqlo',
      image_url:
        'https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg',
      price: 500000,
      stock: 10,
    };
    it('', (done) => {
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          id = res.body.id;

          done();
        });
    });
  });

  describe('no access_token', () => {
    it('It should return status 401', (done) => {
      request(app)
        .delete(`/products/${id}`)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(401);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(typeof res.body.msg).toEqual('string');

          expect(res.body.msg).toEqual('Invalid token');

          done();
        });
    });
  });

  describe('has access_token but not admin', () => {
    it('It should return status 401', (done) => {
      request(app)
        .delete(`/products/${id}`)
        .set(
          'access_token',
          generateTokenCustomer({
            id: 1,
            email: 'customer@mail.com',
            role: 'customer',
          })
        )
        .end((err, res) => {
          if (err) {
            done(err);
          }

          expect(res.status).toEqual(401);
          expect(typeof res.body).toEqual('object');

          expect(res.body).toHaveProperty('msg');

          expect(typeof res.body.msg).toEqual('string');

          expect(res.body.msg).toEqual('Invalid token');

          done();
        });
    });
  });
});
