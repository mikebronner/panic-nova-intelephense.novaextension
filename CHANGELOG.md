# Changelog
## [Upcoming]
- Further refinement and research into the initialization and indexing issues.
  Currently waiting on the next release of intelephense to see if the proclem
  is addressed there.
- Add language server configuration settings.

## [Known Issues]
- There are initialization errors with the language server that are currently
  unresolved. A future update by the language server may or may not resolve this
  issue. These issues are likely upstream from Intelephense.
- Nova doesn't display the completion hints very well, and some completions may
  not show at all, due to being overlaid by the suplemental information.
- Language server configurations are not not being detected, and currently fall
  back to defaults.

## [0.1.2] - 2021-04-10
### Added
- command to restart the language server.
- functionality to only install Intelephense if it has not already been
  installed.
- configuration options to enable or disable debug output to the Extension
  Console.

## [0.1.1] - 2021-04-09
### Changed
- version of included intelephense package to an older version that does index.

## [0.1.0] - 2021-04-05
### Added
- initial functionality.
