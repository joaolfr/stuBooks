export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined
      booksList: {
        inputKeyword: string
        books: []
        isISBNString: boolean
      }
      details: {
        bookInfo: object
      }
    }
  }
}
