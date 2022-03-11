class LoginRouter {
  route (httpRequest) {
    const { email, password } = httpRequest.body
    if (!email || !password) return { statusCode: 400 }
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
})
