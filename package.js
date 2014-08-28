Package.describe({
  summary: 'A versatile validation library for the client and server.',
  version: '0.1.3',
  git: 'https://github.com/eddflrs/regulate-meteor.git'
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@0.9.0');
  api.use(['jquery', 'underscore']);
  api.add_files('regulate.js', ['client', 'server']);
});
