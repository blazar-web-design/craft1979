<script lang="ts">
  import { applyJsonLd, applyPageMeta } from '../../seo/document'

  $effect(() => {
    applyPageMeta()
    applyJsonLd()
  })
</script>
