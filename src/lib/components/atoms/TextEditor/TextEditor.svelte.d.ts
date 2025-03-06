import { type Component } from 'svelte';

export interface ITextEditorProps {
	value?: string | null;
}

export declare const TextEditor: Component<ITextEditorProps, object, 'value'>;
export default TextEditor;
