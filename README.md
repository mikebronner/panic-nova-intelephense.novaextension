## Known Issues
This extension is undergoing development, and probably has errors. The following
  is a non-exhaustive list of issues being tracked.
<!-- - There are initialization errors with the language server that are currently
  unresolved. A future update by the language server may or may not resolve this
  issue. These issues are likely upstream from Intelephense. -->
<!-- - Nova doesn't display the completion hints very well, and some completions may
  not show at all, due to being overlaid by the suplemental information. -->
- Language server configurations are not not being detected, and currently fall
  back to defaults.
<!-- - The language server currently does not re-index new files. To index them, you
  must manually restart Intelephense. This is being looked into, and will
  hopefully be resolved soon. -->

## Commands

### Restart Intelephense
There are two ways you can restart Intelephense:
- Open command palette and type "Restart Intelephense", then hit enter to execute.
- Navigate to Extensions > Intelephense > Restart Intelephense.

## Features
Intelephense runs any time you open a local PHP project, automatically lints all
  open files, then reports errors and warnings in Nova's **Issues** sidebar and
  the editor gutter.

![](https://nova.app/images/en/dark/tools/sidebars.png)

Further features, as listed on the Intelephense website, include:

✅ Currently implemented by Nova natively or through this package.
☑️ Limited functionality.
⛔️ Currently not implemented.

| Implemented | Feature | Description |
| ----------- | ------- | ----------- |
| ✅ | Code Completion | Fast camel/underscore case context aware suggestions  _with automatic addition of use declarations_. |
| ✅ | Signature Help | View detailed parameter hints for call expressions. |
| ✅ | Jump to Definition | Quickly navigate to symbol definitions. |
| ✅ | Find in Project | Quickly find symbol references within the workspace. |
| ☑️ | Symbol Search | Fast camel/underscore text search for workspace and document symbol definitions. **In Nova this is included in the "Find in Project" functionality.** |
| ✅ | Linting | Error tolerant parser and powerful static analysis engine report problems as you type. |
| ⛔️ | Formatting | PSR12 compatible full document and range formatting. **This does not appear to be available in Nova at this time. |
| ✅ | Embedded Language Support | Includes HTML/JS/CSS code intelligence too. |
| ☑️ | Hover | Detailed hover information with links to official PHP documentation. **Nova's implementation does not parse the tooltips in the same manner as VSCode, so the links and other data points aren't formatted or interactive.** |
| ⛔️ | Highlight | Smart highlighting of references and keywords. **I don't believe this is currently supported in Nova, or it may be theme-dependent.** |

### Premium-Only Features
Currently the premium features of Intelephense do not appear to be functional in
  Nova. However, we still encourage you to support Ben Mewburn by purchasing a
  license. You are able to add the license in the preferences of this extension,
  in the event that some functionality is unlocked in the future.

| Implemented | Feature | Description |
| ----------- | ------- | ----------- |
| ⛔️ | Rename | Easily rename symbols with automatic file/folder renaming too. |
| ⛔️ | Code Folding | Accurate folding of definitions, blocks, use declarations, heredoc, comments, and custom regions. **Nova provides code folding out of the box, but not quite as granular as Intelephense.** |
| ⛔️ | Find all Implementations | Quickly find implementations of interfaces, abstract classes and associated methods. **This isn't available in Nova at this time.** |
| ☑️ | Jump to (type) Definition | Quickly navigate to variables and parameter type definitions. **This is provided by Nova out of the box.** |
| ☑️ | Go to Declaration | Quickly navigate to interface or abstract method declarations. **In Nova this is the same functionality as "Jump to Definition".** |
| ⛔️ | Smart Select | Intelligently expand/shrink text selection based on parse tree. |
| ⛔️ | Code Actions | Import symbols, add (template configurable) PHPDoc, and implement all abstract methods. |

## Configuration

<!--
🎈 If your extension offers global- or workspace-scoped preferences, consider pointing users toward those settings. For example:
-->

To configure global preferences, open **Extensions → Extension Library...** then select intelephense's **Preferences** tab.

You can also configure preferences on a per-project basis in **Project → Project Settings...**

## Caveats

During activation, this extension will attempt to deploy on the workspace a fully functional (and independently managed) installation of Intelephense; you will need to have `npm` installed (you can get it with `brew install npm`).

In some circumstances (under investigation!), `npm` may fail to create the directories it needs (notably, `node_modules`) in the place where Nova (and, later, Intelephense) expects them; as a consequence, the LSP will fail with a console error that might not be easy to debug — since it depends quite a lot on how you are currently managing `npm`, both at the global as well as the local level.

This step may require some improvement in the future; alternatively, there might be a choice to use the _global_ installation of `npm` instead, or, if you have one local `npm` installation in your current PHP project, this extension might attempt to use it. Such options will require further options on the Preferences panel; stay tuned...

<!--
👋 That's it! Happy developing!

P.S. If you'd like, you can remove these comments before submitting your extension 😉
-->

## Credit
- Primary credit goes to Ben Mewburn, who developed the
  [Intelephense](https://intelephense.com) language server, which this extension
  uses to provide auto-complete and other LSP features in order to bring Nova on
  par with modern PHP development.
- I would like to thank [Kristófer Reykjalin](https://extensions.panic.com/extensions/com.thorlaksson/) for inspiration and debugging many
  of the same errors I have run into ahead of me in various github issues. He has
  spent a lot of effort in creating an Intelephense extension for Nova, and the
  only reason I started working on my own extension is because I had some
  trouble getting his extension to work in my projects. As I am finding out now,
  this is probably not a problem on his end, but ranter upstream from the
  Intelephense package. I needed to get Intelephense working quickly in order
  for me to be able to use Nova as a primary driver.
