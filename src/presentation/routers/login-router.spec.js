class LoginRouter {
  route (httpRequest) {
    const httpRequestIsInvalid = !httpRequest || !httpRequest.body
    if (httpRequestIsInvalid) return { statusCode: 500 }

    const { email, password } = httpRequest.body
    const emailOrPasswordNotProvided = !email || !password
    if (emailOrPasswordNotProvided) return { statusCode: 400 }
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    // arrange
    const loginRouter = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'secret'
      }
    }

    // act
    const httpResponse = loginRouter.route(httpRequest)

    // assert
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no password is provided', () => {
    // arrange
    const loginRouter = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'john.doe@nowhere.com'
      }
    }

    // act
    const httpResponse = loginRouter.route(httpRequest)

    // assert
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 500 if no httpRequest is provided', () => {
    // arrange
    const loginRouter = new LoginRouter()

    // act
    const httpResponse = loginRouter.route()

    // assert
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    // arrange
    const loginRouter = new LoginRouter()
    const httpRequestWithoutBody = {}

    // act
    const httpResponse = loginRouter.route(httpRequestWithoutBody)

    // assert
    expect(httpResponse.statusCode).toBe(500)
  })
})
