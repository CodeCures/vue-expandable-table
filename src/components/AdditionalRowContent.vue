<script setup>
import IconInfoCircle from './icons/IconInfoCircle.vue';
import ToolTipModal from './ToolTipModal.vue';

defineProps(['open', 'activities'])
</script>
<template>
    <tr v-if="open">
        <td colspan="6">
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right">
                    <thead class="text-xs text-gray-500 uppercase dark:text-gray-400 bg-violet-50">
                        <tr>
                            <th scope="col" width="150px" class="px-6 py-3 font-semibold">
                                DATE
                            </th>
                            <th scope="col" width="300px" class="px-6 py-3 font-semibold">
                                USER ACTIVITIES
                            </th>
                            <th scope="col" class="px-6 py-3 font-semibold flex">
                                DETAILS
                                <button data-popover-target="popover-animation" type="button">
                                    <IconInfoCircle />
                                </button>
                                <ToolTipModal />
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-xs">

                        <tr v-for="(action, i) in activities" :key="i"
                            class="bg-violet-100 border-b dark:border-violet-200">
                            <th scope="row" class="px-6 py-2 font-medium">
                                {{ action.date }}
                            </th>
                            <td class="px-6 py-2">
                                {{ action.activity }}
                            </td>
                            <td class="px-6 py-2">
                                {{ action.details }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </td>
    </tr>
</template>