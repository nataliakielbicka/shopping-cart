const apiURL = 'https://api.myjson.com/bins/1etx1x';

Vue.filter("addCurrency", val => val.toFixed(2) + ' $');

Vue.component('shopping-cart', {
    props: ['items'],
    computed: {
        total: function() {
            let total = 0;
            this.items.forEach(item => {
                total += (item.price * item.quantity);
            });
            return total;
        }
    },
    methods: {
        removeItem(index) {
            this.items.splice(index, 1)
        },
        addOne: item => {
            item.quantity++;
        },
        subtractOne: item => {
            item.quantity--;
        }
    }
})

const vm = new Vue({
    el: '#shop',
    data: {
        cartItems: [],
        items: [],
        addToCartBtn: "Add to cart",
        showCart: false,
        isInCart: 'In cart',
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
        },
        toggleCart: function() {
            this.showCart = !this.showCart;
        },
        addToCart(itemToAdd) {
            let found = false;
            this.cartItems.forEach(item => {
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
        itemInCart(itemInCart) {
            let inCart = false;
            this.cartItems.forEach(item => {
                if (item.id === itemInCart.id) {
                    inCart = true;
                }
            });
            if (inCart === false) {
                return this.isInCart;
            }
        }
    }
})