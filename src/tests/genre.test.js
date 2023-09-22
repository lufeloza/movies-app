const request = require('supertest')
const app = require('../app');


test("GET / genres debe retonar los generos", async()=>{
    const  res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})
let id;
test("POST / genres debe crear un genre", async()=>{
    const genre = {
        name: "Ciencia Ficcion"
    }
    const  res = await request(app).post('/genres').send(genre);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})
test("PUT / genres/:id debe actualizar un genre", async()=>{
    const genreUpdated ={
        name: "Drama"
    } 
    const  res = await request(app).put(`/genres/${id}`).send(genreUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genreUpdated.name)    
})

test("DELETE / genres/:id debe eliminar un genre", async()=>{
       
    const  res = (await request(app).delete(`/genres/${id}`));
    expect(res.status).toBe(204);
    
})
