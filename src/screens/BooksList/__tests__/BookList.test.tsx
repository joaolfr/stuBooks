import { waitFor } from '@testing-library/react-native'
import { render } from '@utils/test-utils'

import { BooksList } from '..'
import { BooksListParams } from '..'

describe(BooksList, () => {
  it('should render correctly', async () => {
    const mockedNavigate = jest.fn()
    const mockedGoBack = jest.fn()
    const mockedPush = jest.fn()

    jest.mock('@react-navigation/native', () => {
      const actualNav = jest.requireActual('@react-navigation/native')
      return {
        ...actualNav,
        useNavigation: () => ({
          navigate: mockedNavigate,
          dispatch: jest.fn(),
          goBack: mockedGoBack,
          push: mockedPush,
        }),
        useRoute: jest.fn(),
      }
    })
    const params = {
      inputKeywords: 'React',
      books: mockBooks,
      isISBNString: false,
    }
    const { queryByText } = render(<BooksList route={{ params }} />)
    await waitFor(() => {
      const test = queryByText('Pro React 16')
      expect(test).toBeDefined()
    })
  })
})

export const mockBooks = [
  {
    kind: 'books#volume',
    id: 'SM2NDwAAQBAJ',
    etag: 'A3Zm4tLS58E',
    selfLink: 'https://www.googleapis.com/books/v1/volumes/SM2NDwAAQBAJ',
    volumeInfo: {
      title: 'Pro React 16',
      authors: ['Adam Freeman'],
      publisher: 'Apress',
      publishedDate: '2019-03-19',
      description:
        'Use the enormously popular React framework to build dynamic JavaScript applications that take advantage of the capabilities of modern browsers and devices. You will learn how React brings the power of strong architecture and responsive data to the client, providing the foundation for complex and rich user interfaces. Best-selling author Adam Freeman explains how to get the most from React. He begins by describing the React architecture and the benefits it offers and then shows you how to use React and its associated tools and libraries in your projects, starting from the nuts and bolts and building up to the most advanced and sophisticated features, going in-depth to give you the knowledge you need. Each topic is presented clearly and concisely. Chapters include common problems and how to avoid them. What You’ll Learn Gain a solid understanding of the React design Create rich and dynamic web app clients using React Create data stores using Redux Consume data using REST and GraphQLTest your React projects Who This Book Is For JavaScript developers who want to use React to create dynamic client-side applications',
      industryIdentifiers: [
        {
          type: 'ISBN_13',
          identifier: '9781484244517',
        },
        {
          type: 'ISBN_10',
          identifier: '1484244516',
        },
      ],
      readingModes: {
        text: true,
        image: true,
      },
      pageCount: 750,
      printType: 'BOOK',
      categories: ['Computers'],
      maturityRating: 'NOT_MATURE',
      allowAnonLogging: true,
      contentVersion: '1.1.1.0.preview.3',
      panelizationSummary: {
        containsEpubBubbles: false,
        containsImageBubbles: false,
      },
      imageLinks: {
        smallThumbnail:
          'http://books.google.com/books/content?id=SM2NDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        thumbnail:
          'http://books.google.com/books/content?id=SM2NDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      language: 'en',
      previewLink:
        'http://books.google.com.br/books?id=SM2NDwAAQBAJ&printsec=frontcover&dq=React&hl=&cd=9&source=gbs_api',
      infoLink:
        'http://books.google.com.br/books?id=SM2NDwAAQBAJ&dq=React&hl=&source=gbs_api',
      canonicalVolumeLink:
        'https://books.google.com/books/about/Pro_React_16.html?hl=&id=SM2NDwAAQBAJ',
    },
    saleInfo: {
      country: 'BR',
      saleability: 'NOT_FOR_SALE',
      isEbook: false,
    },
    accessInfo: {
      country: 'BR',
      viewability: 'PARTIAL',
      embeddable: true,
      publicDomain: false,
      textToSpeechPermission: 'ALLOWED',
      epub: {
        isAvailable: true,
        acsTokenLink:
          'http://books.google.com.br/books/download/Pro_React_16-sample-epub.acsm?id=SM2NDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
      },
      pdf: {
        isAvailable: true,
        acsTokenLink:
          'http://books.google.com.br/books/download/Pro_React_16-sample-pdf.acsm?id=SM2NDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
      },
      webReaderLink:
        'http://play.google.com/books/reader?id=SM2NDwAAQBAJ&hl=&source=gbs_api',
      accessViewStatus: 'SAMPLE',
      quoteSharingAllowed: false,
    },
    searchInfo: {
      textSnippet:
        'What You’ll Learn Gain a solid understanding of the React design Create rich and dynamic web app clients using React Create data stores using Redux Consume data using REST and GraphQLTest your React projects Who This Book Is For ...',
    },
  },
  {
    kind: 'books#volume',
    id: '7KVYDwAAQBAJ',
    etag: 'h0fTsEzsnTE',
    selfLink: 'https://www.googleapis.com/books/v1/volumes/7KVYDwAAQBAJ',
    volumeInfo: {
      title: 'Learning React',
      subtitle:
        'A Hands-On Guide to Building Web Applications Using React and Redux',
      authors: ['Kirupa Chinnathambi'],
      publisher: 'Addison-Wesley Professional',
      publishedDate: '2018-04-26',
      description:
        'Learning React A hands-on guide to building web applications using React and Redux As far as new web frameworks and libraries go, React is quite the runaway success. It not only deals with the most common problems developers face when building complex apps, it throws in a few additional tricks that make building the visuals for such apps much, much easier. What React isn’t, though, is beginner-friendly and approachable. Until now. In Learning React, author Kirupa Chinnathambi brings his fresh, clear, and very personable writing style to help web developers new to React understand its fundamentals and how to use it to build really performant (and awesome) apps. The only book on the market that helps you get your first React app up and running in just minutes, Learning Reactis chock-full of colorful illustrations to help you visualize difficult concepts and practical step-by-step examples to show you how to apply what you learn. Build your first React app Create components to define parts of your UI Combine components into other components to build more complex UIs Use JSX to specify visuals without writing full-fledged JavaScript Deal with maintaining state Work with React’s way of styling content Make sense of the mysterious component lifecycle Build multi-page apps using routing and views Optimize your React workflow using tools such as Node, Babel, webpack, and others Use Redux to make managing your app data and state easy Contents at a Glance 1 Introducing React 2 Building Your First React App 3 Components in React 4 Styling in React 5 Creating Complex Components 6 Transferring Properties 7 Meet JSX... Again! 8 Dealing with State in React 9 Going from Data to UI in React 10 Events in React 11 The Component Lifecycle 12 Accessing DOM Elements in React 13 Setting Up Your React Dev Environment 14 Working with External Data in React 15 Building an Awesome Todo List App in React 16 Creating a Sliding Menu in React 17 Avoiding Unnecessary Renders in React 18 Creating a Single-Page App in React Using React Router 19 Introduction to Redux 20 Using Redux with React',
      industryIdentifiers: [
        {
          type: 'ISBN_13',
          identifier: '9780134843575',
        },
        {
          type: 'ISBN_10',
          identifier: '0134843576',
        },
      ],
      readingModes: {
        text: true,
        image: true,
      },
      pageCount: 747,
      printType: 'BOOK',
      categories: ['Computers'],
      maturityRating: 'NOT_MATURE',
      allowAnonLogging: true,
      contentVersion: '1.7.7.0.preview.3',
      panelizationSummary: {
        containsEpubBubbles: false,
        containsImageBubbles: false,
      },
      imageLinks: {
        smallThumbnail:
          'http://books.google.com/books/content?id=7KVYDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        thumbnail:
          'http://books.google.com/books/content?id=7KVYDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      language: 'en',
      previewLink:
        'http://books.google.com.br/books?id=7KVYDwAAQBAJ&printsec=frontcover&dq=React&hl=&cd=10&source=gbs_api',
      infoLink:
        'https://play.google.com/store/books/details?id=7KVYDwAAQBAJ&source=gbs_api',
      canonicalVolumeLink:
        'https://play.google.com/store/books/details?id=7KVYDwAAQBAJ',
    },
    saleInfo: {
      country: 'BR',
      saleability: 'FOR_SALE',
      isEbook: true,
      listPrice: {
        amount: 131.46,
        currencyCode: 'BRL',
      },
      retailPrice: {
        amount: 131.46,
        currencyCode: 'BRL',
      },
      buyLink:
        'https://play.google.com/store/books/details?id=7KVYDwAAQBAJ&rdid=book-7KVYDwAAQBAJ&rdot=1&source=gbs_api',
      offers: [
        {
          finskyOfferType: 1,
          listPrice: {
            amountInMicros: 131460000,
            currencyCode: 'BRL',
          },
          retailPrice: {
            amountInMicros: 131460000,
            currencyCode: 'BRL',
          },
          giftable: true,
        },
      ],
    },
    accessInfo: {
      country: 'BR',
      viewability: 'PARTIAL',
      embeddable: true,
      publicDomain: false,
      textToSpeechPermission: 'ALLOWED_FOR_ACCESSIBILITY',
      epub: {
        isAvailable: true,
        acsTokenLink:
          'http://books.google.com.br/books/download/Learning_React-sample-epub.acsm?id=7KVYDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
      },
      pdf: {
        isAvailable: true,
        acsTokenLink:
          'http://books.google.com.br/books/download/Learning_React-sample-pdf.acsm?id=7KVYDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
      },
      webReaderLink:
        'http://play.google.com/books/reader?id=7KVYDwAAQBAJ&hl=&source=gbs_api',
      accessViewStatus: 'SAMPLE',
      quoteSharingAllowed: false,
    },
    searchInfo: {
      textSnippet:
        'The only book on the market that helps you get your first React app up and running in just minutes, Learning Reactis chock-full of colorful illustrations to help you visualize difficult concepts and practical step-by-step examples to show ...',
    },
  },
  {
    kind: 'books#volume',
    id: '_TgzEAAAQBAJ',
    etag: 'RpYiX6CjUVE',
    selfLink: 'https://www.googleapis.com/books/v1/volumes/_TgzEAAAQBAJ',
    volumeInfo: {
      title: 'React Quickly',
      subtitle: 'Painless web apps with React, JSX, Redux, and GraphQL',
      authors: ['Azat Mardan'],
      publisher: 'Simon and Schuster',
      publishedDate: '2017-08-20',
      description:
        "Summary React Quickly is for anyone who wants to learn React.js fast. This hands-on book teaches you the concepts you need with lots of examples, tutorials, and a large main project that gets built throughout the book. Purchase of the print book includes a free eBook in PDF, Kindle, and ePub formats from Manning Publications. About the Technology Successful user interfaces need to be visually interesting, fast, and flowing. The React.js JavaScript library supercharges view-heavy web applications by improving data flow between UI components. React sites update visual elements efficiently and smoothly, minimizing page reloads. React is developer friendly, with a strong ecosystem to support the dev process along the full application stack. And because it's all JavaScript, React is instantly familiar. About the Book React Quickly is the tutorial for web developers who want to get started fast with React.js. Following carefully chosen and clearly explained examples, you'll learn React development using your existing JavaScript and web dev skills. You'll explore a host of different projects as you learn about web components, forms, and data. What's Inside Master React fundamentals Build full web apps with data and routing Test components Optimize React apps About the Reader This book is for developers comfortable building web applications with JavaScript. About the Author Azat Mardan is a Tech Fellow at Capital One with extensive experience using and teaching JavaScript and Node, and author of several books on JavaScript, Node, React, and Express. Table of Contens PART 1 - REACT FOUNDATION Meeting React Baby steps with React Introduction to JSX Making React interactive with states React component lifecycle events Handling events in React Working with forms in React Scaling React components Project: Menu component Project: Tooltip component Project: Timer component PART 2 - REACT ARCHITECTURE The Webpack build tool React routing Working with data using Redux Working with data using GraphQL Unit testing React with Jest React on Node and Universal JavaScript Project: Building a bookstore with React Router Project: Checking passwords with Jest Project: Implementing autocomplete with Jest, Express, and MongoDB APPENDIXES Appendix A - Installing applications used in this book Appendix B - React cheatsheet Appendix C - Express.js cheatsheet Appendix D - MongoDB and Mongoose cheatsheet Appendix E - ES6 for success",
      industryIdentifiers: [
        {
          type: 'ISBN_13',
          identifier: '9781638353966',
        },
        {
          type: 'ISBN_10',
          identifier: '1638353964',
        },
      ],
      readingModes: {
        text: true,
        image: false,
      },
      pageCount: 794,
      printType: 'BOOK',
      categories: ['Computers'],
      maturityRating: 'NOT_MATURE',
      allowAnonLogging: false,
      contentVersion: '1.1.1.0.preview.2',
      panelizationSummary: {
        containsEpubBubbles: false,
        containsImageBubbles: false,
      },
      imageLinks: {
        smallThumbnail:
          'http://books.google.com/books/content?id=_TgzEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        thumbnail:
          'http://books.google.com/books/content?id=_TgzEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      language: 'en',
      previewLink:
        'http://books.google.com.br/books?id=_TgzEAAAQBAJ&printsec=frontcover&dq=React&hl=&cd=11&source=gbs_api',
      infoLink:
        'https://play.google.com/store/books/details?id=_TgzEAAAQBAJ&source=gbs_api',
      canonicalVolumeLink:
        'https://play.google.com/store/books/details?id=_TgzEAAAQBAJ',
    },
    saleInfo: {
      country: 'BR',
      saleability: 'FOR_SALE',
      isEbook: true,
      listPrice: {
        amount: 214.45,
        currencyCode: 'BRL',
      },
      retailPrice: {
        amount: 214.45,
        currencyCode: 'BRL',
      },
      buyLink:
        'https://play.google.com/store/books/details?id=_TgzEAAAQBAJ&rdid=book-_TgzEAAAQBAJ&rdot=1&source=gbs_api',
      offers: [
        {
          finskyOfferType: 1,
          listPrice: {
            amountInMicros: 214450000,
            currencyCode: 'BRL',
          },
          retailPrice: {
            amountInMicros: 214450000,
            currencyCode: 'BRL',
          },
          giftable: true,
        },
      ],
    },
    accessInfo: {
      country: 'BR',
      viewability: 'PARTIAL',
      embeddable: true,
      publicDomain: false,
      textToSpeechPermission: 'ALLOWED_FOR_ACCESSIBILITY',
      epub: {
        isAvailable: true,
        acsTokenLink:
          'http://books.google.com.br/books/download/React_Quickly-sample-epub.acsm?id=_TgzEAAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
      },
      pdf: {
        isAvailable: false,
      },
      webReaderLink:
        'http://play.google.com/books/reader?id=_TgzEAAAQBAJ&hl=&source=gbs_api',
      accessViewStatus: 'SAMPLE',
      quoteSharingAllowed: false,
    },
    searchInfo: {
      textSnippet:
        'Summary React Quickly is for anyone who wants to learn React.js fast. This hands-on book teaches you the concepts you need with lots of examples, tutorials, and a large main project that gets built throughout the book.',
    },
  },
  {
    kind: 'books#volume',
    id: 'v6foEAAAQBAJ',
    etag: 'GbrvjrhaqYg',
    selfLink: 'https://www.googleapis.com/books/v1/volumes/v6foEAAAQBAJ',
    volumeInfo: {
      title: 'React Anti-Patterns',
      subtitle:
        'Build efficient and maintainable React applications with test-driven development and refactoring',
      authors: ['Juntao Qiu'],
      publisher: 'Packt Publishing Ltd',
      publishedDate: '2024-01-05',
      description:
        "Master efficient coding practices, address common anti-patterns, and construct scalable React apps with practical insights and techniques Key Features Identify and address React anti-patterns while learning testing strategies and refactoring techniques for efficient codebases Explore data modelling, design patterns, and state management in React Enhance code quality, maintainability, and scalability in React applications Purchase of the print or Kindle book includes a free PDF eBook Book DescriptionTake your React development skills to the next level by examining common anti-patterns with expert insights and practical solutions, to refine your codebases into sophisticated and scalable creations. Through this easy-to-follow guide, React Anti-Patterns serves as a roadmap to elevating the efficiency and maintainability of your React projects. You’ll begin by familiarizing yourself with the essential aspects of React before exploring strategies for structuring React applications and creating well-organized, modular, and easy-to-maintain codebases. From identifying and addressing common anti-patterns using refactoring techniques to harnessing the power of test-driven development (TDD), you’ll learn about the tools and techniques necessary to create reliable and robust tests. As you advance, you’ll get to grips with business logic and design patterns that offer solutions to prevalent challenges faced in React development. The book also offers insights into using composition patterns, such as code splitting and multiple entry points, to enhance the flexibility and modularity of your React applications, guiding you through end-to-end project implementation. By the end of this React book, you’ll be able to overcome common challenges and pitfalls to transform your React projects into elegant, efficient, and maintainable codebases.What you will learn Formulate comprehensive testing strategies and leverage testing framework capabilities Implement TDD practices to drive the development process and elevate code quality, especially in extensive React projects Use design patterns effectively to create scalable and reusable React components Apply established software design principles to craft resilient applications within React Achieve modularity and loose coupling in React codebases by mastering the separation of concerns Ensure clean code by adhering to software design best practices in React development Who this book is for This book is for React developers of all skill levels who share a passion for crafting efficient and maintainable codebases. Whether you're a beginner who wants to establish a solid foundation or an experienced developer looking to refine your skills, this guide offers invaluable insights, practical solutions, and real-world examples to enable you to excel at building scalable, elegant, and high-performing React applications.",
      industryIdentifiers: [
        {
          type: 'ISBN_13',
          identifier: '9781805123620',
        },
        {
          type: 'ISBN_10',
          identifier: '1805123629',
        },
      ],
      readingModes: {
        text: true,
        image: true,
      },
      pageCount: 324,
      printType: 'BOOK',
      categories: ['Computers'],
      maturityRating: 'NOT_MATURE',
      allowAnonLogging: false,
      contentVersion: 'preview-1.0.0',
      panelizationSummary: {
        containsEpubBubbles: false,
        containsImageBubbles: false,
      },
      imageLinks: {
        smallThumbnail:
          'http://books.google.com/books/content?id=v6foEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        thumbnail:
          'http://books.google.com/books/content?id=v6foEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      language: 'en',
      previewLink:
        'http://books.google.com.br/books?id=v6foEAAAQBAJ&printsec=frontcover&dq=React&hl=&cd=12&source=gbs_api',
      infoLink:
        'https://play.google.com/store/books/details?id=v6foEAAAQBAJ&source=gbs_api',
      canonicalVolumeLink:
        'https://play.google.com/store/books/details?id=v6foEAAAQBAJ',
    },
    saleInfo: {
      country: 'BR',
      saleability: 'FOR_SALE',
      isEbook: true,
      listPrice: {
        amount: 155.99,
        currencyCode: 'BRL',
      },
      retailPrice: {
        amount: 155.99,
        currencyCode: 'BRL',
      },
      buyLink:
        'https://play.google.com/store/books/details?id=v6foEAAAQBAJ&rdid=book-v6foEAAAQBAJ&rdot=1&source=gbs_api',
      offers: [
        {
          finskyOfferType: 1,
          listPrice: {
            amountInMicros: 155990000,
            currencyCode: 'BRL',
          },
          retailPrice: {
            amountInMicros: 155990000,
            currencyCode: 'BRL',
          },
          giftable: true,
        },
      ],
    },
    accessInfo: {
      country: 'BR',
      viewability: 'PARTIAL',
      embeddable: true,
      publicDomain: false,
      textToSpeechPermission: 'ALLOWED',
      epub: {
        isAvailable: true,
      },
      pdf: {
        isAvailable: true,
      },
      webReaderLink:
        'http://play.google.com/books/reader?id=v6foEAAAQBAJ&hl=&source=gbs_api',
      accessViewStatus: 'SAMPLE',
      quoteSharingAllowed: false,
    },
    searchInfo: {
      textSnippet:
        'Whether you&#39;re a beginner who wants to establish a solid foundation or an experienced developer looking to refine your skills, this guide offers invaluable insights, practical solutions, and real-world examples to enable you to excel at ...',
    },
  },
]
