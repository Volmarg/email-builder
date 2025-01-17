import {EnvReader} from '@demo';

export const testMergeTags = {
  user: {
    name: 'Ryan',
    age: 26,
    avatar: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/bbb041da-62c3-4e6a-9648-60a06738836b-image.png',
    email: 'easy-email@gmail.com',
    project: 'Easy email',
  },
  date: {
    today: new Date().toDateString()
  },
  emptyList: [],
  product_list: [
    {
      id: 0,
      image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/da9b173d-b272-4101-aa25-4635ed95e9e3-image.png',
      title: 'Slim Fit Printed shirt',
      price: '$59.99 HKD',
      url: EnvReader.getDomainWithProtocol(),
    },
    {
      id: 1,
      image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/4ef7cb65-ee1f-4b12-832c-17ab07a8b9ac-image.png',
      title: 'Casual Collar Youth Handsome',
      price: '$39.99 HKD',
      url: EnvReader.getDomainWithProtocol(),
    },
    {
      id: 2,
      image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/88fe9bfa-547f-4d5e-9ba5-ac6b91572dde-image.png',
      title: 'Shirt Business Casual',
      price: '$49.99 HKD',
      url: EnvReader.getDomainWithProtocol(),
    },
    {
      id: 3,
      image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/da9b173d-b272-4101-aa25-4635ed95e9e3-image.png',
      title: 'Slim Fit Printed shirt',
      price: '$59.99 HKD',
      url: EnvReader.getDomainWithProtocol(),
    },
    {
      id: 4,
      image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/4ef7cb65-ee1f-4b12-832c-17ab07a8b9ac-image.png',
      title: 'Casual Collar Youth Handsome',
      price: '$39.99 HKD',
      url: EnvReader.getDomainWithProtocol(),
    },
    {
      id: 5,
      image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/88fe9bfa-547f-4d5e-9ba5-ac6b91572dde-image.png',
      title: 'Shirt Business Casual',
      price: '$49.99 HKD',
      url: EnvReader.getDomainWithProtocol(),
    },
  ],
  company: {
    name: 'Easy email',
    member_list: [
      {
        id: 1,
        name: 'James',
        hobby: 'Swimming',
        age: 28,
        product_list: [
          {
            id: 0,
            image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/da9b173d-b272-4101-aa25-4635ed95e9e3-image.png',
            title: 'Slim Fit Printed shirt',
            price: '$59.99 HKD',
            url: EnvReader.getDomainWithProtocol(),
          },
          {
            id: 1,
            image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/4ef7cb65-ee1f-4b12-832c-17ab07a8b9ac-image.png',
            title: 'Casual Collar Youth Handsome Slim Print Blazer',
            price: '$59.99 HKD',
            url: EnvReader.getDomainWithProtocol(),
          },
          {
            id: 2,
            image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/88fe9bfa-547f-4d5e-9ba5-ac6b91572dde-image.png',
            title: 'Shirt Business Casual',
            price: '$59.99 HKD',
            url: EnvReader.getDomainWithProtocol(),
          },
        ],
      },
      {
        id: 2,
        name: 'Nick',
        hobby: 'Coding',
        age: 29,
        product_list: [
          {
            id: 0,
            image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/da9b173d-b272-4101-aa25-4635ed95e9e3-image.png',
            title: 'Slim Fit Printed shirt',
            price: '$59.99 HKD',
            url: EnvReader.getDomainWithProtocol(),
          },
          {
            id: 1,
            image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/4ef7cb65-ee1f-4b12-832c-17ab07a8b9ac-image.png',
            title: 'Casual Collar Youth Handsome Slim Print Blazer',
            price: '$59.99 HKD',
            url: EnvReader.getDomainWithProtocol(),
          },
          {
            id: 2,
            image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/88fe9bfa-547f-4d5e-9ba5-ac6b91572dde-image.png',
            title: 'Shirt Business Casual',
            price: '$59.99 HKD',
            url: EnvReader.getDomainWithProtocol(),
          },
        ],
      },
      {
        id: 3,
        name: 'Robert',
        hobby: 'skiing',
        age: 30,
        product_list: [
          {
            id: 0,
            image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/da9b173d-b272-4101-aa25-4635ed95e9e3-image.png',
            title: 'Slim Fit Printed shirt',
            price: '$59.99 HKD',
            url: EnvReader.getDomainWithProtocol(),
          },
          {
            id: 1,
            image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/4ef7cb65-ee1f-4b12-832c-17ab07a8b9ac-image.png',
            title: 'Casual Collar Youth Handsome Slim Print Blazer',
            price: '$59.99 HKD',
            url: EnvReader.getDomainWithProtocol(),
          },
          {
            id: 2,
            image: EnvReader.getDomainWithProtocol() + 'images/assets-maocanhua/88fe9bfa-547f-4d5e-9ba5-ac6b91572dde-image.png',
            title: 'Shirt Business Casual',
            price: '$59.99 HKD',
            url: EnvReader.getDomainWithProtocol(),
          },
        ],
      },
    ],
  }
};
