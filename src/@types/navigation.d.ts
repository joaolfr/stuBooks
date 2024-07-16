export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined
      booksList: {
        inputKeyword: string
        books: []
        isISBNString: boolean
      }
      bookDetails: {
        bookInfo: object
      }
      favorites: undefined
      readingList: undefined
    }
  }
}
