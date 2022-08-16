<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
    import Card from "../components/Card.svelte";
    import {LANGUAGES} from "../app.constants";

    let filteredLanguages = LANGUAGES;
    let filter = "";
    const filterFeeds = () => {
        filteredLanguages = LANGUAGES.filter(lang => lang.label.toLowerCase().includes(filter.toLowerCase()));
    }
    let buildTime = new Date(+import.meta.env.VITE_BUILD_TIME * 1000);
</script>

<header>
    <Navbar/>
</header>

<main class="flex flex-row justify-center mt-10 mb-16 flex-wrap gap-6">
    <div class="w-full flex flex-col items-center">
        <p>Last build:
            <span class="tooltip" data-tip="{buildTime.toISOString()}">{buildTime.toLocaleString()}</span>
        </p>
        <div class="form-control w-full max-w-xs">
            <div class="input-group">
                <input type="text" placeholder="Search feeds..."
                       class="input text-[16px] input-bordered w-full"
                       bind:value={filter} on:keyup={filterFeeds}/>
                <button class="btn btn-square" on:click={() => {filter = ''; filterFeeds()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    {#each filteredLanguages as lang}
        <Card id={lang.id} label={lang.label}></Card>
    {/each}
</main>

<footer class="footer footer-center p-4 text-base-content">
    <div>
        <p>Built with SvelteKit and Deno with ❤️</p>
    </div>
</footer>