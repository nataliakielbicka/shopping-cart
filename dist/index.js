'use strict';

var apiURL = 'https://api.myjson.com/bins/1etx1x';

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