export const findAndRemoveById = (array: any, id: string) => {
    const index = array.findIndex((item: any) => item.id == id)
  
    if (index !== -1) {
      const removedItem = array[index]
      array.splice(index, 1)
      return removedItem
    }
  
    return null
}

