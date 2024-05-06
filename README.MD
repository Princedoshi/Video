

---

# Video App API

This API provides endpoints to manage video projects.

## Installation

1. **Clone the repository**: 
   ```bash
   git clone <repository-url>
   cd video-app
   ```

2. **Install dependencies**: 
   ```bash
   npm install
   ```

3. **Set up MongoDB**: 
   - Ensure MongoDB is installed and running on your system.
   - Update the MongoDB URI in `config.cjs` with your MongoDB connection string.

4. **Start the server**: 
   ```bash
   npm start
   ```

## Usage

### Endpoints

#### Create Video Project
- **POST** `/api/video-projects`
- Creates a new video project.
- Required fields in the request body: `title`, `description`
- Optional field: `videoFile` (multipart/form-data)
- Example:
  ```bash
  curl -X POST -F "title=Test Video" -F "description=This is a test video" -F "videoFile=@/path/to/video.mp4" http://localhost:3000/api/video-projects
  ```

#### Get All Video Projects
- **GET** `/api/video-projects`
- Retrieves all video projects.
- Example:
  ```bash
  curl http://localhost:3000/api/video-projects
  ```

#### Get Video Project by ID
- **GET** `/api/video-projects/:id`
- Retrieves a video project by its ID.
- Example:
  ```bash
  curl http://localhost:3000/api/video-projects/123
  ```

#### Update Video Project
- **PUT** `/api/video-projects/:id`
- Updates an existing video project.
- Required fields in the request body: `title`, `description`
- Optional field: `videoFile` (multipart/form-data)
- Example:
  ```bash
  curl -X PUT -F "title=Updated Title" -F "description=Updated description" -F "videoFile=@/path/to/updated-video.mp4" http://localhost:3000/api/video-projects/123
  ```

#### Delete Video Project
- **DELETE** `/api/video-projects/:id`
- Deletes a video project by its ID.
- Example:
  ```bash
  curl -X DELETE http://localhost:3000/api/video-projects/123
  ```

## Testing

To run tests, execute the following command:

```bash
npm test
```

---
