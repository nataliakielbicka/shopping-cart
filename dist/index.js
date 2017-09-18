'use strict';

var apiURL = 'https://api.myjson.com/bins/1etx1x';

Vue.filter('addCurrency', function (val) {
    return val.toFixed(2) + ' $';
});

Vue.component('shopping-cart', {
    props: ['items'],
    computed: {
        total: function total() {
            var total = 0;
            this.items.forEach(function (item) {
                total += item.price * item.quantity;
            });
            return total;
        }
    },
    methods: {
        removeItem: function removeItem(index) {
            this.items.splice(index, 1);
        },

        addOne: function addOne(item) {
            item.quantity++;
        },
        subtractOne: function subtractOne(item) {
            item.quantity--;
        }
    }
});

var vm = new Vue({
    el: '#shop',
    data: {
        cartItems: [],
        items: [],
        addToCartBtn: 'Add to cart',
        showCart: false,
        isInCart: 'In cart',
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
        },

        toggleCart: function toggleCart() {
            this.showCart = !this.showCart;
        },
        addToCart: function addToCart(itemToAdd) {
            var found = false;
            this.showCart = true;
            this.cartItems.map(function (item) {
                if (item.id === itemToAdd.id) {
                    found = true;
                    item.quantity += itemToAdd.quantity;
                }
            });
            if (found === false) {
                this.cartItems.push(Vue.util.extend({}, itemToAdd));
            }
            itemToAdd.quantity = 1;
        },
        itemInCart: function itemInCart(_itemInCart) {
            var inCart = false;
            this.cartItems.forEach(function (item) {
                if (item.id === _itemInCart.id) {
                    inCart = true;
                }
            });
            if (inCart === false) {
                return this.isInCart;
            }
        }
    }
});