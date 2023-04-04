/*jshint esversion: 8*/
const request = require('supertest');
const mongoose = require('mongoose');

let server;

describe('IQIAR :: Air Quality Check', () => {
    beforeEach(() => { server = require('../app'); });
    
    afterEach(  () => { 
        server.close(); 
        mongoose.connection.close();
    });

    describe('GET ', () => {
        it('status 200', async ()=>{
            const res = await request(server)
            .get('/api/pollution?lat=48&lon=2.352222');
            expect(res.status).toBe(200);
        });
        it('status 400, giving Invalid lat', async ()=>{
            const res = await request(server)
            .get('/api/pollution?lat=448&lon=2.352222');
            expect(res.status).toBe(400);
        });
    });
});