<!--
👋 Hello! As Nova users browse the extensions library, a good README can help them understand what your extension does, how it works, and what setup or configuration it may require.

Not every extension will need every item described below. Use your best judgement when deciding which parts to keep to provide the best experience for your new users.

💡 Quick Tip! As you edit this README template, you can preview your changes by selecting **Extensions → Activate Project as Extension**, opening the Extension Library, and selecting "intelephense" in the sidebar.

Let's get started!
-->

<!--
🎈 Include a brief description of the features your extension provides. For example:
-->

<!-- **intelephense** provides deep integration with **An Important Language**, including the most important feature, something that's really helpful, and _a little-known secret!_ -->

<!--
🎈 It can also be helpful to include a screenshot or GIF showing your extension in action:
-->

<!-- ![](https://nova.app/images/en/dark/editor.png) -->

## Warning

This extension is currently in beta. It may or may not work. Please see the
  changelog for details.

## Requirements

<!--
🎈 If your extension depends on external processes or tools that users will need to have, it's helpful to list those and provide links to their installers:
-->
<!--
✨ Providing tips, tricks, or other guides for installing or configuring external dependencies can go a long way toward helping your users have a good setup experience:
-->


## Commands

### Restart Intelephense
There are two ways you can restart Intelephense:
- Open command palette and type "Restart Intelephense", then hit enter to execute.
- Navigate to Extensions > Intelephense > Restart Intelephense.

<!--
🎈 If your extension provides features that are invoked manually, consider describing those options for users:
-->

<!-- To run intelephense:

- Select the **Editor → intelephense** menu item; or
- Open the command palette and type `intelephense` -->

<!--
🎈 Alternatively, if your extension runs automatically (as in the case of a validator), consider showing users what they can expect to see:
-->

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
