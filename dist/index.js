'use strict';

var apiURL = 'https://api.myjson.com/bins/1etx1x';

Vue.filter("addCurrency", function (val) {
    return val.toFixed(2) + ' $';
});

var vm = new Vue({
    el: '#shop',
    data: {
        items: [],
        addToCartBtn: "Add to cart",
        sortType: 'sort',
        sortOptions: [{ text: 'sort by', value: 'sort' }, { text: 'name', value: 'name' }, { text: 'price', value: 'price' }]
    },
    created: function created() {
        this.fetchData();
    },
    methods: {
        fetchData: function fetchData() {
            var self = this;
            $.get(apiURL, function (data) {
                self.items = data;
            });
        },
        sortBy: function sortBy(sortKey) {
            this.items.sort(function (a, b) {
                return typeof a[sortKey] === 'string' || typeof b[sortKey] === 'string' ? a[sortKey].localeCompare(b[sortKey]) : a[sortKey] - b[sortKey];
            });
        }
    }
});