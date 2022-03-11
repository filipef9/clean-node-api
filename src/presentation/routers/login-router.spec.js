class LoginRouter {
  route (httpRequest) {
    if (!httpRequest.body.email) {
      return {
        statusCode: 400
      }
    }
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
})
