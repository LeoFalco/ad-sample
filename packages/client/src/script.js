const authContext = new window.msal.PublicClientApplication({
  auth: {
    clientId: '66282356-b6a8-47fa-acc8-bbc3a60a536b'
  }
})

document.querySelector('#button-login')
  .addEventListener('click', async event => {
    event.preventDefault()
    console.log('authContext', authContext)

    const { idToken } = await authContext.acquireTokenPopup({
      loginHint: loginForm.name.value
    })

    console.log('response', idToken)


    const authenticatedUser = await window.axios.post('http://localhost:3333/authenticate', {
      idToken
    }).then(response => response.data)
      .catch(err => {
        console.log(err)

        if (err.response && err.response.body) {
          console.log('body', err.response.body)
        }
        return null
      })

    console.log('authenticatedUser', authenticatedUser)
  })

