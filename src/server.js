import app from './app';

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.info(`Listening to http://localhost:${PORT}`);
});
