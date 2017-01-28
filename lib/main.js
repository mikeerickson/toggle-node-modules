'use babel'

import configSchema from './config-schema'

export default {
  config: configSchema,

  activate: () => {
    this.subscription = atom.commands.add('atom-text-editor', 'toggle-node-modules:toggle', () => {
      let editor = atom.workspace.getActiveTextEditor();
      if (editor) {
        let nodes;
        nodes = Array.from(document.querySelectorAll("li[is='tree-view-directory'].expanded"))
          .filter(node => node.querySelector('span').textContent === 'node_modules');

        // no expanded node_modules, look for collapsed one
        if (nodes.length === 0) {
					nodes = Array.from(document.querySelectorAll("li[is='tree-view-directory'].collapsed"))
							.filter(node => node.querySelector('span').textContent === 'node_modules');
        }

        // if we have a node_modules directory to toggle, make it happen
        if (nodes.length > 0) {
          nodes.forEach(e => e.click());
        }
      }
    });
  },

  deactivate: () => {
	this.subscription.dispose();
  }
}
