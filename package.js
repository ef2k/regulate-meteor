Package.describe({
    summary: "A versatile validation library for the client and server."
});

Package.on_use(function (api) {
    api.use(['jquery', 'underscore']);
    api.add_files('regulate.js', ['client', 'server']);
});
