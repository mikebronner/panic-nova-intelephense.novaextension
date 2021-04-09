var workspaceStoragePath = nova.path.join(nova.extension.workspaceStoragePath, "intelephense");
var globalStoragePath = nova.path.join(nova.extension.globalStoragePath, "intelephense");
var langserver = null;
var install = async function () {
    installation = new Process(
        "/usr/bin/env",
        {
            args: ["npm", "install", "intelephense@1.5.4"],
            cwd: nova.extension.workspaceStoragePath,
        }
    );
    installation.onStdout(function (output) {
        console.log("installation:", output);
    });
    installation.onDidExit(function (status) {
        console.log("installation finished:", status);
        langserver = new IntelephenseLanguageServer();
    });
    console.log("installation started");
    installation.start();
};

exports.activate = function() {
    console.log("activating extension");

    try {
        console.log("creating workspace storage path:", nova.extension.workspaceStoragePath);
        nova.fs.mkdir(nova.extension.workspaceStoragePath);
        nova.fs.mkdir(nova.extension.globalStoragePath);
        nova.fs.mkdir(workspaceStoragePath);
        nova.fs.mkdir(globalStoragePath);
        console.log("created workspace storage path");
    } catch (error) {
        // fail silently
        console.log("failed", error);
    }

    install();
}

exports.deactivate = function() {
    // Clean up state before the extension is deactivated
    if (langserver) {
        langserver.deactivate();
        langserver = null;
    }
}


class IntelephenseLanguageServer {
    constructor() {
        console.log("constructing language server");
        // Observe the configuration setting for the server's location, and restart the server on change
        nova.config.observe('genealabs.intelephense.language-server-path', function (path) {
            this.start(path);
        }, this);
        nova.config.observe('genealabs.intelephense.license-key', function (path) {
            this.start(path);
        }, this);
        // also observer license key setting
    }

    deactivate() {
        console.log("deactivating language server");
        this.stop();
    }

    start(path) {
        console.log("starting language server");

        if (this.languageClient) {
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
        }

        // Use the default server path
        if (!path) {
            path = nova.path.join(
                nova.extension.workspaceStoragePath,
                'node_modules',
                'intelephense',
                'lib',
                'intelephense.js'
            );
        }

        // Create the client
        var serverOptions = {
            args: ["node", path, "--stdio", "--nolazy", "--trace-warnings", "--preserve-symlinks", "--inspect=6039"],
            path: "/usr/bin/env",
        };
        var clientOptions = {
            syntaxes: ['php'],
            initializationOptions: {
                clearCache: true,
                globalStoragePath: globalStoragePath,
                storagePath: workspaceStoragePath,
                licenseKey: nova.config.get('genealabs.intelephense.licenseKey', 'string'),
            },
        };
        var client = new LanguageClient(
            'intelephense',
            'intelephense',
            serverOptions,
            clientOptions
        );

        try {
            console.log("starting client");
            // Start the client
            client.start();

            // Add the client to the subscriptions to be cleaned up
            nova.subscriptions.add(client);
            this.languageClient = client;
        }
        catch (err) {
            // If the .start() method throws, it's likely because the path to the language server is invalid

            if (nova.inDevMode()) {
                console.error(err);
            }
        }
    }

    stop() {
        if (this.languageClient) {
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
            this.languageClient = null;
        }
    }
}
