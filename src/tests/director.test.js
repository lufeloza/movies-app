const request = require('supertest')
const app = require('../app');


test("GET / directors debe retonar los directores", async()=>{
    const  res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})
let id;
test("POST / directors debe crear un directores", async()=>{
    const director = {
        firstName: "Eliana",
        lastName: "Pino",
        nationality: "Colombia",
        image: "kldjfdlkfjñkdsjfñdsj",
        birthday: "1987-06-12",
    }
    const  res = await request(app).post('/directors').send(director);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})
test("PUT / directors/:id debe actualizar un director", async()=>{
    const directorUpdated ={
        firstName: "Luna",
        lastName: "Lopez",
    } 
    const  res = await request(app).put(`/directors/${id}`).send(directorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(directorUpdated.firstName)
    expect(res.body.lastName).toBe(directorUpdated.lastName)
})

test("DELETE / directors/:id debe eliminar un actor", async()=>{
       
    const  res = (await request(app).delete(`/directors/${id}`));
    expect(res.status).toBe(204);
    
})
