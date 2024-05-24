<script setup>
import { ref } from 'vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import { TABS } from '@/data/tabs.js'
import FilterDropDown from './components/FilterDropDown.vue';
import TableRow from './components/TableRow.vue';
import IconCaretDown from './components/icons/IconCaretDown.vue';
import IconCaretRight from './components/icons/IconCaretRight.vue';
import IconCaretLeft from './components/icons/IconCaretLeft.vue';
import { storeToRefs } from 'pinia'
import { useUserStore } from './stores/useUserStore'

const userStore = useUserStore();

const {
  search,
  sortParam,
  filteredUsers,
  totalAmountPayable,
} = storeToRefs(userStore);


const activeTab = ref(TABS[0].name);
const setActiveTab = (tabName) => {
  userStore.setStatus(tabName);
  activeTab.value = tabName;
};

const setPaginationItems = (itemsCount) => userStore.setItemsPerPage(itemsCount);
const moveToPreviousPage = (prevPage) => userStore.setCurrentPage(prevPage);
const moveToNextPage = (nextPage) => userStore.setCurrentPage(nextPage);

const userIds = ref([]);

const updatePaymentStatus = (status) => userStore.updatePayment(userIds.value, status);

const handleFilter = (filterParam) => userStore.setStatus(filterParam);
const handleSort = (param) => sortParam.value = param;

</script>

<template>

  <div class="w-[65%] mx-auto space-y-1 mb-24">
    <h2 class="page-heading mb-2">{{ activeTab }} User Details</h2>
    <div class="flex justify-between text-gray-600">
      <!-- tabs -->
      <div class="w-full flex space-x-4">
        <div v-for="tab in TABS" :key="tab.label" @click="setActiveTab(tab.name)" class="tab-item"
          :class="{ 'active-tab': tab.name === activeTab }">
          {{ tab.label }}
        </div>
      </div>
      <!-- payable amount -->
      <div class="w-[45%]">
        Total Payable amount: <span class="font-semibold text-lg text-violet-500">{{ totalAmountPayable }}</span> <span
          class="font-light">USD</span>
      </div>
    </div>
    <hr class="border-[#c6c2de]">

    <!-- tab body -->
    <div class="tab-body">
      <div class="tab-filter-section">
        <!-- filter -->
        <div class="flex items-center space-x-5">
          <FilterDropDown @filter-by="handleFilter" @sort-by="handleSort" />
          <label for="table-search" class="sr-only">Search</label>
          <div class="relative">
            <IconSearch />
            <input v-model="search" type="text" id="table-search" class="search-field"
              placeholder="Search users by Name, Email or Date ">
          </div>
        </div>
        <button @click="updatePaymentStatus('Paid')" class="pay-due-btn">Pay DUES</button>
      </div>

      <table class="app-table">
        <thead class="table-head">
          <tr>
            <th scope="col" class="px-4 py-3">
              <div class="flex items-center">
                <input id="checkbox-all-search" type="checkbox" class="top-checkbox">
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" class="px-6">
              NAME
            </th>
            <th scope="col" class="px-6">
              USER STATUS
            </th>
            <th scope="col" class="px-6">
              PAYMENT STATUS
            </th>
            <th scope="col" class="px-6">
              AMOUNT
            </th>
            <th scope="col" class="px-10" align="right">
              <IconMenu />
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(user, i) in filteredUsers.data" :key="i">
            <TableRow :user="user" :index="i" v-model="userIds" />
          </template>
        </tbody>
        <tfoot class="bg-violet-100">
          <tr>
            <td colspan="4"></td>
            <td colspan="2" class="p-4">
              <div class="flex justify-between">
                <div class="relative">
                  <button id="dropdownRightEndButton" data-dropdown-toggle="dropdownRightEnd"
                    data-dropdown-placement="right-end" type="button" class="flex items-center space-x-1">
                    <p>Rows Per Page {{ filteredUsers.pagination.perPage }}</p>
                    <IconCaretDown />
                  </button>

                  <!-- Dropdown menu -->
                  <div id="dropdownRightEnd" class="z-10 hidden bg-white divide-y divide-gray-100">
                    <ul class="px-2 text-sm text-gray-700" aria-labelledby="dropdownRightEndButton">
                      <li class="py-1">
                        <a href="#" @click="setPaginationItems(10)">10</a>
                      </li>
                      <li class="py-1">
                        <a href="#" @click="setPaginationItems(25)">25</a>
                      </li>
                      <li class="py-1">
                        <a href="#" @click="setPaginationItems(50)">50</a>
                      </li>
                      <li class="py-1">
                        <a href="#" @click="setPaginationItems(75)">75</a>
                      </li>
                      <li class="py-1">
                        <a href="#" @click="setPaginationItems(100)">100</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <p class="font-semibold">
                  {{ filteredUsers.pagination.from }} -
                  {{ filteredUsers.pagination.to }} of
                  {{ filteredUsers.pagination.total }}
                </p>
                <div class="space-x-5">
                  <button type="button" :disabled="!filteredUsers.pagination.hasPrevPage"
                    @click="moveToPreviousPage(filteredUsers.pagination.prevPage)">
                    <IconCaretLeft class="w-4 h-4" />
                  </button>

                  <button :disabled="!filteredUsers.pagination.hasNextPage"
                    @click="moveToNextPage(filteredUsers.pagination.nextPage)">
                    <IconCaretRight class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>