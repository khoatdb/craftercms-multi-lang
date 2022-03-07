# Translate plugin

## Update Plugin

To update, modify `plugin-sources/translate/src/` source code.

## How to build

* Checkout `plugin-sources/translate` to your site

* Run following commands:

```
cd {AUTHORING_SANDBOX}/plugin-sources/translate
yarn
yarn build
```

* Confirm that plugin is copied to location `{AUTHORING_SANDBOX}/config/studio/static-assets/plugins/org/craftercms/plugin/translate/apps/toolbar/index.js`

## Install plugin

After the build step above, run following commands to commit update to sandbox:

```
git add {AUTHORING_SANDBOX}/config/studio/static-assets/plugins/org/craftercms/plugin/translate/apps/toolbar/index.js
git commit -m "Update translate plugin"
```
