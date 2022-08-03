<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
    import Card from "../components/Card.svelte";
    import {LANGUAGES} from "../app.constants";
</script>

<header>
    <Navbar/>
</header>

<main class="flex flex-row justify-center mt-16 mb-16 flex-wrap gap-6">
    {#each LANGUAGES as lang}
        <Card id={lang.id} label={lang.label}></Card>
    {/each}
</main>

<footer class="footer footer-center p-4 text-base-content">
    <div>
        <p>Built with SvelteKit and Deno with ❤️</p>
    </div>
</footer>