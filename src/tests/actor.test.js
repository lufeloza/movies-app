const request = require('supertest')
const app = require('../app');


test("GET / actors debe retonar los actores", async()=>{
    const  res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})
let id;
test("POST / actors debe crear un actor", async()=>{
    const actor = {
        firstName: "Luna",
        lastName: "Lopez",
        nationality: "Colombia",
        image: "kldjfdlkfjñkdsjfñdsj",
        birthday: "2007-07-15",
    }
    const  res = await request(app).post('/actors').send(actor);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})
test("PUT / actors/:id debe actualizar un actor", async()=>{
    const actorUpdated ={
        firstName: "Eliana",
        lastName: "Lopez",
    } 
    const  res = await request(app).put(`/actors/${id}`).send(actorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actorUpdated.firstName)
    expect(res.body.lastName).toBe(actorUpdated.lastName)
})

test("DELETE / actors/:id debe eliminar un actor", async()=>{
       
    const  res = (await request(app).delete(`/actors/${id}`));
    expect(res.status).toBe(204);
    
})
