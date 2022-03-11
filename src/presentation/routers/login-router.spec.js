class LoginRouter {
  route (httpRequest) {
    const httpRequestIsInvalid = !httpRequest || !httpRequest.body
    if (httpRequestIsInvalid) return HttpResponse.serverError()

    const { email, password } = httpRequest.body

    const emailNotProvided = !email
    if (emailNotProvided) return HttpResponse.badRequest('email')

    const passwordNotProvided = !password
    if (passwordNotProvided) return HttpResponse.badRequest('password')
  }
}

class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return { statusCode: 500 }
  }
}

class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
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
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
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
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
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
