export default class LocalStorageService {
    
    getAllRecordsByKey(key: string) {
      return JSON.parse(localStorage.getItem(key) as string) || []
    }

    addRecordByKey(array: any, record: any, key: string) {
        array.push(record)
        localStorage.setItem(`${key}`, JSON.stringify(array))
    }

    updateRecordByKey(array: any, key: string) {
        localStorage.setItem(`${key}`, JSON.stringify(array))
    }

}