<script setup>
import IconFunnel from '@/components/icons/IconFunnel.vue'
import orderBy from '@/data/sortBy.json'
import filterParams from '@/data/userFilterParams.json'

const emits = defineEmits(['filterBy', 'sortBy'])

const handleSort = (sortParam) => emits('sortBy', sortParam);
const handleUserFilter = (filterParam) => emits('filterBy', filterParam);

</script>
<template>
    <div>
        <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" class="btn-filter space-x-1"
            type="button">
            <IconFunnel />
            <span>Filter</span>
        </button>
        <!-- Dropdown menu -->
        <div id="dropdownRadio" class="z-10 hidden w-48 bg-white divide-y divide-gray-200 rounded-lg shadow "
            data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top"
            style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px);">

            <ul class="dropdown-body" aria-labelledby="dropdownRadioButton">
                <div class="text-gray-400">Sort By: </div>
                <li v-for="item in orderBy" :key="item.id">
                    <div class="flex items-center p-2 rounded hover:bg-violet-100">
                        <label :for="`filter-radio-example-${item.id}`"
                            class="w-full ms-2 text-xs font-light text-gray-600 rounded">{{ item.label }}</label>
                        <input @change="handleSort(item.name)" :checked="item.name === 'default'"
                            :id="`filter-radio-example-${item.id}`" type="radio" value="" name="sort-user"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:focus:ring-0">
                    </div>
                </li>
            </ul>

            <ul class="dropdown-body" aria-labelledby="dropdownRadioButton">
                <div class="text-gray-400">Filter Users </div>
                <li v-for="item in filterParams" :key="item.id">
                    <div class="flex items-center p-2 rounded hover:bg-violet-100">
                        <label :for="`filter-radio-user-${item.id}`"
                            class="w-full ms-2 text-xs font-light text-gray-600 rounded">
                            {{ item.label }}
                        </label>
                        <input @change="handleUserFilter(item.name)" :checked="item.id === 1"
                            :id="`filter-radio-user-${item.id}`" type="radio" value="" name="filter-radio"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:focus:ring-0">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>