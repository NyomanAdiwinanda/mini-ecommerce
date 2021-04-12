# Ecommerce API Documentation

## RESTful endpoint

### POST /users/register

> Create a new customer user

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_

```
{
  "msg": "Register success",
  "id": 3,
  "email": "customer@mail.com",
  "role": "customer"
}
```

_Response (400 - Bad Request)_

```
{
  "msg": "Invalid email format"
}
```

```
{
  "msg": "Email already registered"
}
```

```
{
  "msg": "Input password should not be empty"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### POST /users/login

> Create access token and login for existing user

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - OK)_

```
{
  "id": 1,
  "email": "admin@mail.com",
  "role": "admin",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxNjMxNDk5Mn0.ROGDp3ykrVdgd_IwRkgwbJz2tpnOsTIWJVkBFFwgWGI"
}
```

_Response (400 - Bad Request)_

```
{
  "msg": "Invalid Email or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### POST /products

> create a new product for login admin user

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "name": "<your input name>",
  "image_url": "<your input image_url>",
  "price": "<your input price>",
  "stock": "<your input stock>",
  "category": "<your input category>",
}
```

_Response (201 - Created)_

```
{
  "id": 1,
  "name": "Kemeja Flannel Uniqlo",
  "image_url": "https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg",
  "price": 500000,
  "stock": 30,
  "category": "Uncategorized",
  "UserId": 1,
  "updatedAt": "2021-03-21T08:26:13.828Z",
  "createdAt": "2021-03-21T08:26:13.828Z"
}
```

_Response (400 - Bad Request)_

```
{
  "msg": "Input name should not be empty"
}
```

```
{
  "msg": "Input image_url should not be empty"
}
```

```
{
  "msg": "Input price should not be empty"
}
```

```
{
  "msg": "Input price should be a number integer value"
}
```

```
{
  "msg": "Input price should not be a negative value"
}
```

```
{
  "msg": "Input stock should be a number integer value"
}
```

```
{
  "msg": "Input stock should not be a negative value"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### GET /products

> get all products for login admin user

_Request Query (Optional)_

```
{
  "UserId": <Your input UserId>
  "id": <Your input product id>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 1,
    "name": "Samsung S21 White",
    "image_url": "https://images.samsung.com/is/image/samsung/p6pim/id/galaxy-s21/gallery/id-galaxy-s21-ultra-5g-g988-sm-g998bzsgxid-368319460?$720_576_PNG$",
    "price": 11500000,
    "stock": 3,
    "UserId": 1,
    "category": "Smartphone",
    "createdAt": "2021-03-20T07:53:31.911Z",
    "updatedAt": "2021-03-21T06:38:02.965Z"
  },
  {
    "id": 2,
    "name": "Iphone 12 Black",
    "image_url": "https://cdn.dxomark.com/wp-content/uploads/medias/post-61183/iphone-12-pro-blue-hero.jpg",
    "price": 12000000,
    "stock": 10,
    "UserId": 1,
    "category": "Smartphone",
    "createdAt": "2021-03-20T07:23:18.151Z",
    "updatedAt": "2021-03-21T06:38:06.881Z"
  }
]
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### PUT /products/:id

> edit a product by id

_Request Params_

```
{
  "id": <your product id>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "name": "<your input name>",
  "image_url": "<your input image_url>",
  "price": "<your input price>",
  "stock": "<your input stock>",
  "category": "<your input category>",
}
```

_Response (200 - OK)_

```
[
  1,
  [
    {
      "id": 1,
      "name": "Kemeja Flannel Uniqlo",
      "image_url": "https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg",
      "price": 500000,
      "stock": 100,
      "UserId": 1,
      "category": "Uncategorized",
      "createdAt": "2021-03-21T08:26:13.828Z",
      "updatedAt": "2021-03-21T08:32:11.752Z"
    }
  ]
]
```

_Response (400 - Bad Request)_

```
{
  "msg": "Input name should not be empty"
}
```

```
{
  "msg": "Input image_url should not be empty"
}
```

```
{
  "msg": "Input price should not be empty"
}
```

```
{
  "msg": "Input price should be a number integer value"
}
```

```
{
  "msg": "Input price should not be a negative value"
}
```

```
{
  "msg": "Input stock should be a number integer value"
}
```

```
{
  "msg": "Input stock should not be a negative value"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

```
{
  "msg": "not authorized"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### DELETE /products/:id

> delete a product by id

_Request Params_

```
{
  "id": <your product id>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "msg": "Product deleted"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

```
{
  "msg": "not authorized"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### POST /banners

> create a new banner for login admin user

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "title": "<your input title>",
  "status": "<your input status>",
  "image_url": "<your input image_url>",
}
```

_Response (201 - Created)_

```
{
  "id": 1,
  "title": "Apple Watch",
  "status": true,
  "image_url": "https://www.nylon.com.sg/wp-content/uploads/2020/09/apple-watch-series-6-nylon-banner.jpg",
  "UserId": 1,
  "updatedAt": "2021-03-21T08:45:40.556Z",
  "createdAt": "2021-03-21T08:45:40.556Z"
}
```

_Response (400 - Bad Request)_

```
{
  "msg": "Input title should not be empty"
}
```

```
{
  "msg": "Input image_url should not be empty"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### GET /banners

> get all banners for login admin user

_Request Query (Optional)_

```
{
  "UserId": <Your input UserId>
  "id": <Your input product id>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 1,
    "title": "Market",
    "status": true,
    "image_url": "https://img.freepik.com/free-psd/digital-marketing-facebook-web-banner-template_237398-216.jpg?size=626&ext=jpg",
    "UserId": 1,
    "createdAt": "2021-03-21T07:34:57.822Z",
    "updatedAt": "2021-03-21T07:57:05.388Z"
  },
  {
    "id": 2,
    "title": "Apple Watch",
    "status": true,
    "image_url": "https://www.nylon.com.sg/wp-content/uploads/2020/09/apple-watch-series-6-nylon-banner.jpg",
    "UserId": 1,
    "createdAt": "2021-03-21T08:45:40.556Z",
    "updatedAt": "2021-03-21T08:45:40.556Z"
  }
]
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### PUT /banners/:id

> edit a banner by id

_Request Params_

```
{
  "id": <your banner id>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "title": "<your input title>",
  "status": "<your input status>",
  "image_url": "<your input image_url>",
}
```

_Response (200 - OK)_

```
[
  1,
  [
    {
      "id": 1,
      "title": "Apple Watch",
      "status": false,
      "image_url": "https://www.nylon.com.sg/wp-content/uploads/2020/09/apple-watch-series-6-nylon-banner.jpg",
      "UserId": 1,
      "createdAt": "2021-03-21T07:58:29.753Z",
      "updatedAt": "2021-03-21T08:50:44.407Z"
    }
  ]
]
```

_Response (400 - Bad Request)_

```
{
  "msg": "Input title should not be empty"
}
```

```
{
  "msg": "Input image_url should not be empty"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

```
{
  "msg": "not authorized"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### DELETE /banners/:id

> delete a banner by id

_Request Params_

```
{
  "id": <your product id>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "msg": "Banner deleted"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

```
{
  "msg": "not authorized"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### POST /carts

> create a new cart for login admin user

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "total_price": <your input total_price>,
  "quantity": <your input quantity>,
  "ProductId": <your input ProductId>
}
```

_Response (200 - OK)_ (If Already Exist)

```
{
  "updateId": 1
}
```

_Response (201 - Created)_ (If Not Exist Yet)

```
{
  "id": 1,
  "total_price": "12000000",
  "quantity": 1,
  "ProductId": 1,
  "UserId": 1,
  "updatedAt": "2021-03-21T08:45:40.556Z",
  "createdAt": "2021-03-21T08:45:40.556Z"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### GET /carts

> get all carts for login admin user

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 31,
    "total_price": 5800000,
    "quantity": 2,
    "ProductId": 12,
    "UserId": 3,
    "createdAt": "2021-03-25T04:11:09.544Z",
    "updatedAt": "2021-03-25T04:11:10.099Z",
    "Product": {
      "id": 12,
      "name": "Harman Kardon Aura Studio 3",
      "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4xdMCCcsS2qGQJV6HT0edbtHrAnfDHc-6Xg&usqp=CAU",
      "price": 2900000,
      "stock": 6,
      "UserId": 1,
      "category": "Music",
      "createdAt": "2021-03-20T08:21:53.912Z",
      "updatedAt": "2021-03-25T04:02:08.698Z"
    }
  },
  {
    "id": 32,
    "total_price": 750000,
    "quantity": 1,
    "ProductId": 9,
    "UserId": 3,
    "createdAt": "2021-03-25T04:11:11.352Z",
    "updatedAt": "2021-03-25T04:11:11.352Z",
    "Product": {
      "id": 9,
      "name": "NY Yankees Cap",
      "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCyjmQxbTAiMMuVWJ4uNzpGZbu2FlJmLqYhe4NdmWqVot6ecdDvrPMRrNvX_HowteldMGH0M1J&usqp=CAc",
      "price": 750000,
      "stock": 5,
      "UserId": 1,
      "category": "Fashion",
      "createdAt": "2021-03-20T07:24:55.747Z",
      "updatedAt": "2021-03-21T06:38:27.600Z"
    }
  },
  {
    "id": 33,
    "total_price": 500000,
    "quantity": 1,
    "ProductId": 1,
    "UserId": 3,
    "createdAt": "2021-03-25T04:11:11.977Z",
    "updatedAt": "2021-03-25T04:11:11.977Z",
    "Product": {
      "id": 1,
      "name": "Uniqlo Flannel Shirt",
      "image_url": "https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg",
      "price": 500000,
      "stock": 30,
      "UserId": 1,
      "category": "Fashion",
      "createdAt": "2021-03-20T06:30:42.662Z",
      "updatedAt": "2021-03-21T06:38:30.874Z"
    }
  }
]
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### PATCH /carts/:id

> edit a cart quantity by id

_Request Params_

```
{
  "id": <your cart id>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "quantity": <your input quantity>
}
```

_Response (200 - OK)_

```
{
  "msg": "The quantity has been updated"
}
```

_Response (400 - Bad Request)_

```
{
  "msg": "You exceeded maximum stock"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

```
{
  "msg": "not authorized"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### DELETE /carts/:id

> delete a banner by id

_Request Params_

```
{
  "id": <your product id>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "msg": "A product has been deleted from your cart"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

```
{
  "msg": "not authorized"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### POST /transactionHistories

> create a new transaction history for login admin user

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
not needed
}
```

_Response (200 - OK)_

```
{
  "msg": "You completed a transaction"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### GET /transactionHistories

> get all transaction histories for login admin user

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 13,
    "total_price": 5800000,
    "quantity": 2,
    "ProductId": 12,
    "UserId": 3,
    "createdAt": "2021-03-25T04:02:08.686Z",
    "updatedAt": "2021-03-25T04:02:08.686Z",
    "Product": {
      "id": 12,
      "name": "Harman Kardon Aura Studio 3",
      "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4xdMCCcsS2qGQJV6HT0edbtHrAnfDHc-6Xg&usqp=CAU",
      "price": 2900000,
      "stock": 6,
      "UserId": 1,
      "category": "Music",
      "createdAt": "2021-03-20T08:21:53.912Z",
      "updatedAt": "2021-03-25T04:02:08.698Z"
    }
  },
  {
    "id": 12,
    "total_price": 11500000,
    "quantity": 1,
    "ProductId": 10,
    "UserId": 3,
    "createdAt": "2021-03-25T04:02:08.686Z",
    "updatedAt": "2021-03-25T04:02:08.686Z",
    "Product": {
      "id": 10,
      "name": "Samsung S21 White",
      "image_url": "https://images.samsung.com/is/image/samsung/p6pim/id/galaxy-s21/gallery/id-galaxy-s21-ultra-5g-g988-sm-g998bzsgxid-368319460?$720_576_PNG$",
      "price": 11500000,
      "stock": 1,
      "UserId": 1,
      "category": "Smartphone",
      "createdAt": "2021-03-20T07:53:31.911Z",
      "updatedAt": "2021-03-25T04:02:08.697Z"
    }
  },
  {
    "id": 11,
    "total_price": 12000000,
    "quantity": 1,
    "ProductId": 8,
    "UserId": 3,
    "createdAt": "2021-03-25T04:02:08.686Z",
    "updatedAt": "2021-03-25T04:02:08.686Z",
    "Product": {
      "id": 8,
      "name": "Iphone 12 Black",
      "image_url": "https://cdn.dxomark.com/wp-content/uploads/medias/post-61183/iphone-12-pro-blue-hero.jpg",
      "price": 12000000,
      "stock": 8,
      "UserId": 1,
      "category": "Smartphone",
      "createdAt": "2021-03-20T07:23:18.151Z",
      "updatedAt": "2021-03-25T04:02:08.695Z"
    }
  },
  {
    "id": 10,
    "total_price": 11500000,
    "quantity": 1,
    "ProductId": 10,
    "UserId": 3,
    "createdAt": "2021-03-25T04:01:24.058Z",
    "updatedAt": "2021-03-25T04:01:24.058Z",
    "Product": {
      "id": 10,
      "name": "Samsung S21 White",
      "image_url": "https://images.samsung.com/is/image/samsung/p6pim/id/galaxy-s21/gallery/id-galaxy-s21-ultra-5g-g988-sm-g998bzsgxid-368319460?$720_576_PNG$",
      "price": 11500000,
      "stock": 1,
      "UserId": 1,
      "category": "Smartphone",
      "createdAt": "2021-03-20T07:53:31.911Z",
      "updatedAt": "2021-03-25T04:02:08.697Z"
    }
  },
  {
    "id": 9,
    "total_price": 12000000,
    "quantity": 1,
    "ProductId": 8,
    "UserId": 3,
    "createdAt": "2021-03-25T04:01:24.058Z",
    "updatedAt": "2021-03-25T04:01:24.058Z",
    "Product": {
      "id": 8,
      "name": "Iphone 12 Black",
      "image_url": "https://cdn.dxomark.com/wp-content/uploads/medias/post-61183/iphone-12-pro-blue-hero.jpg",
      "price": 12000000,
      "stock": 8,
      "UserId": 1,
      "category": "Smartphone",
      "createdAt": "2021-03-20T07:23:18.151Z",
      "updatedAt": "2021-03-25T04:02:08.695Z"
    }
  }
]
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### POST /wishlists

> create a wishlist for login admin user

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
 "ProductId": "<Your Insert ProductId>"
}
```

_Response (201 - OK)_

```
{
  "msg": "success add wishlist"
}
```

_Response (400 - Bad Request)_

```
{
  "msg": "You already wishlist this product"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### GET /wishlists

> get all wishlists for login admin user

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 4,
    "ProductId": 11,
    "UserId": 3,
    "createdAt": "2021-03-25T05:28:00.364Z",
    "updatedAt": "2021-03-25T05:28:00.364Z",
    "Product": {
      "id": 11,
      "name": "North Face Rain Coart",
      "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ0gabVpRW5tNAWgdXxFyvBflAOqELdbyM3Ei4qNBp_e-7aAPU0eEIvb2jIvPY2QwVjAy81NAU&usqp=CAc",
      "price": 700000,
      "stock": 12,
      "UserId": 1,
      "category": "Fashion",
      "createdAt": "2021-03-20T07:56:18.288Z",
      "updatedAt": "2021-03-21T06:38:24.530Z"
    }
  },
  {
    "id": 5,
    "ProductId": 9,
    "UserId": 3,
    "createdAt": "2021-03-25T05:28:03.630Z",
    "updatedAt": "2021-03-25T05:28:03.630Z",
    "Product": {
      "id": 9,
      "name": "NY Yankees Cap",
      "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCyjmQxbTAiMMuVWJ4uNzpGZbu2FlJmLqYhe4NdmWqVot6ecdDvrPMRrNvX_HowteldMGH0M1J&usqp=CAc",
      "price": 750000,
      "stock": 5,
      "UserId": 1,
      "category": "Fashion",
      "createdAt": "2021-03-20T07:24:55.747Z",
      "updatedAt": "2021-03-21T06:38:27.600Z"
    }
  },
  {
    "id": 6,
    "ProductId": 1,
    "UserId": 3,
    "createdAt": "2021-03-25T05:28:05.725Z",
    "updatedAt": "2021-03-25T05:28:05.725Z",
    "Product": {
      "id": 1,
      "name": "Uniqlo Flannel Shirt",
      "image_url": "https://im.uniqlo.com/images/common/pc/goods/421195/item/58_421195_large.jpg",
      "price": 500000,
      "stock": 30,
      "UserId": 1,
      "category": "Fashion",
      "createdAt": "2021-03-20T06:30:42.662Z",
      "updatedAt": "2021-03-21T06:38:30.874Z"
    }
  }
]
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### DELETE /wishlists/:id

> delete a wishlist by id

_Request Params_

```
{
  "id": <your wishlist id>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "msg": "A wishlist has been deleted"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

```
{
  "msg": "not authorized"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---
