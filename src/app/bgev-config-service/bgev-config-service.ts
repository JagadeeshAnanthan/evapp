// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
export class BgEvConfigService {
    currentTab: string = 'Search';
    constructor() { }

    setCurrentTab(activeTab: string) {
        this.currentTab = activeTab;
    }

    getCurrentTab(): string {
        return this.currentTab;
    }

    redirectToTab() {
        this.currentTab ='Login';
    }

    getMapCoords() {
        return [
            { lat: 53.06169826, lng:-0.99193897 },
{ lat: 53.86955709, lng:-3.12475226 },
{ lat: 52.96395945, lng:-1.784346 },
{ lat: 54.57994555, lng:-2.71015136 },
{ lat: 53.82501878, lng:-1.74335666 },
{ lat: 53.25943673, lng:-1.60289329 },
{ lat: 53.47639129, lng:-0.93408783 },
{ lat: 54.00071931, lng:-1.92084455 },
{ lat: 53.21030684, lng:-3.28136003 },
{ lat: 54.10100806, lng:-1.09069517 },
{ lat: 53.79463089, lng:-2.79368271 },
{ lat: 53.45652339, lng:-2.87304455 },
{ lat: 53.76173215, lng:-1.66154211 },
{ lat: 53.2720484, lng:-3.34831256 },
{ lat: 54.61759403, lng:-2.10979989 },
{ lat: 53.72085511, lng:-1.65844277 },
{ lat: 52.9654028, lng:-1.86814514 },
{ lat: 54.33614598, lng:-0.74190911 },
{ lat: 53.39276897, lng:-1.0466051 },
{ lat: 53.93042569, lng:-2.8344855 },
{ lat: 53.8906166, lng:-3.15511818 },
{ lat: 53.89683588, lng:-3.59208569 },
{ lat: 53.98491576, lng:-0.50848957 },
{ lat: 54.38204886, lng:-0.97502334 },
{ lat: 54.3415662, lng:-1.63743134 },
{ lat: 53.62461738, lng:-2.96763523 },
{ lat: 53.02379023, lng:-0.79832316 },
{ lat: 53.86714754, lng:-2.13678747 },
{ lat: 54.32857458, lng:-1.15574141 },
{ lat: 53.90127969, lng:-3.33273824 },
{ lat: 53.41957942, lng:-1.59701818 },
{ lat: 53.21330915, lng:-2.85443061 },
{ lat: 54.22438334, lng:-1.15899138 },
{ lat: 54.34590049, lng:-1.87902039 },
{ lat: 52.83286229, lng:-2.42736946 },
{ lat: 53.76092043, lng:-2.98472849 },
{ lat: 54.36250883, lng:-1.96003179 },
{ lat: 52.88639586, lng:-2.3417475 },
{ lat: 53.22081991, lng:-1.07039887 },
{ lat: 53.48546233, lng:-2.98412083 },
{ lat: 53.78491529, lng:-1.92950424 },
{ lat: 53.10064293, lng:-0.95724307 },
{ lat: 53.20301311, lng:-2.07423495 },
{ lat: 53.30060295, lng:-1.19226485 },
{ lat: 53.29079667, lng:-3.27845439 },
{ lat: 53.41940843, lng:-3.25725357 },
{ lat: 53.43843561, lng:-3.57099835 },
{ lat: 53.82919828, lng:-2.86216556 },
{ lat: 54.1802079, lng:-3.39663212 },
{ lat: 53.34933406, lng:-1.50642089 },
{ lat: 54.50671469, lng:-1.99226309 },
{ lat: 52.81068135, lng:-1.29470009 },
{ lat: 53.45658987, lng:-3.20096405 },
{ lat: 54.06676337, lng:-1.58936841 },
{ lat: 53.40866498, lng:-2.86807558 },
{ lat: 52.68326507, lng:-2.09172215 },
{ lat: 53.77801424, lng:-0.85481451 },
{ lat: 54.2567938, lng:-1.52059539 },
{ lat: 53.98790388, lng:-2.76138682 },
{ lat: 53.93879534, lng:-1.73407567 },
{ lat: 52.76555693, lng:-1.25261234 },
{ lat: 54.03609428, lng:-0.32040696 },
{ lat: 52.93091309, lng:-2.34834805 },
{ lat: 53.26577502, lng:-0.52336004 },
{ lat: 54.1065186, lng:-0.52691972 },
{ lat: 52.79405419, lng:-2.61073304 },
{ lat: 53.24454074, lng:-1.14725881 },
{ lat: 54.42675367, lng:-2.76048842 },
{ lat: 53.01185735, lng:-1.46354946 },
{ lat: 53.90983904, lng:-0.90984449 },
{ lat: 54.21634122, lng:-2.91794855 },
{ lat: 53.89539963, lng:-2.29604571 },
{ lat: 53.0190421, lng:-1.82594314 },
{ lat: 54.49356459, lng:-1.59807782 },
{ lat: 52.93774573, lng:-2.40669598 },
{ lat: 53.51201536, lng:-2.24559321 },
{ lat: 53.9743429, lng:-1.920228 },
{ lat: 53.54413022, lng:-0.62328619 },
{ lat: 53.8733773, lng:-2.59501127 },
{ lat: 53.54350953, lng:-1.08959701 },
{ lat: 53.2069656, lng:-1.88617696 },
{ lat: 53.93247853, lng:-1.56672352 },
{ lat: 53.19501783, lng:-2.44799849 },
{ lat: 54.01727635, lng:-1.52560195 },
{ lat: 54.22073539, lng:-2.5939276 },
{ lat: 53.28492023, lng:-2.6168902 },
{ lat: 53.81654959, lng:-1.08675613 },
{ lat: 53.31135315, lng:-0.68838008 },
{ lat: 54.12178007, lng:-2.77692674 },
{ lat: 54.32781955, lng:-1.58132374 },
{ lat: 54.09842439, lng:-3.11696348 },
{ lat: 53.8016859, lng:-1.69977089 },
{ lat: 52.7650922, lng:-1.49361035 },
{ lat: 53.63585554, lng:-0.3607093 },
{ lat: 53.35735887, lng:-2.58750032 },
{ lat: 52.87157675, lng:-1.56745507 },
{ lat: 53.79315169, lng:-0.23783927 },
{ lat: 53.35642057, lng:-3.28418451 },
{ lat: 53.37512142, lng:-2.23139356 },
{ lat: 53.68056183, lng:-2.27243018 },
{ lat: 51.60702974, lng:-0.29795146 },
{ lat: 51.45450651, lng:0.48734356 },
{ lat: 51.53305626, lng:-0.25202738 },
{ lat: 51.30484856, lng:0.22515914 },
{ lat: 51.40150496, lng:0.15251476 },
{ lat: 51.62632586, lng:0.14325131 },
{ lat: 51.58866926, lng:0.2488502 },
{ lat: 51.54868279, lng:0.33956588 },
{ lat: 51.63075115, lng:-0.26925467 },
{ lat: 51.52346624, lng:-0.1439768 },
{ lat: 51.34108217, lng:-0.08312706 },
{ lat: 51.34740133, lng:0.50080426 },
{ lat: 51.73322671, lng:0.37589982 },
{ lat: 51.57823859, lng:-0.21348946 },
{ lat: 51.39736629, lng:0.28188985 },
{ lat: 51.45598205, lng:-0.18525437 },
{ lat: 51.43823911, lng:-0.12374748 },
{ lat: 51.42114238, lng:0.02893481 },
{ lat: 51.7242668, lng:0.42455205 },
{ lat: 51.2802502, lng:0.23028663 },
{ lat: 51.55407713, lng:0.41961522 },
{ lat: 51.52617648, lng:0.12637559 },
{ lat: 51.6282626, lng:-0.23946458 },
{ lat: 51.3706142, lng:0.08172916 },
{ lat: 51.32006315, lng:0.44908127 },
{ lat: 51.32384221, lng:0.45148936 },
{ lat: 51.55889648, lng:0.1870882 },
{ lat: 51.64096376, lng:-0.09319918 },
{ lat: 51.53127722, lng:-0.03673269 },
{ lat: 51.64154874, lng:-0.13662656 },
{ lat: 51.26285733, lng:0.36752611 },
{ lat: 51.32843404, lng:-0.01440872 },
{ lat: 51.4462599, lng:0.28890598 },
{ lat: 51.63213331, lng:0.01140696 },
{ lat: 51.46354643, lng:0.57852969 },
{ lat: 51.56814228, lng:0.48934447 },
{ lat: 51.7073841, lng:0.37636898 },
{ lat: 51.34903432, lng:0.02690501 },
{ lat: 51.22626464, lng:0.12353021 },
{ lat: 51.2723938, lng:0.17867274 },
{ lat: 51.40919939, lng:-0.0327857 },
{ lat: 51.63603502, lng:-0.19281544 },
{ lat: 51.57204499, lng:0.26729716 },
{ lat: 51.48129887, lng:-0.009125 },
{ lat: 51.44584356, lng:0.45454118 },
{ lat: 51.65682178, lng:0.43890938 },
{ lat: 51.5805537, lng:0.4580612 },
{ lat: 51.5766569, lng:0.56165048 },
{ lat: 51.73924882, lng:-0.0055018 },
{ lat: 51.29996455, lng:0.39644975 },
{ lat: 51.45213257, lng:0.34478679 },
{ lat: 51.40682478, lng:0.14439548 },
{ lat: 51.44451952, lng:0.51386745 },
{ lat: 51.54019534, lng:0.49347105 },
{ lat: 51.3023062, lng:0.00460616 },
{ lat: 51.65678146, lng:-0.22329409 },
{ lat: 51.54661014, lng:0.13617872 },
{ lat: 51.72746755, lng:0.3756638 },
{ lat: 51.62838728, lng:-0.15834298 },
{ lat: 51.72825649, lng:0.39653628 },
{ lat: 51.49839507, lng:-0.19568882 },
{ lat: 51.27920953, lng:0.07046772 },
{ lat: 51.52014031, lng:0.05414025 },
{ lat: 51.49074576, lng:0.19702863 },
{ lat: 51.63881136, lng:-0.12657238 },
{ lat: 51.55941487, lng:0.0839873 },
{ lat: 51.37891086, lng:0.3875843 },
{ lat: 51.61973329, lng:0.30916544 },
{ lat: 51.31869061, lng:0.16125046 },
{ lat: 51.36995182, lng:0.40360473 },
{ lat: 51.44258111, lng:0.35808504 },
{ lat: 51.34618165, lng:0.41317994 },
{ lat: 51.27785341, lng:0.08090712 },
{ lat: 51.37510114, lng:-0.10221284 },
{ lat: 51.42368703, lng:0.04732958 },
{ lat: 51.47994262, lng:-0.20247103 },
{ lat: 51.49742305, lng:-0.29107997 },
{ lat: 51.78410323, lng:0.11030842 },
{ lat: 51.48731513, lng:0.13837682 },
{ lat: 51.48571493, lng:0.03117687 },
{ lat: 51.62081963, lng:0.3976256 },
{ lat: 51.44394687, lng:-0.27614439 },
{ lat: 51.44968794, lng:0.34670919 },
{ lat: 51.64286668, lng:-0.20642182 },
{ lat: 51.3346416, lng:0.25426106 },
{ lat: 51.69849348, lng:0.01100096 },
{ lat: 51.47166258, lng:-0.06847511 },
{ lat: 51.31968335, lng:-0.22334214 },
{ lat: 51.75675926, lng:0.27844005 },
{ lat: 51.689151, lng:0.25724999 },
{ lat: 51.59330881, lng:0.19613884 },
{ lat: 51.37084467, lng:-0.27780601 },
{ lat: 51.62328602, lng:0.12716853 },
{ lat: 51.23352499, lng:0.25913112 },
{ lat: 51.33026961, lng:0.27955179 },
{ lat: 51.53494944, lng:-0.01238944 },
{ lat: 51.62817817, lng:0.36879617 },
{ lat: 51.40400207, lng:0.02090715 },
{ lat: 51.23235469, lng:0.05334114 },
{ lat: 51.66820963, lng:-0.10814887 }
        ]
        return [
            {
                lat: 53.72276692,
                lng: -1.98154519
            }, {
                lat: 53.66020867,
                lng: -2.01415484
            }, {
                lat: 53.7330398,
                lng: -1.85292662
            }, {
                lat: 53.68959082,
                lng: -1.97610594
            }, {
                lat: 53.69813031,
                lng: -1.96372607
            }, {
                lat: 53.6732811,
                lng: -1.86791535
            }, {
                lat: 53.70995137,
                lng: -1.97456641
            }, {
                lat: 53.71917926,
                lng: -1.86976689
            }, {
                lat: 53.66588886,
                lng: -1.97643098
            }, {
                lat: 53.70645388,
                lng: -2.01258805
            }
        ]
    }

