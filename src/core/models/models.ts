export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

export interface Comment {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}

export interface PostWithComments extends Post {
  comments: Comment[]
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: Address,
  phone: string,
  website: string,
  company: Company
}

interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string
  }
}

interface Company {
  name: string,
  catchPhrase: string,
  bs: string
}

interface PostWithUser extends Post {
  user: User
}

export type PostExtended = PostWithComments & PostWithUser
