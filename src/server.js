import api from './api';

const PORT = process.env.PORT || 1234;

api.listen(PORT, () => {
  console.info(`Listening to http://localhost:${PORT}`);
});
