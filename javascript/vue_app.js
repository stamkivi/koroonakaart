
/**
 * Add constants for overview statistics
 */
var overview_confirmed = 171;
var overview_active = 170;
var overview_in_treatment = 2;
var overview_deaths = 0;
var overview_recovered = 1;
var overview_tests_done = 1133;

var current_place_name = 'Eesti';
var current_place_confirmed = 171;
var current_place_active = 170;
var current_place_in_treatment = 2;
var current_place_deaths = 0;
var current_place_recovered = 1;
var current_place_population = 1317762;
var zoomLevel = 'county';
// TODO: Is there a way we can import this data without jQuery? Then we could drop jQuery.
var json = $.getJSON({'url': "/koroonakaart/data/topojson/population.json", 'async': false});


// Initialize Vue app
const vue_app = new Vue({
    el: '#content',
    data: {
        overview_confirmed: overview_confirmed.toLocaleString('et'),
        overview_active: overview_active.toLocaleString('et'),
        overview_in_treatment: overview_in_treatment.toLocaleString('et'),
        overview_deaths: overview_deaths.toLocaleString('et'),
        overview_recovered: overview_recovered.toLocaleString('et'),
        overview_tests_done: overview_tests_done.toLocaleString('et'),
        current_place_name: current_place_name,
        current_place_confirmed: current_place_confirmed.toLocaleString('et'),
        current_place_active: current_place_active.toLocaleString('et'),
        current_place_in_treatment: current_place_in_treatment.toLocaleString('et'),
        current_place_deaths: current_place_deaths.toLocaleString('et'),
        current_place_recovered: current_place_recovered.toLocaleString('et'),
        current_place_population: current_place_population.toLocaleString('et'),
        zoomLevel: zoomLevel
    },
    methods: {
        changeMap() {
            console.log(this.zoomLevel)
            var elements = document.getElementsByTagName('path');
            while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
            if (this.zoomLevel === "country") {
                drawCounties();
            }
            if (this.zoomLevel === "county") {
                drawCounties();
            }
            if (this.zoomLevel === "municipality") {
                drawMunicipalities();
            }
        },
    },
    computed: {
        current_place_confirmed_percent() {
            const population_by_place = {
                'Eesti': 1328000,
                'Harju maakond': 163497,
                'Hiiu maakond': 9387,
                'Ida-Viru maakond': 76519,
                'Jõgeva maakond': 28734,
                'Järva maakond': 30286,
                'Lääne maakond': 20507,
                'Lääne-Viru maakond': 59325,
                'Põlva maakond': 25006,
                'Pärnu maakond': 85938,
                'Rapla maakond': 33311,
                'Saare maakond': 33108,
                'Tartu maakond': 152977,
                'Valga maakond': 2837,
                'Viljandi maakond': 46371,
                'Võru maakond': 35782
            }
            // console.log('population_by_place: ' + population_by_place);
            // console.log('this.current_place_confirmed: ' + this.current_place_confirmed);
            // console.log('this.current_place_name: ' + this.current_place_name);
            let confirmed_percent;
            confirmed_percent = (Math.round(this.current_place_confirmed / population_by_place[this.current_place_name] * 100000) / 100000).toFixed(5);
            // console.log('confirmed_percent: ' + confirmed_percent);
            // console.log('');
            // if (this.current_place_name = 'Eesti') {
            //     confirmed_percent = (Math.round(this.current_place_confirmed / population_by_place[this.current_place_name] * 100) / 100).toFixed(5);
            // } else {
            //     confirmed_percent = (Math.round(this.current_place_confirmed / population_by_place[this.current_place_name] * 100) / 100).toFixed(2);
            // }
            return confirmed_percent;
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            // console.log(json);

            console.log("In mounted hook.", this);
        });
    }
});