    /* getAvailableAmenities() {
        let availableAmenities = [{"icon_name":"Store","icon":"shopping_cart"},{"icon_name":"Cafe","icon":"local_cafe"},{"icon_name":"Hospital","icon":"local_hospital"},{"icon_name":"Restaurant","icon":"local_dining"},{"icon_name":"Parking","icon":"local_parking"},{"icon_name":"Rest Room","icon":"wc"},{"icon_name":"Children Area","icon":"child_care"},{"icon_name":"Car Wash","icon":"local_car_wash"},{"icon_name":"Car Service","icon":"build"},{"icon_name":"ATM","icon":"atm"}];
        return availableAmenities.slice(0, Math.floor(Math.random() * availableAmenities.length));
    } */

    getAvailableAmenities() {
        let availableAmenities = [{"icon_name":"Disabled friendly","icon":"accessible_forward"},{"icon_name":"Medical aid","icon":"local_hospital"},{"icon_name":"ATM","icon":"atm"},{"icon_name":"Parking","icon":"local_parking"},{"icon_name":"Rest Room","icon":"wc"},{"icon_name":"Membership","icon":"credit_card"},{"icon_name":"24x7","icon":"watch_later"},{"icon_name":"Car Service","icon":"build"}];
        return availableAmenities.slice(0, Math.floor((Math.random()*0.7 + 0.4) * availableAmenities.length));
    }

}