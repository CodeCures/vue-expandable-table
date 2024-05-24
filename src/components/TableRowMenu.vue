<script setup>
import IconMenu from './icons/IconMenu.vue';
defineProps(['rowId'])
</script>
<template>
    <button class="flex items-center" :id="`dropdownMenuIconButton-${rowId}`"
        :data-dropdown-toggle="`dropdownDots-${rowId}`">
        view more
        <IconMenu />
    </button>
    <!-- Dropdown menu -->
    <div :id="`dropdownDots-${rowId}`" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
        <ul class="py-2 text-xs text-gray-700" :aria-labelledby="`dropdownMenuIconButton-${rowId}`">
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-violet-100 ">Edit</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-violet-100 ">View Profile</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-violet-100 text-green-500">Activate User</a>
            </li>

        </ul>
        <div class="py-2">
            <a href="#" class="block px-4 py-2 text-xs text-red-700">Delete</a>
        </div>
    </div>
</template>