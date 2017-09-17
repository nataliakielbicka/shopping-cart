'use strict';

var apiURL = 'https://api.myjson.com/bins/1etx1x';

Vue.filter("addCurrency", function (val) {
    return val.toFixed(2) + ' $';
});

var vm = new Vue({
    el: '#shop',
    data: {
        items: [],
        addToCartBtn: "Add to cart"
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
        }
    }
});