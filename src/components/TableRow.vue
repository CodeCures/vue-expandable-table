<script setup>
import { ref } from 'vue';
import IconCaretDown from './icons/IconCaretDown.vue';
import IconCaretUp from './icons/IconCaretUp.vue';
import TableRowMenu from './TableRowMenu.vue';
import AdditionalRowContent from './AdditionalRowContent.vue';


defineProps(['user', 'index']);
const model = defineModel();

const isOpen = ref(false);
</script>
<template>
    <tr class="bg-white border-b dark:bg-gray-50 dark:border-gray-200 hover:bg-violet-100">
        <td class="w-4 px-4">
            <div class="flex items-center space-x-3">
                <input v-model="model" :value="user.id" :id="`checkbox-table-search-${index}`" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label :for="`checkbox-table-search-${index}`" class="sr-only">checkbox</label>
                <button @click="isOpen = !isOpen"
                    class="border border-gray-400 w-4 h-4 rounded-full flex items-center justify-center">
                    <IconCaretUp v-if="isOpen" />
                    <IconCaretDown v-else />
                </button>
            </div>
        </td>
        <th scope="row" class="px-4 py-2 font-medium whitespace-nowrap line-clamp-2">
            <h4 class="font-semibold text-gray-500">{{ user.name }}</h4>
            <p>{{ user.email }}</p>
        </th>
        <td class="px-4 py-2 space-y-1.5">
            <span class="px-2 py-1 rounded-full" :class="{
                    'bg-blue-100 text-blue-800': user.status === 'active',
                    'bg-purple-100 text-purple-800': user.status === 'inactive',
                }">
                <span class="inline-block w-2 h-2 rounded-full" :class="{
                    'bg-blue-700': user.status === 'active',
                    'bg-purple-700': user.status === 'inactive',
                }"></span>
                {{ user.status }}
            </span>
            <p>Last Login: {{ user.last_login }}</p>
        </td>
        <td class="px-4 py-2 space-y-1.5">
            <span class="px-2 py-1 rounded-full" :class="{
                    'bg-green-100 text-green-800': user.payment_status === 'Paid',
                    'bg-yellow-100 text-yellow-800': user.payment_status === 'Unpaid',
                    'bg-red-100 text-red-800': user.payment_status === 'Overdue',
                }">
                <span class="inline-block w-2 h-2 rounded-full" :class="{
                    ' bg-green-700': user.payment_status === 'Paid',
                    'bg-yellow-700': user.payment_status === 'Unpaid',
                    'bg-red-700': user.payment_status === 'Overdue',
                }"></span>
                {{ user.payment_status }}
            </span>
            <p class="text-gray-500">Paid on: {{ user.payment_date }}</p>
        </td>
        <td class="px-4 py-2 space-y-1.5">
            <h4 class="font-semibold text-gray-500">${{ user.amount_paid }}</h4>
            <p>USD</p>
        </td>
        <td class="px-4 py-2">
            <TableRowMenu :row-id="index" />
        </td>
    </tr>
    <AdditionalRowContent :open="isOpen" :activities="user.activity_logs" />
</template>