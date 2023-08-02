import { expect } from "chai"
import request from 'supertest'
import app from "../app.js"
import User from "../models/User.js"

describe('API de register y verifyCode', () => {
    describe('POST /api/auth/register', () => {
        it('Deberia crear un usuario', function(done) {
            // Establecer el tiempo de espera en 5000 ms (5 segundos)
            this.timeout(5000);

            const userBody = {
                email: 'pruebadetest@gmail.com',
                photo: 'https://prueba.jpg',
                password: 'prueba1234'
            }

            request(app)
                .post('/api/auth/register')
                .send(userBody)
                .then((respuesta) => {
                    expect(respuesta.status).to.equal(201);
                    done();
                })
                .catch((error) => {
                    console.error(error);
                    done(error);
                });
        })
    })
    describe("GET /api/auth/verify/:verify_code", () => {
        it("Debería verificar la cuenta de un usuario", async function(){
            // Establecer el tiempo de espera en 5000 ms (5 segundos)
            this.timeout(5000);

            const user = await User.create({
                email: "testuser@example.com",
                photo: 'https://prueba.jpg',
                password: 'prueba1234',
                verify_code: "test1234",
                verified: false,
            });
    
          const response = await request(app)
            .get(`/api/auth/verify/${user.verify_code}`)
            .send();
    
          expect(response.status).to.equal(200);
    
          const updatedUser = await User.findOne({ _id: user._id });
    
          expect(updatedUser.verified).to.be.true;
        });
      });
})

