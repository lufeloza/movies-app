const request = require('supertest')
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require ('../models')
test("GET / movies debe retonar las peliculas", async()=>{
    const  res = await request(app).get('/movies');
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})
let id;
test("POST / movies debe crear una pelicula", async()=>{
    const movie = {
        name: "Piraña",
        image: "kldsjñkdsfjñjfñdkasl",
        synopsis: ",sdm,.sdmfdvmfdvm-fdmv-fmlñklksalkd{s",
        releaseYear: "1987",
    }
    const  res = await request(app).post('/movies').send(movie);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})
test("PUT / movies/:id debe actualizar una pelicula", async()=>{
    const movieUpdated ={
        name: "Matrix",
        image: "llll{{klkdlñkfñdkfñlds{{e{ew"
    } 
    const  res = await request(app).put(`/movies/${id}`).send(movieUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdated.name)
    expect(res.body.image).toBe(movieUpdated.image)
})

test("Post / movies/:id/actors debe insertar los actores a  una pelicula", async()=>{
    const actor = await Actor.create({
        firstName: "Luna",
        lastName: "Lopez",
        nationality: "Colombia",
        image: "kldjfdlkfjñkdsjfñdsj",
        birthday: "2007-07-15",
    })
    const  res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    await actor.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    
})
test("Post / movies/:id/directors debe insertar los directores a  una pelicula", async()=>{
    const director = await Director.create({
        firstName: "Pedro",
        lastName: "Zarate",
        nationality: "Colombia",
        image: "kldjfdlkfjñkdsjfñdsj",
        birthday: "2007-07-15",
    })
    const  res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
    await director.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);    
})
test("Post / movies/:id/genres debe insertar los generos a  una pelicula", async()=>{
    const genre = await Genre.create({
        name:"Romantico"
    })
    const  res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    await genre.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    
})


test("DELETE / movies/:id debe eliminar una pelicula", async()=>{
       
    const  res = (await request(app).delete(`/movies/${id}`));
    expect(res.status).toBe(204);
    
})
