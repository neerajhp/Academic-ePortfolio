function loginUser(auth) {
    return function(done) {
        request
            .post('/auth/local')
            .send({
                email: 'test@gmail.com',
                password: 'test123'
            })
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}

module.exports = loginUser