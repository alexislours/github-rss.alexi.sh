<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
    import Card from "../components/Card.svelte";
    import {LANGUAGES} from "../app.constants";

    let buildTime = new Date(+import.meta.env.VITE_BUILD_TIME * 1000);
</script>

<header>
    <Navbar/>
</header>

<main class="flex flex-row justify-center mt-10 mb-16 flex-wrap gap-6">
    <div class="w-full flex justify-center">
        <p>Last build:
            <span class="tooltip" data-tip="{buildTime.toISOString()}">{buildTime.toLocaleString()}</span>
        </p>
    </div>
    {#each LANGUAGES as lang}
        <Card id={lang.id} label={lang.label}></Card>
    {/each}
</main>

<footer class="footer footer-center p-4 text-base-content">
    <div>
        <p>Built with SvelteKit and Deno with ❤️</p>
    </div>
</footer>