import chai from 'chai';
import { describe, it } from 'mocha';
import request from 'request';
import MusicVideo from '../../server/models/musicVideoModel';
import User from '../../server/models/userModel';
import musicVideoController from '../../server/controllers/musicVideoController';
const expect = chai.expect;

describe('MusicVideo Controller', () => {
  const user = {
    username: 'Wilson',
    email: 'wilson@wilson.com',
    password: 'asdf',
  };
  const musicVideo1 = {
    url: 'http://media0.giphy.com/media/xThuWp2hJABbmc20Ew/200.gif',
    mood: 'Happy',
  };
  const musicVideo2 = {
    url: 'http://media1.giphy.com/media/xT5LMNrx71j8dZvJra/200.gif',
    mood: 'Sentimental',
  };
  const musicVideo3 = {
    url: 'http://media2.giphy.com/media/l4Ki7hFz3nr9PN1C0/200.gif',
    mood: 'Romantic',
  };

  // beforeEach(done => {
  //   User.findOrCreate({where: user})
  //   .then(() => {
  //     done();
  //   });
  // });

  it('should add users musicVideo to the database', done => {
    const options1 = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/music',
      json: {
        user,
        musicVideo: musicVideo1,
      },
    };

    const options2 = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/music',
      json: {
        user,
      },
    };

    User.findOrCreate({ where: user })
    .then(() => {
      request(options1, (err, res, body) => {
        expect(res.statusCode).to.equal(201);


        request(options2, (err, res, body) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    })
    .catch(err => {
      // User data already exists
      request(options2, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('users should be able to have many musicVideos', done => {
    const options2 = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/music',
      json: {
        user,
        musicVideo: musicVideo2,
      },
    };
    const options3 = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/music',
      json: {
        user,
        musicVideo: musicVideo3,
      },
    };
    request(options2, (err, res, body) => {
      expect(res.statusCode).to.equal(201);
      request(options3, (err, res, body) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  it('should get all user musicVideos', done => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/music',
      json: {
        user,
      },
    };
    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body.length).to.equal(3);
      done();
    });
  });
});
