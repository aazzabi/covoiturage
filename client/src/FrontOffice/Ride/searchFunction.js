import Moment from "moment";

export default function searchRide(items, filter, filter2, filter3, filterBy, FilterByArrival, FilterStartTime) {
    var array=[];

    if (!items) return null;
    if (!filter || !filterBy || !items[0].hasOwnProperty(filterBy) || !filter.trim()) return items;

    for (const item of items) {

        if (item[filterBy].toString().toLowerCase().startsWith(filter.toString().toLowerCase()) && item[FilterByArrival].toString().toLowerCase().startsWith(filter2.toString().toLowerCase()) && Moment(item[FilterStartTime]).format('D/M/Y')===Moment(filter3).format('D/M/Y')) {

            array.push(item)
        }
    }
    console.log(array)
return  array
    //return items.filter(element => element[filterBy].toString().toLowerCase().startsWith(filter.toString().toLowerCase()), element => element[FilterByArrival].toString().toLowerCase().startsWith(filter2.toString().toLowerCase()));
}
