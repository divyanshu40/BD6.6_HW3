let request = require("supertest");
let http = require("http");
let { app } = require("../index");
let { getAllBooks, getBookById } = require("../controllers");



jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllBooks: jest.fn(),
  getBookById: jest.fn()
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Exercise 3: Test Retrieve All Books
  it("GET API /books should retrieve all books and return status code as 200", async () => {
    let mockedBooks = [
      {
          bookId: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction'
      },
      {
          bookId: 2,
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian'
      },
      {
          bookId: 3,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic'
      }
    ];
    getAllBooks.mockResolvedValue(mockedBooks);
    let result = await request(server).get("/books");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockedBooks);
  });
  // Exercise 4: Test Retrieve Book by ID
  it("GET API /books/details/:id should retrieve a book by id and return status code as 200", async () => {
    let mockedBook =  {
      bookId: 3,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic'
  };
  getBookById.mockResolvedValue(mockedBook);
  let result = await request(server).get("/books/details/3");
  expect(result.statusCode).toEqual(200);
  expect(result.body).toEqual(mockedBook);
  });
});
describe("Cotroller Functions Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Exercise 5: Mock the Get All Books Function
  it("getAllBooks function should return all books", () => {
    let mockedBooks = [
      {
          bookId: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction'
      },
      {
          bookId: 2,
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian'
      },
      {
          bookId: 3,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic'
      }
    ];
    getAllBooks.mockReturnValue(mockedBooks);
    let result = getAllBooks();
    expect(result).toEqual(mockedBooks);
    expect(result.length).toBe(3);
  });
});