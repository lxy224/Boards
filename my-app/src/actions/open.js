// const openAction={
//     open_to_inprocess:"OPEN_TO_INPROCESS",
//     open_to_review:"OPEN_TO_REVIEW",
//     open_to_done:"OPEN_TO_DONE",
//     item:{}
// };
// export  default openAction

export const open_to_inprocess = (item) =>({
    type:"OPEN_TO_INPROCESS",
    item
});

export const open_to_review = (item) =>({
    type:"OPEN_TO_REVIEW",
    item
});

export const open_to_done = (item) =>({
    type:"OPEN_TO_DONE",
    item
});

export const moveOpenItem = (hoverItem, dragItem) =>({
    type:"MOVE_OPENITEM",
    hoverItem,
    dragItem
});

