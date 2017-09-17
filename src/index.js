const apiURL = 'https://api.myjson.com/bins/1etx1x';

Vue.filter("addCurrency", val => val.toFixed(2) + ' $');

const vm = new Vue({
    el: '#shop',
    data: {
        items: [],
        addToCartBtn: "Add to cart",
        sortType: 'sort',
        sortOptions: [
            { text: 'sort by', value: 'sort' },
            { text: 'name', value: 'name' },
            { text: 'price', value: 'price' }
        ]
    },
    created: function() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            const self = this;
            $.get(apiURL, data => {
                self.items = data;
            });
        },
        sortBy(sortKey) {
            this.items.sort((a, b) =>
                (typeof a[sortKey] === 'string' || typeof b[sortKey] === 'string') ? a[sortKey].localeCompare(b[sortKey]) : a[sortKey] - b[sortKey]);
        }
    }
})