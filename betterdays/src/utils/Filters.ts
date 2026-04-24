import { useTasks } from "../services/databaseManager";
import { isSameDay } from "../services/dateVerify";

export function filters(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {tasks, saveTask} = useTasks();
    const unfilter = async () => {
        tasks.map((item) => saveTask(item.id, {...item, filterNum: 0}))
    };
    const filterByStart = async (toggle : number, date: Date) => {
        tasks.map((item) => (isSameDay(item.start,date)) ? // if match
        saveTask(item.id, item): // do not filter it out
        saveTask(item.id, {...item, filterNum: item.filterNum + toggle}) // add one to the filter count or remove one
        ) // 
    };
    const filterByEnd = async (toggle : number, date: Date) => {
        tasks.map((item) => (isSameDay(item.end,date)) ? // if match
        saveTask(item.id, item): // do not filter it out
        saveTask(item.id, {...item, filterNum: item.filterNum + toggle}) // add one to the filter count or remove one
        ) // 
    };
    const filterByTag  = async (toggle : number, tag: string) => {
        tasks.map((item) => (item.tags.includes(tag)) ? // if match
        saveTask(item.id, item): // do not filter it out
        saveTask(item.id, {...item, filterNum: item.filterNum + toggle}) // add one to the filter count or remove one
        ) 

    };
  return {
    unfilter,
    filterByStart,
    filterByEnd,
    filterByTag
  };
};