# Changelog
## [Upcoming]

## [0.1.8] - 2022-04-22
Thanks to @GwynethLlewelyn for this update!

### ♻️ Changed
- installation process to generate a `package.json` file from scratch, in
  order to allow `npm` to do an installation in the correct place.
- [README.md](README.md) to include information about caveats of the automatic
  installation process for Inteliphense using `npm`.

### 🐛 Fixed
- inconsistent path names.

## [0.1.7] - 2022-04-21
### Removed
- outdated Known Issues from README.

## [0.1.6] - 2022-04-21
### Updated
- intelephense version to 1.8.2. This resolved the initialization errors and now
  also provides PHP 8 support.

## [0.1.5] - 2021-04-26
### Reverted
- changes made in 0.1.4 back out, as indexing would no longer complete. Further
  investigation is necessary.

## [0.1.4] - 2021-04-26
### Updated
- intelephense version to 1.7.0. This resolved the initialization errors and now
  also provides PHP 8 support.

## [0.1.3] - 2021-04-10
### Updated
- documentation.

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
