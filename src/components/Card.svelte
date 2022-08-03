<script lang="ts">
    import {TIME_PERIODS} from "../app.constants";

    export let id;
    export let label;
</script>

<div class="card bg-base-100 card-bordered m-1 sm:m-0">
    <div class="card-body flex items-center">
        <h2 class="card-title">{label}</h2>
        <div class="card-actions justify-center mt-6">
            <div class="btn-group">
                {#each TIME_PERIODS as period}
                    <a href="/feeds/{period.id}/{id}.xml" class="btn w-24" target="_blank">
                        {period.label}
                    </a>
                {/each}
            </div>
        </div>
    </div>
</div>