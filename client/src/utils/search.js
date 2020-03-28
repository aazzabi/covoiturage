export default function search (items, filter,filter2, filterBy,FilterByArrival) {
    if (!items) return null;
    if (!filter || !filterBy || !items[0].hasOwnProperty(filterBy) || !filter.trim()|| !FilterByArrival|| !filter2) return items;

    return items.filter(element => element[filterBy].toString().toLowerCase().startsWith(filter.toString().toLowerCase()),element => element[FilterByArrival].toString().toLowerCase().startsWith(filter2.toString().toLowerCase()));
}
