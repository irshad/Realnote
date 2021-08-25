<script>
    import Chakra from "./svg/Chakra.svelte";
</script>

<div class="flag">
    <div class="orange" />
    <div class="white">
        <Chakra />
    </div>
    <div class="green" />
</div>

<style>
    .flag {
        width: 60px;
        top: 20px;
        right: 20px;
        position: absolute;
        overflow: hidden;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.6s ease-in-out;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .flag:hover {
        width: 100px;
        transition: all 0.6s ease-in-out;
    }

    .orange,
    .white,
    .green {
        height: 14px;
    }

    .orange {
        background-color: rgba(255, 153, 51, 1);
    }

    .white {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 1);
    }

    .green {
        background-color: rgba(19, 136, 8, 1);
    }
</style>
