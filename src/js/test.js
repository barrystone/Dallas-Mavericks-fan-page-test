// import Vue from 'vue';

new Vue({
        el: '#test',
        data:{
            message :'why it dose not work.',
		    textStyle : {
		        color : 'red',
		        fontWeight : 'bold',
		    },
		    //新增一個刪除線的樣式物件
		    textThrough : {
		        textDecoration : 'line-through'
		    },
        },
        mounted: function () {
            alert('hi vue!');
        },

    });


// export function init() {
//     new Vue({
//         el: '#test',
//         data: {
//             message: 'Hello, Webpack!'
//         },
//         mounted: function () {
//             alert('Mounted!');
//         }
//     });
// }