export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

export const config = {
  google: {
    mapApiKey: process.env.NEXT_PUBLIC_GG_MAP_API || '',
    bucketName: '',
    storageApiKey: '',
    projectId: '',
  },
  auth: {
    POST_update: '/api/v1/auth/me',
  },
  cookies: {
    token: 'authToken',
    previousPage: 'previousPage',
  },
  login: {
    GET_logout: `/api/v1/auth/logout`,
    GET_line: `/api/v1/auth/line`,
    GET_me: `/api/v1/auth/me`,
    GET_line_jwt: `/api/v1/auth/line/jwt`,
    POST_line_register: `/api/v1/auth/register`,
    POST_line_login: `/api/v1/auth/login`,
  },
  pet: {
    GET_list: '/api/v1/pet',
    GET_my: '/api/v1/pet/my',
    GET_details: '/api/v1/pet/:pet_id',
    POST_create: '/api/v1/pet',
    PUT_update: '/api/v1/pet',
    POST_img: '/api/v1/pet/img',
  },
  shelter: {
    GET_list: '/api/v1/shelter',
    GET_details: '/api/v1/shelter/:id',
  },
  like: {
    GET_list: '/api/v1/like',
    POST_add: `/api/v1/like/:pet_id`,
    DELETE_delete: `/api/v1/like/:pet_id`,
  },
  interest: {
    GET_list: `/api/v1/interest`,
    GET_byPetId: `/api/v1/interest`, // params pet_id
    POST_add: `/api/v1/interest/:pet_id`,
    DELETE_delete: `/api/v1/interest/:pet_id`,
  },
  tag: {
    GET_list: `/api/v1/tag`,
  },
}

export const internalPages = {
  index: '/',
  user: {
    index: '/user',
    login: '/user/login',
    logout: '/user/logout',
    register: '/user/register',
    liked: '/user/liked',
    interested: '/user/interested',
  },
  about: '/about',
  findPets: '/find',
  shelters: {
    index: '/shelters',
  },
  pets: {
    index: '/pets',
    new: '/pets/new',
    myPet: '/pets/my',
  },
}
