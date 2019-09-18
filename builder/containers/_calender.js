import * as dotProp from './_dotProp';

const moment = require('moment');
const startWeek = moment().startOf('month').week();
const endWeek = moment().endOf('month').week();


let calendar = []
for(var week = startWeek; week<endWeek;week++){
  calendar.push({
    week:week,
    days:Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
  })
}

function propToArray(prop) {
	return prop.split('.').reduce(function (ret, el, index, list) {
		var last = index > 0 && list[index - 1];
		if (last && /(?:^|[^\\])\\$/.test(last)) {
			ret.pop();
			ret.push(last.slice(0, -1) + '.' + el);
		} else {
			ret.push(el);
		}
		return ret;
	}, []);
}

const pathToArray = (path) => {

  let collect = path.split('.');

  return collect.map(value=>{
          //check for numeric
          if(/^\d+$/.test(value)){
            return Number.parseInt(value);
          }else{
            return value;
          }
        });

}

const doSet = (obj, path, value={}) => {
    
  var pathArray = Array.isArray(path) ? path : pathToArray(path);

  //var current = [];

  var collection = Object.assign({}, obj);

  var count = pathArray.length;
  var last = pathArray[count - 1];
  var ref = {};

  //console.log({pathArray, count, last});

  for(let i=0; i<count; i++){
    //const def = Number.isInteger(key) ? [] : {};
    //console.log([].fill("*",i))
    let key = pathArray[i];
    //let prev = i>-1 ? pathArray[i-1] : '';

    let next = i<(count-1) ? pathArray[i+1] : '';

    console.log("working on key: ", key)

    if(collection[key]){
      console.log(`Has [${key}]`, collection[key])
      //collection = Object.assign({}, collection[key]);
      //collection = collection[key];
      ref = collection[key];
    }else{
      if(Number.isInteger(next)){
        // if index is a number it is assigned as an arrya
      console.log(`next [${next}]`)
      ref[key] = [];
      }else{
        collection[key] = {};
      }
      ref = collection[key];
      console.log(`missing [${key}]=`, collection[key])      
      //collection = collection[key];

    }

    if(key === last){
      console.log(`final [${key}]`, value)
      ref[key] = value;
    }
  }

      return collection;

}

export {doSet};

export default {calendar, startWeek, endWeek};