/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import CookieHelper from '../helpers/cookie';

const API_GET_ITEM_TREE = '/studio/api/1/services/api/1/content/get-items-tree.json';
const API_GET_ITEM = '/studio/api/1/services/api/1/content/get-item.json';
const API_CLIPBOARD_COPY = '/studio/api/1/services/api/1/clipboard/copy-item.json';
const API_CLIPBOARD_PASTE = '/studio/api/1/services/api/1/clipboard/paste-item.json';
const API_CREATE_FOLDER = '/studio/api/1/services/api/1/content/create-folder.json';
const API_RENAME_FOLDER = '/studio/api/1/services/api/1/content/rename-folder.json';

const StudioAPI = {
  origin() {
    return window.location.origin;
  },
  xsrfToken() {
    return CookieHelper.get('XSRF-TOKEN');
  },
  siteId() {
    const url = new URL(window.location.href);
    if (url.searchParams.has('site')) {
      return url.searchParams.get('site');
    }

    return CookieHelper.get('crafterSite');
  },
  getSelectedItems: function() {
    const selectedPath = craftercms.getStore().getState().preview.guest.path;
    if (!selectedPath) return [];

    const item = craftercms.getStore().getState().content.itemsByPath[craftercms.getStore().getState().preview.guest.path];
    if (!item) return [];

    return [{
      name: item.label,
      path: item.path,
      contentType: item.contentTypeId,
    }];
  },
  openEditForm: function(contentType, path) {
    const site = CrafterCMSNext.system.store.getState().sites.active;
    const authoringBase = CrafterCMSNext.system.store.getState().env.authoringBase;
    const eventIdSuccess = 'editDialogSuccess';
    const eventIdDismissed = 'editDialogDismissed';

    return CrafterCMSNext.system.store.dispatch({
      type: 'SHOW_EDIT_DIALOG',
      payload: {
        site: site,
        path: path,
        type: 'form',
        authoringBase,
        readonly: false,  // TODO: make this configurable
        isHidden: !!message.embeddedItemId,
        // TODO: ICE groups for embedded comments are not currently supported
        ...(message.embeddedItemId ? { modelId: message.embeddedItemId } : { iceGroupId: message.iceId }),
        onSaveSuccess: {
          type: 'BATCH_ACTIONS',
          payload: [
            {
              type: 'DISPATCH_DOM_EVENT',
              payload: { id: eventIdSuccess }
            },
            {
              type: 'SHOW_EDIT_ITEM_SUCCESS_NOTIFICATION'
            },
            {
              type: 'CLOSE_EDIT_DIALOG'
            }
          ]
        },
        onCancel: {
          type: 'BATCH_ACTIONS',
          payload: [
            {
              type: 'CLOSE_EDIT_DIALOG'
            },
            {
              type: 'DISPATCH_DOM_EVENT',
              payload: { id: eventIdDismissed }
            }
          ]
        }
      }
    });
  },
  async getChildrenPaths(path) {
    const res = await fetch(`${StudioAPI.origin()}${API_GET_ITEM_TREE}?site=${StudioAPI.siteId()}&path=${path}&depth=1`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });

    if (res.status === 200) {
      const data = await res.json();
      return data.item.children.filter(child => child.path !== path).map(child => {
        return child.path;
      });
    }

    return [];
  },
  async getItem(path) {
    const res = await fetch(`${StudioAPI.origin()}${API_GET_ITEM}?site=${StudioAPI.siteId()}&path=${path}&populateDependencies=false`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    }

    return null;
  },
  async clipboardCopy(path) {
    const item = {
      item: [{ uri: path }]
    };
    const res = await fetch(`${StudioAPI.origin()}${API_CLIPBOARD_COPY}?site=${StudioAPI.siteId()}`, {
      method: 'POST',
      headers: {
        'x-xsrf-token': StudioAPI.xsrfToken(),
        'content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(item),
    });

    if (res.status === 200) {
      return true;
    }

    return false;
  },
  async clipboardPaste(parentPath) {
    const res = await fetch(`${StudioAPI.origin()}${API_CLIPBOARD_PASTE}?site=${StudioAPI.siteId()}&parentPath=${parentPath}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });

    if (res.status === 200) {
      const data = await res.json();
      const filePath = data.status[0];
      return filePath;
    }

    return null;
  },
  async createFolder(path, name) {
    const res = await fetch(`${StudioAPI.origin()}${API_CREATE_FOLDER}?site=${StudioAPI.siteId()}&path=${path}&name=${name}`, {
      method: 'POST',
      headers: {
        'x-xsrf-token': StudioAPI.xsrfToken(),
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      credentials: 'include',
      body: '',
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    }

    return false;
  },
  async renameFolder(path, name) {
    const res = await fetch(`${StudioAPI.origin()}${API_RENAME_FOLDER}?site=${StudioAPI.siteId()}&path=${path}&name=${name}`, {
      method: 'POST',
      headers: {
        'x-xsrf-token': StudioAPI.xsrfToken(),
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      credentials: 'include',
      body: '',
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    }

    return false;
  }
};

export default StudioAPI;
