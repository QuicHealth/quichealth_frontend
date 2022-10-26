import React from 'react'
import {render} from '@testing-library/react'
import SigninBody from "../../../pages/Signin"

describe("Sign in Testing", () => {
    test("render the title of signin page", () => {
     const { getByText} = render(<SigninBody />)   
     const linkElement = getByText("Sign in")
     expect(linkElement).toBeInTheDocument()
    })
})