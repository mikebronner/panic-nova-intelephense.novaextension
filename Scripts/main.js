var workspaceStoragePath = nova.path.join(nova.extension.workspaceStoragePath, "intelephense");
var globalStoragePath = nova.path.join(nova.extension.globalStoragePath, "intelephense");
var langserver = null;
var requiredVersion = "1.8.2";
var install = async function () {
    installation = new Process(
        "/usr/bin/env",
        {
            args: ["npm", "install", "intelephense@" + requiredVersion],
            cwd: nova.extension.workspaceStoragePath,
        }
    );
    installation.onStdout(function (output) {
        if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
            console.log("Installation Output", output.trim());
        }
    });
    installation.onDidExit(function (status) {
        if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
            console.log("Installation completed with status", status);
        }

        langserver = new IntelephenseLanguageServer();
    });

    if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
        console.log("Starting Intelephense installation.");
    }

    installation.start();
};
var installIfMissing = async function () {
    let installedVersion = "";
    let process = new Process(
        "/usr/bin/env",
        {
            args: ["npm", "list", "--depth 0", "--parseable", "--long", "intelephense"],
            cwd: nova.extension.workspaceStoragePath,
        }
    );
    process.onStdout(function (output) {
        installedVersion = ((output.split(":")[1] || "").split("@")[1] || "");

        if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
            console.log("Currenlty installed version", installedVersion);
        }
    })
    process.onDidExit(function (status) {
        if (installedVersion !== requiredVersion) {
            install();

            return;
        }

        langserver = new IntelephenseLanguageServer();
    });
    process.start();
};
var activate = async function () {
    if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
        console.log("Activating extension.");
    }

    try {
        if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
            console.log("Creating extension workspace storage path:", nova.extension.workspaceStoragePath);
            console.log("Creating extension global storage path:", nova.extension.globalStoragePath);
            console.log("Creating Intelephense workspace storage path:", workspaceStoragePath);
            console.log("Creating Intelephense global storage path:", globalStoragePath);
        }

        nova.fs.mkdir(nova.extension.workspaceStoragePath);
        nova.fs.mkdir(nova.extension.globalStoragePath);
        nova.fs.mkdir(workspaceStoragePath);
        nova.fs.mkdir(globalStoragePath);
    } catch (error) {
        console.error("Directory creation failed:", error);
    }

    await installIfMissing();
};
var deactivate = async function () {
    if (langserver) {
        langserver.deactivate();
        langserver = null;
    }
};
var restart = async function () {
    await deactivate();
    await activate();
};

nova.commands.register("genealabs.intelephense.restart", restart);

exports.activate = function() {
    activate();
};

exports.deactivate = function() {
    deactivate();
}

class IntelephenseLanguageServer {
    constructor() {
        if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
            console.log("Constructing language server.");
        }

        this.start();
    }

    deactivate() {
        if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
            console.log("Deactivating language server.");
        }

        this.stop();
    }

    start(path) {
        if (this.languageClient) {
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
        }

        if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
            console.log("Starting language server.");
        }

        if (!path) {
            path = nova.path.join(
                nova.extension.workspaceStoragePath,
                'node_modules',
                'intelephense',
                'lib',
                'intelephense.js'
            );
        }

        var serverOptions = {
            args: ["node", path, "--stdio"],
            path: "/usr/bin/env",
            type: "stdio",
        };
        var clientOptions = {
            syntaxes: ['php'],
            initializationOptions: {
                clearCache: false,
                globalStoragePath: globalStoragePath,
                licenseKey: nova.config.get('genealabs.intelephense.licenseKey', 'string'),
                storagePath: workspaceStoragePath,
            },
        };
        var client = new LanguageClient(
            'genealabs-intelephense',
            'Intelephense LSP',
            serverOptions,
            clientOptions
        );

        try {
            if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
                console.log("Starting client.");
            }

            client.start();
            nova.subscriptions.add(client);
            this.languageClient = client;
        }
        catch (error) {
           console.error("Error when creating client:", error);
        }
    }

    stop() {
        if (this.languageClient) {
            if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
                console.log("Stopping language client.");
            }

            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
            this.languageClient = null;
        }
    }
}
