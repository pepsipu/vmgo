import Heroku from 'heroku-client';

// log into heroku with token from environment variable
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });

const createNewServer = async (): Promise<{ id: string, name: string} | null> => {
  // setup new app using code-server template
  const { build, app } = await heroku.post('app-setups', {
    body: {
      source_blob: {
        url: 'https://github.com/cdr/deploy-code-server',
      },
    },
  });
  // ensure the app is made
  if (build.status) return null;
  return app;
};

export default createNewServer;
