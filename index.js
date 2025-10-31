import app from './app.js';

const main = async () => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

process.on('SIGTERM', () => {
  console.error('Caught SIGTERM.');
});

main();
