const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index.cjs');
const VideoProject = require('../models/videoProjectModel.cjs');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Video Project API', () => {
  describe('Create Video Project', () => {
    it('should create a new video project', async () => {
      const res = await chai.request(index)
        .post('http://localhost:3000/api/video-projects')
        .send({
          title: 'Test Video',
          description: 'This is a test video',
          videoFile: '/Users/Prince/Desktop/video-app/uploads/2024-05-06T04-38-54.634Z-WhatsApp Video 2024-05-04 at 11.22.50 PM.mp4'
        });
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.title).to.equal('Test Video');
    });
  });

  describe('Get All Video Projects', () => {
    it('should get all video projects', async () => {
      const testData = [
        { title: 'Prince', description: 'Prince is the king' },
        { title: 'Prince', description: 'Prince is the king' }
      ];
      await VideoProject.insertMany(testData);
      const res = await chai.request(index)
        .get('http://localhost:3000/api/video-projects');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf.at.least(2);
    });
  });
});
