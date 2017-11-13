import api from './api';

const PORT = process.env.PORT || 8080;

api.listen(PORT, () => {
  console.info(`Listening to http://localhost:${PORT}`);
});
