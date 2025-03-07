<!--<script lang="ts">-->
<!--	import {-->
<!--		Composer,-->
<!--		LinkNode,-->
<!--		AutoLinkNode,-->
<!--		CodeNode,-->
<!--		CodeHighlightNode,-->
<!--		HeadingNode,-->
<!--		QuoteNode,-->
<!--		ListNode,-->
<!--		ListItemNode,-->
<!--		HorizontalRuleNode,-->
<!--		ImageNode,-->
<!--		LayoutContainerNode,-->
<!--		LayoutItemNode-->
<!--	} from 'svelte-lexical';-->
<!--	import SvelteLexical from './SvelteLexical.svelte';-->
<!--	import { theme } from 'svelte-lexical/dist/themes/default';-->

<!--	let { value = $bindable() } = $props();-->

<!--	const initialConfig = $derived({-->
<!--		theme: theme,-->
<!--		namespace: 'pg_sveltekit',-->
<!--		nodes: [-->
<!--			HeadingNode,-->
<!--			ListNode,-->
<!--			ListItemNode,-->
<!--			QuoteNode,-->
<!--			HorizontalRuleNode,-->
<!--			ImageNode,-->
<!--			LinkNode,-->
<!--			AutoLinkNode,-->
<!--			CodeNode,-->
<!--			CodeHighlightNode,-->
<!--			LayoutContainerNode,-->
<!--			LayoutItemNode-->
<!--		],-->
<!--		onError: (error: Error) => {-->
<!--			throw error;-->
<!--		}-->
<!--	});-->
<!--</script>-->

<!--<Composer {initialConfig}>-->
<!--	<SvelteLexical bind:value />-->
<!--</Composer>-->
