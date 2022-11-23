'use babel';

import BaccredirectView from './baccredirect-view';
import { CompositeDisposable } from 'atom';

export default {

  baccredirectView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.baccredirectView = new BaccredirectView(state.baccredirectViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.baccredirectView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'baccredirect:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.baccredirectView.destroy();
  },

  serialize() {
    return {
      baccredirectViewState: this.baccredirectView.serialize()
    };
  },

  toggle() {
    console.log('Baccredirect was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
