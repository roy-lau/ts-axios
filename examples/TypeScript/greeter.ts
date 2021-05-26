class User {
  fullName: string
  firstName: string
  lastName: string

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = firstName + ' ' + lastName
  }
}

interface Person {
  firstName: String,
  lastName: string
}

function greeter(person: Person) {
  return 'Hello ' + person.firstName + ' ' + person.lastName
}
let user = new User('Roy','Lau')

console.log(greeter(user))

