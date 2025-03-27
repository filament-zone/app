<!--<svelte:options runes={true} />-->

<!--<script lang="ts">-->
<!--	import {-->
<!--		DropDownTextColorPicker,-->
<!--		DropDownBackColorPicker,-->
<!--		BlockFormatDropDown,-->
<!--		CodeDropDrownItem,-->
<!--		CodeLanguageDropDown,-->
<!--		FontSizeEntry,-->
<!--		MoreStylesDropDown,-->
<!--		StrikethroughDropDownItem,-->
<!--		SubscriptDropDownItem,-->
<!--		SuperscriptDropDownItem,-->
<!--		BoldButton,-->
<!--		Divider,-->
<!--		UnderlineButton,-->
<!--		ItalicButton,-->
<!--		StrikethroughButton,-->
<!--		DropDownAlign,-->
<!--		FormatCodeButton,-->
<!--		ParagraphDropDownItem,-->
<!--		BulletDropDrownItem,-->
<!--		FontFamilyDropDown,-->
<!--		NumberDropDrownItem,-->
<!--		HeadingDropDownItem,-->
<!--		CheckDropDrownItem,-->
<!--		QuoteDropDrownItem,-->
<!--		Toolbar-->
<!--	} from 'svelte-lexical';-->
<!--</script>-->

<!--<Toolbar>-->
<!--	{#snippet children({ editor, activeEditor, blockType })}-->
<!--		<Divider />-->
<!--		{#if activeEditor === editor}-->
<!--			<BlockFormatDropDown>-->
<!--				<ParagraphDropDownItem />-->
<!--				<HeadingDropDownItem headingSize="h1" />-->
<!--				<HeadingDropDownItem headingSize="h2" />-->
<!--				<HeadingDropDownItem headingSize="h3" />-->
<!--				<BulletDropDrownItem />-->
<!--				<NumberDropDrownItem />-->
<!--				<CheckDropDrownItem />-->
<!--				<QuoteDropDrownItem />-->
<!--				<CodeDropDrownItem />-->
<!--			</BlockFormatDropDown>-->
<!--			<Divider />-->
<!--		{/if}-->
<!--		{#if blockType === 'code'}-->
<!--			<CodeLanguageDropDown />-->
<!--		{:else}-->
<!--			<FontFamilyDropDown />-->
<!--			<FontSizeEntry />-->
<!--			<Divider />-->
<!--			<BoldButton />-->
<!--			<ItalicButton />-->
<!--			<UnderlineButton />-->
<!--			<StrikethroughButton />-->
<!--			<FormatCodeButton />-->
<!--			<DropDownTextColorPicker />-->
<!--			<DropDownBackColorPicker />-->
<!--			<MoreStylesDropDown>-->
<!--				<StrikethroughDropDownItem />-->
<!--				<SubscriptDropDownItem />-->
<!--				<SuperscriptDropDownItem />-->
<!--			</MoreStylesDropDown>-->
<!--			<Divider />-->
<!--		{/if}-->
<!--		<DropDownAlign />-->
<!--	{/snippet}-->
<!--</Toolbar>-->
