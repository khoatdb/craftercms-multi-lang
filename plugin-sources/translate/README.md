# Translate plugin

## Update Plugin

To update, modify `src/` source code.

## How to build

* Check out `sources/translate` to your site

* Run following commands:

```
cd {AUTHORING_SANDBOX}/sources/translate
yarn
yarn build
```

* Confirm that plugin is copied to location `{AUTHORING_SANDBOX}/config/studio/plugins/context-nav/translate/index.js`

## Install plugin

After the build step above, run following commands to commit update to sandbox:

```
git add {AUTHORING_SANDBOX}/config/studio/plugins/context-nav/translate/index.js
git commit -m "Update translate plugin"
```
