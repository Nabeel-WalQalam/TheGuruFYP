import { EditorView } from "@codemirror/view";

function onUpdate(onChange) {
  return EditorView.updateListener.of((viewUpdate) => {
    if (viewUpdate.docChanged) {
      const doc = viewUpdate.state.doc;
      const value = doc.toString();
      onChange(value, viewUpdate);
    }
  });
}

export { onUpdate };
