# Backend
All the tasty backend magic that powers our epic business card app.
Deployed at https://business-card-backend.herokuapp.com/

## Register

To register a user, make a `POST` request to `/api/users/register`.

### Req Body

```

{
	"username": "test1",
	"email": "test1@test.test",
	"password": "test",
	"phone": "14384230192"
}

```

### Response

```

{
    "user_id": 1,
    "username": "test1",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJpYXQiOjE1NTU5NTExMDksImV4cCI6MTU1ODU0MzEwOX0.PA-GFVY49lyzZH6KdxGoSzLp987tSlZxf8r-gtuOP3M"
}

```

## Login

To login, make a `POST` request to `/api/users/login`

### Req Body

```

{
	"username": "test1",
	"password": "test"
}

```

### Response

```

{
    "user_id": 1,
    "username": "test1",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJpYXQiOjE1NTU5NTEzMjgsImV4cCI6MTU1ODU0MzMyOH0.lbcyCn1Ic5iSvY2FQPWv-WH4I_-nYX87t8PqeIvUq1Y"
}

```

# Business Cards

## Create business card

To create a business card, make a `POST` request to `/api/cards`

### Req Body

Note that the only required fields are `business_name`, `contact_name`, and `email`.

```

{
	"business_name": "Sesame Street Inc",
	"contact_name": "Big Bird",
	"email": "bigbird@whitehouse.gov",
	"phone": "14084206969",
	"address": "123 sesame street",
	"fax": "1234124123",
	"web_url": "lambdaschool.com"
}

```

### Response

```

{
  "message": "Success!"
}

```

## Fetch Business Cards

To get a list of business cards, make a `GET` request to `/api/cards`.

Note that at this time, the API only returns the cards for the current logged in user. Eventually I will send back an object containing the user's created cards and the user's saved cards.

### Response

The server will respond with an array of card objects, which will look like this:

```

[
		{
				"id": 2,
				"business_name": "Sesame Street Inc",
				"contact_name": "Big Bird",
				"email": "bigbird123@whitehouse.gov",
				"phone": "14141414742",
				"img_url": null,
				"address": "123 sesame street",
				"fax": "1234124123",
				"web_url": "lambdaschool.com",
				"qr_url": "http://res.cloudinary.com/dhupmye0m/image/upload/v1555971794/yxg34f7xeijwqgzkdl5z.png",
				"user_id": 3
		}
]

```
