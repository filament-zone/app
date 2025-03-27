<!--<script lang="ts">-->
<!--	import {-->
<!--		ContentEditable,-->
<!--		RichTextPlugin,-->
<!--		ListPlugin,-->
<!--		CheckListPlugin,-->
<!--		HorizontalRulePlugin,-->
<!--		ImagePlugin,-->
<!--		MarkdownShortcutPlugin,-->
<!--		TEXT_FORMAT_TRANSFORMERS,-->
<!--		ELEMENT_TRANSFORMERS,-->
<!--		HR,-->
<!--		IMAGE,-->
<!--		CHECK_LIST,-->
<!--		LinkPlugin,-->
<!--		validateUrl,-->
<!--		CAN_USE_DOM,-->
<!--		FloatingLinkEditorPlugin,-->
<!--		LINK,-->
<!--		AutoLinkPlugin,-->
<!--		CodeHighlightPlugin,-->
<!--		CodeActionMenuPlugin,-->
<!--		ColumnLayoutPlugin,-->
<!--		getEditor-->
<!--	} from 'svelte-lexical';-->

<!--	import RichTextToolbar from './RichTextToolbar.svelte';-->
<!--	import { onMount } from 'svelte';-->
<!--	import type { ISvelteLexicalProps } from './SvelteLexical.svelte.d.ts';-->

<!--	let { value = $bindable() }: ISvelteLexicalProps = $props();-->

<!--	let isSmallWidthViewport = $state(true);-->
<!--	let editorDiv: HTMLElement | undefined = $state();-->

<!--	onMount(() => {-->
<!--		function updateViewPortWidth() {-->
<!--			const isNextSmallWidthViewport =-->
<!--				CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;-->

<!--			if (isNextSmallWidthViewport !== isSmallWidthViewport) {-->
<!--				isSmallWidthViewport = isNextSmallWidthViewport;-->
<!--			}-->
<!--		}-->
<!--		updateViewPortWidth();-->
<!--		window.addEventListener('resize', updateViewPortWidth);-->

<!--		return () => {-->
<!--			window.removeEventListener('resize', updateViewPortWidth);-->
<!--		};-->
<!--	});-->

<!--	const editor = getEditor();-->
<!--	onMount(() => {-->
<!--		// editorDiv = (value as HTMLDivElement).innerHTML as unknown as HTMLDivElement;-->

<!--		editor?.registerTextContentListener(() => {-->
<!--			console.log('6 registerTextContentListener', editorDiv);-->
<!--			value = editorDiv?.outerHTML;-->
<!--		});-->
<!--	});-->
<!--</script>-->

<!--<div class="editor-shell svelte-lexical" style="max-width: 100%">-->
<!--	<RichTextToolbar />-->
<!--	<div class="editor-container tree-view">-->
<!--		<div class="editor-scroller">-->
<!--			<div class="editor" bind:this={editorDiv}>-->
<!--				<ContentEditable />-->
<!--			</div>-->
<!--		</div>-->

<!--		<RichTextPlugin />-->
<!--		<ListPlugin />-->
<!--		<CheckListPlugin />-->
<!--		<HorizontalRulePlugin />-->
<!--		<ImagePlugin captionsEnabled={false} />-->
<!--		<AutoLinkPlugin />-->
<!--		<LinkPlugin {validateUrl} />-->
<!--		<CodeHighlightPlugin />-->
<!--		{#if !isSmallWidthViewport}-->
<!--			<FloatingLinkEditorPlugin anchorElem={editorDiv} />-->
<!--			<CodeActionMenuPlugin anchorElem={editorDiv} />-->
<!--		{/if}-->
<!--		<MarkdownShortcutPlugin-->
<!--			transformers={[-->
<!--				...TEXT_FORMAT_TRANSFORMERS,-->
<!--				...ELEMENT_TRANSFORMERS,-->
<!--				HR,-->
<!--				IMAGE,-->
<!--				CHECK_LIST,-->
<!--				LINK-->
<!--			]}-->
<!--		/>-->
<!--		<ColumnLayoutPlugin />-->
<!--	</div>-->
<!--</div>-->
