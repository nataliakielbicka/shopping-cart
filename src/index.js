const apiURL = 'https://api.myjson.com/bins/1etx1x';

Vue.filter("addCurrency", val => val.toFixed(2) + ' $');

const vm = new Vue({
    el: '#shop',
    data: {
        items: [],
        addToCartBtn: "Add to cart",
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
    }
})