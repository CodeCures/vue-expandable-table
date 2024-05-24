import { defineStore } from "pinia";
import { computed, ref } from "vue";
import usersData from '../data/users.json'
import { paginate } from "paginate-arrays-js";
import { useLocalStorage } from "@vueuse/core";

export const useUserStore = defineStore('user-store', () => {
    const users = useLocalStorage('user-store', usersData);
    const status = ref('all');
    const search = ref('');
    const userIndex = ref();

    const sortParam = ref('default');

    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    const sortusers = (users, key) => {
        if (key === 'default') return users;

        return users.slice().sort((a, b) => {
            const valueA = a[key].toLowerCase();
            const valueB = b[key].toLowerCase();
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
        })
    }



    const filterByPaymentStatus = (users, status) => {
        if (status === 'all') {
            return users;
        }
        return users.filter(
            user => user.payment_status.toLowerCase() === status.toLowerCase()
                || user.status.toLowerCase() === status.toLowerCase()
        );
    };

    const filterBySearchString = (users, searchString) => {
        const lowerSearchString = searchString.toLowerCase();
        return users.filter(user =>
            user.name.toLowerCase().includes(lowerSearchString) ||
            user.email.toLowerCase().includes(lowerSearchString) ||
            user.payment_date.toLowerCase().includes(lowerSearchString)
        );
    };

    const filteredUsers = computed(() => {
        if (users.value.length === 0) {
            return [];
        }

        let userArray = filterByPaymentStatus(users.value, status.value);
        userArray = filterBySearchString(userArray, search.value);
        userArray = sortusers(userArray, sortParam.value)

        return paginate({
            data: userArray,
            page: currentPage.value,
            perPage: itemsPerPage.value,
            url: '/'
        });
    });

    const totalAmountPayable = computed(() => {
        const total = users.value
            .filter(user => user.payment_status !== 'Paid')
            .reduce((total, user) => total + user.amount_paid, 0);

        return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    })

    const setStatus = (value) => status.value = value;
    const setItemsPerPage = (count) => itemsPerPage.value = count;
    const setCurrentPage = (pageNumber) => currentPage.value = pageNumber;
    const updatePayment = (userIds, status) => {
        users.value.forEach(user => {
            if (userIds.includes(user.id)) user.payment_status = status;
        })
    }

    return {
        users,
        status,
        search,
        userIndex,
        sortParam,
        currentPage,
        itemsPerPage,
        filteredUsers,
        totalAmountPayable,
        updatePayment,
        setCurrentPage,
        setItemsPerPage,
        setStatus,
    }
})